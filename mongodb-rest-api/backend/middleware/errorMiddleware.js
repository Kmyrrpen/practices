const notFoundhandler = (req, res, next) => {
  res.status(404);
  throw new Error("Route doesn't exist");
};

module.exports = {
  notFoundhandler,
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: (process.env.NODE_ENV = "production" ? null : err.stack),
  });
};

module.exports = {
  errorHandler,
  notFoundhandler,
};
