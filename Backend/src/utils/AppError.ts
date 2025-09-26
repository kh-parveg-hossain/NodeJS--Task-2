
class AppError extends Error {
    statusCode: number;
    status: string;
   
    constructor(message: string, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError
