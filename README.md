# This project is basic implementation of an online ecommerce store made in the MERN Stack.

# Prequiste to run the app are:
1. NodeJS and NPM
2. An account on MongoDB Atlas. If you don't have one you can get one at: https://www.mongodb.com/cloud/atlas

# Steps to run the app 
1. Clone the repository.
2. change the MONGO_URI in /backend/db.js file with your atlas mongodb uri.
3. Navigate to this directry and execute the following commands:
    3.1 if you have docker:
    ```
    docker-compose build
    docker-compose up
    ```
    3.2 if you don't have docker:
        3.2.1 Navigate to the backend folder and execute
        ```
        npm install
        node server.js
        ```
        3.2.2 Now navigate to /frontend/kart in kart and run the server.js file by executing the following commands
        ```
        npm install
        npm start
        ```
The browser window shall now pop-up, if it doesn't visit 'http://localhost:3000'.


