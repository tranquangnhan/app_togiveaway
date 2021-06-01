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

    function getAllComment() 
    {
      $SQL = 'SELECT * FROM `comments` WHERE id_comment_reply IS null';
      return $this->ModelDb->result1(0, $SQL);
    }

    function getAllCommentByIdBlog($id) 
    {
      $SQL = 'SELECT * FROM `comments` WHERE id_blog = ? AND id_comment_reply IS null';
      return $this->ModelDb->result1(0, $SQL, $id);
    }

    function getAllRepCommentByIdBlog($id) 
    {
      $SQL = 'SELECT * FROM `comments` WHERE id_blog = ? AND id_comment_reply IS NOT null';
      return $this->ModelDb->result1(0, $SQL, $id);
    }

    function getRepCommentByIdComment($id)
     {
      $SQL = 'SELECT * FROM `comments` WHERE id_comment_reply = ?';
      return $this->ModelDb->result1(0, $SQL, $id);
    }

    function getIdUserLike($idBlog)
    {
      $SQL = "SELECT id_users_like FROM posts WHERE id = ?";
      return $this->ModelDb->result1(1, $SQL, $idBlog)['id_users_like'];
    }

    function updateIdUserLike($allIdLike,$idBlog)
    {
      $SQL = "UPDATE posts SET id_users_like = ? WHERE id=?";
      return $this->ModelDb->exec1($SQL,$allIdLike,$idBlog);
    }

    function postComment($idBlog,$contentComment,$idUser){
      $SQL = "INSERT INTO comments(id_blog,content,id_user) VALUES(?,?,?)";
      return $this->ModelDb->exec1($SQL,$idBlog,$contentComment,$idUser);
    }
}

?>
