import { Router } from "express";
import universityRouter from "./university.route.js";
import EnquiryRouter from "./inquiry.route.js";
import contactRoute from "./contact.route.js";

const router = Router();
router.use("/university", universityRouter);
router.use("/inquiry", EnquiryRouter);
router.use("/contact", contactRoute);
export default router;
