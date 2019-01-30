<?php
    require_once('../method/user_handler.php');
    $user = new user_handler();
    $status = $user->status;
    if ($status == 1) {
        $info = array();
        $info['uid']       = $user->uid;
        $info['id']        = $user->id;
        $info['nickname']  = $user->nickname;
        $info['sex']       = $user->sex;
        $info['headPic']   = $user->headPic;
        $info['adress']    = $user->adress;
        $info['phone']     = $user->phone;
        $info['selfIntro'] = $user->selfIntro;
        $res = array();
        $res['status'] = $status;
        $res['info']   = $info;
        echo json_encode($res);
    } else {
        $res = array();
        $res['status'] = 0;
        echo json_encode($res);
    }
?>