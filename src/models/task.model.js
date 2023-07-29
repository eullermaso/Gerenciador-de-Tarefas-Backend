//importando Schema(O esqueleto do que será aplicado) e importando o model que permite a criação de um novo modelo a partir do schema que foi criado
const {Schema, model} = require('mongoose');

//Definindo o Schema
const TaskSchema = Schema({
    description:{
        type: String,
        required: true,
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
});

//Criando modelo a partir do schema, o primeiro parâmetro do model é nome que o modelo terá no bd
const TaskModel = model('Task',TaskSchema);

module.exports = TaskModel;