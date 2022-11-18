<?php


if (!file_exists('uploads')) {
	mkdir('uploads', 0777, true);
}

$uploadfile = $_FILES["upload_file"]["tmp_name"];
$folder = "uploads/";
move_uploaded_file($_FILES["upload_file"]["tmp_name"], $folder . $_FILES["upload_file"]["name"]);

$full_file_path = dirname(__FILE__) . "/" . $folder . $_FILES["upload_file"]["name"];
$output_folder = $full_file_path . "_converted";

$myfile = fopen("upload_file_log.txt", "w") or die("Unable to open file!");
fwrite($myfile, "full_file_path = " . $full_file_path);
fwrite($myfile, "output_folder = " . $output_folder);


// shell_exec("./converter.sh " . $full_file_path . " " . $output_folder);
// shell_exec("./inference.sh " . $full_file_path . " " . $output_folder);

// shell_exec("./convert_and_inference.sh " . $full_file_path . " " . $output_folder);

// echo '<h1>Upload successful<h1>';

exit();
?>