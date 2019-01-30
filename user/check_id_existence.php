<?php
    require_once('../method/pdo_handler.php');
    if (isset($_POST['id'])) {
        $table = 'user';
        $params = array('id');
        $values = array($_POST['id']);
        $link = new pdo_handler();
        echo $link->select($table, null, $params, $values)->rowCount();
    } else {
        echo 'go away!';
    }
?>