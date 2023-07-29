//Importando o mongoose, uma biblioteca que facilita a nossa conexão e interação com o mongodb
const mongoose = require("mongoose");

//função assincrona para realizar a conexão com o banco de dados
const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagerclouster.6rdgrg2.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error(`Could not connect to MongoDB: ${error.message}`);
    }
};

//Exportando a função criada
module.exports = connectToDatabase;