# Visualizing Climate Data

## Project Overview
Visualizing Climate Data is a web application that provides interactive data visualizations of climate change metrics. Users can explore global historical surface temperature anomalies from 1850 onwards, northern hemisphere 2,000-year temperature reconstructions, atmospheric CO₂ concentrations from Mauna Loa measurements starting in 1958, ice core CO₂ measurements, the evolution of global temperature over the past two million years, and CO₂ emissions by country and sector. Additionally, major human evolution and cultural events relevant to climate change are included.

The platform allows users to log in, create collections of charts, and interact with datasets stored in a MongoDB database.

## Project Description

This project was developed collaboratively. The main goal was to build a simple, clear, and user-friendly interface that enables users to explore climate data visually.

- Users can log in to access additional features.

- Users can add charts to their personal collections and share them publicly.

- The sidebar navigation provides easy access to all views and functionalities.

The database schema is straightforward:

- User: Unique ID, username, password, and email.

- Charts: Each chart has its own ID, x-axis and y-axis data, and is linked to the user who created it.

## Technologies Used

Frontend: React.js

Backend: Node.js with Express

Database: MongoDB

Deployment: Render

## Installation and Usage

To run the application locally, you need to have a MongoDB database. Without the database, the UI will function, but login, registration, and chart functionalities requiring database access will not work.

### Steps:

Clone the repository
```
git clone https://github.com/vincentbui21/Visualizing_Climate_Data.git
cd Visualizing_Climate_Data/Website
```

Set up environment variables

In the Website folder, create a .env file:
```
PORT=8000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
```

In the frontend folder, create a .env file:
```
NODE_ENV=development
REACT_APP_SERVER_URL=http://localhost:8000
```

Install dependencies and start the server

# Backend
```
npm install
npm run dev
```
# Frontend
```
cd frontend
npm install
npm start
```
## Demo

The project is deployed and can be accessed here:

[Visualizing Climate Data Live](https://react-chart-node-mongodb-frontend.onrender.com/)

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/985092cb-47e6-4206-89e9-b966e4fa4eaf" />

- Note: The server may take some time to load due to large datasets.

## Additional Notes

- Datasets must follow the project’s models or the models must be updated to match your data.

- The platform emphasizes simplicity and usability for general users.
