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

$name = clean_text(isset($_POST['name']) ? $_POST['name'] : '');
$email = clean_text(isset($_POST['email']) ? $_POST['email'] : '');
$subject = clean_text(isset($_POST['subject']) ? $_POST['subject'] : '');
$message = trim(isset($_POST['message']) ? (string) $_POST['message'] : '');

if ($name === '' || $subject === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Invalid form submission');
}

$formcontent = '<h3>From: ' . escape_html($name) . '</h3>'
    . '<h4>E-mail: ' . escape_html($email) . '</h4>'
    . '<p>Message: ' . nl2br(escape_html($message)) . '</p>';

$recipient = 'career@shivvijayenterprises.com';
$mailheader = 'From: Shivvijay Careers <' . $recipient . ">\r\n"
    . 'Reply-To: ' . $email . "\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . 'X-Mailer: PHP/' . phpversion();

if (!mail($recipient, $subject, $formcontent, $mailheader)) {
    http_response_code(500);
    exit('Unable to send message');
}

header('Location: ../index.html');
exit;
