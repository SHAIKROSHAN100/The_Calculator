<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "calc";

    $conn = mysqli_connect($servername, $username, $password, $database);

        if(!$conn){
            die("ERROR : COULD NOT CONNECT".mysqli_connect_error());
        }

?>

<?php

    // require('database.php');

    // header("Access-Control-Allow-Origin: http://localhost:5174");
    // header("Content-Type: application/json; charset=UTF-8");
    // header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
    // header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // $method = $_SERVER['REQUEST_METHOD'];

    // switch($method){

    //     case "POST" :
    //         $data_val = json_decode(file_get_contents('php//input'));
    //         print_r($data_val);
    //         echo"hello world";

            // $input = $dataVaribale -> input;
            // $result = $dataVariable -> result;

            // $insert = mysqli_query($conn, "INSERT INTO history (inputValue, result) VALUES ('$input', '$result')");

            // if($insert){
            //     echo json_encode(["output" => "Successfully inserted"]);
            //     return;
            // } else {
            //     echo json_encode(["output" => "Could not inserted"]);
            //     return;
            // }
            
//             break;
//     }


//    mysqli_close($conn);

?>