<?php

namespace UsersModel;
use Systems\ModelDb;

class Users extends  ModelDb
{
    private $ModelDb;

    public function __construct()
    {
        $this -> ModelDb = new ModelDb();
    }

    function addUser($account_id,$name,$image,$email){
        $date_create = time();
        $SQL ="INSERT INTO users(account_id,name,image,email,date_create) VALUE(?,?,?,?,?)";
        return $this->ModelDb->exec1($SQL,$account_id,$name,$image,$email,$date_create);
    }
    function findUser($account_id){
        $SQL ="SELECT * FROM users WHERE account_id=?";
        return $this->ModelDb->result1(1,$SQL,$account_id);
    }
    function getThongtinNhapLanDau($id) {
        $SQL = "SELECT id, phone, address, id_province FROM `users` WHERE id_account = $id";
        return $this->ModelDb->result1(1,$SQL);
    }
    
}

?>
