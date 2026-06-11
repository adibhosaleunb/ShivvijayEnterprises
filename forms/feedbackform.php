<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

function clean_text($value) {
    return trim(str_replace(array("\r", "\n"), ' ', (string) $value));
}

function escape_html($value) {
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function post_value($key) {
    return clean_text(isset($_POST[$key]) ? $_POST[$key] : '');
}

$organization = post_value('organization');
$name = post_value('name');
$comments = trim(isset($_POST['comments']) ? (string) $_POST['comments'] : '');

$ratings = array(
    'quality' => 'How satisfied are you with the quality of product?',
    'performance' => 'How satisfied are you with performance of our product?',
    'delivery' => 'How satisfied are you with the delivery of product?',
    'representative' => 'How satisfied are you with our Marketing/Sales representative?',
    'service' => 'How satisfied are you with our spare parts and service response?',
    'cost' => 'How much would you rate for cost worthiness of our product?',
    'customer' => 'How would you rate your overall customer experience?',
    'website' => 'How much would you like to rate our website?'
);

if ($organization === '' || $name === '') {
    http_response_code(400);
    exit('Invalid form submission');
}

$formcontent = '<h3>From: ' . escape_html($name) . '</h3>'
    . '<h4>Organization: ' . escape_html($organization) . '</h4><p>';

foreach ($ratings as $key => $question) {
    $value = post_value($key);
    if ($value !== '' && !preg_match('/^[1-5]$/', $value)) {
        http_response_code(400);
        exit('Invalid rating value');
    }

    $formcontent .= escape_html($question) . ' ' . escape_html($value) . '<br><br>';
}

$formcontent .= 'Suggestions for Improvement: ' . nl2br(escape_html($comments)) . '</p>';

$recipient = 'info@shivvijayenterprises.com';
$subject = 'Feedback Shivvijay Enterprises';
$mailheader = 'From: Shivvijay Feedback <' . $recipient . ">\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . 'X-Mailer: PHP/' . phpversion();

if (!mail($recipient, $subject, $formcontent, $mailheader)) {
    http_response_code(500);
    exit('Unable to send feedback');
}

header('Location: ../index.html');
exit;
