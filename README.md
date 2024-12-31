
# PC Parts Scraper

This project allows users to scrape PC parts data from an online store (Amazon UK) and display it in a React-based frontend. The data includes part names, prices, URLs, and images. It uses Puppeteer for web scraping, MongoDB for storage, and Express.js for the backend API.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Web Scraping**: Puppeteer, Cheerio
- **Database**: MongoDB
- **API**: Axios (for frontend HTTP requests)
- **Cross-Origin Resource Sharing (CORS)**: For handling cross-origin requests

---

## Installation

### Prerequisites

- **Node.js**: [Install Node.js](https://nodejs.org/) (includes npm)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/pc-parts-scraper.git
cd pc-parts-scraper
```

### Step 2: Install dependencies for both frontend and backend

#### Backend

1. Navigate to the backend folder (if your project is structured with separate frontend and backend folders):
    ```bash
    cd backend
    ```
2. Install the backend dependencies:
    ```bash
    npm install
    ```

#### Frontend

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install the frontend dependencies:
    ```bash
    npm install
    ```

---

## Running the Application

### Step 1: Start the MongoDB server

If you're running MongoDB locally:

```bash
mongod
```

Alternatively, use a cloud service like MongoDB Atlas.

### Step 2: Start the backend

1. Navigate to the backend folder (if not already there):
    ```bash
    cd backend
    ```
2. Start the Express server:
    ```bash
    npm start
    ```

This will start the backend server on `http://localhost:5000`.

### Step 3: Start the frontend

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Start the React app:
    ```bash
    npm start
    ```

This will open the frontend React application on `http://localhost:3000`.

---

## Features

- **Scrape Data**: Scrapes PC parts data from Amazon (or a specified URL) using Puppeteer and saves it to a MongoDB database.
- **View Data**: Displays the scraped parts (name, price, image, and link) in a React app.
- **Clear Data**: A button to clear all scraped data from the MongoDB database.
- **Fetch Data**: Displays the latest scraped data from the backend.

---

## API Endpoints

- **GET `/parts`**: Retrieve all the scraped PC parts stored in the MongoDB database.
- **GET `/scrape`**: Start the scraping process. Scrapes PC parts data from Amazon and saves them in the MongoDB database.
- **DELETE `/clear-parts`**: Clears all the scraped PC parts from the database.

---

## Usage

1. Click the **Start Scraping** button to begin scraping data from the specified Amazon URL.
2. View the list of scraped parts displayed on the screen, including their names, prices, and images.
3. Click the **Clear Scraped Parts** button to delete all the scraped parts from the database.

---

## Troubleshooting

- **MongoDB Connection Issues**:
  - Ensure MongoDB is running locally or use MongoDB Atlas.
  - Check the connection string in the backend code (`mongoose.connect('mongodb://localhost:27017/pcparts')`) and adjust if necessary.

- **Scraping Errors**:
  - If the scraping fails, ensure that the structure of the target page (Amazon in this case) hasn't changed, and adjust the scraping logic accordingly.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Puppeteer](https://pptr.dev/) for web scraping.
- [Cheerio](https://cheerio.js.org/) for parsing HTML.
- [MongoDB](https://www.mongodb.com/) for the database.
- [React](https://reactjs.org/) for the frontend.
