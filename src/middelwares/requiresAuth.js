import JWTUtils from '../utils/jwt-utils';

function requiresAuth(tokenType = 'accessToken') {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        var [bearer, token] = authHeader.split(' ');
        console.log(bearer);
        console.log(token);
        if (bearer !== 'Bearer' || !token) {
          throw Error;
        }
      } catch (err) {
        return res
          .status(401)
          .send({ success: false, message: 'Bearer token malformed' });
      }
    } else {
      return res
        .status(401)
        .send({ success: false, message: 'Authorization header not found' });
    }

    try {
      let jwt;
      switch (tokenType) {
        case 'refreshToken':
          jwt = JWTUtils.verifyRefreshToken(token);
          break;
        case 'accessToken':
        default:
          jwt = JWTUtils.verifyAccessToken(token);
      }
      req.body.jwt = jwt;
      next();
    } catch (err) {
      res.status(401).send({ success: false, message: 'Invalid token' });
    }
  };
}

export default requiresAuth;
