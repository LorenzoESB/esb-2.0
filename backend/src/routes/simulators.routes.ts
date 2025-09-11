import { Router } from "express";
import { calculaJurosCompostosAPI } from "../controllers/juros-compostos/juros-compostos.controller.js";

const router = Router();

router.post("/juros-compostos", calculaJurosCompostosAPI);

export default router;
