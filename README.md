# Book Viewing and Purchase Website

This project was developed by **Miras Kabykenov** and **Daiyr Bokan** from the **CSE-2403** group as final project for course **Advanced Frontend** by **Kashkimbayeva Nurzhamal**.

This project is a website for browsing and purchasing books. It allows users to view a catalog of books, read details about each book, and make purchases. The backend is written in Go (Golang), utilizing MongoDB for data storage, and Redis for caching. The frontend is developed using React.

## Project Setup

Follow the steps below to set up the development environment and run the application.

### Step 1: Start Redis Server
To begin, you need to start the Redis server, which is used for caching purposes in the backend.

1. Install Redis (if not already installed). Follow the instructions from the official Redis website: [Redis Installation Guide](https://redis.io/docs/getting-started/).
2. Start Redis by running the following command in your terminal:
    ```bash
    redis-server
    ```

### Step 2: Start the Backend
The backend is written in Go (Golang) and uses MongoDB to store book and user data.

1. Clone the repository (if you haven’t already):
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2. Make sure MongoDB is installed and running. You can follow the instructions here to install it: [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/).
3. In your terminal, navigate to the backend directory and run the backend server:
    ```bash
    cd backend
    go run main.go
    ```

### Step 3: Install Frontend Dependencies
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install all necessary packages for the React frontend:
    ```bash
    npm install
    ```

### Step 4: Start the Frontend
1. Once the packages are installed, run the React development server:
    ```bash
    npm start
    ```
2. This will launch the app in development mode at [http://localhost:3000](http://localhost:3000).

### Available Scripts

In the project directory, you can run the following commands:

#### `npm start`
Runs the React app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

#### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**\
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and dependencies (webpack, Babel, ESLint, etc.) into your project so you have full control over them.

You don't have to use this feature unless you want to fully customize the configuration.

## Learn More

You can learn more about the setup and configuration in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
