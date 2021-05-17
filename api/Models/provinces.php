<?php

namespace ProvincesModel;
use Systems\ModelDb;

class Provinces extends  ModelDb
{
    private $ModelDb;

    public function __construct()
    {
        $this -> ModelDb = new ModelDb();
    }

    function getAllProvince(){
        $SQL ="SELECT * FROM provinces";
        return $this->ModelDb->result1(0, $SQL);
    }
}

?>
