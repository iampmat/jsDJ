<?php
//ini_set('display_errors',1);
//error_reporting(E_ALL);
error_reporting(E_ERROR | E_PARSE);
$conn = new mysqli("13lobstersdj.13lobsters.com", "jsdj","djpwBB11","13lobstersdj");
if ($conn->connect_error) {
	echo "died";
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $conn->connect_error);
}
//$target_dir = "/JavaScriptDJ/mp3Files/ ";
//echo "current server directory is" . $_SERVER['DOCUMENT_ROOT'];
$target_dir = "http://13lobsters.com/dj/javascriptDJ/mp3Files/";
$server_target_dir = $_SERVER['DOCUMENT_ROOT'] . "/dj/javascriptDJ/mp3Files/";
//"http://wwwp.cs.unc.edu/Courses/comp426-f15/users/dlshaver/Codiad/workspace/cs426/DJProject/mp3Files/";
$target_file = $target_dir.basename($_FILES["fileToUpload"]["name"]);
$server_target_file = $server_target_dir.basename($_FILES["fileToUpload"]["name"]);
//echo $target_file;
$name = $_FILES["fileToUpload"]["name"];
$size = $_FILES["fileToUpload"]["size"];
if($name !=""){
pathinfo($target_file,"mp3");
// Check if image file is a actual image or fake image
         if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $server_target_file)) {
        //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
       // echo "Sorry, there was an error uploading your file.";
    }
$result = $conn->query("SELECT 'Title','Path' FROM song WHERE Path = '$target_file'");	
if($result->num_rows <=0){
$result = $conn->query("INSERT INTO song(Title,Path) VALUES ('$name','$target_file')");
}
}
$result = $conn->query("Select Title FROM song");
$rows = $result->num_rows;
if($rows>0){
	for($i = 0;$i<$rows;$i++){
	$array = $result->fetch_array();
  echo " <p id ='$array[0]' onclick='selected(this)'> $array[0] </p>";
	}
}

//$result = $conn->query("INSERT INTO song (Title,Path) VALUES '$name','$target_file'");



?>