import { ContactForm } from "../model/Contact.js";

export const handlecontactForm = async (req, res) => {
  const formData = req.body;
  try {
    await ContactForm.create(formData);
    res.status(200).send("contact submitted successfully");
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).send("Error submitting contact");
  }
};
