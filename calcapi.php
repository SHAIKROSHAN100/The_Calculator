<?php

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require('database.php');


    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){

        case "POST" :
            $data = json_decode(file_get_contents('php://input'));
            
            $input = $data -> input;
            $result = $data -> result;

            $insert = mysqli_query($conn, "INSERT INTO history (inputValue, result) VALUES ('$input', '$result')");

            if($insert){
                echo json_encode(["output" => "data is inserted successfully"]);
                return;
            }else{
                echo json_encode(["output" => "data is not inserted " ]);
                return;
            }

            break;
        
        case "GET":
            $alldata = mysqli_query($conn, "SELECT * FROM history");

            if(mysqli_num_rows($alldata) > 0){

                while($row = mysqli_fetch_array($alldata)){
                    
                    $json_array["data"][] = array("id" => $row['id'], "inputValue" => $row['inputValue'], "result" => $row['result']);
                }

                echo json_encode($json_array["data"]);
                return;
            } else {

                echo json_encode(["error" => "please verify the data"]);
                return;
            }

            break;

        case "DELETE":
            $delt = mysqli_query($conn, "DELETE FROM history");
            mysqli_query($conn, "ALTER TABLE history AUTO_INCREMENT=0");
            break;
    }

    mysqli_close($conn);

?>


