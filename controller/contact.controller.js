import transporter from "../config/EMAILConfig.js";
import { ContactForm } from "../model/Contact.js";
import {
  checkUserConflict,
  renderTemplate,
} from "../util/helperFunction.util.js";

export const handlecontactForm = async (req, res) => {
  const formData = req.body;
  try {
    const existingUser = await ContactForm.findOne({
      $or: [{ email: formData.email }, { mobile: formData.mobile }],
    });

    if (existingUser) {
      const conflict = checkUserConflict(existingUser, formData);
      if (conflict) {
        return res.status(400).json(conflict);
      }
    }

    await ContactForm.create(formData);

    const userEmail = formData.email;
    const ownerEmail = process.env.EMAIL_USER;
    const userHtml = renderTemplate("contact_user.html", formData);
    const ownerHtml = renderTemplate("contact_owner.html", formData);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your Contact Form Submission",
      html: userHtml,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: "New Contact Form Submission",
      html: ownerHtml,
    });

    res.status(200).send("contact submitted successfully");
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).send("Error submitting contact");
  }
};
