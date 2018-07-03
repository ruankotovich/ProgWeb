<?php

namespace frontend\controllers;

use common\models\Jogada;
use Yii;
use yii\web\Controller;
use yii\data\ActiveDataProvider;

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
            'ranking' => $this->getRanking(3)->all(),
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

    public function actionRanking(){
        return $this->render('ranking',
        [
            'ranking' => new ActiveDataProvider(['query'=>$this->getRanking(0)])
        ]);
    }

    public function getRanking($limit)
    {
        if ($limit > 0) {
            return Jogada::find()->with('user')->orderBy('pontuacao desc')->limit($limit);
        } else {
            return Jogada::find()->with('user')->orderBy('pontuacao desc');
        }
    }
}
