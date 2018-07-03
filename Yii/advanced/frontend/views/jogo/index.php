
<?php
use yii\helpers\Html;
/* @var $this yii\web\View */

$this->title = 'Yiieti';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Skifree</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body>
<?php
    if(!$isGuest):
?>
<div style="position:absolute">
    <h1>Прибет, <?=$user->username ?>!</h1>
    <div id="montanha">
        <div id="skier"></div>
    </div>
    <div id="panel">
    </div>
    <!-- <script src="js/skifree.js"></script> -->
   
   <?php $this->registerJsFile('js/skifree.js'); ?>
   </div>
<?php
    else:
?>
<center><h1><font color='red'>ты не вошел!</font></h1>
<?= Html::a('Логин', ['/site/login'], ['class' => 'btn btn-primary']) ?>
</center>
<?php
    endif;
?>
</body>

</html>