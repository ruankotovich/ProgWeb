<?php
    $usuario = "root"
    $senha = "123456"

   try{
        $conn = new PDO("mysql:host=172.17.0.2;dbname=PHP_EXERCICIO2", $usuario, $senha);
        print "Connected to database";
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>