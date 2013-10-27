<?php
// Here we get all the information from the fields sent over by the form.
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
 
$to = 'michael@gyarmathy.me';
$subject = 'Freelance Inquiry from '.$name;
$message = 'FROM: ' . $name . "\r\n" . 'Email: ' . $email . "\r\n\r\n" . $message;
$headers = 'From: ' . $email . "\r\n";
 
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Thanks for your message! I will get back to you shortly!";
    mail($to, $subject, $message, $headers);
}
else {
    echo "Invalid Email, please provide an correct email.";
}
?>