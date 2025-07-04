import transporter from "../config/EMAILConfig.js";
import { UniversityForm } from "../model/University.js";
import { renderTemplate } from "../util/template.util.js";

export const handleUniversityForm = async (req, res) => {
  const formData = req.body;
  try {
    await UniversityForm.create(formData);

    const userEmail = formData.email;
    const ownerEmail = process.env.EMAIL_USER;
    const userHtml = renderTemplate("university_user.html", formData);
    const ownerHtml = renderTemplate("university_owner.html", formData);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your University Form Submission",
      html: userHtml,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: "New University Form Submission",
      html: ownerHtml,
    });

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit form" });
  }
};
