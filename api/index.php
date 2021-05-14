<?php 
include_once 'Libs/loader.php';
$blogs = new Models\Blogs;
use \Firebase\JWT\JWT;

ini_set('display_errors', 'off');
/** Config Return Header */
header("Access-Control-Allow-Origin: *");
header('Content-type:application/json;charset=utf-8');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_GET['act']))
{
    switch ($_GET['act']) {
        case 'home':
            $Return = array();
            $Return['data']= $blogs->showAllBlog();
            echo json_encode($Return);
            break;
        case 'addBlog':
            $Return = array();
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $name = $_POST['name'];
                $email = $_POST['email'];
                $Return['data']= array("name"=>$name,"email"=>$email);
                echo json_encode($Return);
            }
            break;
        case 'addAccount':
            $Return = array();
            $postdata = file_get_contents("php://input");

            if(isset($postdata) && !empty($postdata))
            {
                $request = json_decode($postdata);

                $id =$request->data->id;
                $email = $request->data->email; 
                $kind = $request->data->kind; 
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

                if($blogs->countAccount($id)=="1"){
                    http_response_code(200);
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
                    if($blogs->addAccount($id,$email,0,$kind)){
                        http_response_code(200);
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
        default:
            # code...
            break;
    }

}else{
    $Return = array();
    $Return['data']= $blogs->showAllBlog();
    echo json_encode($Return);
}
?>