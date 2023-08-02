const TaskModel = require('../models/task.model')

class TaskController {
    constructor(req,res){
        this.req = req;
        this.res = res;

    }

    async getTask(){
        try{
            //O método find vem do mongoose que facilita na manipulação
            const tasks = await TaskModel.find();
            this.res.status(200).send(tasks);
        }
        catch(error){
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById(){
        try{
            //captura o id
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
    
            if(!task){
                this.res.status(404).send("Essa tarefa não foi encontrada")
            }
            this.res.status(200).send(task);
        }catch(error){
            this.res.status(500).send(error.message)
        }
    }

    async Update(){
        try{
            const taskId = this.req.params.id;
    
            //captura o que foi colocado no body
            const taskData =this.req.body;
    
            const taskUpdate = await TaskModel.findById(taskId);
    
            //Colocando em uma lista os campos que podem ser utilizados
            const allowedUpdates = ['isCompleted'];
    
            //retornando o que foi colocado no body como objeto
            const requestedUpdates = Object.keys(this.req.body);
    
    
            //Pra cada campo que a gente recebeu no body vamos verificar se a lista de campos permitidos inclui este campo
            for (const update of requestedUpdates){
                //Compara se o que está no body(allowedUpdates) tem alguma parte igual ao update(requestedUpdates)
                if(allowedUpdates.includes(update)){
                    //vamos pegar a perte igual encontrada anteriormente(que nesse caso é o isCompleted) e igualar ela ao que está escrito body para que realizar o Patch sejá possível atualizar a task.
                    taskUpdate[update] = taskData[update];
                }else{
                    return this.res.status(500).send("Um ou mais campos não são editaveis.")
                }
            }
    
            await taskUpdate.save()
            return this.res.status(200).send(taskUpdate);
    
        }catch(error){
            return this.res.status(500).send(error.message)
    
        }
    }

    async post(){
        try{
            //Criando uma nova Task. req.body se refere ao que foi preenchido
            const newTask = new TaskModel(this.req.body);
        
            //Salvando no banco de dados. Por isso é preciso ser assincrono para seguir para o próximo passo
            await newTask.save();
        
            this.res.status(201).send(newTask)
            }catch(error){
                this.res.status(500).send(error.message);
            }
    }

    async Delete(){
        try{
            //Para acessar o ID
            const taskId = this.req.params.id;
    
            const taskToDelete = await TaskModel.findById(taskId);
    
            if(!taskToDelete){
                return this.res.status(404).send("Essa tarefa não foi encontrada");
            }
    
            const deleteTask = await TaskModel.findByIdAndDelete(taskId);
    
            this.res.status(200).send(deleteTask);
        }catch(error){
            this.res.status(500).send(error.message)
        }
    }



};

module.exports = TaskController;