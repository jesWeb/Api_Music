const prueba = (req, res) => {
    return status(200).send({
        status: "success",
        message: "Mensaje eniado desde controlelr "
    })
}

module.exports = {
    prueba
}