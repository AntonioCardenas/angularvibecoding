# Clean Template Modes Guide

## Overview

The Angular VibeCoding template offers **two cleaning modes** to match your project needs:

1. **🎨 Dashboard Mode** - Full layout structure (header, sidebar, footer)
2. **✨ Blank Mode** - Minimal scaffold (no layout, just routing)

---

## 🎨 Dashboard Mode (Recommended)

### Perfect For:

- Dashboard applications
- Admin panels
- Internal tools
- Apps with consistent navigation
- Full-featured web applications

### What You Get:

```
src/app/
├── core/
│   ├── header/        ✅ Clean navigation header
│   ├── footer/        ✅ App footer
│   ├── sidenav/       ✅ Collapsible sidebar with examples
│   ├── layout/        ✅ Main layout wrapper
│   ├── home/          ✅ Dashboard-style welcome page
│   └── not-found/     ✅ 404 page
├── shared/
│   ├── notification/  ✅ Notification system
│   ├── spinner/       ✅ Loading spinner
│   └── services/      ✅ Shared services
└── app.routes.ts      ✅ Routing with layout
```

### Run Dashboard Mode:

```bash
# Interactive selection
npm run clean-template
# Then choose: 1

# Or run directly
npm run clean-template:dashboard
```

**After cleaning, you'll be asked:**

```
Remove cleaning scripts for a completely fresh start? (yes/no):
```

- Type `yes` = Scripts folder and npm commands removed (completely fresh!)
- Type `no` = Keep scripts (can clean again if needed)

### After Cleaning - Dashboard Mode:

**Visual Structure:**

```
┌─────────────────────────────────────┐
│         Header (Fixed Top)          │
├────────┬────────────────────────────┤
│        │                            │
│ Side   │      Main Content          │
│ nav    │      (router-outlet)       │
│        │                            │
│        │                            │
├────────┴────────────────────────────┤
│           Footer                    │
└─────────────────────────────────────┘
```

**Home Page Includes:**

- Dashboard-style welcome page
- Stats cards (Angular 20, Layout, Signals)
- Quick start steps
- Links to resources

**What to Do Next:**

1. Add your routes to `app.routes.ts`
2. Customize sidenav items in `sidenav.ts`
3. Update header links in `header.html`
4. Create your dashboard components

**Example - Adding a Dashboard Route:**

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      { path: "", component: Home, title: "Home" },
      { path: "analytics", component: Analytics, title: "Analytics" }, // NEW
      { path: "users", component: Users, title: "Users" }, // NEW
    ],
  },
];
```

```typescript
// sidenav.ts
navItems = signal<NavItem[]>([
  { label: "Home", link: "/", icon: "🏠", visited: false },
  { label: "Analytics", link: "/analytics", icon: "📊", visited: false }, // NEW
  { label: "Users", link: "/users", icon: "👥", visited: false }, // NEW
]);
```

---

## ✨ Blank Mode (Minimal)

### Perfect For:

- Starting from absolute scratch
- Custom layout designs
- Landing pages
- Single-page applications
- Maximum flexibility

### What You Get:

```
src/app/
├── core/
│   ├── home/          ✅ Single minimal page
│   └── not-found/     ✅ 404 page
├── shared/
│   ├── notification/  ✅ Notification system
│   ├── spinner/       ✅ Loading spinner
│   └── services/      ✅ Shared services
└── app.routes.ts      ✅ Simple routing (no layout)
```

### What's Removed:

- ❌ Header component
- ❌ Footer component
- ❌ Sidenav component
- ❌ Layout component
- ❌ All demo pages

### Run Blank Mode:

```bash
# Interactive selection
npm run clean-template
# Then choose: 2

# Or run directly
npm run clean-template:blank
```

**After cleaning, you'll be asked:**

```
Remove cleaning scripts for a completely fresh start? (yes/no):
```

- Type `yes` = Scripts folder and npm commands removed (completely fresh!)
- Type `no` = Keep scripts (can clean again if needed)

### After Cleaning - Blank Mode:

**Visual Structure:**

```
┌─────────────────────────────────────┐
│                                     │
│         Direct Router Outlet        │
│         (No layout wrapper)         │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Home Page Includes:**

- Centered card with welcome message
- Stats display (Angular 20, Blank, Signals)
- Links to documentation
- Info alert about blank mode

**What to Do Next:**

1. Create your own layout (if needed)
2. Add your routes to `app.routes.ts`
3. Build your components
4. Design your custom structure

**Example - Building Custom Layout:**

