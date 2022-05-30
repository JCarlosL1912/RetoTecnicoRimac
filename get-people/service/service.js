const env = require('../common/environment');
const response = require('../common/api.response');
const axios = require('axios').default;

const service = {

    async getResults(body) {
        console.log(body);
        return body.param == null ? this.getAll() : this.getById(body.param);
    },

    async getAll() {
        const url = `https://${env.service.host}${env.service.path}`;
        console.log('URL getPeople :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = result.data.results.map(val => this.translateFields(val));
            return response._200(data, true);
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsPeople', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
        }
    },

    async getById(id) {
        const url = `https://${env.service.host}${env.service.path}${id}`;
        console.log('URL getPeople :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = this.translateFields(result.data);
            return response._200(data, true);
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsPeople', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
        }
    },

    translateFields(result) {
        let obj = {};
        for (const [key, value] of Object.entries(result)) {
            switch (key) {
                case 'name':
                    obj['nombre'] = value;
                    break;
                case 'height':
                    obj['altura'] = value;
                    break;
                case 'mass':
                    obj['peso'] = value;
                    break;
                case 'hair_color':
                    obj['cabello'] = value;
                    break;
                case 'skin_color':
                    obj['piel'] = value;
                    break;
                case 'eye_color':
                    obj['ojos'] = value;
                    break;
                case 'birth_year':
                    obj['nacimiento'] = value;
                    break;
                case 'gender':
                    obj['genero'] = value;
                    break;
                case 'homeworld':
                    obj['hogar'] = value;
                    break;
                case 'films':
                    obj['peliculas'] = value;
                    break;
                case 'species':
                    obj['especies'] = value;
                    break;
                case 'vehicles':
                    obj['vehiculos'] = value;
                    break;
                case 'starships':
                    obj['naves'] = value;
                    break;
                case 'created':
                    obj['creado'] = value;
                    break;
                case 'edited':
                    obj['editado'] = value;
                    break;
                default:
                    obj[key] = value;
                    break;
            }
        }
        return obj;
    },

    validateParams(event) {
        const id = event.queryStringParameters == null ? null : event.queryStringParameters.id;
        return response._200({
            param: id
        })
    }
}

module.exports = service;