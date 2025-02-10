class HttpError extends Error {
  #_statusMessage = {
    400: 'Bad Request',
    401: 'Unauthorized User',
    403: 'Forbidden',
    404: 'Not Found',
    406: 'Not Acceptable',
    409: 'Conflict',
    432: 'Unprocessable Entity',
    500: 'Internal Server Error',
  };

  constructor(statusCode, message){
    super(message || null)
    this.name = 'HttpError'
    this.statusCode = statusCode ?? 500 // status code is not found
    this.message = message ?? this.#_statusMessage[statusCode] ?? 'Unkown Error'

    if(Error.captureStackTrace){
      Error.captureStackTrace(this, HttpError)
    }
  }
}

module.exports = HttpError