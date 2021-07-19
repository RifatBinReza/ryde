const userService = require("../services/user");

const authentication = () => {
  const verifyToken = (req, res, next) => {
    // Parse the token from the request or return error
    const token = getToken(req, res);

    return userService.verifyToken(token, (error, decoded) => {
      if (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
      } else {
        req.userId = decoded._id;
        return next();
      }
    });
  };

  const getToken = (req, res) => {
    let tokenToVerify;

    if (req.header("Authorization")) {
      const parts = req.header("Authorization").split(" ");

      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/.test(scheme)) {
          tokenToVerify = credentials;
        } else {
          return res
            .status(401)
            .json({ msg: "Format for Authorization: Bearer [token]" });
        }
      } else {
        return res
          .status(401)
          .json({ msg: "Format for Authorization: Bearer [token]" });
      }
    } else if (req.body.token) {
      tokenToVerify = req.body.token;
    } else if (req.query.token) {
      tokenToVerify = req.query.token
    } else {
      return res.status(401).json({ msg: "No Authorization was found" });
    }
    return tokenToVerify
  };

  return {
    verifyToken,
  };
};

module.exports = authentication();
