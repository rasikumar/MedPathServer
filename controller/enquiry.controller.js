import { EnquiryForm } from "../model/Enquiry.js";

export const handleEnquiryForm = async (req, res) => {
  const formData = req.body;
  try {
    await EnquiryForm.create(formData);
    res.status(200).send("Enquiry submitted successfully");
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    res.status(500).send("Error submitting enquiry");
  }
};
