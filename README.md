# Unlock Rapid Development: Your Angular 20 Boilerplate for VibeCoding & Beyond!

**Welcome to Angularvibecoding!** This isn't just another template; it's a launchpad for building beautiful, modern, and high-performance web applications. It's pre-configured with a cutting-edge tech stack and structured for maximum productivity, scalability, and developer satisfaction.

This boilerplate is **Tailwind 4 and DaisyUI ready** and optimized for cloud-based IDEs like **Firebase Studio**.

---

## 🚀 Key Features

- **Future-Proof Angular:** Built on the latest **Angular 20** with a fully `standalone` architecture. No `NgModules`, just pure, modern components.
- **Reactive at its Core:** Leverages **Angular Signals** for clean, intuitive state management and the new **`@if` / `@for` / `@defer`** control flow for lightning-fast UIs.
- **Stunning UIs Out-of-the-Box:** Comes with **TailwindCSS** and **DaisyUI** fully integrated via SCSS. Create beautiful designs without ever leaving your component files.
- **Built for AI Collaboration:** This repository is meticulously documented and structured to provide perfect context for **Google's Gemini Code Assist**, turning it into your expert pair programmer.

## 🤖 Mastering Context: Optimizing Gemini Code Assist

This project is designed to transform Gemini from a general AI into a specialized expert on _this_ boilerplate. By understanding the following principles, you will get more accurate and consistent code.

### 1. The Project Manifest (`README.md`)

You're reading it! This file is the "master prompt" that tells Gemini about our architecture, tech stack, and conventions.

#### ✨ Our Vibe: Coding Conventions & Principles

- **Architecture:** We use a `standalone` feature-based structure. Components, directives, and services are self-contained.
- **Component Naming:** We keep it clean. No `.component.ts` or `.service.ts` suffixes.
- **Styling:** SCSS is the primary engine. Tailwind and DaisyUI classes are used directly in HTML templates for rapid UI development.
- **Philosophy:** Write clean, scalable, and reactive code. **Signals** are preferred for state management. **RxJS** is reserved for complex asynchronous operations.

### 2. Scoped Context with `.vscode/settings.json`

To focus Gemini, we explicitly define which files matter most. Create a `.vscode/settings.json` file in your project root with the following to reduce noise and improve suggestion quality:

```json
{
  "gemini.context.include": ["src/app/**/*.ts", "src/app/**/*.html", "src/app/**/*.scss", "angular.json", "package.json", "README.md"]
}
```

### 3. In-Code Directives (Comments)

Guide Gemini at the file level with `@context:` comments. This is incredibly powerful for ensuring consistency.

- **TypeScript Example (`.ts`):**

  ```typescript
  // @context: Standalone Angular 20 login component using signals for reactive form state.
  import { Component, signal } from "@angular/core";
  ```

- **HTML Example (`.html`):**

  ```html
  <!-- @context: Component template styled with a mix of SCSS, TailwindCSS, and DaisyUI. -->
  <div class="hero">...</div>
  ```

---

## Tech Stack

Angular 20 standalone (no NgModules)

Angular Signals (signal, computed, effect)

Modern Control Flow: @if, @for, @defer

TailwindCSS + DaisyUI (with SCSS, no tailwind.config.js)

RxJS for complex asynchronous operations

SCSS as the main styling engine

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component path/your-component-name
```

**Important Naming and Structure Conventions:**

- **No Suffixes for Core Files:** This project does **not** use standard Angular file suffixes like `.component.ts` or `.service.ts`. For example, a login component's TypeScript file would be `login.ts` (not `login.component.ts`).
- **Descriptive Naming:** Always use clear and descriptive names for your components, services, etc.
- **Group by Feature/Type:** Organize related files within dedicated folders. Follow a structure similar to this:
- `/auth/` for login, registration, guards, authentication services.
- `/core/` for header, footer, layout, sidenav, global singleton services.
- `/features/` for distinct business feature modules (e.g., `/products`, `/orders`).
- `/shared/` for reusable components, pipes, directives, and utility services.

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

📂 Project Structure
Briefly explain the layout of your src/app directory or main source folder. This helps Gemini locate files and understand the separation of concerns.

Example (src/app):

```bash

