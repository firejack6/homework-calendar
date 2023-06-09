<?php
$data = file_get_contents('php://input');
$pretty = json_encode(json_decode($data), JSON_PRETTY_PRINT);
file_put_contents("assignmentsPHP.json", $pretty);
//$check = file_get_contents("assignmentsPHP.json");
//echo $data, $check
echo "Request Sent";

?>
