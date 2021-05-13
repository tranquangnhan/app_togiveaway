<?php 
include_once 'Libs/loader.php';
$blogs = new Models\Blogs;

ini_set('display_errors', 'off');
/** Config Return Header */
header("Access-Control-Allow-Origin: *");
header('Content-type:application/json;charset=utf-8');

if (isset($_GET['act']))
{
    switch ($_GET['act']) {
        case 'home':
            $Return = array();
            $Return['data']= $blogs->showAllBlog();
            echo json_encode($Return);
            break;
        case 'addblog':
            $Return = array();
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $name = $_POST['name'];
                $email = $_POST['email'];
                $Return['data']= array("name"=>$name,"email"=>$email);
                echo json_encode($Return);
            }
            break;
        case 'addaccount':
            $Return = array();
            $id = $_POST['id'];
            $email = $_POST['email'];
            $kind = $_POST['kind'];

            // if($_SERVER["REQUEST_METHOD"] == "POST"){
               
            //     $id = $_POST['id'];
            //     $email = $_POST['email'];
            //     $kind = $_POST['kind'];
            //     if($blogs->addAccount($id,$email,0,$kind)){
            //         // http_response_code(200);
            //         // echo json_encode(array("message" => "User was successfully registered."));
            //         $Return['statusCode'] =1;
            //         $Return['message'] ='success';
            //     }else{
            //         $Return['statusCode'] =0;
            //         $Return['message'] ='error';
            //         // http_response_code(400);

            //         // echo json_encode(array("message" => "Unable to register the user."));
            //     }
            //     echo json_encode($Return);
            // }
            echo json_encode(array("id"=>$id,"email"=>$email,"kind"=>$kind));
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