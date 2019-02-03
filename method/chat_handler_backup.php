<?php
    require_once('../method/pdo_handler.php');
    class chat_handler{
        public $link = null;
        public $rid  = null;
        public $user = null;


        #   $user isinstance of user_handler
        public function __construct($user = null, $rid = null){
            $this->link = new pdo_handler();
            $this->user = $user;
            $this->rid  = $rid;
        }

        public function push($content){
            $table  = 'chats';
            $params = array('fromUser', 'rid', 'content', 'creatTime');
            $values = array($this->user->id, $this->rid, $content, time());
            return $this->link->insert($table, $params, $values);
        }


        public function pull($rid){
            $table   = 'chats';
            $params1 = array('fromUser', 'content', 'creatTime');
            $params2 = array('rid');
            $values2 = array($rid);
            return json_encode($this->link->select($table, $params1, $params2, $values2)->fetchAll());
        }

        public function newRoom($roomname, $participants){
            $params = array('roomname', 'participants');
            $values = array($roomname, json_encode($participants));
            $table  = 'rooms';
            $this->link->insert($table, $params, $values);
            $rid = $this->link->lastInsertId('rid');
            $table   = 'user';
            $params1 = array('joinedRooms');
            $params2 = array('id');
            foreach ($participants as $id) {
                $values2 = array($id);
                $user    = $this->link->select($table, $params1, $params2, $values2)->fetch(PDO::FETCH_ASSOC);
                $joinedRooms = json_decode($user['joinedRooms']);
                array_push($joinedRooms, $rid);
                $values1 = array(json_encode($joinedRooms));
                $this->link->update($table, $params1, $values1, $params2, $values2);
            }
            return $rid;
        }

        public function dropRoom($rid){
            $params = array('rid');
            $values = array($rid);
            $table  = 'rooms';
            $room   = $this->link->select($table, null, $params, $values)->fetch(PDO::FETCH_ASSOC);
            $participants = json_decode($rooms['participants']);
            $this->link->delete($table, $params, $values);
            foreach ($participants as $id) {
                $this->quitRoom($id, $rid);
            }
            return true;
        }

        public function quitRoom($id, $rid){
            $joinedRooms = $this->user->joinedRooms;
            $key         = array_search($rid, $joinedRooms);
            unset($joinedRooms[$key]);
            $joinedRooms = array_values($joinedRooms);
            $table       = 'user';
            $params1     = array('joinedRooms');
            $values1     = array(json_encode($joinedRooms));
            $params2     = array('id');
            $values2     = array($id);
            $this->link->update($table, $params1, $values1, $params2, $value2);
            return true;
        }
    }
?>