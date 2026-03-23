from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Header
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine, Base
import models
from auth import hash_password, verify_password, create_token, decode_token
from utils import generate_hash, compress_if_needed

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get Current User
def get_current_user(token: str = Header(...), db: Session = Depends(get_db)):
    try:
        data = decode_token(token)
    except:
        raise HTTPException(status_code=401)

    user = db.query(models.User).filter(models.User.id == data["id"]).first()
    return user

@app.get("/")
def root():
    return {"message": "CloudVault API running"}

# Signup
@app.post("/signup")
def signup(email: str, password: str, db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(models.User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = models.User(email=email, password=hash_password(password))
    db.add(user)
    db.commit()

    return {"message": "User created"}

# Login
@app.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_token({"id": user.id})
    return {"token": token}

# Upload File
@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    data = await file.read()

    file_hash = generate_hash(data)

    # Check if file already exists (deduplication)
    existing = db.query(models.File).filter(models.File.hash == file_hash).first()

    if existing:
        # Check if user already has this file
        already = db.query(models.UserFile).filter(
            models.UserFile.user_id == user.id,
            models.UserFile.file_id == existing.id
        ).first()

        if already:
            return {"message": "File already uploaded"}

        # Link file to user
        user_file = models.UserFile(
            user_id=user.id,
            file_id=existing.id,
            filename=file.filename
        )
        db.add(user_file)
        db.commit()

        return {"message": "Duplicate file linked"}

    # Compress if needed
    data = compress_if_needed(data)

    path = os.path.join(UPLOAD_DIR, file_hash)

    with open(path, "wb") as f:
        f.write(data)

    # Save new file
    new_file = models.File(
        hash=file_hash,
        path=path,
        size=len(data)
    )
    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    # Link to user
    user_file = models.UserFile(
        user_id=user.id,
        file_id=new_file.id,
        filename=file.filename
    )
    db.add(user_file)
    db.commit()

    return {"message": "File uploaded"}

# Get Files
@app.get("/files")
def get_files(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.UserFile).filter(
        models.UserFile.user_id == user.id,
        models.UserFile.is_deleted == False
    ).all()

# Download
@app.get("/download/{id}")
def download(id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    user_file = db.query(models.UserFile).filter(
        models.UserFile.id == id,
        models.UserFile.user_id == user.id,
        models.UserFile.is_deleted == False
    ).first()

    if not user_file:
        raise HTTPException(status_code=404)

    file = db.query(models.File).filter(models.File.id == user_file.file_id).first()

    return FileResponse(file.path, filename=user_file.filename)

# Favorites
@app.post("/favorite/{id}")
def favorite(id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    uf = db.query(models.UserFile).filter(
        models.UserFile.id == id,
        models.UserFile.user_id == user.id
    ).first()

    if not uf:
        raise HTTPException(status_code=404, detail="File not found")

    uf.is_favorite = not uf.is_favorite
    db.commit()

    return {"favorite": uf.is_favorite}

# Get Favourites
@app.get("/favorites")
def favorites(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.UserFile).filter(
        models.UserFile.user_id == user.id,
        models.UserFile.is_favorite == True,
        models.UserFile.is_deleted == False
    ).all()

# Move to Trash
@app.delete("/delete/{id}")
def delete(id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    uf = db.query(models.UserFile).filter(
        models.UserFile.id == id,
        models.UserFile.user_id == user.id
    ).first()

    if not uf:
        raise HTTPException(status_code=404, detail="File not found")

    uf.is_deleted = True
    db.commit()

    return {"message": "Moved to trash"}

# View Trash
@app.get("/trash")
def trash(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.UserFile).filter(
        models.UserFile.user_id == user.id,
        models.UserFile.is_deleted == True
    ).all()

# Restore
@app.post("/restore/{id}")
def restore(id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    uf = db.query(models.UserFile).filter(
        models.UserFile.id == id,
        models.UserFile.user_id == user.id
    ).first()

    if not uf:
        raise HTTPException(status_code=404, detail="File not found")

    uf.is_deleted = False
    db.commit()

    return {"message": "Restored"}

