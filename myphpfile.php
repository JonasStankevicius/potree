<?php
$filename = 'uploads/processing.log'; //about 500MB

if(!file_exists($filename)){
	echo "processing.log not found";
}

$output = shell_exec('exec tail -n1 ' . $filename); //only print last 50 lines
// echo str_replace(PHP_EOL, '<br />', $output); //add newlines
echo $output; //add newlines
?>