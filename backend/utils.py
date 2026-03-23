import hashlib
import gzip

def generate_hash(data: bytes):
    return hashlib.sha256(data).hexdigest()

def compress_if_needed(data: bytes):
    if len(data) > 1_000_000:   # 1MB
        return gzip.compress(data)
    return data