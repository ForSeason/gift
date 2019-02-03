<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['eid'])) {
        $link    = new pdo_handler();
        $table   = 'events';
        $params  = array('eid');
        $values  = array((int)$_POST['eid']);
        $res     = $link->select($table, null, $params, $values)->fetch(PDO::FETCH_ASSOC);
        $table   = 'goods';
        $goods   = $link->select($table, null, $params, $values)->rowCount();
        $table   = 'clicks';
        $clicks  = $link->select($table, null, $params, $values)->rowCount();
        $res['goods']  = $goods;
        $res['clicks'] = $clicks;
        echo json_encode($res);
    }
?>