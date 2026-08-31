<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$pwd_file = __DIR__ . '/../../.admin_pwd';
$db_file = __DIR__ . '/../../.telemetry.sqlite';

// Initialize default password if missing
if (!file_exists($pwd_file)) {
    $default = "ChiffreProAdmin2026!";
    file_put_contents($pwd_file, password_hash($default, PASSWORD_DEFAULT));
}

$stored_hash = trim(file_get_contents($pwd_file));

$headers = getallheaders();
$auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
$token = str_replace('Bearer ', '', $auth);

$action = $_GET['action'] ?? '';

// Auth verification endpoint
if ($action === 'verify_auth') {
    if (password_verify($token, $stored_hash)) {
        echo json_encode(["status" => "success", "message" => "Authenticated"]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
    exit();
}

// All other endpoints require authentication
if (!password_verify($token, $stored_hash)) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

// Database helper
function get_db_connection($db_file) {
    $dsn = "sqlite:$db_file";
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Ensure tables exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS activations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        machine_id TEXT NOT NULL,
        license_key TEXT NOT NULL,
        action TEXT DEFAULT 'activation',
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS generated_licenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        machine_id TEXT NOT NULL,
        license_key TEXT NOT NULL,
        plan TEXT NOT NULL,
        client_name TEXT,
        client_contact TEXT,
        notes TEXT,
        expires_at TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    return $pdo;
}

// Change Password
if ($action === 'change_password') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    $new_password = trim($data['new_password'] ?? '');
    
    if (empty($new_password) || strlen($new_password) < 6) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid new password. Minimum 6 characters required."]);
        exit();
    }
    
    file_put_contents($pwd_file, password_hash($new_password, PASSWORD_DEFAULT));
    echo json_encode(["status" => "success", "message" => "Password updated successfully"]);
    exit();
}

// Get Activations Telemetry
if ($action === 'activations') {
    try {
        $pdo = get_db_connection($db_file);
        $stmt = $pdo->query("SELECT * FROM activations ORDER BY created_at DESC LIMIT 2000");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Enrich data with decoded plans & expiration estimates
        $now = new DateTime();
        foreach ($results as &$row) {
            $key = $row['license_key'] ?? '';
            $row['plan_name'] = 'Unknown';
            $row['plan_id'] = '0';
            $row['expires_at'] = null;
            $row['is_expired'] = false;
            $row['days_left'] = null;

            if (strlen($key) === 9) {
                $plan = $key[0];
                $yymm = substr($key, 1, 4);
                $row['plan_id'] = $plan;

                if ($plan === '1') {
                    $row['plan_name'] = 'Standard (1 An)';
                } elseif ($plan === '2') {
                    $row['plan_name'] = 'Cloud Edition (1 An)';
                } elseif ($plan === '3') {
                    $row['plan_name'] = 'Lifetime (À vie)';
                } elseif ($plan === '4') {
                    $row['plan_name'] = 'Essai (15 Jours)';
                }

                if ($plan === '3') {
                    $row['expires_at'] = 'Permanent';
                } elseif ($plan === '4') {
                    // Trial 15 days from created_at
                    try {
                        $created = new DateTime($row['created_at']);
                        $exp = clone $created;
                        $exp->modify('+15 days');
                        $row['expires_at'] = $exp->format('Y-m-d H:i');
                        $diff = $now->diff($exp);
                        $days = (int)$diff->format("%r%a");
                        $row['days_left'] = $days;
                        $row['is_expired'] = ($now > $exp);
                    } catch (Exception $e) {}
                } elseif ($plan === '1' || $plan === '2') {
                    // Annual plan: expiration is 1st of next month of YYMM
                    try {
                        $year = 2000 + intval(substr($yymm, 0, 2));
                        $month = intval(substr($yymm, 2, 2));
                        $next_month = $month < 12 ? $month + 1 : 1;
                        $next_year = $month < 12 ? $year : $year + 1;
                        $exp = new DateTime(sprintf('%04d-%02d-01 00:00:00', $next_year, $next_month));
                        $row['expires_at'] = $exp->format('Y-m-d');
                        $diff = $now->diff($exp);
                        $days = (int)$diff->format("%r%a");
                        $row['days_left'] = $days;
                        $row['is_expired'] = ($now >= $exp);
                    } catch (Exception $e) {}
                }
            }
        }
        unset($row);

        echo json_encode(["status" => "success", "data" => $results]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit();
}

// Generate License Key & Save to Registry
if ($action === 'generate') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    $machine_id = trim($data['machine_id'] ?? '');
    $plan = trim($data['plan'] ?? '');
    $yymm = trim($data['yymm'] ?? '');
    
    $client_name = trim($data['client_name'] ?? '');
    $client_contact = trim($data['client_contact'] ?? '');
    $notes = trim($data['notes'] ?? '');
    
    if (empty($machine_id) || empty($plan) || empty($yymm)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Machine ID, Plan and Expiration are required."]);
        exit();
    }
    
    $salt = "OlafactTopSecret2026";
    $payload = "{$plan}{$yymm}";
    
    $raw_data = $payload . $machine_id . $salt;
    $crc = sprintf('%u', crc32($raw_data));
    $checksum = intval($crc) % 10000;
    
    $expected_checksum = str_pad($checksum, 4, '0', STR_PAD_LEFT);
    $serial_key = "{$payload}{$expected_checksum}";
    
    // Calculate readable expiration
    $expires_at = 'Permanent';
    if ($plan === '1' || $plan === '2') {
        $year = 2000 + intval(substr($yymm, 0, 2));
        $month = intval(substr($yymm, 2, 2));
        $expires_at = sprintf('%02d/%04d', $month, $year);
    } elseif ($plan === '4') {
        $expires_at = '15 Jours après activation';
    }

    // Save into generated_licenses registry
    try {
        $pdo = get_db_connection($db_file);
        $stmt = $pdo->prepare("INSERT INTO generated_licenses (machine_id, license_key, plan, client_name, client_contact, notes, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $machine_id,
            $serial_key,
            $plan,
            $client_name ?: null,
            $client_contact ?: null,
            $notes ?: null,
            $expires_at
        ]);
    } catch (Exception $e) {
        // Continue even if registry insert fails
    }
    
    echo json_encode([
        "status" => "success", 
        "license_key" => $serial_key,
        "machine_id" => $machine_id,
        "plan" => $plan,
        "expires_at" => $expires_at
    ]);
    exit();
}

