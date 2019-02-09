<?php
    require_once('pdo_handler.php');

    class user_handler{
        
        public $info   = array();
        public $link   = null;
        public $status = null;   //login status

        public function __construct(){
            $this->link = new pdo_handler();
            if (session_status() == 1) session_start();
            if (isset($_SESSION['id'])) {
                $table  = 'user';
                $params = array('id');
                $values = array($_SESSION['id']);
                $stmt   = $this->link->select($table, null, $params, $values);
                $user   = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->info['uid']       = (int)$user['uid'];
                $this->info['id']        = $user['id'];
                $this->info['nickname']  = $user['nickname'];
                $this->info['sex']       = (int)$user['sex'];
                $this->info['headPic']   = $user['headPic'];
                $this->info['address']    = $user['address'];
                $this->info['phone']     = $user['phone'];
                $this->info['selfIntro'] = $user['selfIntro'];
                $this->status = 1;
            } else {
                $this->status = 0;
            }
        }

        public function register($id, $nickname, $password, $sex, $address, $phone){
            $table  = 'user';
            $params = array('id', 'nickname', 'password', 'sex', 'address', 'phone');
            $values = array($id, $nickname, md5($password), (int)$sex, $address, $phone);
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
                $_SESSION['id']   = $user['id'];
                $this->__construct();
            } else {
                session_destroy();
            }
            return $status;
        }

        public function upload_headPic(){
            if ($this->status == 1 and isset($_FILES['headPic'])) {
                if ($_FILES['headPic']['error'] == 0 and ($_FILES['headPic']['type'] == 'image/jpeg' or $_FILES['headPic']['type'] == 'image/png')) {
                    //var_dump(time());
                    $file     = $_FILES['headPic']['tmp_name'];
                    $filename = md5($this->info['id'].(string)time());
                    $filename.= ($_FILES['headPic']['type'] == 'image/jpeg')?'.jpg':'.png';
                    move_uploaded_file($file,'../headPic/'.$filename);
                    $table    = 'user';
                    $params1  = array('headPic');
                    $values1  = array('scut18pie1.top/test/gift/headPic/'.$filename);
                    $params2  = array('uid');
                    $values2  = array($this->info['uid']);
                    $status   = $this->link->update($table, $params1, $values1, $params2, $values2);
                    $this->__construct();
                    return $status;
                } else {
                    return 'invalid type';
                }
            }
            return 'go away!';
        }

        public function upload_pic(){
            if ($this->status == 1 and isset($_FILES['pic'])) {
                if ($_FILES['pic']['error'] == 0 and ($_FILES['pic']['type'] == 'image/jpeg' or $_FILES['pic']['type'] == 'image/png')) {
                    //var_dump(time());
                    $file     = $_FILES['pic']['tmp_name'];
                    $filename = md5($this->info['id'].(string)time());
                    $filename.= ($_FILES['pic']['type'] == 'image/jpeg')?'.jpg':'.png';
                    move_uploaded_file($file,'../pic/'.$filename);
                    return 'scut18pie1.top/test/gift/pic/'.$filename;
                } else {
                    return 'invalid type';
                }
            }
            return 'go away!';
        }

        public function update_my_info($params1, $values1){
            if ($this->status == 1) {
                $table   = 'user';
                $params2 = array('id');
                $values2 = array($this->info['id']);
                return $this->link->update($table, $params1, $values1, $params2, $values2);
            }
        }
    }
?>