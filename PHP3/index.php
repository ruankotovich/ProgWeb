<html>

<head>
</head>
<meta charset="utf-8">

<body>
    <?php 


    session_start();
    $validated = false;
       if(isset($_POST['id']) && isset($_POST['pw'])){
         $newID = $_POST['id'];
         $newPW = $_POST['pw'];
         $_SESSION['id'] = $newID;
         $_SESSION['pw'] = sha1($newPW);
        }
    
    
    if(isset($_SESSION['id']) && isset($_SESSION['pw']) ){

        if($_SESSION['id'] === 'demo' && $_SESSION['pw'] === sha1('demo')){
            
            $validated = true;

        echo '    <form action="exercicio2.php" method="post">
        <div id="form" style="width:350px;">

            <fieldset>
                <legend style="color:blue;font-weight:bold;">Dados Basicos</legend>
                <label for "">Nome : </label>
                <input type="text" name="nome" />
                </br>
                <label for "">Website: </label>
                <input placeholder="argamakovay@email.ua" type="text" name="email" />
                </br>
                <label for "">Website : </label>
                <input placeholder="http://www.e.mail.ru" type="text" name="site" />
            </fieldset>
        </div>

        <div id="form" style="width:350px;">
            <fieldset>
                <legend style="color:blue;font-weight:bold;">Mensagem</legend>
                <textarea name="mensagem"></textarea>
            </fieldset>
        </div>
        <input type="submit" value="Enviar"/>
    </form>';
        }else{
            echo "<font color='red'> ID ou PW inválido</font><br>";
        }
    }

    if($validated !== true){
        echo '
        
    <form action="index.php" method="post">
    ID : <input type="text" name="id"/><br>
    PW : <input type="password" name="pw"></br>
    <input type="submit" value="Login"/>
</form>'
;
    }


?>
</body>

</html>