// Get Generated Licenses History
if ($action === 'generated_history') {
    try {
        $pdo = get_db_connection($db_file);
        $stmt = $pdo->query("SELECT * FROM generated_licenses ORDER BY created_at DESC LIMIT 1000");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "data" => $results]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit();
}

// Key Decoder / Inspector Tool
if ($action === 'decode') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $key = trim($data['license_key'] ?? '');
    $machine_id = trim($data['machine_id'] ?? '');

    if (strlen($key) !== 9 || !ctype_digit($key)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Le format de la clé doit comporter exactement 9 chiffres."]);
        exit();
    }

    $plan = $key[0];
    $yymm = substr($key, 1, 4);
    $checksum_str = substr($key, 5, 4);

    $plan_names = [
        '1' => 'Standard (1 An)',
        '2' => 'Cloud Edition (1 An)',
        '3' => 'Lifetime (À vie)',
        '4' => 'Essai (15 Jours)'
    ];

    $plan_name = $plan_names[$plan] ?? 'Plan Inconnu';
    $is_lifetime = ($plan === '3');
    $is_trial = ($plan === '4');
    $expiry_formatted = 'À vie';

    if (!$is_lifetime && !$is_trial) {
        $year = 2000 + intval(substr($yymm, 0, 2));
        $month = intval(substr($yymm, 2, 2));
        $expiry_formatted = sprintf('%02d/%04d', $month, $year);
    } elseif ($is_trial) {
        $expiry_formatted = '15 jours après 1ère activation';
    }

    $match_machine = null;
    $calculated_checksum = null;

    if (!empty($machine_id)) {
        $salt = "OlafactTopSecret2026";
        $payload = "{$plan}{$yymm}";
        $raw_data = $payload . $machine_id . $salt;
        $crc = sprintf('%u', crc32($raw_data));
        $checksum = intval($crc) % 10000;
        $calculated_checksum = str_pad($checksum, 4, '0', STR_PAD_LEFT);
        $match_machine = ($calculated_checksum === $checksum_str);
    }

    echo json_encode([
        "status" => "success",
        "decoded" => [
            "license_key" => $key,
            "plan_id" => $plan,
            "plan_name" => $plan_name,
            "yymm" => $yymm,
            "checksum" => $checksum_str,
            "expiry_formatted" => $expiry_formatted,
            "is_lifetime" => $is_lifetime,
            "is_trial" => $is_trial,
            "machine_id_tested" => $machine_id ?: null,
            "calculated_checksum" => $calculated_checksum,
            "is_machine_match" => $match_machine
        ]
    ]);
    exit();
}

// System Diagnostics & Info
if ($action === 'system_info') {
    try {
        $pdo = get_db_connection($db_file);
        $act_count = $pdo->query("SELECT count(*) FROM activations")->fetchColumn();
        $gen_count = $pdo->query("SELECT count(*) FROM generated_licenses")->fetchColumn();
        $unique_machines = $pdo->query("SELECT count(DISTINCT machine_id) FROM activations")->fetchColumn();
        
        $db_size_bytes = file_exists($db_file) ? filesize($db_file) : 0;
        $db_size_kb = round($db_size_bytes / 1024, 2);

        echo json_encode([
            "status" => "success",
            "info" => [
                "php_version" => phpversion(),
                "server_software" => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
                "server_time" => date('Y-m-d H:i:s T'),
                "database_size" => "{$db_size_kb} KB",
                "total_activations" => (int)$act_count,
                "total_generated_licenses" => (int)$gen_count,
                "unique_machines" => (int)$unique_machines,
                "ip_address" => $_SERVER['SERVER_ADDR'] ?? $_SERVER['LOCAL_ADDR'] ?? 'Unknown'
            ]
        ]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit();
}

// Download SQLite Database Backup
if ($action === 'download_db') {
    if (file_exists($db_file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/x-sqlite3');
        header('Content-Disposition: attachment; filename="chiffrepro_telemetry_backup_' . date('Y-m-d_His') . '.sqlite"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($db_file));
        readfile($db_file);
        exit();
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Database file not found."]);
        exit();
    }
}

// Delete Record
if ($action === 'delete_activation') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $id = intval($data['id'] ?? 0);

    if ($id > 0) {
        $pdo = get_db_connection($db_file);
        $stmt = $pdo->prepare("DELETE FROM activations WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Record deleted"]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid ID"]);
    }
    exit();
}

http_response_code(404);
echo json_encode(["status" => "error", "message" => "Action not found"]);
