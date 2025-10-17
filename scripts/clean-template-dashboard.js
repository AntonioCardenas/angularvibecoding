#!/usr/bin/env node

/**
 * Clean Template Script - DASHBOARD MODE
 *
 * This keeps the full layout structure (header, sidebar, footer)
 * Perfect for building dashboard-style applications.
 *
 * What it removes:
 * - Authentication pages and services
 * - Demo data pages
 * - Example components
 *
 * What it keeps:
 * - Complete layout structure (header, footer, sidenav, layout)
 * - Clean welcome page
 * - Shared utilities
 * - All configuration files
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

function cleanTemplateDashboard() {
  const rootDir = path.join(__dirname, "..");
  const appDir = path.join(rootDir, "src", "app");

  log("\n🧹 Starting DASHBOARD mode cleanup...\n", "cyan");
  log("✅ This will keep the full layout structure!", "green");

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

  // Update app.routes.ts
  log("\n📝 Updating routes...", "yellow");
  const routesPath = path.join(appDir, "app.routes.ts");
  const cleanRoutes = `import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './core/home/home';
import { NotFound } from './core/not-found/not-found';

// Dashboard routing with layout
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        title: 'Home',
      },
      // Add your dashboard routes here
    ],
  },
  {
    path: '**',
    component: NotFound,
    title: '404 - Not Found',
  },
];
`;
  fs.writeFileSync(routesPath, cleanRoutes);
  log("  ✓ Updated app.routes.ts", "green");

  // Update home component
  log("\n📝 Updating home component...", "yellow");
  const homeHtmlPath = path.join(appDir, "core", "home", "home.html");
  const cleanHomeHtml = `<div class="p-6">
  <div class="mb-6">
    <h1 class="text-4xl font-bold mb-2">🎨 Dashboard Ready!</h1>
    <p class="text-lg text-base-content/70">
      Your Angular 20 dashboard template with full layout structure.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Angular 20+</h2>
        <p>Latest standalone architecture with signals</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Modern</div>
        </div>
      </div>
    </div>
    
    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <h2 class="card-title">Full Layout</h2>
        <p>Header, sidebar, and footer included</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Complete</div>
        </div>
      </div>
    </div>
    
    <div class="card bg-accent text-accent-content">
      <div class="card-body">
        <h2 class="card-title">Signals</h2>
        <p>Reactive state management built-in</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Reactive</div>
        </div>
      </div>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">🚀 Quick Start</h2>
      <div class="space-y-4">
        <div class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 class="font-bold">Layout Structure Included</h3>
            <div class="text-xs">Header, sidebar (collapsible), and footer are ready to customize</div>
          </div>
        </div>
        
        <div class="steps steps-vertical lg:steps-horizontal w-full">
          <div class="step step-primary">Add Routes</div>
          <div class="step step-primary">Create Components</div>
          <div class="step">Customize Layout</div>
          <div class="step">Build Features</div>
        </div>

        <div class="flex gap-2 justify-center flex-wrap">
          <a href="https://angular.dev" target="_blank" class="btn btn-primary">
            📖 Angular Docs
          </a>
          <a href="https://daisyui.com/components" target="_blank" class="btn btn-secondary">
            🎨 DaisyUI Components
          </a>
          <a href="https://github.com/AntonioCardenas/angularvibecoding" target="_blank" class="btn btn-outline">
            💻 GitHub Repo
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  fs.writeFileSync(homeHtmlPath, cleanHomeHtml);
  log("  ✓ Updated home.html", "green");

  const homeTsPath = path.join(appDir, "core", "home", "home.ts");
  const cleanHomeTs = `import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  // Your dashboard logic here
}
`;
  fs.writeFileSync(homeTsPath, cleanHomeTs);
  log("  ✓ Updated home.ts", "green");

  // Clean home.scss
  const homeScssPath = path.join(appDir, "core", "home", "home.scss");
  fs.writeFileSync(
    homeScssPath,
    "// Add your component-specific styles here\n"
  );
  log("  ✓ Updated home.scss", "green");

  // Update header component (remove auth dependencies)
  log("\n📝 Updating header component...", "yellow");
  const headerTsPath = path.join(appDir, "core", "header", "header.ts");
  const cleanHeaderTs = `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Add your header logic here
}
`;
  fs.writeFileSync(headerTsPath, cleanHeaderTs);
  log("  ✓ Updated header.ts", "green");

  const headerHtmlPath = path.join(appDir, "core", "header", "header.html");
  const cleanHeaderHtml = `<header class="navbar bg-base-100 shadow-lg">
  <div class="flex-1">
    <a routerLink="/" class="btn btn-ghost text-xl">
      🚀 AngularVibeCoding
    </a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a routerLink="/">Home</a></li>
      <li><a href="https://angular.dev" target="_blank">Docs</a></li>
      <li><a href="https://github.com/AntonioCardenas/angularvibecoding" target="_blank">GitHub</a></li>
    </ul>
  </div>
</header>
`;
  fs.writeFileSync(headerHtmlPath, cleanHeaderHtml);
  log("  ✓ Updated header.html", "green");

  // Update sidenav component (remove auth routes)
  log("\n📝 Updating sidenav component...", "yellow");
  const sidenavTsPath = path.join(appDir, "core", "sidenav", "sidenav.ts");
  const cleanSidenavTs = `import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  link: string;
  icon: string;
  visited?: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  host: {
    '[class.collapsed]': 'isCollapsed()',
  },
})
export class Sidenav {
  private router = inject(Router);

  // Navigation items - customize for your dashboard
  navItems = signal<NavItem[]>([
    { label: 'Home', link: '/', icon: '🏠', visited: false },
    // Add your dashboard navigation items here
    // Examples:
    // { label: 'Analytics', link: '/analytics', icon: '📊', visited: false },
    // { label: 'Users', link: '/users', icon: '👥', visited: false },
    // { label: 'Settings', link: '/settings', icon: '⚙️', visited: false },
  ]);

  isCollapsed = signal(false);

  toggleSidenav() {
    this.isCollapsed.update((current) => !current);
  }

  onNavClick(item: NavItem) {
    // Mark item as visited when clicked
    this.navItems.update((items) =>
      items.map((navItem) =>
        navItem.link === item.link ? { ...navItem, visited: true } : navItem
      )
    );
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }
}
`;
  fs.writeFileSync(sidenavTsPath, cleanSidenavTs);
  log("  ✓ Updated sidenav.ts", "green");

  // Update README
  log("\n📝 Updating README...", "yellow");
  const readmePath = path.join(rootDir, "README.md");
  let readme = fs.readFileSync(readmePath, "utf8");

  if (!readme.includes("Template Cleaned")) {
    const cleanNote = `\n## ✨ Dashboard Template Ready\n\nThis template has been cleaned and configured as a dashboard! The full layout structure (header, sidebar, footer) is preserved and ready to customize. All demo content has been removed.\n\n`;
    readme = readme.replace(
      "## 🚀 Key Features",
      cleanNote + "## 🚀 Key Features"
    );
    fs.writeFileSync(readmePath, readme);
    log("  ✓ Updated README.md", "green");
  }

  log("\n✅ Dashboard template ready!", "green");
  log("\n📦 What remains:", "cyan");
  log(
    "  ✓ Complete layout structure (header, footer, sidenav, layout)",
    "green"
  );
  log("  ✓ Dashboard-style home page", "green");
  log("  ✓ Clean header without auth dependencies", "green");
  log("  ✓ Customizable sidenav with examples", "green");
  log("  ✓ Shared utilities (notification, spinner)", "green");
  log("  ✓ All configuration files", "green");
  log("  ✓ TailwindCSS + DaisyUI setup", "green");
  log("  ✓ Documentation and .cursorrules", "green");

  log("\n🚀 Ready to build your dashboard!", "magenta");
  log('\nRun "npm start" to see your dashboard template.\n', "cyan");
}

function removeCleaningScripts() {
  const rootDir = path.join(__dirname, "..");
  const scriptsDir = path.join(__dirname);

  log("\n🧹 Removing cleaning scripts for fresh start...", "yellow");

  // Delete all cleaning scripts
  const scriptsToDelete = [
    "clean-template.js",
    "clean-template-dashboard.js",
    "clean-template-blank.js",
    "README.md",
  ];

  scriptsToDelete.forEach((file) => {
    const filePath = path.join(scriptsDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      log(`  ✓ Deleted: scripts/${file}`, "red");
    }
  });

  // Try to remove scripts directory if empty
  try {
    const remainingFiles = fs.readdirSync(scriptsDir);
    if (remainingFiles.length === 0) {
      fs.rmdirSync(scriptsDir);
      log("  ✓ Deleted: scripts/ directory", "red");
    }
  } catch (err) {
    // Directory not empty or other error, that's fine
  }

  // Update package.json to remove clean scripts
  log("\n📝 Updating package.json...", "yellow");
  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  delete packageJson.scripts["clean-template"];
  delete packageJson.scripts["clean-template:dashboard"];
  delete packageJson.scripts["clean-template:blank"];

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );
  log("  ✓ Removed clean-template scripts from package.json", "green");

  log(
    "\n✨ Cleaning scripts removed! You have a completely fresh start.",
    "green"
  );
}

// Confirmation prompt
log("\n🎨 DASHBOARD MODE: Keeps full layout structure", "cyan");
log("Perfect for building dashboard-style applications.", "cyan");
log("This action cannot be undone.\n", "yellow");

rl.question("Create dashboard template? (yes/no): ", (answer) => {
  if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
    cleanTemplateDashboard();
    rl.close();

    // Ask if user wants to remove cleaning scripts too
    log("\n❓ One more thing...", "cyan");
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl2.question(
      "Remove cleaning scripts for a completely fresh start? (yes/no): ",
      (answer2) => {
        if (answer2.toLowerCase() === "yes" || answer2.toLowerCase() === "y") {
          removeCleaningScripts();
        } else {
          log(
            "\n✓ Keeping cleaning scripts (you can run them again if needed)",
            "cyan"
          );
        }
        rl2.close();
      }
    );
  } else {
    log("\n❌ Cleanup cancelled.", "red");
    log('Tip: Use "npm run clean-template:blank" for blank mode.\n', "cyan");
    rl.close();
  }
});
