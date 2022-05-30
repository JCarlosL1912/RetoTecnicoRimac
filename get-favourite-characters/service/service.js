const env = require('../common/environment');
const response = require('../common/api.response');
const repository = require('../repository/repository');
const axios = require('axios').default;

const service = {

    async getResults() {
        return this.getAll();
    },

    async getAll() {
        try {
            let result = await repository.getAll();
            let final_result = result.map(async val => {
                console.log(val);
                for (const [k,v] of Object.entries(val)) {
                    switch (k) {
                        case 'personaje_id':
                            val[k] = await this.getInnerData(v);
                            break;
                        default:
                            val[k] = v;
                            break;
                    }
                }
                console.log(val);
                return val;
            });
            return response._200(final_result, true);
        } catch (error) {
            console.log(error);
            return response._405({code: 500, message: "Ocurrio un error al consultar base de datos"}, true)
        }
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
            return response._405({service: 'callWsCharacters', code: 500, message: "Ocurrio un error al consultar servicio"}, true)
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
    }
}

module.exports = service;