
const express = require('express');

//Importando o Schema de tarefas que será preenchido
const TaskModel = require('../models/task.model')

//Importando a Class Task Controller
const TaskController = require('../controllers/task.controller')

const router = express.Router();

//Criação de rota para capturar informação do banco de dados
router.get("/", async (req,res) => {
    return new TaskController(req,res).getTask();
    
});

router.get("/:id", async (req,res) => {

    return new TaskController(req,res).getTaskById();

});

router.patch("/:id", async (req,res) => {
    return new TaskController(req,res).Update();
})

//Criação de rota para postar informação no banco de dados
router.post("/", async (req,res) => {
    return new TaskController(req,res).post();
});

//Endpoint para deletar por id
router.delete('/:id', async (req,res) => {
    return new TaskController(req,res).Delete();
});

module.exports = router;