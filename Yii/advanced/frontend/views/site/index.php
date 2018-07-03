<?php
use yii\helpers\Html;
/* @var $this yii\web\View */

$this->title = 'Yiieti';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>Yiieti</h1>

    </div>

    <div class="body-content" style="text-align:center">
        <?= Html::img('@web/gfx/icomp.png',['width'=>'50%', 'align'=>'middle']) ?>
        <h1>Uma odisséia em fuga do maldoso Yiieti!</h1>
        <?= Html::a('Jogar', ['/jogo/index'], ['class' => 'btn btn-primary']) ?>
    </div>
</div>
