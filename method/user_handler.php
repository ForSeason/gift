<?php
    require_once('pdo_handler.php');

    class user_handler{
        
        public $status    = null;   //login status
        public $uid       = null;
        public $id        = null;
        public $nickname  = null;
        public $headPic   = null;
        public $adress    = null;
        public $phone     = null;
        public $selfIntro = null;
        public $link      = null;

        public function __construct(){
            if (session_status() == 1) session_start();
            if (isset($_SESSION['uid'])) {
                $this->uid       = $_SESSION['uid'];
                $this->id        = $_SESSION['id'];
                $this->nickname  = $_SESSION['nickname'];
                $this->sex       = $_SESSION['sex'];
                $this->headPic   = $_SESSION['headPic'];
                $this->adress    = $_SESSION['adress'];
                $this->phone     = $_SESSION['phone'];
                $this->selfIntro = $_SESSION['selfIntro'];
                $this->status    = 1;
            } else {
                $this->status   = 0;
            }
            $this->link = new pdo_handler();
        }

        public function register($id, $nickname, $password, $sex, $adress, $phone){
            $table  = 'user';
            $params = array('id', 'nickname', 'password', 'sex', 'adress', 'phone');
            $values = array($id, $nickname, md5($password), (int)$sex, $adress, $phone);
            return $this->link->insert($table, $params, $values);
        }

        public function login($id, $password){
            $table  = 'user';
            $params = array('id', 'password');
            $values = array($id, md5($password));
            $stmt   = $this->link->select($table, null, $params, $values);
            $status = $stmt->rowCount(); //active login status
            if ($status == 1) {
                session_destroy();
                session_start();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $_SESSION['id']        = $user['id'];
                $_SESSION['uid']       = (int)$user['uid'];
                $_SESSION['nickname']  = $user['nickname'];
                $_SESSION['sex']       = (int)$user['sex'];
                $_SESSION['headPic']   = $user['headPic'];
                $_SESSION['adress']    = $user['adress'];
                $_SESSION['phone']     = $user['phone'];
                $_SESSION['selfIntro'] = $user['selfIntro'];
                $this->__construct();
            } else {
                session_destroy();
            }
            return $status;
        }
    }
?>