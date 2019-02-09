<?php
    require('../method/user_handler.php');
    $params = array('address', 'phone', 'selfIntro', 'sex', 'nickname');
    $user = new user_handler();
    if (isset($_POST['params']) and isset($_POST['values'])) {
        if (array_diff($_POST['params'], $params) == array() and $_POST['params'] != array()) {
            echo $user->update_my_info($_POST['params'], $_POST['values']);
        } else {
            echo 'go away!';
        }
    } else {
        echo 'go away!';
    }
?>