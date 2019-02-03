<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['rid'])) {
        $user = new user_handler();
        if ($user->status == 1) {
            $rid     = $_POST['rid'];
            $room    = new chat_handler($user, $rid);
            echo $room->pull();
        } else {
            echo 'login first!';
        }
    } else {
        echo 'go away!';
    }
?>