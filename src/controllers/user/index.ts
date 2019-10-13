import { Router } from "express";
import { hashSync, compareSync } from "bcrypt";
import { User } from "../../entities/User";
import { getConnection } from "typeorm";

const router = Router();

router.post("/sign-up", (req, res) => {
  getConnection()
    .getRepository(User)
    .insert({
      username: req.body.username,
      password: hashSync(req.body.password, 12)
    })
    .then(() => {
      res.json({
        message: "Register success"
      });
    })
    .catch(err => {
      throw new Error(err);
    });
});

router.post("/login", (req, res) => {
  getConnection()
    .getRepository(User)
    .findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        const verify = compareSync(req.body.password, user.password);
        if (verify) {
          if (req.session) req.session.userId = user.id;
          res.json({
            message: "Login success"
          });
        }
      }
    });
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      res.clearCookie("sid");
      res.json({
        message: "Logout success"
      });
    });
  }
});

export default router;
