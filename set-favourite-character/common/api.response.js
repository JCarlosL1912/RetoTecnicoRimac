const response = {
    _DefineResponse(statusCode = 502, data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            statusCode: statusCode,
            isBase64Encoded: false,
            body: data
        };
    },

    _DefineResponseFinal(statusCode = 502, data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            statusCode: statusCode,
            isBase64Encoded: false,
            body: JSON.stringify(data)
        };
    },

    _200(data = {}, finalResponse = false) {
        if (finalResponse)
            return this._DefineResponseFinal(200, data);
        else
            return this._DefineResponse(200, data)
    },

    _400(data = {}, finalResponse = false) {
        if (finalResponse)
            return this._DefineResponseFinal(200, data);
        else
            return this._DefineResponse(200, data)
    },
    _401(data = {}, finalResponse = false) {
        if (finalResponse)
            return this._DefineResponseFinal(200, data);
        else
            return this._DefineResponse(200, data)
    },
    _404(data = {}, finalResponse = false) {
        if (finalResponse)
            return this._DefineResponseFinal(200, data);
        else
            return this._DefineResponse(200, data)
    },
    _405(data = {}, finalResponse = false) {
        if (finalResponse)
            return this._DefineResponseFinal(200, data);
        else
            return this._DefineResponse(200, data)
    }
};

module.exports = response;