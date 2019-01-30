<?php
    require_once('../method/user_handler.php');
    if (isset($_POST['id']) and isset($_POST['password']) and isset($_POST['nickname'])) {
        $user = new user_handler;
        echo $user->register($_POST['id'], $_POST['nickname'], $_POST['password']);
    } else {
        echo 'go away!';
    }
?>