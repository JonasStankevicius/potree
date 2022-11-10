<?php


if (!file_exists('uploads')) {
	mkdir('uploads', 0777, true);
}

$uploadfile = $_FILES["upload_file"]["tmp_name"];
$folder = "uploads/";
move_uploaded_file($_FILES["upload_file"]["tmp_name"], $folder . $_FILES["upload_file"]["name"]);

// echo '<img src="' . $folder . "" . $_FILES["upload_file"]["name"] . '">';
shell_exec("./script.sh " . $folder . $_FILES["upload_file"]["name"]);

// echo '<h1>Upload successful<h1>';

exit();
?>