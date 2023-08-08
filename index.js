//importando o express, que é um framework que facilita o processo de aplicação de APIS, por exemplo gerenciamento de rotas
const express = require('express');

//Importando biblioteca que resolverá erro de CORS
const cors = require('cors')
//Importando dotenv, uma biblioteca utilizada para guardar váriaveis de ambiente de forma segura
const dotenv = require('dotenv');

const taskRouter = require('./src/routes/task.routes')

 


//importando a conexão com o banco de dados
const connectToDatabase = require('./src/database/mongoose.database');

//Rodando a configuração do dotenv
dotenv.config();

//colocando a constante app referenciando a função express
const app = express();

//chamando a função cors para resolver o erro de resquisição ser bloqueado pelo CORS Policy
app.use(cors())


//Middleware indicando para o express que será recebido json
app.use(express.json());

//Rodando a conexão com banco de dados
connectToDatabase();

//O primeiro parâmetro é a URL que queremos utilizar
app.use('/tasks', taskRouter)

//Fazer com que a aplicação rode na porta 8000
app.listen(8000, () => console.log("Listening on port 8000!"));