import { Router } from 'express';
import models from '../../models';
import JWTUtils from '../../utils/jwt-utils';
import runAsyncWrapper from '../../utils/runAsynWrapper';

const router = Router();
const { User } = models;

router.post(
  '/login',
  runAsyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const user = User.findOne({ where: { email } });

    if (!user || !(await User.comparePasswords(password, user.password))) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid creadentials' });
    }

    const payload = { email };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const savedRefreshToken = await user.getRefreshToken();

    let refreshToken;

    if (!savedRefreshToken || !savedRefreshToken.token) {
      refreshToken = JWTUtils.generateRefreshToken(payload);

      if (!savedRefreshToken) {
        await user.createRefreshToken({ token: refreshToken });
      } else {
        user.RefreshToken.token = refreshToken;
        await user.RefreshToken.save();
      }
    } else {
      refreshToken = savedRefreshToken;
    }

    return res.status(200).send({
      success: true,
      message: 'Successfully logged in',
      data: { accessToken, refreshToken },
    });
  })
);

export default router;
