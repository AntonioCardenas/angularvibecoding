# Template Cleanup Script

This directory contains utility scripts for managing the Angular VibeCoding template.

## clean-template.js

A script that removes demo/example content from the template while keeping the core structure, configuration, and styling intact.

### What It Does

**Removes:**

- 🗑️ Authentication pages (login, register, forgot-password)
- 🗑️ Auth guards and services
- 🗑️ Example components
- 🗑️ Demo data pages
- 🗑️ User profile components

**Keeps & Updates:**

- ✅ Core layout components (layout, header, footer, sidenav)
- ✅ Clean home page with welcome message
- ✅ Updated header (removes auth dependencies, adds clean navigation)
- ✅ Updated sidenav (removes demo routes, keeps structure)
- ✅ Shared utilities (notification service, spinner)
- ✅ All configuration files (angular.json, tsconfig, etc.)
- ✅ TailwindCSS and DaisyUI setup
- ✅ Documentation and .cursorrules
- ✅ Best practices structure

### Usage

From the project root, run:

```bash
npm run clean-template
```

Or directly:

```bash
node scripts/clean-template.js
```

### Interactive Confirmation

The script will ask for confirmation before proceeding:

```
⚠️  WARNING: This will delete demo/example content!
This action cannot be undone.

Are you sure you want to clean the template? (yes/no):
```

Type `yes` or `y` to proceed, or `no` to cancel.

### After Cleaning

Once the script completes, you'll have a clean template ready for your project:

```
✅ Template cleanup complete!

📦 What remains:
  ✓ Core layout components (header, footer, sidenav, layout)
  ✓ Clean home page with welcome message
  ✓ Updated header without auth dependencies
  ✓ Updated sidenav with minimal navigation
  ✓ Shared utilities (notification, spinner)
  ✓ All configuration files
  ✓ TailwindCSS + DaisyUI setup
  ✓ Documentation and .cursorrules

🚀 Ready to start building!
```

Run `npm start` to see your clean template in action!

### When to Use

- ✅ Starting a new project and don't need the auth examples
- ✅ Want a minimal starter template
- ✅ Learning the structure without example clutter
- ✅ Building from scratch with just the essentials

### When NOT to Use

- ❌ You want to learn from the authentication examples
- ❌ You need the example components as reference
- ❌ You're still exploring the template features

### File Structure After Cleanup

```
src/app/
├── app.config.ts           # App configuration
├── app.html                # Root template
├── app.routes.ts           # Clean routes (updated)
├── app.scss                # Global styles
├── app.ts                  # Root component
├── core/                   # Core components
│   ├── footer/            # Footer component
│   ├── header/            # Header component
│   ├── home/              # Clean home page
│   ├── layout/            # Main layout
│   ├── not-found/         # 404 page
│   └── sidenav/           # Side navigation
└── shared/                # Shared utilities
    ├── notification/      # Notification UI
    ├── services/          # Shared services
    ├── shared-module.ts   # Shared module
    └── spinner/           # Loading spinner
```

### Need Help?

Check the main [README.md](../README.md) for more information about the template structure and best practices.
