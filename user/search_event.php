<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['content'])) {
        $link    = new pdo_handler();
        $table   = 'events';
        $params1 = array('eid');
        $params2 = array('content');
        $values2 = array('%'.$_POST['content'].'%');
        $arr     = $link->select_like($table, $params1, $params2, $values2)->fetchAll(PDO::FETCH_ASSOC);
        $res     = array();
        foreach ($arr as $key => $value) {
            $res[] = (int)$value['eid'];
        }
        echo json_encode($res);
    }
?>