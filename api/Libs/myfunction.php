<?php
  function checkUpLoadMany($allFile){
    $pathimg = '../uploads/';
    foreach ($allFile['name'] as $file) {
        $nameimg[] = $file;
    }
    foreach($allFile['tmp_name'] as $file){
        $tmp_name[] = $file;
    }
    $imgupload = '';
    for ($i=0; $i <count($nameimg) ; $i++) {
        $temp = preg_split('/[\/\\\\]+/',$nameimg[$i]);
        $img = $temp[count($temp)-1];
        $target_file = $pathimg . basename($img);
        if (move_uploaded_file($tmp_name[$i], $target_file)) {
            $uploadfile = 'Upload file thành công';
        }
        else{
            $uploadfile = 'upload file không thành công';
        }
        if($i <(count($nameimg) -1)){
            $imgupload .= $nameimg[$i].',';
        }else{
            $imgupload .= $nameimg[$i];
        }
    }
  return $allFile;
  }



?>
