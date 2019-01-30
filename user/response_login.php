<?php
    require_once('../method/user_handler.php');
    if (isset($_POST['id']) and isset($_POST['password'])) {
        $user = new user_handler;
        echo $user->login($_POST['id'], $_POST['password']);
    } else {
        echo 'go away!';
    }
?>