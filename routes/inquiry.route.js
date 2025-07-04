import { Router } from "express";
import { handleEnquiryForm } from "../controller/enquiry.controller.js";

const EnquiryRouter = Router();

EnquiryRouter.post("/submit-enquiry", handleEnquiryForm);

export default EnquiryRouter;
