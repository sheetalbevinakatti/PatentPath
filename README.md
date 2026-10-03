PatentPath
Invention-to-Patent Traceability and Prior-Art Analysis System

PatentPath is a DBMS Level 3 project designed to manage the journey of an invention from inventor and technology classification through patent application and patent records.
The system combines a relational MySQL database with ChromaDB-based semantic search to support prior-art analysis. A FastAPI backend connects the database and vector-search functionality to a Next.js web interface.

Objectives
Maintain structured information about inventions and inventors.
Track technology categories associated with inventions.
Manage patent applications, status history, and patent records.
Store and analyze prior-art information.
Perform semantic prior-art retrieval using ChromaDB.
Demonstrate advanced database concepts beyond basic CRUD.
Provide a functional web interface for interacting with the system.

Technology Stack
ComponentTechnologyFrontendNext.js, TypeScriptBackendFastAPI, PythonRelational DatabaseMySQLVector DatabaseChromaDBAPI CommunicationRESTVersion ControlGit and GitHub

Project Structure
PatentPath/ │ ├── backend/ │ ├── app.py │ └── .env │ ├── frontend/ │ ├── src/ │ ├── package.json │ └── ... │ ├── vector_db/ │ └── chroma_data/ │ ├── .gitignore ├── PatentPath.sql └── README.md 
Note: The .env file contains local database configuration and is excluded from GitHub using .gitignore.

Database
The MySQL database is named PatentPath.
The relational database contains the following main tables:
INVENTOR
TECHNOLOGY_CATEGORY
INVENTION
INVENTION_INVENTOR
PRIOR_ART
PRIOR_ART_ANALYSIS
PATENT_APPLICATION
STATUS_HISTORY
PATENT
PATENT_CITATION

The project also includes:
SQL View: invention_technology_view
Stored Procedure: GetInventionDetails
Trigger: trg_application_status_update
Indexing: Index on the INVENTION table
Database Features Demonstrated

The project demonstrates the following database concepts:
CREATE DATABASE
CREATE TABLE
Primary Keys
Foreign Keys
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
SQL Views
Stored Procedures
Triggers
Transactions and Rollback
Vector Semantic Search
SQL Database Setup

The complete SQL implementation is provided in PatentPath.sql.

Make sure MySQL Server is running.
Open MySQL Workbench and execute the SQL script.
Alternatively, from the MySQL command-line client:
SOURCE PatentPath.sql; 
After execution, verify the database and tables:
USE PatentPath; SHOW TABLES; 

Backend Setup
Open a terminal in the project root directory:
cd PatentPath 
Create and activate a Python virtual environment if required.
Install the required Python packages used by the backend.
Start the FastAPI backend:
uvicorn backend.app:app --reload 
The backend runs at:
http://127.0.0.1:8000
FastAPI documentation is available at:
http://127.0.0.1:8000/docs

Backend Environment Variables
The backend uses environment variables for database configuration.
The local .env file contains configuration such as:
DB_HOST=localhost DB_PORT=3306 DB_USER=<your_mysql_username> DB_PASSWORD=<your_mysql_password> DB_NAME=PatentPath 
Actual credentials must remain local and must not be committed to GitHub.

Frontend Setup
Open another terminal and navigate to the frontend directory:
cd PatentPath/frontend 
Install the frontend dependencies:
npm install 
Start the Next.js development server:
npm run dev 

The frontend is available at:
http://localhost:3000
Running the Application

Run the components in the following order.
1. MySQL
Make sure the MySQL server is running and the PatentPath database has been created.
2. FastAPI Backend
From the project root:
uvicorn backend.app:app --reload 
3. Next.js Frontend
From the frontend directory:
npm run dev 
Then open:
http://localhost:3000

Prior-Art Semantic Search
PatentPath uses ChromaDB for semantic prior-art retrieval.
The vector collection is named:
prior_art
The stored prior-art documents contain information such as:
Title
Document type
Source
Abstract or content metadata
A natural-language invention description can be submitted through the application.

Example Query
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
User │ ▼ Next.js Frontend │ ▼ FastAPI Backend │ ├──────────────► MySQL │ └──────────────► ChromaDB │ ▼ Semantic Prior-Art Retrieval 

Version Control
The project is maintained using Git and GitHub.

Repository:
https://github.com/shrunguuu
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

Project Status
PatentPath includes the implemented relational database, vector-search component, FastAPI backend, and Next.js frontend for the DBMS Level 3 project.
