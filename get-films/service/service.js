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
        console.log('URL getFilms :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = result.data.results.map(val => this.translateFields(val));
            return response._200(data, true);
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsFilms', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
        }
    },

    async getById(id) {
        const url = `https://${env.service.host}${env.service.path}${id}`;
        console.log('URL getFilms :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = this.translateFields(result.data);
            return response._200(data, true);
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsFilms', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
        }
    },

    translateFields(result) {
        let obj = {};
        for (const [key, value] of Object.entries(result)) {
            switch (key) {
                case 'title':
                    obj['titulo'] = value;
                    break;
                case 'episode_id':
                    obj['episodio'] = value;
                    break;
                case 'opening_crawl':
                    obj['introduccion'] = value;
                    break;
                case 'producer':
                    obj['productor'] = value;
                    break;
                case 'release_date':
                    obj['fecha_estreno'] = value;
                    break;
                case 'species':
                    obj['especies'] = value;
                    break;
                case 'starships':
                    obj['naves'] = value;
                    break;
                case 'vehicles':
                    obj['vehiculos'] = value;
                    break;
                case 'characters':
                    obj['personajes'] = value;
                    break;
                case 'planets':
                    obj['planetas'] = value;
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