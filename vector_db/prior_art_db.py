import chromadb

# Create a persistent ChromaDB database
client = chromadb.PersistentClient(path="./chroma_data")

# Create or access the prior-art collection
collection = client.get_or_create_collection(
    name="prior_art"
)

# Sample prior-art documents
documents = [
    """
    An artificial intelligence system for analyzing medical images.
    The system uses machine learning techniques to identify patterns
    in medical images and assist with automated diagnosis.
    """,

    """
    A patent document describing a machine learning based system
    for detecting diseases from retinal images. The system extracts
    image features and classifies retinal conditions automatically.
    """,

    """
    A computer vision based healthcare platform that processes
    medical images using deep learning algorithms. The platform
    provides automated analysis and generates diagnostic predictions.
    """
]

# Unique IDs for the documents
ids = [
    "PA001",
    "PA002",
    "PA003"
]

# Metadata for each document
metadatas = [
    {
        "title": "AI Medical Image Analysis",
        "type": "Research Paper",
        "source": "Sample Prior Art"
    },
    {
        "title": "Machine Learning Retinal Disease Detection",
        "type": "Patent",
        "source": "Sample Prior Art"
    },
    {
        "title": "Deep Learning Healthcare Image Platform",
        "type": "Patent",
        "source": "Sample Prior Art"
    }
]

# Add documents to ChromaDB
collection.add(
    ids=ids,
    documents=documents,
    metadatas=metadatas
)

print("Prior-art documents added successfully.")
print("Collection name:", collection.name)
print("Number of documents:", collection.count())