<?php
    require('method/pdo_handler.php');
    echo session_status();
    session_start();
    var_dump($_SESSION);
?>