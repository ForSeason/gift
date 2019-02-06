<?php
    require_once('../method/user_handler.php');
    $user = new user_handler();
    $link = new pdo_handler();
    if ($user->status == 1) {
        if (isset($_POST['eid'])) {
            $table  = 'goods';
            $params = array('id', 'eid');
            $values = array($user->info['id'], $_POST['eid']);
            echo $link->select($table, null, $params, $values)->rowcount();
        } else {
            echo 'go away!';
        }
    } else {
        echo 'login first!';
    }
?>