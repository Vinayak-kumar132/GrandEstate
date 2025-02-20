GrandEstate – A Smarter Way to Buy, Sell, and Rent Properties

📌 Overview

GrandEstate is a full-stack real estate platform designed to simplify property transactions. It enables users to list, sell, and rent properties with detailed descriptions, images, and pricing. The platform integrates secure authentication using Firebase and features an advanced search functionality to filter properties by location, price, and other criteria.

🚀 Features

User Authentication – Secure sign-in and registration with Firebase.

Property Listings – Users can add, update, and manage property listings.

Advanced Search & Filters – Find properties based on location, price, and other parameters.

Image Uploads – Easily upload property images.

Seamless Backend – Built with Node.js, Express.js, and MongoDB.

Modern UI – Designed with React.js and Tailwind CSS for a smooth user experience.

🛠 Tech Stack

Frontend:

React.js

Tailwind CSS

Redux (for state management)

Backend:

Node.js

Express.js

MongoDB

Authentication & Storage:

Firebase (for authentication and file storage)

Deployment:

Render (for deployment)



⚡ Challenges Faced & Solutions

1️⃣ Challenges Faced

Search Functionality Issue

One of the key challenges was implementing a dynamic search functionality where each selected attribute (like price, location, or type) would update the URL. The initial approach involved extracting search parameters using useParams and useSearchParams, but managing state updates and URL synchronization became complex. The challenge was to ensure that each filter change correctly updated the URL while maintaining a smooth user experience.

Solution

Implemented controlled state management to sync filters with the URL.

Used useEffect to listen for URL changes and update the search query accordingly.

Switched to useSearchParams for better handling of query parameters.

Ensured that selecting and deselecting filters updated the URL dynamically without breaking the existing state.

What I Learned

Deep understanding of URL-based state management in React.

Optimizing search query handling with useSearchParams.

Better management of controlled components for seamless user interactions.

Debugging and improving user experience with real-time filter updates.

2️⃣ Issue: Deployment on Render

Problem: Auto-deployment was not reflecting changes.

Solution: Configured webhooks for proper auto-deployment with GitHub Actions.





🚀 Getting Started

Installation

Clone the repository and install dependencies:

# Clone the repo
git clone https://github.com/Vinayak-kumar132/GrandEstate.git
cd GrandEstate

# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../client
npm install

Run the Application

# Start the backend
cd api
npm start

# Start the frontend
cd ../client
npm start

Environment Variables

Create a .env file in the server directory and add the following:

MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
JWT_SECRET=your_secret_key

📜 License

This project is open-source and available for learning purposes.

Feel free to contribute, raise issues, or give suggestions! 

