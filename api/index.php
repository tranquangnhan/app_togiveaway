<?php 
include_once 'Libs/loader.php';
$blogs = new Models\Blogs;

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
            // echo "baokun";
            $Return = array();
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                echo json_decode(file_get_contents("php://input"));
                // $id = $_POST['id'];
                // $email = $_POST['email'];
                // $kind = $_POST['kind'];
                // if($blogs->addAccount($id,$email,0,$kind)){
                //     http_response_code(200);
                //     echo json_encode(array("message" => "User was successfully registered."));
                //     // $Return['statusCode'] =1;
                //     // $Return['message'] ='success';
                // }else{
                //     // $Return['statusCode'] =0;
                //     // $Return['message'] ='error';
                //     http_response_code(400);

                //     echo json_encode(array("message" => "$id Unable to register the user."));
                // }
                // echo json_encode($id);
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