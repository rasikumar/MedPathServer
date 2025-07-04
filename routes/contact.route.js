import { Router } from "express";
import { handlecontactForm } from "../controller/contact.controller.js";

const contactRoute = Router();

contactRoute.post("/submit-contact", handlecontactForm);

export default contactRoute;
