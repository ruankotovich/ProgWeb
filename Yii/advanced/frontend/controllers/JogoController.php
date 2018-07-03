<?php

namespace frontend\controllers;

use common\models\Jogada;
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
            'isGuest' => Yii::$app->user->isGuest,
            'ranking' => $this->getRanking(3),
        ]);
    }
    public function actionSave($pontuacao, $userId)
    {
        $round = new Jogada();
        $round->id_user = $userId;
        $round->pontuacao = $pontuacao;
        $round->data_hora = date("d/m/Y H:i:s");
        $round->save();
    }

    public function getRanking($limit)
    {
        if ($limit > 0) {
            return Jogada::find()->with('user')->orderBy('pontuacao desc')->limit($limit)->all();
        } else {
            return Jogada::find()->with('user')->orderBy('pontuacao desc')->all();
        }
    }
}
