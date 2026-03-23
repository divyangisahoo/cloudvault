# CloudVault ☁️

A full-stack cloud storage web application similar to Google Drive.
CloudVault allows users to securely upload, manage, and download files using scalable cloud infrastructure.
The system implements authentication, file deduplication, and cloud-based storage using AWS services.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* FastAPI
* Python
* SQLAlchemy
* JWT Authentication
* REST APIs

### Cloud Services

* AWS EC2 (Backend Deployment)
* AWS S3 (File Storage)
* AWS IAM Role (Permission to EC2 to access S3)

---

## Features

* User signup and login with secure authentication
* Upload and manage files through a web interface
* Hash-based file deduplication to prevent duplicate storage
* Secure file downloads using presigned URLs
* Favorite files for quick access
* Trash system with restore functionality
* Cloud-based file storage using AWS S3
* Backend deployed on AWS EC2
* AWS IAM Role to allow EC2 to access S3, instead of using keys in the code

---

## System Architecture

The application follows a **client-server architecture**:

* The **React frontend** provides the user interface.
* The **FastAPI backend** handles authentication, file management, and API endpoints.
* **AWS S3** stores uploaded files in the cloud.
* **AWS EC2** hosts the backend server.
* **AWS IAM Role** to allow EC2 to access S3

The frontend communicates with the backend using **REST APIs**, and the backend interacts with **AWS S3** for scalable file storage.

---

## Project Structure

```
cloudvault
│
├── frontend      # React + TypeScript frontend application
│
└── backend       # FastAPI backend application
```
---

## How to Run the Project

### Run Backend

```
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Run Frontend

```
cd frontend
npm install
npm run dev
```

Open the application in your browser:

```
http://localhost:8080
```

---

## Future Improvements

* File sharing between users
* Folder organization system
* File preview functionality
* Real-time upload progress tracking

---

## Author

Divyangi Sahoo  
B.Tech CSE