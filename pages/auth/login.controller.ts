import User from "../../models/user";
import passport from "passport";
import Joi from "joi";
import Jwt from "../../utils/jwt";
import express, { Request, Response } from "express";
import { NextFunction } from "connect";
let options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: false,
  convert: true,
};
class AuthController {
  //class for login controller
  public router: any = express.Router();

  public User = User;
  constructor() {
    this.router.post("/login", this.login);
    this.router.post("/register", this.register);
    this.router.get("/signout", this.signout);
  }
  public getRouter(): any {
    return this.router;
  }
  private async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let user = User.findOne({ email: email }, (err: any, user: any) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!user) {
        return res.status(400).json({ message: "Invalid creds" });
      }
      let cmpered = user.comparePassword(password);
      if (!cmpered) {
        return res.status(400).json({ message: "Invalid creds" });
      }
      const payload = {
        id: user._id,
        email: user.email,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };
      const token = Jwt.sign(payload, process.env.SESSION_SECRET);
      passport.authenticate("bearer", { session: true });
      return res.status(200).send({ token: token });
    });
  }
  private async register(req: Request, res: Response) {
    try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
      return false;
    }
    let exist = User.findOne({ 
      $or: [
        { email: value.email },
        { username: value.username },
      ],

    });
    exist.then(async (user: any) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      } else {
    
    const user = new User({
      email: value.email,
      password: value.password,
      username: value.username,
    });
      const savedUser = await user.save();
      return res.status(200).json(savedUser);
      }
    }).catch((err: any) => {
      return res.status(400).json({ message: err });
    });
    } catch (err : any) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  private async signout(req: Request, res: Response) {
    return res.status(200).send({ message: "Signout success" });
  }
}

export default new AuthController().getRouter();
