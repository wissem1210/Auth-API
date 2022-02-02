import { Router } from 'express';
import models from '../../models';
import JWTUtils from '../../utils/jwt-utils';
import runAsyncWrapper from '../../utils/runAsynWrapper';

const router = Router();
const { User, Role, sequelize } = models;

router.post(
  '/register',
  runAsyncWrapper(async (req, res) => {
    const { email, password, roles } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res
        .status(200)
        .send({ success: false, message: 'user already exists' });
    }

    try {
      const result = await sequelize.transaction(async () => {
        const newUser = await User.create({ email, password });
        const jwtPayload = { email };
        const accessToken = JWTUtils.generateAccessToken(jwtPayload);
        const refreshToken = JWTUtils.generateRefreshToken(jwtPayload);
        await newUser.createRefreshToken({ token: refreshToken });

        if (roles && Array.isArray(roles)) {
          const rolesToSave = [];
          for (const role of roles) {
            const newRole = await Role.create({ role });
            rolesToSave.push(newRole);
          }
          await newUser.addRoles(rolesToSave);
        }

        return { accessToken, refreshToken };
      });

      const { accessToken, refreshToken} = result

      const 

      return res.send({
        success: true,
        message: 'User successfully registered',
        data: { accessToken, refreshToken },
      });
    } catch (err) {
      console.error('Error registering the user:\n', err.stack);
      return res.status(500).send({ success: false, message: err.message });
    }
  })
);

export default router;
