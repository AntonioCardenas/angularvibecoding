#!/usr/bin/env node

/**
 * Clean Template Script - BLANK MODE
 *
 * This creates a totally blank scaffold with just the essentials.
 * Perfect for starting from absolute scratch.
 *
 * What it removes:
 * - All auth pages and services
 * - All demo components and pages
 * - Layout structure (header, footer, sidenav)
 * - Example components
 *
 * What it keeps:
 * - Basic routing with a single home page
 * - Shared utilities (notification, spinner)
 * - All configuration files
 * - TailwindCSS and DaisyUI setup
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    log(`  ✓ Deleted: ${folderPath}`, "red");
  }
}

function cleanTemplateBlank() {
  const rootDir = path.join(__dirname, "..");
  const appDir = path.join(rootDir, "src", "app");

  log("\n🧹 Starting BLANK scaffold cleanup...\n", "cyan");
  log(
    "⚠️  This will create a minimal scaffold with NO layout structure!",
    "yellow"
  );

  // Delete auth folder
  log("\n📁 Removing authentication components...", "yellow");
  deleteFolderRecursive(path.join(appDir, "auth"));

  // Delete data folder
  log("\n📁 Removing demo data pages...", "yellow");
  deleteFolderRecursive(path.join(appDir, "data"));

  // Delete example component
  log("\n📁 Removing example components...", "yellow");
  deleteFolderRecursive(path.join(appDir, "shared", "example-component"));

  // Delete duplicate home folder
  log("\n📁 Removing duplicate home folder...", "yellow");
  deleteFolderRecursive(path.join(appDir, "home"));

  // Delete core layout structure (header, footer, sidenav, layout)
  log("\n📁 Removing layout structure...", "yellow");
  deleteFolderRecursive(path.join(appDir, "core", "header"));
  deleteFolderRecursive(path.join(appDir, "core", "footer"));
  deleteFolderRecursive(path.join(appDir, "core", "sidenav"));
  deleteFolderRecursive(path.join(appDir, "core", "layout"));

  // Update app.routes.ts - MINIMAL routing
  log("\n📝 Creating minimal routes...", "yellow");
  const routesPath = path.join(appDir, "app.routes.ts");
  const minimalRoutes = `import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { NotFound } from './core/not-found/not-found';

// Minimal routing - add your routes here
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  // Add your routes here
  {
    path: '**',
    component: NotFound,
    title: '404 - Not Found',
  },
];
`;
  fs.writeFileSync(routesPath, minimalRoutes);
  log("  ✓ Updated app.routes.ts", "green");

  // Update app.html - NO layout wrapper
  log("\n📝 Updating root template...", "yellow");
  const appHtmlPath = path.join(appDir, "app.html");
  const minimalAppHtml = `<!-- Blank scaffold - pure router outlet -->
<router-outlet />
`;
  fs.writeFileSync(appHtmlPath, minimalAppHtml);
  log("  ✓ Updated app.html", "green");

  // Update home component - MINIMAL
  log("\n📝 Creating minimal home component...", "yellow");
  const homeHtmlPath = path.join(appDir, "core", "home", "home.html");
  const minimalHomeHtml = `<div class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="card bg-base-100 shadow-xl max-w-2xl">
    <div class="card-body">
      <h1 class="card-title text-4xl justify-center mb-4">
        ✨ Blank Canvas Ready
      </h1>
      <p class="text-center text-lg mb-4">
        Your minimal Angular 20 scaffold is ready to build on!
      </p>
      <div class="divider"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="stat bg-base-200 rounded-lg">
          <div class="stat-title">Angular</div>
          <div class="stat-value text-primary text-2xl">20+</div>
          <div class="stat-desc">Latest</div>
        </div>
        <div class="stat bg-base-200 rounded-lg">
          <div class="stat-title">Mode</div>
          <div class="stat-value text-secondary text-2xl">Blank</div>
          <div class="stat-desc">Minimal</div>
        </div>
        <div class="stat bg-base-200 rounded-lg">
          <div class="stat-title">State</div>
          <div class="stat-value text-accent text-2xl">Signals</div>
          <div class="stat-desc">Reactive</div>
        </div>
      </div>
      <div class="card-actions justify-center">
        <a href="https://angular.dev" target="_blank" class="btn btn-primary">
          📖 Docs
        </a>
        <a href="https://github.com/AntonioCardenas/angularvibecoding" target="_blank" class="btn btn-outline">
          💻 GitHub
        </a>
      </div>
      <div class="alert alert-info mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>No layout structure - build your app from scratch!</span>
      </div>
    </div>
  </div>
</div>
`;
  fs.writeFileSync(homeHtmlPath, minimalHomeHtml);
  log("  ✓ Updated home.html", "green");

  const homeTsPath = path.join(appDir, "core", "home", "home.ts");
  const minimalHomeTs = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  // Your blank canvas starts here - build anything!
}
`;
  fs.writeFileSync(homeTsPath, minimalHomeTs);
  log("  ✓ Updated home.ts", "green");

  // Clean home.scss
  const homeScssPath = path.join(appDir, "core", "home", "home.scss");
  fs.writeFileSync(homeScssPath, "// Add your styles here\n");
  log("  ✓ Updated home.scss", "green");

  // Update README
  log("\n📝 Updating README...", "yellow");
  const readmePath = path.join(rootDir, "README.md");
  let readme = fs.readFileSync(readmePath, "utf8");

  if (!readme.includes("Template Cleaned")) {
    const cleanNote = `\n## ✨ Blank Scaffold Created\n\nThis template has been cleaned to a blank scaffold! All layout structures and demo content have been removed, leaving you with a minimal starting point. TailwindCSS, DaisyUI, and all configuration remain intact.\n\n`;
    readme = readme.replace(
      "## 🚀 Key Features",
      cleanNote + "## 🚀 Key Features"
    );
    fs.writeFileSync(readmePath, readme);
    log("  ✓ Updated README.md", "green");
  }

  log("\n✅ Blank scaffold created!", "green");
  log("\n📦 What remains:", "cyan");
  log("  ✓ Single home component (minimal)", "green");
  log("  ✓ Not found page (404)", "green");
  log("  ✓ Shared utilities (notification, spinner)", "green");
  log("  ✓ All configuration files", "green");
  log("  ✓ TailwindCSS + DaisyUI setup", "green");
  log("  ✓ Documentation and .cursorrules", "green");

  log("\n⚠️  What was removed:", "yellow");
  log("  ✗ Header, Footer, Sidenav (layout structure)", "red");
  log("  ✗ All authentication components", "red");
  log("  ✗ All demo pages", "red");

  log("\n🚀 Ready to build from scratch!", "magenta");
  log('\nRun "npm start" to see your blank canvas.\n', "cyan");
}

// Confirmation prompt
log("\n⚠️  BLANK MODE: This removes EVERYTHING including layout!", "yellow");
log("You'll get a single home page with NO header/footer/sidenav.", "yellow");
log("This action cannot be undone.\n", "yellow");

rl.question("Are you sure you want a blank scaffold? (yes/no): ", (answer) => {
  if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
    cleanTemplateBlank();
  } else {
    log("\n❌ Cleanup cancelled.", "red");
    log(
      'Tip: Use "npm run clean-template:dashboard" for dashboard mode.\n',
      "cyan"
    );
  }
  rl.close();
});
