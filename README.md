\# PatentPath



\## Invention-to-Patent Traceability and Prior-Art Analysis System



PatentPath is a DBMS Level 3 project designed to manage the journey of an invention from inventor and technology classification through patent application and patent records.



The system combines a relational MySQL database with ChromaDB-based semantic search to support prior-art analysis. A FastAPI backend connects the database and vector-search functionality to a Next.js web interface.



\---



\## Objectives



\- Maintain structured information about inventions and inventors.

\- Track technology categories associated with inventions.

\- Manage patent applications, status history, and patent records.

\- Store and analyze prior-art information.

\- Perform semantic prior-art retrieval using ChromaDB.

\- Demonstrate advanced database concepts beyond basic CRUD.

\- Provide a functional web interface for interacting with the system.



\---



\## Technology Stack



| Component | Technology |

|---|---|

| Frontend | Next.js, TypeScript |

| Backend | FastAPI, Python |

| Relational Database | MySQL |

| Vector Database | ChromaDB |

| API Communication | REST |

| Version Control | Git + GitHub |



\---



\## Project Structure



```text

PatentPath/

│

├── backend/

│   ├── app.py

│   └── .env

│

├── frontend/

│   ├── src/

│   ├── package.json

│   └── ...

│

├── vector\_db/

│   └── chroma\_data/

│

├── .gitignore

├── PatentPath.sql

└── README.md



Database



The MySQL database is named PatentPath.



The relational database contains the following main tables:



INVENTOR

TECHNOLOGY\_CATEGORY

INVENTION

INVENTION\_INVENTOR

PRIOR\_ART

PRIOR\_ART\_ANALYSIS

PATENT\_APPLICATION

STATUS\_HISTORY

PATENT

PATENT\_CITATION



The project also includes:



SQL view: invention\_technology\_view

Stored procedure: GetInventionDetails

Trigger: trg\_application\_status\_update

Indexing on the INVENTION table



Database Features Demonstrated



The project demonstrates:



CREATE DATABASE and CREATE TABLE

Primary and foreign keys

NOT NULL constraints

INSERT

SELECT

UPDATE

DELETE

JOIN

GROUP BY

HAVING

ORDER BY

Aggregate functions

Subqueries

Indexes

SQL views

Stored procedures

Triggers

Transactions and rollback

Vector semantic search



Backend Setup :

Open a terminal in the project directory: cd PatentPath



Create and activate a Python virtual environment if required.



Install the required Python packages used by the backend.



Start the FastAPI backend: uvicorn backend.app:app --reload



The backend runs at: http://127.0.0.1:8000



FastAPI documentation is available at: http://127.0.0.1:8000/docs



Frontend Setup



Open another terminal and navigate to the frontend directory: cd PatentPath/frontend



Install the frontend dependencies: npm install



Start the Next.js development server: npm run dev



The frontend is available at: http://localhost:3000



Running the Application



Run the components in the following order.



1\. MySQL



Make sure the MySQL server is running and the PatentPath database has been created.



2\. FastAPI Backend



From the project root:



uvicorn backend.app:app --reload

3\. Next.js Frontend



From the frontend directory:



npm run dev



Then open:



http://localhost:3000



Prior-Art Semantic Search



PatentPath uses ChromaDB for semantic prior-art retrieval.



The vector collection is:



prior\_art



The stored prior-art documents contain information such as:



Title

Document type

Source

Abstract/content metadata



A natural-language invention description can be submitted through the application.



Example query:



A deep learning system that analyzes medical images and predicts diseases automatically.



The backend sends the query to the ChromaDB collection and retrieves relevant prior-art documents based on vector distance.



The retrieved results are displayed through the web interface.



API Endpoints

Health Check

GET /health

Retrieve Inventions

GET /inventions

Search Prior Art

POST /prior-art/search

Application Workflow

User

&#x20; │

&#x20; ▼

Next.js Frontend

&#x20; │

&#x20; ▼

FastAPI Backend

&#x20; │

&#x20; ├──────────────► MySQL

&#x20; │

&#x20; └──────────────► ChromaDB

&#x20;                      │

&#x20;                      ▼

&#x20;               Semantic Prior-Art

&#x20;                   Retrieval

Version Control



The project is maintained using Git and GitHub.



Repository:



https://github.com/sheetalbevinakatti/PatentPath



The project uses .gitignore to exclude:



Environment files

Python virtual environments

Python cache files

Node.js dependencies

Next.js build files

Local ChromaDB data

IDE and operating-system files

Team

Team Members

Sheetal Bevinakatti

Shrungashree KR



Both members contributed to database and application development activities.

