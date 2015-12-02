<?php

//echo "deleting: " . $_DELETE['name'];
//echo "first argument: " . $argv[1];
//rmdir($_SERVER['DOCUMENT_ROOT'] . '/dj/youtubeDJ/temp');


//$q=$_POST["q"];
$conn = new mysqli("13lobstersdj.13lobsters.com", "jsdj","djpwBB11","13lobstersdj");
if ($conn->connect_error) {
	echo "died";
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $conn->connect_error);
}
	



//echo "filename is: " . $_POST['songName'] . "...";

$user = $_SERVER['REMOTE_ADDR'];
//echo "filename is: " . $_FILE['songName'] . "<br>";
$songName = $_POST['songName'];
$songName = trim($songName);

$file =  $_SERVER['DOCUMENT_ROOT'] . "/dj/javascriptDJ/mp3Files/".$songName;



//unlink($_SERVER['DOCUMENT_ROOT'] . "/path/to/file.txt");
//$file = "DAFT PUNK - AROUND THE WORLD ( LOIC PENILLO Summer Edit).mp3";
///home/yakkam/13lobsters.com/dj/youtubeDJ/uploads

//echo $_SERVER['DOCUMENT_ROOT'] . $file;
/*
echo "...path to daft punk";
$temp = $_SERVER['DOCUMENT_ROOT'] . "/dj/youtubeDJ/uploads/DAFT PUNK - AROUND THE WORLD ( LOIC PENILLO Summer Edit).mp3";
echo $temp;
echo "...end of path...";
*/
echo "Biz Markie - Just a Friend.mp3...";
echo $songName . "...";

$result = $conn->query("DELETE FROM song WHERE Title = '$songName'");


//if(ltrim($file,  " ")){
//	echo 'trimmed spaces';
//}
/*
if(chmod($file, 0777)){
	echo "changed permissions..";
}
echo "var dumped version of song is.. " . var_dump(realpath($file)) . "...";
*/
//NOT DELETING FOR SOME REASON, FILE NAME IS GOING THROUGH
if(!file_exists($file)){
	echo $file . "does not exist in the server";	
}
//else if(unlink($file) && file_exists($file)){
else if(file_exists($file) && unlink($file)){
	echo $file . "deleted successfully";	
}else{
	echo $file;
	echo " not deleted";
}

?>