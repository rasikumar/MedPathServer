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
