<?php
error_reporting(E_ALL);
ini_set('display_errors','On');
echo "Postado</br></br>";
    $usuario = "root";
    $senha = "123456";

   try{
        $conn = new PDO("mysql:host=172.17.0.2;dbname=PHP_EXERCICIO2", $usuario, $senha);
        print "Connected to database<br>";
        $stmt = $conn->prepare('insert into mensagem (nome, email, website, mensagem) values (:nome, :email, :site, :mensagem)');
        $stmt->bindValue(':nome', $_POST["nome"]);
        $stmt->bindValue(':email', $_POST["email"]);
        $stmt->bindValue(':site', $_POST["site"]);
        $stmt->bindValue(':mensagem', $_POST["mensagem"]);
        $stmt->execute();
        echo "Salvou sussão!<br>";
    }catch(PDOException $e){
        echo $e->getMessage();
    }

?>