<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['title']) and isset($_POST['participants'])) {
        $user = new user_handler();
        if ($user->status == 1) {
            $room = new chat_handler($user);
            echo $room->new_room(0, $_POST['title'], isset($_POST['participants'])); //返回rid
        } else {
            echo 'login first!';
        }
    } else {
        echo 'go away!';
    }
?>