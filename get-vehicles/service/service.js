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
        console.log('URL getVehicles :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = result.data.results.map(val => this.translateFields(val));
            return response._200(data, true);
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsVehicles', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
        }
    },

    async getById(id) {
        const url = `https://${env.service.host}${env.service.path}${id}`;
        console.log('URL getVehicles :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = this.translateFields(result.data);
            return response._200(data, true);
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsVehicles', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
        }
    },

    translateFields(result) {
        let obj = {};
        for (const [key, value] of Object.entries(result)) {
            switch (key) {
                case 'name':
                    obj['nombre'] = value;
                    break;
                case 'model':
                    obj['modelo'] = value;
                    break;
                case 'vehicle_class':
                    obj['clase'] = value;
                    break;
                case 'manufacturer':
                    obj['fabricante'] = value;
                    break;
                case 'length':
                    obj['longitud'] = value;
                    break;
                case 'cost_in_credits':
                    obj['costo'] = value;
                    break;
                case 'crew':
                    obj['tripulacion'] = value;
                    break;
                case 'passengers':
                    obj['pasajeros'] = value;
                    break;
                case 'homeworld':
                    obj['hogar'] = value;
                    break;
                case 'max_atmosphering_speed':
                    obj['velocidad_maxima'] = value;
                    break;
                case 'species':
                    obj['especies'] = value;
                    break;
                case 'cargo_capacity':
                    obj['capacidad_carga'] = value;
                    break;
                case 'consumables':
                    obj['consumibles'] = value;
                    break;
                case 'films':
                    obj['peliculas'] = value;
                    break;
                case 'pilots':
                    obj['pilotos'] = value;
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