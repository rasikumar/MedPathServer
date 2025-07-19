import transporter from "../config/EMAILConfig.js";
import { EnquiryForm } from "../model/Enquiry.js";
import {
  checkUserConflict,
  renderTemplate,
} from "../util/helperFunction.util.js";
export const handleEnquiryForm = async (req, res) => {
  const formData = req.body;
  try {
    const existingUser = await EnquiryForm.findOne({
      $or: [{ email: formData.email }, { mobile: formData.mobile }],
    });

    if (existingUser) {
      const conflict = checkUserConflict(existingUser, formData);
      if (conflict) {
        return res.status(400).json(conflict);
      }
    }

    await EnquiryForm.create(formData);

    const userEmail = formData.email;
    const ownerEmail = process.env.EMAIL_USER;
    const userHtml = renderTemplate("inquiry_user.html", formData);
    const ownerHtml = renderTemplate("inquiry_owner.html", formData);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your Inquiry Form Submission",
      html: userHtml,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: "New Inquiry Form Submission",
      html: ownerHtml,
    });

    res.status(200).send("Enquiry submitted successfully");
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    res.status(500).send("Error submitting enquiry");
  }
};
