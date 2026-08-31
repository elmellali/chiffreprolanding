<?php
// Simple Telemetry endpoint for ChiffrePro
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_file = __DIR__ . '/../../.telemetry.sqlite'; // stored securely outside public api dir if possible, but for simplicity at root of public_html
$dsn = "sqlite:$db_file";

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create table if not exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS activations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        machine_id TEXT NOT NULL,
        license_key TEXT NOT NULL,
        action TEXT DEFAULT 'activation',
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Read JSON payload
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (isset($data['machine_id']) && isset($data['license_key'])) {
        $stmt = $pdo->prepare("INSERT INTO activations (machine_id, license_key, action, ip_address) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['machine_id'],
            $data['license_key'],
            $data['action'] ?? 'activation',
            $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ]);
        echo json_encode(["status" => "success", "message" => "Telemetry logged"]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    }
} catch (Exception $e) {
    // Log error locally if needed, but return generic 500 to client
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Internal Server Error"]);
}
