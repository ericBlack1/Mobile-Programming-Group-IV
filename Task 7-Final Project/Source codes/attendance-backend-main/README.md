# FastAPI Project

A modern FastAPI project with SQLAlchemy and PostgreSQL.

## Features

- FastAPI framework
- SQLAlchemy ORM
- PostgreSQL database
- Pydantic models
- Clean project structure
- User management system

## Project Structure

```
.
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   ├── models/
│   ├── schemas/
│   └── services/
├── requirements.txt
└── README.md
```

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following variables:
```
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=fastapi_db
```

4. Create the PostgreSQL database:
```bash
createdb fastapi_db
```

5. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Users

- `GET /api/v1/users/` - List all users
- `POST /api/v1/users/` - Create a new user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user 