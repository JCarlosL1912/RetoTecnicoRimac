const env = require('../common/environment');
const response = require('../common/api.response');
const repository = require('../repository/repository');
const axios = require('axios').default;

const service = {

    async getAll() {
        try {
            let result = await repository.getAll();
            let final_result = await Promise.all(result.map(async val => await this.populateData(val)))
            return response._200(final_result, true);
        } catch (error) {
            console.log(error);
            return response._405({code: 500, message: "Ocurrio un error al consultar base de datos"}, true);
        }
    },

    async populateData(val) {
        console.log(val);
        res = {};
        for (const [k,v] of Object.entries(val)) {
            switch (k) {
                case 'pelicula_id':
                    res[k] = await this.getInnerData(v);
                    break;
                default:
                    res[k] = v;
                    break;
            }
        }
        console.log(res);
        return res;
    },

    async getInnerData(id) {
        const url = `https://${env.service.host}${env.service.path}${id}`;
        console.log('URL getPeople :', url);

        try {
            let result = await axios.get(url);
            console.log(`Get Solicitud: ${JSON.stringify(result.data)}`);
            let data = this.translateFields(result.data);
            return data;
        } catch (e) {
            console.error("Ocurrio un error", e);
            return response._405({service: 'callWsFilms', code: 500, message: "Ocurrio un error al consultar servicio"}, true);
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
    }
}

module.exports = service;