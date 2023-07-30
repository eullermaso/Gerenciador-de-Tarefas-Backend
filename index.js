//importando o express, que é um framework que facilita o processo de aplicação de APIS, por exemplo gerenciamento de rotas
const express = require('express');

//Importando dotenv, uma biblioteca utilizada para guardar váriaveis de ambiente de forma segura
const dotenv = require('dotenv');

//Importando o Schema de tarefas que será preenchido 
const TaskModel = require("./src/models/task.model")

//importando a conexão com o banco de dados
const connectToDatabase = require('./src/database/mongoose.database');

//Rodando a configuração do dotenv
dotenv.config();

//colocando a constante app referenciando a função express
const app = express();

//Middleware indicando para o express que será recebido json
app.use(express.json());

//Rodando a conexão com banco de dados
connectToDatabase();


//Criação de rota para capturar informação do banco de dados
app.get("/tasks", async (req,res) => {
    try{
        //O método find vem do mongoose que facilita na manipulação
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.get("/tasks/:id", async (req,res) => {

    try{
        //captura o id
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if(!task){
            res.status(404).send("Essa tarefa não foi encontrada")
        }
        res.status(200).send(task);
    }catch(error){
        res.status(500).send(error.message)
    }

});

app.patch("/tasks/:id", async (req,res) => {
    try{
        const taskId = req.params.id;

        //captura o que foi colocado no body
        const taskData = req.body;

        const taskUpdate = await TaskModel.findById(taskId);

        //Colocando em uma lista os campos que podem ser utilizados
        const allowedUpdates = ['isCompleted'];

        //retornando o que foi colocado no body como objeto
        const requestedUpdates = Object.keys(req.body);


        //Pra cada campo que a gente recebeu no body vamos verificar se a lista de campos permitidos inclui este campo
        for (update of requestedUpdates){
            //Compara se o que está no body(allowedUpdates) tem alguma parte igual ao update(requestedUpdates)
            if(allowedUpdates.includes(update)){
                //vamos pegar a perte igual encontrada anteriormente(que nesse caso é o isCompleted) e igualar ela ao que está escrito body para que realizar o Patch sejá possível atualizar a task.
                taskUpdate[update] = taskData[update];
            }else{
                return res.status(500).send("Um ou mais campos não são editaveis.")
            }
        }

        await taskUpdate.save()
        return res.status(200).send(taskUpdate);

    }catch(error){
        return res.status(500).send(error.message)

    }
})

//Criação de rota para postar informação no banco de dados
app.post("/tasks", async (req,res) => {
    try{
    //Criando uma nova Task. req.body se refere ao que foi preenchido
    const newTask = new TaskModel(req.body);

    //Salvando no banco de dados. Por isso é preciso ser assincrono para seguir para o próximo passo
    await newTask.save();

    res.status(201).send(newTask)
    }catch(error){
        res.status(500).send(error.message);
    }
});

//Endpoint para deletar por id
app.delete('/tasks/:id', async (req,res) => {
    try{
        //Para acessar o ID
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if(!taskToDelete){
            return res.status(404).send("Essa tarefa não foi encontrada");
        }

        const deleteTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deleteTask);
    }catch(error){
        res.status(500).send(error.message)
    }
})

//Fazer com que a aplicação rode na porta 8000
app.listen(8000, () => console.log("Listening on port 8000!"));