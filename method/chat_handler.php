<?php
    require_once('../method/pdo_handler.php');
    class chat_handler {
        public $link = null;
        public $rid  = null;
        public $user = null;


        #   $user isinstance of user_handler
        public function __construct($user = null, $rid = null) {
            $this->link = new pdo_handler();
            $this->user = $user;
            $this->rid  = $rid;
        }
        #   $type:0=>chatroom, 1=>losts, 2=>founds
        public function new_room($type, $roomname, $participants) {
            $table  = 'rooms';
            $params = array('type', 'roomname');
            $values = array($type, $roomname);
            $this->link->insert($table, $params, $values);
            $rid    = $this->link->lastInsertId('rid');
            $table  = 'members';
            $params = array('id', 'rid');
            foreach ($participants as $id) {
                $values = array($id, $rid);
                $this->link->insert($table, $params, $values);
            }
            return $rid;
        }

        public function drop_room() {
            $table  = 'rooms';
            $params = array('rid');
            $values = array($this->rid);
            $this->link->delete($table, $params, $values);
            $table  = 'members';
            $this->link->delete($table, $params, $values);
            $table  = 'chats';
            $this->link->delete($table, $params, $values);
            return true;
        }

        public function quit_room(){
            $table  = 'members';
            $params = array('id', 'rid');
            $values = array($this->user->info['id'], $this->rid);
            $this->link->delete($table, $params, $values);
            $params = array('rid');
            $values = array($rid);
            if ($this->link->select($table, null, $params, $values)->rowCount() < 2) {
                $this->link->delete($table, $params, $values);
                $table = 'rooms';
                $this->link->delete($table, $params, $values);
            }
            return true;
        }

        public function push($content){
            $table  = 'chats';
            $params = array('id', 'rid', 'content', 'createTime');
            $values = array($this->user->info['id'], $this->rid, $content, time());
            // var_dump($values);
            return $this->link->insert($table, $params, $values);
        }


        public function pull(){
            $table   = 'rooms';
            $params1 = array('id', 'content', 'createTime');
            $params2 = array('rid');
            $values2 = array($this->rid);
            $stmt    = $this->link->select($table, null, $params2, $values2);
            if ($stmt->rowCount() == 1) {
                $room = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($room['type'] == 0) {
                    $table   = 'members';
                    $params2 = array('id', 'rid');
                    $values2 = array($this->user->info['id'], $this->rid);
                    if ($this->link->select($table, null, $params2, $params2)->rowCount() != 0) {
                        $table   = 'chats';
                        $params2 = array('rid');
                        $values2 = array($this->rid);
                        return json_encode($this->link->select($table, $params1, $params2, $values2)->fetchAll(PDO::FETCH_ASSOC));
                    } else {
                        return 'permission denied.';
                    }
                } else {
                    $table = 'chats';
                    return json_encode($this->link->select($table, $params1, $params2, $values2)->fetchAll(PDO::FETCH_ASSOC));
                }
            }
        }
    }
?>