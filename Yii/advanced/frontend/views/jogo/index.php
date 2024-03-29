
<?php
use yii\helpers\Html;
use yii\helpers\Url;
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
if (!$isGuest):
?>
<div style="position:absolute">
    <h1>Прибет, <?=$user->username?>!</h1>
    <div id="montanha">
        <div id="skier"></div>
    </div>
    <div class="panel" id="panel">
    </div>
    <div class="panel" id="ranking">
    <center><b>Ranking</b></center>

    <?php
$iterator = 1;
foreach ($ranking as $item) {
    $username = $item->user->username;
    echo "<div style='vertical-aligh:middle'><img src='gfx/medal_$iterator.png' width='35em'/>&nbsp;<font color='red'>$iterator º &nbsp;&nbsp;</font> $username - $item->pontuacao<br></div>";
    $iterator++;
}
?>
<br><br>
<center>
        <?=Html::a('Ver Ranking Geral', ['/jogo/ranking'], ['class' => 'btn btn-primary'])?>
</center>
    </div>
   </div>
   <?php

$URL = Url::to(['jogo/save']);

$script = <<< JS
     _GLOBAL_SKIFREE_savePuntuaction = (pt)=>{
      $.ajax({
        type: 'GET',
        url: '$URL',
        data: {
          'pontuacao': pt
        },
        error: function (err) {
          console.log('Deu algum erro!');
        },
        success: function (data) {
          console.log("Foi Sucessão");
        }
      });
    }

$( document ).ready(function() {
  $.getScript( "js/skifree.js", function( data, textStatus, jqxhr ) {
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});
});

JS;

$this->registerJs($script);
?>

<?php
else:
?>
<center><h1><font color='red'>Você não está conectado.</font></h1>
<?=Html::a('Fazer Login', ['/site/login'], ['class' => 'btn btn-primary'])?>
</center>
<?php
endif;
?>
</body>

</html>