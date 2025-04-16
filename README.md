# bookstore-app
 A bookstore project

 

# 📚 PURR-Book Web App

A simple web application to search for books using an external API. Built with a modern **frontend (HTML/CSS/JavaScript)** and a **PHP backend** to handle API communication.

## 🚀 Features

- 🔍 Search for books by title, author, or keyword  
- 📖 View detailed book information (title, author, year, etc.)  
- 🎨 Clean and responsive design  
- 🌐 Uses PHP backend to securely fetch data from an external API  

## 🛠️ Tech Stack

### Frontend:
- HTML5
- CSS3
- JavaScript (ES6)

### Backend:
- PHP 7+
- External Book API (e.g., Open Library API or Google Books API)

## 📂 Project Structure

```
/project-root
│
├── index.html           # Main frontend UI
├── style.css            # Styling for the UI
├── script.js            # JavaScript for dynamic behavior
├── backend.php          # PHP backend for API requests
└── README.md            # You're here!
```

## ⚙️ How It Works

1. The user enters a search term in the search bar.
2. The frontend JavaScript sends the search term to the PHP backend via a fetch/AJAX call.
3. The PHP backend queries an external book API.
4. The results are returned and dynamically displayed on the frontend.

## 🚀 Features
- Book search with title/author
- Displays book covers, titles, authors, and publish years
- PHP backend handles secure API requests

## 📸 Preview

*(Insert a screenshot here if you have one)*

## 📌 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/leyvinit/bookstore-app
   ```

2. Make sure your server supports PHP (e.g., use XAMPP, MAMP, or deploy to a PHP-compatible host).

3. Place the files in your `htdocs` (XAMPP) or relevant directory.

4. Open `index.html` in your browser and start searching!


## 🧪 Demo
Since PHP cannot be run on GitHub Pages, here's how to test locally:

1. Install [XAMPP](https://www.apachefriends.org/index.html)
2. Clone this repository
3. Move it to the `htdocs/` folder (inside your XAMPP installation)
4. Start Apache via XAMPP Control Panel
5. Open your browser and go to:

## 📃 License

This project is open-source and free to use under the [MIT License](LICENSE).


