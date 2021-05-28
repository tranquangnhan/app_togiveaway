<?php

namespace Models;
use Systems\ModelDb;

class Comments extends ModelDb
{
    private $ModelDb;

    public function __construct()
    {
        $this -> ModelDb = new ModelDb();
    }

    function getAllComment() {
      $SQL = 'SELECT * FROM `comments` WHERE id_comment_reply IS null';
      return $this->ModelDb->result1(0, $SQL);
    }

    function getAllCommentByIdBlog($id) {
      $SQL = 'SELECT * FROM `comments` WHERE id_blog = ? AND id_comment_reply IS null';
      return $this->ModelDb->result1(0, $SQL, $id);
    }

    function getAllRepCommentByIdBlog($id) {
      $SQL = 'SELECT * FROM `comments` WHERE id_blog = ? AND id_comment_reply IS NOT null';
      return $this->ModelDb->result1(0, $SQL, $id);
    }

    function getRepCommentByIdComment($id) {
      $SQL = 'SELECT * FROM `comments` WHERE id_comment_reply = ?';
      return $this->ModelDb->result1(0, $SQL, $id);
    }
}

?>
