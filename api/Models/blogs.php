<?php

namespace Models;
use Systems\ModelDb;

class Blogs extends  ModelDb
{
    private $ModelDb;

    public function __construct()
    {
        $this -> ModelDb = new ModelDb();
    }

    function showAllBlog()
    {
        $SQL ="SELECT * FROM posts";
        return $this->ModelDb->result1(0,$SQL);
    }
   
    function addAccount($id,$email,$role,$kind){
        $SQL ="INSERT INTO accounts(id,email,role,kind) VALUE(?,?,?,?)";
        return $this->ModelDb->exec1($SQL,$id,$email,$role,$kind);
    }

    function countAccount($id){
        $SQL ="SELECT COUNT(*) as soluong FROM accounts WHERE id=?";
        return $this->ModelDb->result1(1,$SQL,$id)['soluong'];
    }
}

?>