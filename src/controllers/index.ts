import { Router } from "express";

const router = Router();

router.get("/exist", (req, res) => {
  res.json({
    message: "exist"
  });
});

export default router;
