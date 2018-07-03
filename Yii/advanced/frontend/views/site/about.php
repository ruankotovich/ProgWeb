<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Hoje é dia <?=$curDate?> </p>
    <p>SkiFree é um joguinho no qual você não pode vacilar ou então o Yiiet mastiga você</p>

    <code><?= __FILE__ ?></code>
</div>
