<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
/**
 * JogoController implements the CRUD actions for Jogada model.
 */
class JogoController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index', [
            'user' => Yii::$app->user->identity,
            'isGuest' => Yii::$app->user->isGuest
        ]);
    }
    public function actionSave($pontuacao){
        return $this->render('index',[
            'user' => Yii::$app->user->identity,
            'isGuest' => Yii::$app->user->isGuest,
            'pontuacao'=>$pontuacao
        ]);
    }
}