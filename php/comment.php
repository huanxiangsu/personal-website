<?php
    $name = $_POST["comment-name"];
    $email = $_POST["comment-email"];
    $comment = $_POST['comment-area'];

    if (empty($name) || empty($email)) {
        echo "Failed! Name and Email are Required!";
    } else {
        $file = fopen("../data/commentInfo.txt", 'a') or die("Cannot open the file!");
        fwrite($file, "Name: $name  -- Email: $email\n");
        fwrite($file, "Comment: $comment\n\n");
        fclose($file);
        echo "Sent Successfully!";
    }
?>