├── src
│ ├── app
│ │ ├── app.config.ts
│ │ ├── app.html
│ │ ├── app.routes.ts
│ │ ├── app.scss
│ │ ├── app.spec.ts
│ │ ├── app.ts
│ │ ├── auth
│ │ │ ├── auth-module.ts
│ │ │ ├── auth-routing-module.ts
│ │ │ ├── forgot-password
│ │ │ │ ├── forgot-password.html
│ │ │ │ ├── forgot-password.scss
│ │ │ │ ├── forgot-password.spec.ts
│ │ │ │ └── forgot-password.ts
│ │ │ ├── guards
│ │ │ │ ├── auth-guard.spec.ts
│ │ │ │ └── auth-guard.ts
│ │ │ ├── login
│ │ │ │ ├── login.html
│ │ │ │ ├── login.scss
│ │ │ │ ├── login.spec.ts
│ │ │ │ └── login.ts
│ │ │ ├── not-found
│ │ │ │ ├── not-found.html
│ │ │ │ ├── not-found.scss
│ │ │ │ ├── not-found.spec.ts
│ │ │ │ └── not-found.ts
│ │ │ ├── register
│ │ │ │ ├── register.html
│ │ │ │ ├── register.scss
│ │ │ │ ├── register.spec.ts
│ │ │ │ └── register.ts
│ │ │ ├── services
│ │ │ │ ├── auth.spec.ts
│ │ │ │ └── auth.ts
│ │ │ └── user-profile
│ │ │ ├── user-profile.html
│ │ │ ├── user-profile.scss
│ │ │ ├── user-profile.spec.ts
│ │ │ └── user-profile.ts
│ │ ├── core
│ │ │ ├── footer
│ │ │ │ ├── footer.html
│ │ │ │ ├── footer.scss
│ │ │ │ ├── footer.spec.ts
│ │ │ │ └── footer.ts
│ │ │ ├── header
│ │ │ │ ├── header.html
│ │ │ │ ├── header.scss
│ │ │ │ ├── header.spec.ts
│ │ │ │ └── header.ts
│ │ │ ├── layout
│ │ │ │ ├── layout.html
│ │ │ │ ├── layout.scss
│ │ │ │ ├── layout.spec.ts
│ │ │ │ └── layout.ts
│ │ │ ├── not-found
│ │ │ │ ├── not-found.html
│ │ │ │ ├── not-found.scss
│ │ │ │ ├── not-found.spec.ts
│ │ │ │ └── not-found.ts
│ │ │ └── sidenav
│ │ │ ├── sidenav.html
│ │ │ ├── sidenav.scss
│ │ │ ├── sidenav.spec.ts
│ │ │ └── sidenav.ts
│ │ └── shared
│ │ ├── notification
│ │ │ ├── notification-ui.html
│ │ │ ├── notification-ui.scss
│ │ │ ├── notification-ui.spec.ts
│ │ │ └── notification-ui.ts
│ │ ├── services
│ │ │ ├── notification.spec.ts
│ │ │ └── notification.ts
│ │ ├── shared-module.ts
│ │ └── spinner
│ │ ├── spinner.html
│ │ ├── spinner.scss
│ │ ├── spinner.spec.ts
│ │ └── spinner.ts
──────────────────
```

✨ Coding Conventions & Key Principles
This is crucial for ensuring generated code is consistent with your project's style.

Architecture: The project uses a feature-based structure. All components, services, and directives are standalone.

Styling: SCSS is integrated directly. TailwindCSS classes are used in templates without a tailwind.config.js file. DaisyUI provides UI components.

Philosophy: The primary goal is to write clean, scalable, and reactive UI-oriented code. Signals and the new control flow (@if, @for) are preferred over RxJS for simple state management and NgIf/NgFor.
