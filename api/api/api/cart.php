<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Allow cross-origin requests (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// In a real application, we would store cart information in a database
// For this demo, we'll simulate cart operations

// Check if the user is authenticated (has a token)
function isAuthenticated() {
    $headers = getallheaders();
    return isset($headers['Authorization']) && !empty($headers['Authorization']);
}

// GET request to fetch the cart
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isAuthenticated()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
    
    // In a real application, we would fetch the cart from the database
    // For this demo, we'll return an empty cart
    echo json_encode([
        'success' => true,
        'cart' => []
    ]);
}

// POST request to add an item to the cart
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // For demo purposes, we'll allow adding to cart without authentication
    
    // Get the request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Check if the request is valid
    if (!$data || !isset($data['bookId'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        exit();
    }
    
    $bookId = $data['bookId'];
    $quantity = isset($data['quantity']) ? (int) $data['quantity'] : 1;
    
    // In a real application, we would store this in a database
    // For this demo, we'll simulate a successful addition
    echo json_encode([
        'success' => true,
        'message' => 'Item added to cart'
    ]);
}

// PUT request to update an item in the cart
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (!isAuthenticated()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
    
    // Get the request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Check if the request is valid
    if (!$data || !isset($data['bookId']) || !isset($data['quantity'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        exit();
    }
    
    $bookId = $data['bookId'];
    $quantity = (int) $data['quantity'];
    
    // In a real application, we would update this in a database
    // For this demo, we'll simulate a successful update
    echo json_encode([
        'success' => true,
        'message' => 'Cart updated'
    ]);
}

// DELETE request to remove an item from the cart
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!isAuthenticated()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
    
    // Check if the book ID is provided in the URL
    if (!isset($_GET['bookId'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Book ID is required']);
        exit();
    }
    
    $bookId = (int) $_GET['bookId'];
    
    // In a real application, we would remove this from a database
    // For this demo, we'll simulate a successful removal
    echo json_encode([
        'success' => true,
        'message' => 'Item removed from cart'
    ]);
}

else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>