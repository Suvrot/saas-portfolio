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
  console.log("Building project:", project, "→", script);
  execSync("npm run " + script, { stdio: "inherit" });
} else {
  console.log("Unknown project:", project, "— building all apps");
  const scripts = Object.values(map);
  for (const s of scripts) {
    console.log("Building:", s);
    execSync("npm run " + s, { stdio: "inherit" });
  }
}
