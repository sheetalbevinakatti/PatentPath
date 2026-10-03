# PatentPath
### Invention-to-Patent Traceability and Prior-Art Analysis System

PatentPath is a **DBMS Level 3 project** designed to manage the journey of an invention from inventor registration and technology classification to patent application tracking and patent record management.

The system integrates a relational **MySQL database** with **ChromaDB-based semantic search** to support prior-art analysis. A FastAPI backend connects the database and vector-search functionality to a Next.js web interface.

---

## Objectives

- Maintain structured information about inventions and inventors.
- Track technology categories associated with inventions.
- Manage patent applications, status history, and patent records.
- Store and analyze prior-art information.
- Perform semantic prior-art retrieval using ChromaDB.
- Demonstrate advanced database concepts beyond basic CRUD operations.
- Provide a functional web interface for interacting with the system.

---

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, TypeScript |
| Backend | FastAPI, Python |
| Relational Database | MySQL |
| Vector Database | ChromaDB |
| API Communication | REST |
| Version Control | Git and GitHub |

---

## Project Structure

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
├── vector_db/
│   └── chroma_data/
│
├── .gitignore
├── PatentPath.sql
└── README.md
```

> **Note:** The `.env` file contains local database configuration and is excluded from GitHub using `.gitignore`.

---

## Database Design

The MySQL database is named **`PatentPath`**.

### Main Tables

| Table | Description |
|---|---|
| `INVENTOR` | Stores inventor information. |
| `TECHNOLOGY_CATEGORY` | Maintains technology classifications. |
| `INVENTION` | Stores invention details. |
| `INVENTION_INVENTOR` | Establishes the relationship between inventions and inventors. |
| `PRIOR_ART` | Stores prior-art documents and related information. |
| `PRIOR_ART_ANALYSIS` | Maintains prior-art analysis records. |
| `PATENT_APPLICATION` | Tracks patent applications. |
| `STATUS_HISTORY` | Maintains application status changes. |
| `PATENT` | Stores patent records. |
| `PATENT_CITATION` | Maintains patent citation relationships. |

### Additional Database Objects

- **SQL View:** `invention_technology_view`
- **Stored Procedure:** `GetInventionDetails`
- **Trigger:** `trg_application_status_update`
- **Indexing:** Index on the `INVENTION` table

---

## Database Concepts Demonstrated

PatentPath demonstrates the following DBMS concepts:

- Database and table creation
- Primary Keys and Foreign Keys
- `NOT NULL` constraints
- `INSERT`, `SELECT`, `UPDATE`, and `DELETE`
- SQL Joins
- `GROUP BY`, `HAVING`, and `ORDER BY`
- Aggregate functions
- Subqueries
- Indexing
- SQL Views
- Stored Procedures
- Triggers
- Transactions and Rollback
- Vector-based Semantic Search

---

## Installation and Setup

### Prerequisites

Ensure the following software is installed:

- Python
- Node.js and npm
- MySQL Server
- MySQL Workbench
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/shrunguuu/PatentPath.git
cd PatentPath
```

### 2. Database Setup

The complete SQL implementation is provided in `PatentPath.sql`.

1. Make sure MySQL Server is running.
2. Open MySQL Workbench.
3. Execute the `PatentPath.sql` script.

Alternatively, use the MySQL command-line client:

```sql
SOURCE PatentPath.sql;
```

Verify the database and tables:

```sql
USE PatentPath;
SHOW TABLES;
```

### 3. Backend Setup

From the project root directory:

```bash
cd PatentPath
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install the required Python packages used by the backend.

Configure the local `.env` file with the database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=<your_mysql_username>
DB_PASSWORD=<your_mysql_password>
DB_NAME=PatentPath
```

Start the FastAPI backend:

```bash
uvicorn backend.app:app --reload
```

The backend runs at:

**http://127.0.0.1:8000**

FastAPI interactive documentation:

**http://127.0.0.1:8000/docs**

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd PatentPath/frontend
```

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend is available at:

**http://localhost:3000**

---

## Running the Application

Run the components in the following order:

| Step | Component | Action |
|---|---|---|
| 1 | MySQL | Start MySQL Server and ensure the `PatentPath` database exists. |
| 2 | FastAPI | Start the backend using Uvicorn. |
| 3 | Next.js | Start the frontend using npm. |

Once all components are running, open:

**http://localhost:3000**

---

## Prior-Art Semantic Search

PatentPath uses **ChromaDB** for semantic prior-art retrieval.

The vector collection is named:

```text
prior_art
```

### Stored Prior-Art Information

The stored documents contain information such as:

- Title
- Document type
- Source
- Abstract or content metadata

Users can submit a natural-language description of an invention through the application.

### Example Query

```text
A deep learning system that analyzes medical images
and predicts diseases automatically.
```

The backend sends the query to the ChromaDB collection and retrieves relevant prior-art documents based on vector distance.

The retrieved results are then displayed through the web interface.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Checks backend health. |
| `GET` | `/inventions` | Retrieves invention records. |
| `POST` | `/prior-art/search` | Performs semantic prior-art search. |

---

## Application Workflow

```text
                 User
                   |
                   v
           Next.js Frontend
                   |
                   v
             FastAPI Backend
                   |
           +-------+-------+
           |               |
           v               v
        MySQL           ChromaDB
           |               |
           |               v
           |       Semantic Prior-Art
           |          Retrieval
           |               |
           +-------+-------+
                   |
                   v
           Results to Frontend
```

---

## Version Control

The project is maintained using Git and GitHub.

**GitHub Repository:**  
[PatentPath Repository](https://github.com/shrunguuu/PatentPath)

The `.gitignore` file excludes:

- Environment files
- Python virtual environments
- Python cache files
- Node.js dependencies
- Next.js build files
- Local ChromaDB data
- IDE and operating-system files

> **Security Note:** Actual database credentials must remain local and must never be committed to GitHub.

---

## Team

| Team Member |
|---|
| Sheetal Bevinakatti |
| Shrungashree KR |

Both members contributed to database and application development activities.

---

## Project Status

PatentPath includes the implemented relational database, vector-search component, FastAPI backend, and Next.js frontend for the DBMS Level 3 project.

---

**PatentPath — Bridging Invention Management and Intelligent Prior-Art Discovery.**
