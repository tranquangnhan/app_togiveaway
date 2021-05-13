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
            $postdata = file_get_contents("php://input");

            if(isset($postdata) && !empty($postdata))
            {
                $request = json_decode($postdata);

                $id =$request->data->id;
                $email = $request->data->email; 
                $kind = $request->data->kind; 

                if($blogs->addAccount($id,$email,0,$kind)){
                    http_response_code(201);
                    $data = [
                        'id'    =>$id,
                        'email' => $email,
                        'kind' => $kind,
                      ];
                     echo json_encode(['data'=>$data]);
                }else{
                    http_response_code(422);
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