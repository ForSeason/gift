<?php
    require_once('../method/user_handler.php');
    require_once('../method/chat_handler.php');
    if (isset($_POST['content']) and isset($_POST['phone']) and isset($_POST['adress'])) {
        $user = new user_handler();
        if ($user->status == 1) {
            $room       = new chat_handler($user);
            $rid        = $room->new_room(1, 'event', array());
            $link       = new pdo_handler();
            $id         = $user->info['id'];
            $content    = $_POST['content'];
            $phone      = $_POST['phone'];
            $adress     = $_POST['adress'];
            $type       = 2;
            $createTime = time();
            $table      = 'events';
            $params     = array('id', 'content', 'phone', 'adress', 'type', 'rid', 'createTime');
            $values     = array($id, $content, $phone, $adress, $type, $rid, $createTime);
            $link->insert($table, $params, $values);
            $eid        = $link->lastInsertId('eid');
            if ($_FILES != array()) foreach ($_FILES as $file) if ($file['error'] == 0 and ($file['type'] == 'image/jpeg' or $file['type'] == 'image/png')) {
                $fileT    = $file['tmp_name'];
                $filename = md5((string)time());
                $filename.= ($file['type'] == 'image/jpeg')?'.jpg':'.png';
                move_uploaded_file($fileT,'../pic/'.$filename);
                $table  = 'pics';
                $params = array('eid', 'url');
                $values = array($eid, 'scut18pie1.top/test/gift/pic/'.$filename);
                $status = $link->insert($table, $params, $values);
            }
            echo $eid;
        } else {
            echo 'login first!';
        }
    } else {
        echo 'go away!';
    }
?>