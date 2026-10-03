import chromadb

# Connect to the existing persistent ChromaDB database
client = chromadb.PersistentClient(path="./chroma_data")

# Access the prior-art collection
collection = client.get_collection(name="prior_art")

# New invention description used as the search query
query_text = """
A deep learning system that analyzes medical images
and predicts diseases automatically.
"""

# Search for the most similar prior-art documents
results = collection.query(
    query_texts=[query_text],
    n_results=3
)

print("\n===== PRIOR-ART SEMANTIC SEARCH =====")
print("Query:")
print(query_text)

print("\n===== SIMILAR PRIOR-ART DOCUMENTS =====")

for i, document in enumerate(results["documents"][0]):
    print(f"\nResult {i + 1}")
    print("ID:", results["ids"][0][i])
    print("Document:", document.strip())

    if "distances" in results:
        print("Distance:", results["distances"][0][i])

    if "metadatas" in results:
        print("Metadata:", results["metadatas"][0][i])