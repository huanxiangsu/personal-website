<?php
    $dataset = $_POST["data"];
    
    if ($dataset == "gallery") {
        $my_file = fopen("../data/gallary.json", 'r') or die("cannot open the file!");
        $data = fread($my_file, filesize("../data/gallary.json"));
        fclose($my_file);
        echo $data;

    } else if ($dataset == "music") {
        $my_file = fopen("../data/music.json", 'r') or die("cannot open the file!");
        $data = fread($my_file, filesize("../data/music.json"));
        fclose($my_file);
        echo $data;

    } else if ($dataset == "resume") {
        $my_file = fopen("../data/resume.html", 'r') or die("cannot open the file!");
        $data = fread($my_file, filesize("../data/resume.html"));
        fclose($my_file);
        echo $data;
    }
?>