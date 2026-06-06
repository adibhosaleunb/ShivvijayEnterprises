<?php 
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
if(isset($_POST['message'])){
    $message = $_POST['message'];
    //echo htmlspecialchars($_POST['message']);
 }
 
$formcontent="<h3>From: $name </h3> <h4>E-mail: $email </h4>  <p> Message: $message </p>";
$recipient = "career@shivvijayenterprises.com.test-google-a.com";
#$recipient = "adibhosale06@gmail.com";
$mailheader = "From: $email \r\n".
              'Content-type: text/html; charset=utf-8' . "\r\n" .
                  'X-Mailer: PHP/' . phpversion();
mail($recipient, $subject, $formcontent, $mailheader) or die("error");
//echo "$formcontent";

echo "<script> location.href='../index.html'; </script>";
?>