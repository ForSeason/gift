<?php
    require_once('../method/pdo_handler.php');
    if (isset($_POST['id'])) {
        $link = new pdo_handler();
        $table  = 'user';
        $params = array('id');
        $values = array($_POST['id']);
        $stmt   = $link->select($table, null, $params, $values);
        $user   = $stmt->fetch(PDO::FETCH_ASSOC);
        $info   = array();
        $info['id']        = $user['id'];
        $info['nickname']  = $user['nickname'];
        $info['sex']       = $user['sex'];
        $info['headPic']   = $user['headPic'];
        $info['address']   = $user['address'];
        $info['phone']     = $user['phone'];
        $info['selfIntro'] = $user['selfIntro'];
        echo json_encode($info);
    } else {
        echo 'go away!';
    }
?>