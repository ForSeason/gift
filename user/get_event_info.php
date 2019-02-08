<?php
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
        // if ($res['type'] == 0) {
        //     $members = array()
        //     $table   = 'members';
        //     $params  = array('rid');
        //     $values  = array($res['rid']);
        //     $arr     = $link->select($table, null, $params, $values)->fetchAll(PDO::FETCH_ASSOC);
        //     foreach ($arr as $member) $members[] = $member['id'];
        //     $res['members'] = $members;
        // }
        echo json_encode($res);
    }
?>