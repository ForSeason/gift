<?php
    require_once('../method/user_handler.php');
    $user = new user_handler();
    $link = new pdo_handler();
    if ($user->status == 1) {
        if (isset($_POST['eid'])) {
            $table  = 'click';
            $params = array('eid');
            $values = array($_POST['eid']);
            return $link->insert($table, $params, $values);
        } else {
            echo 'go away!';
        }
    } else {
        echo 'login first!';
    }
?>