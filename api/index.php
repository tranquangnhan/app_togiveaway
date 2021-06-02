<?php
include_once 'Libs/loader.php';
include_once 'libs/myfunction.php';
$blogs = new Models\Blogs;
$users = new UsersModel\Users;
$province = new ProvincesModel\Provinces;
$comments = new Models\Comments;

use \Firebase\JWT\JWT;

ini_set('display_errors', 'off');
/** Config Return Header */
header("Access-Control-Allow-Origin: *");
header('Content-type:application/json;charset=utf-8');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_GET['act'])) {
    switch ($_GET['act']) {
        case 'home':
            $Return = array();
            $Return['data'] = $blogs->showAllBlog();
            echo json_encode($Return);
            break;
        case 'addBlog':
            $Return = array();
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $name = $_POST['name'];
                $email = $_POST['email'];
                $Return['data'] = array("name" => $name, "email" => $email);
                echo json_encode($Return);
            }
            break;
        case 'getUsById':
          $postdata = file_get_contents("php://input");

          $json = json_decode($postdata);

          $id = $json->id;

          $data = $users->getUsByIdForBlog($id);

          echo json_encode($data);
          break;
        case 'loginUser':
            $Return = array();
            $postdata = file_get_contents("php://input");

            if(isset($postdata) && !empty($postdata))
            {
                $request = json_decode($postdata);

                $id =$request->data->id;
                $email = $request->data->email;
                $name =  $request->data->name;
                $photoUrl =  $request->data->photoUrl;

                $secret_key = "tranquangnhan";
                $issuer_claim = "http://localhost:4200/";
                $audience_claim = "http://localhost:4200/";
                $issuedat_claim = time();
                $notbefore_claim = $issuedat_claim + 10;
                $expire_claim = $issuedat_claim + 60;

                $token = array(
                    "iss" => $issuer_claim,
                    "aud" => $audience_claim,
                    "iat" => $issuedat_claim,
                    "nbf" => $notbefore_claim,
                    "exp" => $expire_claim,
                    "data" => array(
                        "id" => $id,
                        "name" => $name,
                        "photoUrl" => $photoUrl,
                        "email" => $email
                ));

                if($users->findUser($id)){
                    // http_response_code(200);
                      $jwt = JWT::encode($token, $secret_key);
                        echo json_encode(
                        array(
                            "message" => "Successful login.",
                            "jwt" => $jwt,
                            "name" => $name,
                            "expireAt" => $expire_claim,
                            "status"=>1
                        ));

                }else{
                    if($users->addUser($id,$name,$photoUrl,$email)){
                        // http_response_code(200);
                        $Return['message']="register success";
                        $Return['statusCode']= 1;

                        $jwt = JWT::encode($token, $secret_key);
                        echo json_encode(
                        array(
                            "message" => "Successful login.",
                            "jwt" => $jwt,
                            "email" => $email,
                            "expireAt" => $expire_claim,
                            "status"=>1
                        ));

                    }else{
                        $Return['message']="register error";
                        $Return['statusCode']= 1;
                    }
                }
            }
            break;
        case 'postComment':
          $array = array();
          $postdata = file_get_contents("php://input");
          $dataJSON = json_decode($postdata);

          $idReply = $dataJSON->data->idReply;
          $idBlog = $dataJSON->data->idBlog;
          $contentComment = $dataJSON->data->contentComment;
          $idUser = $dataJSON->data->idUser;
          
       
          if($comments->postComment($idBlog,$contentComment,$idUser,$idReply)){
            $array['dataComment'] = $comments->getAllCommentByIdBlog($idBlog);
            $array['statusCode'] = 1;
          }else{
            $array['statusCode'] = 0;
          }
          
          echo json_encode($array);
          
          break;
        case 'getAllCommentByIdBlog':
          $postdata = file_get_contents("php://input");
          $data = json_decode($postdata);
          $id = $data->id;
          $dataComment = $comments->getAllCommentByIdBlog($id);

          echo json_encode($dataComment);
          break;
        case 'getRepCommentByIdComment':
          $postdata = file_get_contents("php://input");
          $data = json_decode($postdata);
          $id = $data->id;
          $dataRepComment = $comments->getRepCommentByIdComment($id);

          echo json_encode($dataRepComment);
          break;
        case 'moveImageUpload':
          $files = $_FILES['myFile'];
          $bienDem = 0;
          $upload_dir = 'upload';
          for ($i = 0; $i< count($files['name']); $i++) {
            move_uploaded_file($files['tmp_name'][$i], $upload_dir. '/' .$files['name'][$i]);
            $bienDem++;
          }
          echo json_encode($bienDem);
          break;
        case 'addNewBlog':
            $postdata = file_get_contents("php://input");

            if (isset($postdata) && !empty($postdata)) {
                $dataJSON = json_decode($postdata);

                $idUs = $dataJSON->data->idUs;
                $checkNhapLanDau = $blogs->getThongtinNhapLanDau($idUs);
                if ($checkNhapLanDau['address'] != '' && $checkNhapLanDau['id_province'] != '' && $checkNhapLanDau['phone'] != '') {
                    $content = $dataJSON->data->content;
                    $images = $dataJSON->data->images;
                    $status_post = 0;
                    $status_give = 0;
                    $date_create = $dataJSON->data->date_create;
                    $id_province = $checkNhapLanDau['id_province'];
                    $id_user = $checkNhapLanDau['id'];

                    $blogs->addNewBlog($content, $images, $status_post, $status_give, $id_user, $id_province, $date_create);

                    $status = 1; // them thanh cong
                } else {
                    $status = 0; // chưa nhập địa chỉ, thành phố, phone
                }
                echo json_encode(count($images));
            }
            break;
        case 'getAllProvince':
          $Return = array();
          $Return['data'] = $province->getAllProvince();
          echo json_encode($Return);
          break;
        case 'usnhapLanDau':
          $postdata = file_get_contents("php://input");
          if (isset($postdata) && !empty($postdata))
          {
            $dataJSON = json_decode($postdata);

            $account_id = $dataJSON->data->id;
            $sodienthoai = $dataJSON->data->sodienthoai;
            $diachi = $dataJSON->data->diachi;
            $thanhpho = $dataJSON->data->idtp;

            $users->themThongTinLanDau($account_id, $sodienthoai, $diachi, $thanhpho);
            $status = 1;
          }
          else {
            $status = 0;
          }
          echo json_encode($status);
          break;
         
        case 'updatelike':
          $data = array();
          $postdata = file_get_contents("php://input");
          if (isset($postdata) && !empty($postdata))
          {
            $dataJSON = json_decode($postdata);

            $idBlog = $dataJSON->data->idBlog;
            $idUser = $dataJSON->data->idUser;

            $allIdLike = $comments->getIdUserLike($idBlog);
            
            $idExplode = explode(",",$allIdLike);

            $idSearch = array_search($idUser,$idExplode);

            $data['idExplode'] = $idExplode;

            $data['idSearch'] = $idSearch;

            if( $allIdLike[0]== "")
            { 
              // if idLike is empty
              array_push($idExplode,$idUser);
              array_shift($idExplode);
              $data['statusCode'] = 1;
              $data['liked_count'] = count($idExplode);
              $allIdLike = implode("",$idExplode);
              $comments->updateIdUserLike($allIdLike,$idBlog);

            } elseif($idSearch === false)
            {
              // if have any idLike
              array_push($idExplode,$idUser);
              $data['statusCode'] = 1;
              $data['liked_count'] = count($idExplode);
              $allIdLike = implode(",",$idExplode);
              $comments->updateIdUserLike($allIdLike,$idBlog);

            }else{
              // remove idLike
              array_splice($idExplode,$idSearch,1);
              $data['statusCode'] = 2;
              $data['liked_count'] = count($idExplode);
              $allIdLike = implode(",",$idExplode);
              $comments->updateIdUserLike($allIdLike,$idBlog);
            
            }
            $data['data'] = $idExplode;
  

          }
          else {
            $data['statusCode'] = 0;
          }
          echo json_encode($data);
          break;
        default:
            # code...
            break;
    }

} else {
    $Return = array();
    $Return['data'] = $blogs->showAllBlog();
    echo json_encode($Return);
}
