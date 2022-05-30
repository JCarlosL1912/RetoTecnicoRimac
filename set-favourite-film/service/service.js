const response = require('../common/api.response');
const repository = require('../repository/repository')

const service = {

    async setData(body) {
        try {
            await repository.save(body.pelicula_id, body.motivo);
            return response._200({code: 200, message: "success"}, true);
        } catch (error) {
            return response._405({code: 500, message: "fail"}, true);
        }
    },

    validateParams(event) {
        const body = JSON.parse(event.body);
        if (body.pelicula_id === null || body.motivo === null) {
            return response._400({
                service: 'set-favourite-character',
                code: 400,
                message: 'Falta ingresar el parámetro pelicula_id (Body) o motivo (Body)'
            }, true)
        }
        return response._200({
            pelicula_id: body.pelicula_id,
            motivo: body.motivo
        })
    }
}

module.exports = service;