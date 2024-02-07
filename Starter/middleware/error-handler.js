const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  return res
    .status(500)
    .json({ msg: "Something went wrong", error: err.message });
};
module.exports = errorHandlerMiddleware;
