import fitz  # PyMuPDF
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify allowed origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Function to extract text from a PDF file using PyMuPDF
def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text("text")
    return text

# Function to compute similarity between PDF texts using cosine similarity
def compute_similarity(texts: List[str]) -> List[List[float]]:
    vectorizer = TfidfVectorizer().fit_transform(texts)
    vectors = vectorizer.toarray()
    similarity_matrix = cosine_similarity(vectors)
    return similarity_matrix.tolist()

@app.post("/api/pdf-similarity")
async def pdf_similarity(files: List[UploadFile] = File(...)):
    folder = "/tmp/uploaded_pdfs"
    os.makedirs(folder, exist_ok=True)

    file_paths = []
    pdf_texts = []

    # Save uploaded files and extract their text
    for file in files:
        file_path = os.path.join(folder, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        file_paths.append(file_path)
        
        # Extract text from the PDF file
        extracted_text = extract_text_from_pdf(file_path)
        pdf_texts.append(extracted_text)

    # Compute similarity matrix
    similarity_matrix = compute_similarity(pdf_texts)

    # Clean up: remove uploaded files
    for file_path in file_paths:
        os.remove(file_path)

    return JSONResponse(content={
        "similarity_data": {
            "files": [file.filename for file in files],
            "similarity_matrix": similarity_matrix
        }
    })

