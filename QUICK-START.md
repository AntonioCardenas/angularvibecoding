# 🚀 Quick Start Guide - Angular VibeCoding

## Two Ways to Start

### Option 1: Learn from Examples 📚

Keep the template as-is to explore:

- ✅ Authentication flow (login, register, forgot password)
- ✅ Route guards implementation
- ✅ Form validation with signals
- ✅ Component structure examples
- ✅ Service patterns

```bash
npm install
npm start
```

Visit `http://localhost:4200` and explore the demo pages.

---

### Option 2: Start Fresh 🧹 - Choose Your Mode!

Remove all demo content with **two modes**:

#### 2A: Dashboard Mode (Recommended)

Perfect for dashboards and admin panels. Keeps full layout structure.

```bash
npm install
npm run clean-template:dashboard
npm start
```

**What you get:**

- ✨ Complete layout (header, sidebar, footer)
- ✨ Dashboard-style welcome page
- ✨ Professional navigation structure
- ✨ Ready to add your features!

#### 2B: Blank Mode (Minimal)

Perfect for custom designs. Minimal scaffold with no layout.

```bash
npm install
npm run clean-template:blank
npm start
```

**What you get:**

- ✨ Minimal single page
- ✨ No predefined layout
- ✨ Maximum flexibility
- ✨ Build from scratch!

#### 2C: Interactive Selection

Not sure? Let the script ask you:

```bash
npm install
npm run clean-template
# Choose 1 (Dashboard) or 2 (Blank)
npm start
```

**Both modes keep:**

- ✨ All configuration (TailwindCSS, DaisyUI, TypeScript, .cursorrules)
- ✨ Shared utilities (notification, spinner)
- ✨ Beautiful welcome page

---

## Project Structure (After Cleaning)

```
angularvibecoding/
├── src/app/
│   ├── core/              # Core layout components
│   │   ├── header/        # Top navigation
│   │   ├── footer/        # Page footer
│   │   ├── sidenav/       # Side navigation
│   │   ├── layout/        # Main layout wrapper
│   │   ├── home/          # Clean home page
│   │   └── not-found/     # 404 page
│   │
│   ├── shared/            # Reusable utilities
│   │   ├── services/      # Shared services
│   │   ├── notification/  # Notification system
│   │   └── spinner/       # Loading spinner
│   │
│   ├── app.routes.ts      # Clean routing config
│   └── app.config.ts      # App configuration
│
├── docs/                  # Documentation
│   ├── best-practices.md  # Coding standards
│   └── setup.md           # AI setup guide
│
├── scripts/               # Utility scripts
│   ├── clean-template.js  # Template cleanup
│   └── README.md          # Script documentation
│
├── .cursorrules           # AI assistant rules
├── package.json           # Dependencies
└── README.md              # This file

```

---

## Essential Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Clean template (remove demos)
npm run clean-template

# Generate new component
ng generate component features/my-feature

# Generate new service
ng generate service features/my-service
```

---

## Key Features

### 🎯 Modern Angular 20

- Standalone components (no NgModules)
- Angular Signals for state management
- Native control flow (`@if`, `@for`, `@switch`)
- OnPush change detection everywhere

### 💅 Beautiful Styling

- TailwindCSS 4 fully integrated
- DaisyUI components ready to use
- SCSS for component-specific styles
- Responsive design out of the box

### 🤖 AI-Optimized

- `.cursorrules` for Cursor AI
- Comprehensive documentation
- Best practices built-in
- Type-safe throughout

### ⚡ Performance

- Signal-based reactivity
- Lazy loading ready
- Optimized change detection
- Production-ready build config

---

## Important Conventions

### ⚠️ File Naming

This project does **NOT** use standard Angular suffixes:

- ✅ `login.ts` (not `login.component.ts`)
- ✅ `auth.ts` (not `auth.service.ts`)
- ✅ `auth-guard.ts` (not `auth.guard.ts`)

### ⚠️ Template Syntax

Use modern Angular control flow:

```html
<!-- ✅ DO THIS -->
@if (isVisible()) {
<div>Content</div>
} @for (item of items(); track item.id) {
<div>{{ item.name }}</div>
}

<!-- ❌ DON'T DO THIS -->
<div *ngIf="isVisible()">Content</div>
<div *ngFor="let item of items()">{{ item.name }}</div>
```

### ⚠️ Component Structure

Use inject() and signals:

```typescript
import { Component, signal, computed, inject } from "@angular/core";

@Component({
  selector: "app-example",
  templateUrl: "./example.html",
  styleUrl: "./example.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example {
  // Use inject() instead of constructor injection
  private router = inject(Router);

  // Use signals for state
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  // Use input() and output() functions
  title = input<string>("Default");
  clicked = output<void>();
}
```

---

## Next Steps

1. **Choose your path**: Keep examples or clean template
2. **Read the docs**: Check `docs/best-practices.md`
3. **Review .cursorrules**: Understand the coding standards
4. **Start building**: Create your first feature!

---

## Resources

- 📖 [Angular Documentation](https://angular.dev)
- 🎨 [TailwindCSS Docs](https://tailwindcss.com)
- 🌼 [DaisyUI Components](https://daisyui.com)
- 💻 [GitHub Repository](https://github.com/AntonioCardenas/angularvibecoding)

---

## Need Help?

- Check `docs/best-practices.md` for coding examples
- Review `.cursorrules` for project conventions
- Look at existing components for patterns
- Read `scripts/README.md` for script documentation

---

**Happy coding! 🎉**
