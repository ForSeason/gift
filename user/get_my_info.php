<?php
    require_once('../method/user_handler.php');
    $user = new user_handler();
    $status = $user->status;
    if ($status == 1) {
        $info = array();
        $info['uid']       = $user->info['uid'];
        $info['id']        = $user->info['id'];
        $info['nickname']  = $user->info['nickname'];
        $info['sex']       = $user->info['sex'];
        $info['headPic']   = $user->info['headPic'];
        $info['adress']    = $user->info['adress'];
        $info['phone']     = $user->info['phone'];
        $info['selfIntro'] = $user->info['selfIntro'];
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