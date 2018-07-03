<?php

use yii\grid\GridView;
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $searchModel common\models\CursoSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Maiores pontuações';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-index">

    <h1><?=Html::encode($this->title)?></h1>

    <?=GridView::widget([
    'dataProvider' => $ranking,
    'columns' => [
        ['class' => 'yii\grid\SerialColumn'],
        [
            'label' => 'Nome',
            'format' => 'raw',
            'value' => function ($data) {
                return $data->user->username;
            },
        ],
        'pontuacao',
        'data_hora'
    ],
]);?>
</div>
