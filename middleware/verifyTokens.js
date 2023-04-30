const jwt = require("jsonwebtoken");

const verifyTokneAndUser = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid!" });
      } else {
        res.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "You are not authorized to do this!" });
  }
};

const verifyTokneAndAdmin = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid!" });
      } else {
        req.user = user;
        console.log(req.user);
        if (req.user.isAdmin) {
          next();
        } else {
          res
            .status(403)
            .json({ message: "Only admins are allowed to do this operation!" });
        }
      }
    });
  } else {
    res.status(403).json({ message: "You are not authorized!" });
  }
};

module.exports = { verifyTokneAndUser, verifyTokneAndAdmin };
