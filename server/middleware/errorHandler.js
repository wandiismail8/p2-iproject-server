const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code;
  let message;
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.message === "Email/Password Required") {
    code = 400;
    message = "Email/Password Required";
  } else if (err.name === "Data Not Found") {
    code = 404;
    message = "Data Not Found";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (err.name === "Invalid Email/Password") {
    code = 401;
    message = "Invalid Email/Password";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = err.name;
  } else if (err.name === "Favorite Already Exists") {
    code = 400;
    message = "Food already in your Favorites";
  } else if (err.name === "Not_Customer") {
    code = 400;
    message = "You're Not Customer";
  } else {
    code = 500;
    message = "Internal Server Error";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
