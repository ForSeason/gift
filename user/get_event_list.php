<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['start']) and isset($_POST['step'])) {
        $link  = new pdo_handler();
        $start = (int)$_POST['start'];
        $step  = (int)$_POST['step'];
        $table = 'events';
        $tpl   = 'ORDER BY eid DESC LIMIT %s, %s';
        $limit = sprintf($tpl, (string)$start, (string)$step);
        $arr   = $link->select_sp($table, array('eid'), $limit)->fetchAll(PDO::FETCH_ASSOC);
        $res   = array();
        foreach ($arr as $key => $value) {
            $res[] = (int)$value['eid'];
        }
        echo json_encode($res);
    }
?>