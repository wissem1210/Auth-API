import jwt from 'jsonwebtoken';
import environment from '../config/environment';

class JWTUtils {
  static generateAccessToken(payload, options = {}) {
    const { expiresIn = '7d' } = options;
    return jwt.sign(payload, environment.jwtAccessTokenSecret, { expiresIn });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, environment.jwtRefreshTokenSecret);
  }
  static verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret);
  }
  static verifyRefreshToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtRefreshTokenSecret);
  }
}

export default JWTUtils;
