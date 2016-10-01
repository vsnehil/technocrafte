<?php
$data = json_decode(file_get_contents('php://input'));
$roll=$data->roll;
$email=$data->email;
$year=$data->year;
$name=$data->name;
$branch=$data->branch;
echo "roll : ".$roll;
echo "email : ".$email;
echo "name : ".$name;
echo "year : ".$year;
echo "branch : ".$branch;
$link = mysqli_connect('server4.hostinger.in','u807085179_admin','e29hfVIB/!','u807085179_tech'); 
if (!$link) { 
	die('Could not connect to MySQL: ' . mysql_error()); 
} 
echo 'Connection OK'; 
echo $roll;
$sql="INSERT INTO student_detail (name,rollno,year,branch,email)  VALUES('$name','$roll','$year','$branch','$email')";
if(mysqli_query($link, $sql))
	{echo "record inserted";}
else
	{echo "fail";}
if (!$link) { 
	die('Could not connect to MySQL: ' . mysql_error()); 
} 
echo 'Connection OK'; 
mysqli_close($link); 
?>