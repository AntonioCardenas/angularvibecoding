# 🧹 Clean Template Guide

## What is the Clean Template Script?

The clean template script is a utility that removes all demo/example content from this Angular boilerplate, giving you a fresh start while preserving all the configuration, structure, and best practices.

## Why Use It?

### ✅ Use the clean script when:

- Starting a new project from scratch
- You don't need authentication examples
- You want a minimal starter template
- You've learned the patterns and want a clean slate
- Building a custom app without the demo content

### ❌ Keep the examples when:

- Learning Angular 20 patterns
- Understanding signal-based state management
- Studying authentication flows
- Exploring form validation patterns
- Need reference implementations

---

## Quick Usage

```bash
npm run clean-template
```

The script will prompt for confirmation before deleting anything.

---

## What Gets Removed ❌

```
src/app/
├── auth/                    # DELETED
│   ├── login/              # Authentication pages
│   ├── register/
│   ├── forgot-password/
│   ├── user-profile/
│   ├── guards/             # Auth guards
│   └── services/           # Auth services
├── data/                    # DELETED - Demo data pages
├── home/                    # DELETED - Duplicate home folder
└── shared/
    └── example-component/   # DELETED - Example component
```

---

## What Stays ✅

```
src/app/
├── core/                    # KEPT - Core structure
│   ├── layout/             # Main layout wrapper
│   ├── header/             # Top navigation
│   ├── footer/             # Page footer
│   ├── sidenav/            # Side navigation
│   ├── home/               # Clean welcome page
│   └── not-found/          # 404 error page
│
├── shared/                  # KEPT - Utilities
│   ├── services/           # Notification service
│   ├── notification/       # Notification UI
│   ├── spinner/            # Loading spinner
│   └── shared-module.ts    # Shared module
│
├── app.config.ts           # KEPT - Configuration
├── app.routes.ts           # UPDATED - Clean routes
├── app.ts                  # KEPT - Root component
└── app.scss                # KEPT - Global styles

Configuration Files (ALL KEPT):
├── .cursorrules            # AI assistant rules
├── angular.json            # Angular config
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── postcss.config.json     # PostCSS for Tailwind
└── docs/                   # Documentation
```

---

## Before & After Comparison

### Before Cleaning (Full Template)

```typescript
// app.routes.ts - WITH AUTH
export const routes: Routes = [
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "forgot-password", component: ForgotPassword },
  {
    path: "",
    component: Layout,
    canActivate: [authGuard], // Protected routes
    children: [
      { path: "home", component: Home },
      { path: "data", component: Data },
      { path: "profile", component: Home },
      { path: "settings", component: Home },
    ],
  },
  { path: "**", component: NotFound },
];
```

### After Cleaning (Minimal)

```typescript
// app.routes.ts - CLEAN
export const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      { path: "", component: Home, title: "Home" },
      // Add your routes here
    ],
  },
  { path: "**", component: NotFound, title: "404 - Not Found" },
];
```

---

## The Clean Home Page

After cleaning, you'll get a beautiful welcome page:

```html
<!-- Clean home page with modern design -->
<div class="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
  <div class="hero-content text-center text-primary-content">
    <div class="max-w-2xl">
      <h1 class="text-5xl font-bold mb-8">🚀 Welcome to Angular VibeCoding!</h1>
      <p class="text-xl mb-6">Your modern Angular 20 template is ready to go!</p>
      <!-- Stats and links -->
    </div>
  </div>
</div>
```

---

## Running the Script

### Step 1: Decide if you want to clean

```bash
# Check what you have
ls src/app/
# Shows: auth/, core/, data/, shared/, home/, ...
```

### Step 2: Run the clean script

```bash
npm run clean-template
```

### Step 3: Confirm when prompted

```
⚠️  WARNING: This will delete demo/example content!
This action cannot be undone.

Are you sure you want to clean the template? (yes/no): yes
```

### Step 4: Watch the cleanup

```
🧹 Starting template cleanup...

📁 Removing authentication components...
  ✓ Deleted: src/app/auth

📁 Removing demo data pages...
  ✓ Deleted: src/app/data

📁 Removing example components...
  ✓ Deleted: src/app/shared/example-component

📝 Updating routes...
  ✓ Updated app.routes.ts

📝 Updating home component...
  ✓ Updated home.html
  ✓ Updated home.ts
  ✓ Updated home.scss

✅ Template cleanup complete!
```

### Step 5: Start developing

```bash
npm start
```

Visit `http://localhost:4200` to see your clean template!

---

## What You Can Do Next

After cleaning the template, you have a minimal but fully-configured Angular app. Here are some ideas:

### 1. Add Your First Feature

```bash
ng generate component features/dashboard
```

### 2. Create a Service

```bash
ng generate service features/api
```

### 3. Add a Route

```typescript
// app.routes.ts
{
  path: '',
  component: Layout,
  children: [
    { path: '', component: Home },
    { path: 'dashboard', component: Dashboard }, // New route
  ],
}
```

### 4. Use TailwindCSS + DaisyUI

```html
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Your Feature</h2>
    <p>Start building amazing things!</p>
    <div class="card-actions">
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
```

---

## Important: No Going Back!

⚠️ **The clean script permanently deletes files.**

Before running:

1. Make sure you've committed any changes
2. Review what will be deleted
3. Consider keeping the examples if you're still learning

You can always:

- Clone the repository again for fresh examples
- Check the GitHub repo for reference
- Fork the project to keep both versions

---

## Troubleshooting

### Script doesn't run

```bash
# Make sure you're in the project root
cd /path/to/angularvibecoding

# Make script executable
chmod +x scripts/clean-template.js

# Run it
npm run clean-template
```

### Want to undo?

Unfortunately, you can't undo the cleanup. Options:

1. Re-clone the repository
2. Restore from git (if you committed before cleaning)
3. Download fresh from GitHub

---

## FAQ

**Q: Will I lose my configuration?**  
A: No! All config files (angular.json, tsconfig, package.json, .cursorrules) are preserved.

**Q: Will TailwindCSS still work?**  
A: Yes! All styling configuration and setup remains intact.

**Q: Can I add my own routes after cleaning?**  
A: Absolutely! The routing structure is ready for your custom routes.

**Q: What about the layout (header, footer, sidenav)?**  
A: The layout structure is preserved and ready to use or customize.

**Q: Will the .cursorrules file be deleted?**  
A: No! The .cursorrules file stays, so AI assistants still have full context.

**Q: Can I run the script multiple times?**  
A: Yes, but after the first run, there's nothing left to clean!

---

## Support

- 📖 Read the [full documentation](../README.md)
- 🔧 Check [best practices](../docs/best-practices.md)
- 💻 Visit the [GitHub repository](https://github.com/AntonioCardenas/angularvibecoding)
- 📝 Review [script documentation](../scripts/README.md)

---

**Ready to build something amazing? Run `npm run clean-template` and let's go! 🚀**