```bash
# Generate your own layout
ng generate component core/my-layout
ng generate component core/my-header
```

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: "", component: Home, title: "Home" },
  { path: "about", component: About, title: "About" },
  // Or use your custom layout
  {
    path: "app",
    component: MyLayout,
    children: [
      // Your routes here
    ],
  },
];
```

---

## Comparison Table

| Feature            | Dashboard Mode           | Blank Mode                    |
| ------------------ | ------------------------ | ----------------------------- |
| **Header**         | ✅ Included              | ❌ Removed                    |
| **Footer**         | ✅ Included              | ❌ Removed                    |
| **Sidenav**        | ✅ Included              | ❌ Removed                    |
| **Layout Wrapper** | ✅ Included              | ❌ Removed                    |
| **Home Page**      | Dashboard-style          | Minimal card                  |
| **Routing**        | Nested (with layout)     | Flat (direct)                 |
| **Best For**       | Dashboards, Admin Panels | Custom designs, Landing pages |
| **Flexibility**    | Structured               | Maximum                       |
| **Setup Time**     | Faster (ready to use)    | Slower (build from scratch)   |

---

## Interactive Selection

When you run `npm run clean-template`, you'll see:

```
🎨 CLEAN TEMPLATE - Choose Your Mode

This script has been replaced with two specialized modes:

1️⃣  DASHBOARD MODE (Recommended)
   Keeps: Header, Sidebar, Footer, Layout structure
   Perfect for: Dashboard apps, admin panels, full-featured apps

2️⃣  BLANK MODE (Minimal)
   Removes: ALL layout structure
   Perfect for: Starting from absolute scratch

Choose mode (1 for Dashboard, 2 for Blank, or 'cancel'):
```

---

## Common Workflows

### Workflow 1: Build a Dashboard App

```bash
# 1. Choose Dashboard mode
npm run clean-template:dashboard

# 2. Create your features
ng generate component features/analytics
ng generate component features/users
ng generate component features/settings

# 3. Update routes and sidenav
# Edit: app.routes.ts
# Edit: core/sidenav/sidenav.ts

# 4. Start building
npm start
```

### Workflow 2: Build a Custom App

```bash
# 1. Choose Blank mode
npm run clean-template:blank

# 2. Create your custom layout
ng generate component core/custom-layout
ng generate component core/custom-nav

# 3. Build your structure
# Create components as needed

# 4. Configure routing
# Edit: app.routes.ts

# 5. Start building
npm start
```

---

## Still Can't Decide?

### Choose Dashboard Mode If:

- ✅ You want to start building features immediately
- ✅ Your app needs consistent navigation
- ✅ You're building an admin panel or dashboard
- ✅ You want a proven structure

### Choose Blank Mode If:

- ✅ You want complete control over layout
- ✅ You're building a unique design
- ✅ You don't need header/sidebar/footer
- ✅ You're building a landing page or marketing site

**When in doubt, choose Dashboard Mode!** You can always customize or remove components later.

---

## Switching Between Modes

**Can't switch!** Once you run a clean script, it's permanent (unless you restore from git).

**To try both:**

1. Commit your work
2. Create a branch for testing
3. Try one mode
4. If not satisfied, restore and try the other

```bash
git add .
git commit -m "Before cleaning template"
git checkout -b try-blank-mode
npm run clean-template:blank
# Test it out...
# If you don't like it:
git checkout main
npm run clean-template:dashboard
```

---

## Undo / Restore

**There is no undo!** But you can restore:

```bash
# If you haven't committed
git restore .
git clean -fd

# If you committed but want to go back
git reset --hard HEAD~1

# Or just re-clone
git clone https://github.com/AntonioCardenas/angularvibecoding.git fresh-copy
```

---

## FAQs

**Q: Which mode is recommended?**  
A: Dashboard mode for most applications. It gives you structure while remaining flexible.

**Q: Can I customize after cleaning?**  
A: Absolutely! Both modes keep all components and styles editable.

**Q: Will my configuration be lost?**  
A: No! Both modes preserve all config files, TailwindCSS setup, and documentation.

**Q: Can I run the script multiple times?**  
A: Yes, but once files are deleted, they can't be deleted again. It's safe to run multiple times.

**Q: Do I lose TailwindCSS or DaisyUI?**  
A: No! All styling configuration remains intact in both modes.

---

## Need Help?

- 📖 [Main README](../README.md)
- 🚀 [Quick Start Guide](../QUICK-START.md)
- 💡 [Best Practices](./best-practices.md)
- 💬 [GitHub Issues](https://github.com/AntonioCardenas/angularvibecoding/issues)

---

**Happy building! Choose the mode that fits your vision.** 🚀
