class HttpError extends Error{
    constructor(message, errorCode){
        super(message); //Add a message proper
        this.code = errorCode;
    }
}

module.exports = HttpError;