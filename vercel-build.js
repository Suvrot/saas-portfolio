const { execSync } = require("child_process");

const project = process.env.VERCEL_PROJECT_NAME || "";
const map = {
  "ai-saas-platform": "build:ai",
  "smart-crm": "build:crm",
  "finance-dashboard": "build:finance",
  "ecommerce-platform": "build:ecommerce",
  "ai-chat-app": "build:chat",
  "task-manager": "build:tasks",
};

const script = map[project];
if (script) {
  console.log("Building project:", project, "\u2192", script);
  execSync("npm run " + script, { stdio: "inherit" });
} else {
  console.error("ERROR: Unknown VERCEL_PROJECT_NAME:", project);
  console.error("Expected one of:", Object.keys(map).join(", "));
  process.exit(1);
}