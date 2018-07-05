<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Sobre';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about"  style="text-align:center">
    <p>Hoje é dia <?=$curDate?> </p>
    <h3>SkiFree é um joguinho no qual você não pode vacilar ou então o Yiiet mastiga você</h3>

    <?= Html::img('@web/gfx/screenshot.png') ?>
</div>
