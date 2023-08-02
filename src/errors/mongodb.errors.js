const notFoundError = (res) => {
    return res.status(404).send('Esse dado não foi encontrado no banco de dados')
}

const objectIdCastError = (res) => {
    return res.status(500).send("Ocorreu um erro ao recupera esse dado")
}

module.exports = { notFoundError, objectIdCastError}