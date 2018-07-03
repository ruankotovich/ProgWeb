<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "curso".
 *
 * @property int $id
 * @property string $nome
 * @property string $sigla
 * @property string $descricao
 *
 * @property User[] $users
 */
class Curso extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'curso';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'sigla'], 'required', 'message'=>'Campo obrigatório'],
            [['nome'], 'string', 'max' => 45,'message'=>'Máximo de 45 caracteres'],
            [['sigla'], 'string', 'max' => 4,'message'=>'Máximo de 5 caracteres'],
            [['descricao'], 'string', 'max' => 255,'message'=>'Máximo de 255 caracteres'],
            [['nome'], 'unique', 'message'=>'Campo deve ser único'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'sigla' => 'Sigla',
            'descricao' => 'Descrição',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::className(), ['id_curso' => 'id']);
    }
}
