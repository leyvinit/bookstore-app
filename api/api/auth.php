<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Allow cross-origin requests (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection would go here in a real application
// For this demo, we'll simulate user authentication

// Check request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Check if the request is valid
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        exit();
    }
    
    // Determine the action (login or signup)
    $action = isset($data['action']) ? $data['action'] : '';
    
    if ($action === 'login') {
        // Handle login
        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password are required']);
            exit();
        }
        
        $email = $data['email'];
        $password = $data['password'];
        
        // In a real application, you would validate against a database
        // For this demo, we'll simulate a successful login if the email contains "@"
        if (strpos($email, '@') !== false) {
            // Generate a fake user token
            $token = bin2hex(random_bytes(16));
            $name = explode('@', $email)[0];
            
            echo json_encode([
                'success' => true,
                'user' => [
                    'email' => $email,
                    'name' => ucfirst($name),
                    'token' => $token
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid email or password']);
        }
    } 
    else if ($action === 'signup') {
        // Handle signup
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and password are required']);
            exit();
        }
        
        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        
        // In a real application, you would store this in a database
        // For this demo, we'll simulate a successful registration
        
        // Check if email is valid
        if (strpos($email, '@') === false) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address']);
            exit();
        }
        
        // Generate a fake user token
        $token = bin2hex(random_bytes(16));
        
        echo json_encode([
            'success' => true,
            'user' => [
                'email' => $email,
                'name' => $name,
                'token' => $token
            ]
        ]);
    }
    else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>