<?php
    require_once('../method/user_handler.php');
    if (isset($_POST['id']) and isset($_POST['password']) and isset($_POST['nickname']) and isset($_POST['sex']) and isset($_POST['adress']) and isset($_POST['phone'])) {
        $user = new user_handler;
        echo $user->register($_POST['id'], $_POST['nickname'], $_POST['password'], $_POST['sex'], $_POST['adress'], $_POST['phone']);
    } else {
        echo 'go away!';
    }
?>