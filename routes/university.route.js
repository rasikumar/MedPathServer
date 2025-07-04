import { Router } from "express";
import { handleUniversityForm } from "../controller/university.controller.js";

const universityRouter = Router();

universityRouter.post("/submit-university", handleUniversityForm);

export default universityRouter;
