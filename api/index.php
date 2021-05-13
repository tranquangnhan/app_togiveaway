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