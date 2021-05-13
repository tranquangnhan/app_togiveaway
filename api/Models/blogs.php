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
        $SQL ="SELECT * FROM blogs";
        return $this->ModelDb->result1(0,$SQL);
    }
   
}

?>