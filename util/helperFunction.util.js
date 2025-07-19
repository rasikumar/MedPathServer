// Utility function to check for existing user conflicts
// Returns an error object if a conflict is found, otherwise null
import fs from "fs";
import path from "path";

export function renderTemplate(templateName, data) {
  const templatePath = path.join(process.cwd(), "templates", templateName);
  let html = fs.readFileSync(templatePath, "utf8");
  for (const key in data) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
  }
  return html;
}

export function checkUserConflict(existingUser, formData) {
  if (!existingUser) return null;
  if (
    existingUser.email === formData.email &&
    existingUser.mobile === formData.mobile
  ) {
    return { error: "Both email and mobile number are already in use." };
  } else if (existingUser.email === formData.email) {
    return { error: "Email is already in use." };
  } else {
    return { error: "Mobile number is already in use." };
  }
}
