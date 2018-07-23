module.exports = class ApiError extends Error {
  constructor(initialError, options = {}) {
    const { statusCode = 500, data = null } = options;
    let message = options.message || 'An error occured';
    if (initialError instanceof Error) {
      message = initialError.message;
    }
    const error = new Error(message ? message : undefined);
    error.statusCode = statusCode;
    error.data = data;

    return error;
  }
};
