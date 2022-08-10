import express from "express";
import { absences } from "./controllers/absences";

const router = express.Router();
router.get("/", function (req: any, res: any) {
  res.send("Healthy");
});

router.get("/absences", absences);
export default router;
