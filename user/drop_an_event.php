<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['eid']) and isset($_POST['rid'])) {
        $user = new user_handler();
        if ($user->status == 1) {
            $eid    = $_POST['eid'];
            $rid    = $_POST['rid'];
            $link   = new pdo_handler();
            $table  = 'events';
            $params = array('eid', 'rid', 'id');
            $values = array($eid, $rid, $user->id);
            $status = $link->select($table, null, $params, $values)->rowCount();
            if ($status != 0) {
                $link->delete($table, $params, $values);
                $room = new chat_handler($user, $rid);
                $room->drop_room();
                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo 'login first!';
        }
    } else {
        echo 'go away!';
    }
?>