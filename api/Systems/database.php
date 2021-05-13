<?php
namespace Systems;

use PDO;
use PDOException;

class ModelDb{

    function __construct(){
        try {
            $ConnectionOption = array
                (
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                );
    
            $conn = new PDO ('mysql:host='.HOST_DB.';dbname='.NAME_DB.';charset=utf8', USER_DB, PASS_DB, $ConnectionOption);
    
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch(PDOException $e) {
          echo "Lỗi Kết Nối database: " . $e->getMessage();
        }
    }

    function result1($fe,$sql){ 
        $sqlValue = array_slice(func_get_args(),2);
        try {
            $conn = $this->__construct(); //connect database
            $stmt = $conn->prepare($sql); // select * from sanpham where id = ?
            $stmt->execute($sqlValue);// thực thi
            if($fe===0)return $stmt->fetchAll();elseif($fe===1)return $stmt->fetch(PDO::FETCH_ASSOC);// nếu tham số đầu tiên ===0 trả về tất cả sản phẩm, === 1 trả về 1 sản phẩm
        } catch (PDOException $e) {
            echo "Lỗi: " . $e->getMessage();
        }
        finally{
            unset($conn);
        }
    }
    function exec1($sql){//thêm, xoá ....
        $sqlValue = array_slice(func_get_args(),1); 
    
        try {
            $conn = $this->__construct(); //connect database
            
            $stmt = $conn->prepare($sql); // select * from sanpham where id = ?
    
            $stmt->execute($sqlValue);// thực thi
            return true;
        } catch (PDOException $e) {
            echo "Lỗi: " . $e->getMessage();
        }
    }
    function getLastId($sql){//get LastId
        $sqlValue = array_slice(func_get_args(),1);
        try {
            $conn = $this->__construct();  //connect database
    
            $stmt = $conn->prepare($sql); // select * from sanpham where id = ?
    
            $stmt->execute($sqlValue);// thực thi
    
            $last_id = $conn->lastInsertId();
            return $last_id;
        } catch (PDOException $e) {
            echo "Lỗi: " . $e->getMessage();
        }
    }
    function SqlExecDebug($sql){//thêm, xoá ....
        $sqlValue = array_slice(func_get_args(),1); 
    
        try {
            $conn =  $this->__construct(); //connect database
            
            $stmt = $conn->prepare($sql); // select * from sanpham where id = ?
    
            echo '<pre>';
            print_r($stmt -> debugDumpParams());
            echo '</pre>';
            print_r($sqlValue);
            echo '---------------------------------------------------------------------<br>'.PHP_EOL;
    
            $stmt->execute($sqlValue);// thực thi
    
           
            return true;
        } catch (PDOException $e) {
            echo "Lỗi: " . $e->getMessage();
        }
    }
    function SqlSelectDebug($fe,$sql){//thêm, xoá ....
        $sqlValue = array_slice(func_get_args(),2);
        try {
            $conn = $this->__construct(); //connect database
            $stmt = $conn->prepare($sql); // select * from sanpham where id = ?
            
            echo '<pre>';
            print_r($stmt -> debugDumpParams());
            echo '</pre>';
            print_r($sqlValue);
            echo '---------------------------------------------------------------------<br>'.PHP_EOL;
            
            $stmt->execute($sqlValue);// thực thi
            if($fe===0)return $stmt->fetchAll();elseif($fe===1)return $stmt->fetch(PDO::FETCH_ASSOC);// nếu tham số đầu tiên ===0 trả về tất cả sản phẩm, === 1 trả về 1 sản phẩm
            
        } catch (PDOException $e) {
            echo "Lỗi: " . $e->getMessage();
        }
        finally{
            unset($conn);
        }
    }
}
