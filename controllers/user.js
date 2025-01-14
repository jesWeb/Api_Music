const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Mensaje eniado desde controlelr "
    })
}

module.exports = {
    prueba
}