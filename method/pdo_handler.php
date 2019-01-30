<?php
    require_once('setting.php');
    class pdo_handler{
        public $pdolink = null;
        
        public function __construct(){
            $this->pdolink = new PDO(DATABASE_NAME, DATABASE_ID, DATABASE_PW);
        }
        

        #    string $table, array $params, $values
        public function insert($table, $params, $values){
            $sql_tpl    = 'INSERT INTO %s (%s) VALUES (%s);';
            $str_params = implode(',', $params);
            $str_qms    = '';
            for ($i = 0; $i < count($values) - 1; $i++) $str_qms .= '?,';
            $str_qms   .= '?';
            $sql        = sprintf($sql_tpl, $table, $str_params, $str_qms);
            $stmt       = $this->pdolink->prepare($sql);
            $stmt->execute($values);
            return $stmt->rowCount();
        }
        


        #    string $table, array $params, $values
        public function delete($table, $params, $values){
            $sql_tpl    = 'DELETE FROM %s WHERE %s;';
            $str_params = implode('=? AND ', $params);
            $str_params.= '=?';
            $sql        = sprintf($sql_tpl, $table, $str_params);
            $stmt       = $this->pdolink->prepare($sql);
            $stmt->execute($values);
            return $stmt->rowCount();
        }


        #    string $table, $limit
        #    $limit must be checked twice!!!!
        public function delete_sp($table, $limit){
            $sql_tpl = 'DELETE FROM %s WHERE %s;';
            $sql     = sprintf($sql_tpl, $table, $limit);
            $stmt    = $this->pdolink->prepare($sql);
            $stmt->execute();
            return $stmt->rowCount();
        }

        #    string $table, array $params1, $values1, $params2, $values2
        public function update($table, $params1, $values1, $params2, $values2){
            $sql_tpl     = 'UPDATE %s SET %s WHERE %s;';
            $str_params1 = implode('=?, ', $params1);
            $str_params1.= '=?';
            $str_params2 = implode('=? AND ', $params2);
            $str_params2.= '=?';
            $values      = array_merge($values1, $values2);
            $sql         = sprintf($sql_tpl, $table, $str_params1, $str_params2);
            $stmt        = $this->pdolink->prepare($sql);
            $stmt->execute($values);
            return $stmt->rowCount();
        }



        #    string $table, $limit, array $params1, $values1
        #    $limit must be checked twice!!!!
        public function update_sp($table, $params1, $values1, $limit){
            $sql_tpl     = 'UPDATE %s SET %s WHERE %s;';
            $str_params1 = implode('=?, ', $params1);
            $str_params1.= '=?';
            $sql         = sprintf($sql_tpl, $table, $str_params, $limit);
            $stmt        = $this->pdolink->prepare($sql);
            $stmt->execute($values1);
            return $stmt->rowCount();
        }


        #    string $table, array $params1, $params2, $values2
        public function select($table, $params1, $params2, $values2){
            $sql_tpl = 'SELECT %s FROM %s WHERE %s;';
            if ($params1 == null) {
                $str_params1 = '*';
            } else {
                $str_params1 = implode(',', $params1);
            }
            if ($params2 == null or $values2 == null) {
                $str_params2 = '1=?';
                $values      = array('1');
            } else {
                $str_params2 = implode('=? AND ', $params2);
                $str_params2.= '=?';
                $values      = array_merge($values2);
            }
            $sql     = sprintf($sql_tpl, $str_params1, $table, $str_params2);
            $stmt    = $this->pdolink->prepare($sql);
            $stmt->execute($values);
            return $stmt;
        }


        public function select_sp($table, $params, $limit){
            $sql_tpl = 'SELECT %s FROM %s WHERE %s;';
            if ($params == null) {
                $str_params = '*';
            } else {
                $str_params = implode(',', $params1);
            }
            $sql     = sprintf($sql_tpl, $table, $str_params, $limit);
            $stmt    = $this->pdolink->prepare($sql);
            $stmt->execute();
            return $stmt;
        }

    }
?>