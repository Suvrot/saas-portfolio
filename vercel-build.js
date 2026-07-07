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
if (!script) {
  console.error("Unknown project:", project);
  process.exit(1);
}

console.log("Building project:", project, "→", script);
execSync("npm run " + script, { stdio: "inherit" });
