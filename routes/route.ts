import { Router } from "express";
import {
  getAlsCompounds,
  getAlsCompoundsById,
  searchParticularAlsCompound,
  welcomePage,
} from "../controllers/als-compound.controller";

const router = Router();

router.route("/").get(welcomePage);
router.route("/api/als-compounds").get(getAlsCompounds);
router.route("/api/als-compounds/search").get(searchParticularAlsCompound);
router.route("/api/als-compounds/:id").get(getAlsCompoundsById);

export default router;
