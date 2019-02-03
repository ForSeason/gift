<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['content']) and isset($_POST['rid'])) {
        $user = new user_handler();
        if ($user->status == 1) {
            $user    = new user_handler();
            $rid     = $_POST['rid'];
            $content = $_POST['content'];
            $room    = new chat_handler($user, $rid);
            echo $room->push($content);
        } else {
            echo 'login first!';
        }
    } else {
        echo 'go away!';
    }
?>