import TestHelpers from '../utils/tests-helpers';
import models from '../../src/models';

describe('User', () => {
  beforeAll(async () => {
    await TestHelpers.startDb();
  });

  afterAll(async () => {
    await TestHelpers.stopDb();
  });

  describe('static methods', () => {
    describe('hashPassword', () => {
      it('should encrypt the password correctly', async () => {
        const { User } = models;
        const password = 'Test1234';
        const hashedPassword = await User.hashPassword(password);
        expect(hashedPassword).toEqual(expect.any(String));
        expect(hashedPassword).not.toEqual(password);
      });
    });

    describe('compare password', () => {
      it('should return true if the hashed password is the same as the original password', async () => {
        const { User } = models;
        const password = 'Test1234';
        const hashedPassword = await User.hashPassword(password);
        const arePasswordsEqual = await User.comparePasswords(
          password,
          hashedPassword
        );
        expect(arePasswordsEqual).toBe(true);
      });

      it('should return false if the hashed password is not the same as the original one', () => {
        async () => {
          const { User } = models;
          const password = 'Test1234';
          const hashedPassword = await User.hashPassword(password);
          const arePasswordsEqual = await User.comparePasswords(
            'Test1234!',
            hashedPassword
          );
          expect(arePasswordsEqual).toBe(false);
        };
      });
    });
  });

  describe('hooks', () => {
    beforeEach(async () => {
      await TestHelpers.syncDb();
    });

    it('should create a user with a hashed password', async () => {
      const { User } = models;
      const email = 'test@example.com';
      const password = 'Test123';
      await User.create({ email, password });
      const users = await User.findAll();
      expect(users.lentgth).toBe(1);
      expect(users[0].email).toEqual(email);
      expect(users[0].password).not.toEqual(password);
    });
  });
});
