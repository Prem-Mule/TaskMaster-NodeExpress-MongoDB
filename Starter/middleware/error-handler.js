const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).send(err.message);
  }
  console.log(err.message);
  return res.status(500).send({ msg: "Something not found " });
};
module.exports = errorHandlerMiddleware;
