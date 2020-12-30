import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export class UserController {
  public path = '/user';
  public router = express.Router();
  private JWTSecret = process.env.JWT_SECRET;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(`${this.path}/signup`, this.signup);
    this.router.post(`${this.path}/login`, this.login);
  }

  private signup = (request: express.Request, response: express.Response) => {
    passport.authenticate('signup', { session: false }, () => {
      response.json({
        message: 'Signup successful',
        user: request.user
      });
    })(request, response);
  };

  private login = (request: express.Request, response: express.Response) => {
    passport.authenticate('login', async (err, user) => {
      try {
        if (err || !user) {
          return response.status(401).send({ error: 'authentication failed' });
        }

        request.login(user, { session: false }, async (error) => {
          if (error)
            return response
              .status(401)
              .send({ error: 'authentication failed' });

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, this.JWTSecret as string);

          return response.json({ token });
        });
      } catch (error) {
        return response.status(401).send({ error: 'authentication failed' });
      }
    })(request, response);
  };
}
