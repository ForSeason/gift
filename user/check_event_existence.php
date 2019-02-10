<?php
    require_once('../method/pdo_handler.php');
    if (isset($_POST['id'])) {
        $table  = 'events';
        $params = array('eid');
        $values = array($_POST['eid']);
        $link   = new pdo_handler();
        echo $link->select($table, null, $params, $values)->rowCount();
    } else {
        echo 'go away!';
    }
?>