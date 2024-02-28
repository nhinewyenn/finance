# SETTING UP

*ensure you have node installed

#### Cloning the Repository
Start by cloning the repository to your local machine:

```
git clone https://github.com/nhinewyenn/finance.git
cd finance
```

#### Backend Configuration

1.Environment Files: Navigate to the backend folder and create two files: .env 

```
PORT=
NODE_ENV=
MONGO_URL=<your-mongo-generated-url>
SECRET_KEY=<random-key>
REFRESH_TOKEN_SECRET=<random-key>
FRONTEND_URL=

```
2. MongoDB setup:
- Sign up for an account at MongoDB Atlas.
- Create a new cluster and follow the instructions to set up a new database.
- Once set up, obtain your MongoDB connection string and add it to the MONGO_URL variable in your .env files.

### Frontend Configuration
1. Environment Files: Navigate to the frontend folder and create a file: .env:

```
VITE_USER_API=
VITE_FINANCE_API=
VITE_HOST=
```

### Running the Application
#### Backend:

- Navigate to the backend directory.
- Install dependencies: npm install.
- Start the server: npm start.


#### Frontend:

- Open a new terminal and navigate to the frontend directory.
- Install dependencies: npm install.
- Start the frontend application: npm run dev.
- The application should now be running on http://localhost:5173 but verify this in your command line terminal
