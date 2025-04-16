<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Allow cross-origin requests (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Simulate database data for books
$books = [
    [
        'id' => 1,
        'title' => 'The Silent Whispers',
        'author' => 'Amelia Walker',
        'price' => 24.99,
        'image' => 'images/book1.jpg',
        'rating' => 4.5,
        'category' => 'Fiction',
        'featured' => true,
        'bestseller' => true,
        'newRelease' => false,
        'description' => 'A captivating tale of mystery and intrigue set in a small coastal town.'
    ],
    [
        'id' => 2,
        'title' => 'Beyond the Horizon',
        'author' => 'Benjamin Reynolds',
        'price' => 19.99,
        'image' => 'images/book2.jpg',
        'rating' => 4.2,
        'category' => 'Sci-Fi',
        'featured' => true,
        'bestseller' => false,
        'newRelease' => true,
        'description' => 'An epic science fiction adventure across multiple galaxies.'
    ],
    [
        'id' => 3,
        'title' => 'Midnight Gardens',
        'author' => 'Sophia Chen',
        'price' => 22.50,
        'image' => 'images/book3.jpg',
        'rating' => 4.7,
        'category' => 'Fantasy',
        'featured' => false,
        'bestseller' => true,
        'newRelease' => false,
        'description' => 'A magical journey through enchanted gardens that only appear at midnight.'
    ],
    [
        'id' => 4,
        'title' => 'The Last Detective',
        'author' => 'Marcus Johnson',
        'price' => 18.99,
        'image' => 'images/book4.jpg',
        'rating' => 4.3,
        'category' => 'Mystery',
        'featured' => true,
        'bestseller' => true,
        'newRelease' => false,
        'description' => 'A gripping detective story with twists at every turn.'
    ],
    [
        'id' => 5,
        'title' => 'Whispers of the Heart',
        'author' => 'Elena Rodriguez',
        'price' => 15.99,
        'image' => 'images/book5.jpg',
        'rating' => 4.0,
        'category' => 'Romance',
        'featured' => false,
        'bestseller' => false,
        'newRelease' => true,
        'description' => 'A touching romance that spans decades of separation and reunion.'
    ],
    [
        'id' => 6,
        'title' => 'The Quantum Paradox',
        'author' => 'David Kim',
        'price' => 28.99,
        'image' => 'images/book6.jpg',
        'rating' => 4.6,
        'category' => 'Non-Fiction',
        'featured' => true,
        'bestseller' => false,
        'newRelease' => true,
        'description' => 'An exploration of quantum physics for the curious mind.'
    ],
    [
        'id' => 7,
        'title' => 'Desert Storms',
        'author' => 'Aisha Patel',
        'price' => 21.50,
        'image' => 'images/book7.jpg',
        'rating' => 4.4,
        'category' => 'Fiction',
        'featured' => false,
        'bestseller' => true,
        'newRelease' => false,
        'description' => 'A powerful story of survival and resilience in the harshest desert.'
    ],
    [
        'id' => 8,
        'title' => 'Culinary Journeys',
        'author' => 'Jean-Pierre Dubois',
        'price' => 32.00,
        'image' => 'images/book8.jpg',
        'rating' => 4.8,
        'category' => 'Non-Fiction',
        'featured' => true,
        'bestseller' => true,
        'newRelease' => true,
        'description' => 'A culinary tour around the world with recipes and stories.'
    ],
    [
        'id' => 9,
        'title' => 'The Forgotten Path',
        'author' => 'Isabella Martinez',
        'price' => 17.99,
        'image' => 'images/book9.jpg',
        'rating' => 4.1,
        'category' => 'Fantasy',
        'featured' => false,
        'bestseller' => false,
        'newRelease' => true,
        'description' => 'A young hero discovers a hidden path to a magical realm.'
    ],
    [
        'id' => 10,
        'title' => 'Corporate Strategies',
        'author' => 'Robert Thompson',
        'price' => 45.00,
        'image' => 'images/book10.jpg',
        'rating' => 4.3,
        'category' => 'Non-Fiction',
        'featured' => false,
        'bestseller' => true,
        'newRelease' => false,
        'description' => 'Essential strategies for modern business leaders.'
    ]
];

// Check if a specific book ID was requested
if (isset($_GET['id'])) {
    $bookId = (int) $_GET['id'];
    $book = null;
    
    // Find the book with the matching ID
    foreach ($books as $b) {
        if ($b['id'] === $bookId) {
            $book = $b;
            break;
        }
    }
    
    if ($book) {
        echo json_encode($book);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Book not found']);
    }
} 
// Check if a search query was provided
else if (isset($_GET['search'])) {
    $search = strtolower($_GET['search']);
    $results = [];
    
    // Filter books based on search term
    foreach ($books as $book) {
        if (
            strpos(strtolower($book['title']), $search) !== false ||
            strpos(strtolower($book['author']), $search) !== false ||
            strpos(strtolower($book['category']), $search) !== false ||
            strpos(strtolower($book['description']), $search) !== false
        ) {
            $results[] = $book;
        }
    }
    
    echo json_encode($results);
}
// Check if filtering by category
else if (isset($_GET['category'])) {
    $category = $_GET['category'];
    $filteredBooks = [];
    
    foreach ($books as $book) {
        if (strtolower($book['category']) === strtolower($category)) {
            $filteredBooks[] = $book;
        }
    }
    
    echo json_encode($filteredBooks);
}
// Return all books if no specific query
else {
    echo json_encode($books);
}
?>