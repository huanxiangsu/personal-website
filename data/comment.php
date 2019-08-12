<?php
    $name = $_POST["comment-name"];
    $email = $_POST["comment-email"];
    $comment = $_POST['comment-area'];

    if (empty($name) || empty($email) || empty($comment)) {
        echo "Failed! Some fields are Empty!";
    } else {
        $file = fopen("commentInfo.txt", 'a') or die("Cannot open the file!");
        fwrite($file, "Name: $name  -- Email: $email\n");
        fwrite($file, "Comment: $comment\n\n");
        fclose($file);
        echo "Comment Sent Successfully!";
    }
?>