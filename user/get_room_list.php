<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    $user = new user_handler();
    if ($user->status == 1) {
        $link   = new pdo_handler();
        $table  = 'members';
        $params = array('id');
        $values = array($user->info['id']);
        $arr    = $link->select($table, null, $params, $values)->fetchAll(PDO::FETCH_ASSOC);
        $res    = array();
        foreach ($arr as $room) {
            $res[] = (int)$room['rid'];
        }
        echo json_encode($res);
    }
?>