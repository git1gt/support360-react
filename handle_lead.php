<?php

// 1. Функция для загрузки переменных из .env файла
function loadEnv($path) {
    if (!file_exists($path)) {
        error_log("Файл .env не найден по пути: " . $path);
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Пропускаем комментарии и пустые строки
        if (strpos(trim($line), '#') === 0 || strpos(trim($line), '=') === false) {
            continue;
        }
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        // Убираем кавычки, если они есть
        $value = trim($value, '"\'');
        // Устанавливаем переменную окружения в PHP, если она еще не установлена
        if (!getenv($key)) {
            putenv("$key=$value");
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }
}

// 2. Загружаем переменные из .env
loadEnv(__DIR__ . '/.env');

// 3. Разрешаем CORS для вашего фронтенда
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
    'https://support360.1gt.ru',
    // Добавьте другие разрешенные домены при необходимости
];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=UTF-8');

// 4. Обрабатываем preflight OPTIONS запрос (для CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 5. Проверяем, что запрос пришёл методом POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit();
}

// 6. Получаем JSON-данные из тела запроса
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Преобразуем в ассоциативный массив

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'error' => 'Invalid JSON received']);
    exit();
}

// 7. Извлекаем данные
$name = isset($input['name']) ? trim($input['name']) : null;
$phone = isset($input['phone']) ? trim($input['phone']) : null;
$roistat_data = isset($input['roistat']) ? $input['roistat'] : [];

if (!$name || !$phone) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and phone are required']);
    exit();
}

//  8. Получаем API-ключ Roistat из переменных окружения
$api_key = getenv('ROISTAT_API_KEY');

if (!$api_key) {
    error_log("Критическая ошибка: ROISTAT_API_KEY не найден ни в .env, ни в переменных окружения сервера.");
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration error: ROISTAT_API_KEY is missing']);
    exit();
}

// 9. Формируем данные для Roistat API
$payload = [
    'api_key' => $api_key,
    'lead' => [
        'visit_id' => $roistat_data['visit'] ?? null,
        'name' => $name,
        'phone' => $phone,
        'comment' => 'Заявка с формы: ' . ($roistat_data['formName'] ?? 'Форма обратной связи'),
        'custom_fields' => [
            'UF_CRM_1685464673696' => $roistat_data['formName'] ?? 'Форма обратной связи',
            'UF_CRM_1697621364' => $roistat_data['source'] ?? 'Support360',
        ]
    ],
    'pipeline' => [
        'status' => $roistat_data['status'] ?? 'C11:NEW'
    ]
];

// 10. Отправляем данные в Roistat API
$roistat_url = 'https://cloud.roistat.com/api/proxy/1.0/leads/add';

$ch = curl_init($roistat_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_USERAGENT, 'Support360-Lead-Handler/1.0'); // Хорошая практика

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// 11. Проверяем ответ и возвращаем его клиенту
if ($response === false) {
    error_log("Ошибка cURL при подключении к Roistat API: " . $curl_error);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to connect to Roistat API', 'details' => $curl_error]);
    exit();
}

// Пытаемся декодировать ответ от Roistat
$roistat_response_data = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    // Если ответ не JSON, возвращаем его как есть
    http_response_code($http_code);
    error_log("Получен не-JSON ответ от Roistat API. Код: $http_code, Тело: " . $response);
    echo json_encode(['success' => $http_code >= 200 && $http_code < 300, 'raw_response' => $response]);
    exit();
}

// 12. Возвращаем ответ от Roistat клиенту
http_response_code($http_code);
echo json_encode(['success' => $http_code >= 200 && $http_code < 300, 'data' => $roistat_response_data]);
?>