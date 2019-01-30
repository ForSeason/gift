<?php
    require_once('../method/pdo_handler.php');
    if (isset($_POST['title']) and isset($_POST['content'])) {
        session_start();
        if (isset($_SESSION['id'])) {
            $link    = new pdo_handler();
            $id      = $_SESSION['id'];
            $title   = $_POST['title'];
            $content = $_POST['content'];
            $table   = 'losts';
            $params  = array('id', 'title', 'content');
            $values  = array($id, $title, $content);
            echo $link->insert($table, $params, $values);
        } else {
            echo 0;
        }
    } else {
        echo 'go away!';
    }
?>