<?php 
$organization= $_POST['organization'];
$name = $_POST['name'];
$quality = $_POST['quality'];
$performance = $_POST['performance'];
$delivery = $_POST['delivery'];
$representative = $_POST['representative'];
$service = $_POST['service'];
$cost = $_POST['cost'];
$customer = $_POST['customer'];
$website = $_POST['website'];
$suggestions = $_POST['comments'];

$subject = " Feedback Shivvijay Enterprises ";

 
$formcontent = "<h3>From: $name </h3> <h4>Organization: $organization </h4>  <p>How Satisfied are you with the quality of Product? $quality  <br><br> How satisfied are you with performance of our product? $performance  <br><br> How Satisfied are you with the delivery of product $delivery <br><br> How Satisfied are you with our Marketing/Sales representative? $representative  <br><br> How satisfied are you with our spare parts and service response? $service <br><br> How much would you rate for cost worthiness of our product? $cost <br><br> How would you rate your overall customer experience? $customer <br><br> How much would you like to rate our website? $website <br><br> Suggestions for Improvement:  $suggestions</p>";


$recipient = "info@shivvijayenterprises.com.test-google-a.com";
#$recipient = "adibhosale06@gmail.com";
$mailheader = "From: $email \r\n".
              'Content-type: text/html; charset=utf-8' . "\r\n" .
                  'X-Mailer: PHP/' . phpversion();
mail($recipient, $subject, $formcontent, $mailheader) or die("error");
//echo "$formcontent";

echo "<script> location.href='../index.html'; </script>";
?>