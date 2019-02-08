<?php
    require('../method/user_handler.php');
    $user = new user_handler();
    echo $user->upload_pic();
?>