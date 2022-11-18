<?php

$myfile = fopen('uploads/processing.log', "w") or die("Unable to open file!");
fclose($myfile);

$folder = "uploads/";
$full_file_path = dirname(__FILE__) . "/" . $folder . $_POST["file_name"];
$output_folder = $full_file_path . "_converted";


$myfile = fopen("convert_file_log.txt", "w") or die("Unable to open file!");
fwrite($myfile, "full_file_path = " . $full_file_path . "\n");
fwrite($myfile, "output_folder = " . $output_folder . "\n");


// shell_exec("./converter.sh " . $full_file_path . " " . $output_folder);
// shell_exec("./inference.sh " . $full_file_path . " " . $output_folder);

$command = "./convert_and_inference.sh " . $full_file_path . " " . $output_folder;
shell_exec($command . ' > /dev/null &');

// sleep(10); // sleep for 20 seconds

// exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $command, $outputfile, $pidfile));
// exec(sprintf($command));

fwrite($myfile, "convert_and_inference.sh exited");

exit();
?>