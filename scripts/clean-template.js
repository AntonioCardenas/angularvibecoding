#!/usr/bin/env node

/**
 * Clean Template Script
 *
 * This script removes demo/example content from the Angular template
 * while keeping the core structure, configuration, and styling intact.
 *
 * What it removes:
 * - Authentication pages (login, register, forgot-password, user-profile)
 * - Auth guards and services
 * - Example components
 * - Demo data pages
 *
 * What it keeps:
 * - Core layout components (layout, header, footer, sidenav)
 * - Home page (cleaned up)
 * - Shared utilities (notification, spinner, services)
 * - All configuration files
 * - TailwindCSS and DaisyUI setup
 * - Documentation
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { spawn } = require("child_process");

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

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    log(`  ✓ Deleted: ${filePath}`, "red");
  }
}

function cleanTemplate() {
  const rootDir = path.join(__dirname, "..");
  const appDir = path.join(rootDir, "src", "app");

  log("\n🧹 Starting template cleanup...\n", "cyan");

  // Delete auth folder
  log("📁 Removing authentication components...", "yellow");
  deleteFolderRecursive(path.join(appDir, "auth"));

  // Delete data folder
  log("\n📁 Removing demo data pages...", "yellow");
  deleteFolderRecursive(path.join(appDir, "data"));

  // Delete example component
  log("\n📁 Removing example components...", "yellow");
  deleteFolderRecursive(path.join(appDir, "shared", "example-component"));

  // Delete duplicate home folder (keeping the one in core)
  log("\n📁 Removing duplicate home folder...", "yellow");
  deleteFolderRecursive(path.join(appDir, "home"));

  // Update app.routes.ts
  log("\n📝 Updating routes...", "yellow");
  const routesPath = path.join(appDir, "app.routes.ts");
  const cleanRoutes = `import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './core/home/home';
import { NotFound } from './core/not-found/not-found';

// Define the application's routes
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
      // Add your routes here
    ],
  },
  {
    path: '**', // Wildcard route for 404
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
  const cleanHomeHtml = `<div class="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
  <div class="hero-content text-center text-primary-content">
    <div class="max-w-2xl">
      <h1 class="text-5xl font-bold mb-8">
        🚀 Welcome to Angular VibeCoding!
      </h1>
      <p class="text-xl mb-6">
        Your modern Angular 20 template with standalone components, signals, 
        TailwindCSS, and DaisyUI is ready to go!
      </p>
      <div class="stats stats-vertical lg:stats-horizontal shadow bg-base-100 text-base-content">
        <div class="stat">
          <div class="stat-title">Angular</div>
          <div class="stat-value text-primary">20+</div>
          <div class="stat-desc">Latest Version</div>
        </div>
        <div class="stat">
          <div class="stat-title">Architecture</div>
          <div class="stat-value text-secondary">Standalone</div>
          <div class="stat-desc">No NgModules</div>
        </div>
        <div class="stat">
          <div class="stat-title">State</div>
          <div class="stat-value text-accent">Signals</div>
          <div class="stat-desc">Reactive & Modern</div>
        </div>
      </div>
      <div class="mt-8 flex flex-col gap-4 items-center">
        <p class="text-lg">
          ✨ Start building amazing applications with best practices built-in!
        </p>
        <div class="flex gap-4">
          <a href="https://angular.dev" target="_blank" class="btn btn-accent">
            📖 Angular Docs
          </a>
          <a href="https://github.com/AntonioCardenas/angularvibecoding" target="_blank" class="btn btn-outline btn-accent">
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
  // Your component logic here
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

  // Navigation items - add your own routes here
  navItems = signal<NavItem[]>([
    { label: 'Home', link: '/', icon: '🏠', visited: false },
    // Add your navigation items here
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

  // Update README to reflect cleaned template
  log("\n📝 Updating README...", "yellow");
  const readmePath = path.join(rootDir, "README.md");
  let readme = fs.readFileSync(readmePath, "utf8");

  // Add a note about the clean template
  if (!readme.includes("Template Cleaned")) {
    const cleanNote = `\n## ✨ Template Cleaned\n\nThis template has been cleaned and is ready for your project! The authentication examples and demo pages have been removed, leaving you with a clean slate while keeping all the configuration, styling, and core structure intact.\n\n`;
    readme = readme.replace(
      "## 🚀 Key Features",
      cleanNote + "## 🚀 Key Features"
    );
    fs.writeFileSync(readmePath, readme);
    log("  ✓ Updated README.md", "green");
  }

  log("\n✅ Template cleanup complete!", "green");
  log("\n📦 What remains:", "cyan");
  log("  ✓ Core layout components (header, footer, sidenav, layout)", "green");
  log("  ✓ Clean home page with welcome message", "green");
  log("  ✓ Updated header without auth dependencies", "green");
  log("  ✓ Updated sidenav with minimal navigation", "green");
  log("  ✓ Shared utilities (notification, spinner)", "green");
  log("  ✓ All configuration files", "green");
  log("  ✓ TailwindCSS + DaisyUI setup", "green");
  log("  ✓ Documentation and .cursorrules", "green");

  log("\n🚀 Ready to start building!", "magenta");
  log('\nRun "npm start" to see your clean template.\n', "cyan");
}

// Interactive mode selection
log("\n🎨 CLEAN TEMPLATE - Choose Your Mode\n", "cyan");
log("This script has been replaced with two specialized modes:\n", "yellow");
log("1️⃣  DASHBOARD MODE (Recommended)", "green");
log("   Keeps: Header, Sidebar, Footer, Layout structure", "green");
log(
  "   Perfect for: Dashboard apps, admin panels, full-featured apps\n",
  "green"
);
log("2️⃣  BLANK MODE (Minimal)", "blue");
log("   Removes: ALL layout structure", "blue");
log("   Perfect for: Starting from absolute scratch\n", "blue");

rl.question(
  "Choose mode (1 for Dashboard, 2 for Blank, or 'cancel'): ",
  (answer) => {
    const choice = answer.trim();
    rl.close();

    if (choice === "1" || choice.toLowerCase() === "dashboard") {
      log("\n🎨 Launching Dashboard mode...\n", "cyan");
      const child = spawn(
        "node",
        [path.join(__dirname, "clean-template-dashboard.js")],
        {
          stdio: "inherit",
        }
      );
      child.on("exit", (code) => process.exit(code));
    } else if (choice === "2" || choice.toLowerCase() === "blank") {
      log("\n✨ Launching Blank mode...\n", "cyan");
      const child = spawn(
        "node",
        [path.join(__dirname, "clean-template-blank.js")],
        {
          stdio: "inherit",
        }
      );
      child.on("exit", (code) => process.exit(code));
    } else {
      log("\n❌ Cleanup cancelled.", "red");
      log("\nYou can also run directly:", "cyan");
      log("  npm run clean-template:dashboard", "cyan");
      log("  npm run clean-template:blank\n", "cyan");
    }
  }
);
