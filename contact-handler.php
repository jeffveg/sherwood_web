<?php
// Reject anything that's not a POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

// Honeypot — bots fill this, humans don't
if (!empty($_POST['_gotcha'])) {
    header('Location: contact.html?sent=1');
    exit;
}

// Time-based check — reject submissions faster than 3 seconds (bots)
$ts = isset($_POST['_ts']) ? (int)$_POST['_ts'] : 0;
if ($ts === 0 || (time() * 1000 - $ts) < 3000) {
    header('Location: contact.html?sent=1');
    exit;
}

// Sanitize helpers
function clean($val) {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}
function clean_header($val) {
    // Strip newlines to prevent header injection
    return preg_replace('/[\r\n]/', '', trim($val));
}

$to      = 'info@sherwoodadventure.com';
$name    = clean($_POST['name']    ?? '');
$email   = clean_header($_POST['email']   ?? '');
$phone   = clean($_POST['phone']   ?? '');
$date    = clean($_POST['event-date']  ?? '');
$type    = clean($_POST['event-type']  ?? '');
$message = clean($_POST['message'] ?? '');

// Basic required field check
if (empty($name) || empty($email) || empty($message)) {
    header('Location: contact.html?error=1');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: contact.html?error=1');
    exit;
}

$subject = 'New contact from SherwoodAdventure.com';

$body  = "Name:        $name\n";
$body .= "Email:       $email\n";
$body .= "Phone:       " . ($phone ?: '—') . "\n";
$body .= "Event Date:  " . ($date  ?: '—') . "\n";
$body .= "Event Type:  " . ($type  ?: '—') . "\n";
$body .= "\nMessage:\n$message\n";

$headers  = "From: carrier.pigeon@sherwoodadventure.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

mail($to, $subject, $body, $headers);

header('Location: contact.html?sent=1');
exit;
