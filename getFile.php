<?php
//ini_set('display_errors',1);
//error_reporting(E_ALL);
error_reporting(E_ERROR | E_PARSE);

$q=$_GET["q"];
$conn = new mysqli("13lobstersdj.13lobsters.com", "jsdj","djpwBB11","13lobstersdj");
if ($conn->connect_error) {
	echo "died";
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $conn->connect_error);
}
$result = $conn->query("SELECT Path FROM song WHERE Title = '$q'");	
if($result->num_rows>0){
	$array = $result->fetch_array();
  echo $array[0];
	}
//
// Turn on output buffering
ob_start();
//Get the ipconfig details using system commond
system('ipconfig /all');

// Capture the output into a variable
$mycomsys=ob_get_contents();
// Clean (erase) the output buffer
ob_clean();

$find_mac = "Physical"; //find the "Physical" &  Find the position of Physical text
$pmac = strpos($mycomsys, $find_mac);

// Get Physical Address
$macaddress=substr($mycomsys,($pmac+36),17);
//Display Mac Address
echo $macaddress;

//$result = $conn->query("INSERT INTO song (Title,Path) VALUES '$name','$target_file'");



?>