# 🧪 Test Plan: Clean Template Script

## Purpose

This document provides a step-by-step test plan to verify the clean template script works correctly and fixes all dependency issues.

## Prerequisites

- Fresh clone of the repository
- Node.js installed
- npm dependencies installed

## Test Scenario 1: Before Cleaning (With Errors)

### Steps

```bash
# 1. Start with fresh repo
git status  # Should be clean

# 2. Try to run the app (should work with auth examples)
npm start
```

### Expected Result

- ✅ App builds successfully
- ✅ Can visit http://localhost:4200
- ✅ See auth pages (login, register, etc.)
- ✅ Header shows login/logout based on auth state
- ✅ Sidenav shows Home, Data, Profile, Settings

---

## Test Scenario 2: Manual File Deletion (Causes Errors)

### Steps

```bash
# 1. Manually delete auth folder
rm -rf src/app/auth

# 2. Try to start the app
npm start
```

### Expected Result (Before Our Fix)

- ❌ Build FAILS with errors:
  ```
  ✘ [ERROR] Could not resolve "../../auth/services/auth"
  ✘ [ERROR] TS2307: Cannot find module '../../auth/services/auth'
  ✘ [ERROR] TS2339: Property 'email' does not exist on type '{}'
  ```

**Why?** Header and sidenav still reference deleted auth service!

---

## Test Scenario 3: Using Clean Template Script (Fixed!)

### Steps

```bash
# 1. Start fresh (or restore from git)
git restore .
git clean -fd

# 2. Run the clean template script
npm run clean-template

# 3. Confirm when prompted
# Type: yes

# 4. Start the app
npm start
```

### Expected Result ✅

- ✅ Script runs successfully
- ✅ Shows all deleted folders
- ✅ Shows all updated files
- ✅ App builds WITHOUT errors
- ✅ Beautiful welcome page displays
- ✅ Header works (no auth dependencies)
- ✅ Sidenav works (minimal navigation)
- ✅ All styling intact (Tailwind/DaisyUI)

### Detailed Verification Checklist

#### Console Output

```
✅ Should see:
🧹 Starting template cleanup...
📁 Removing authentication components...
  ✓ Deleted: src/app/auth
📁 Removing demo data pages...
  ✓ Deleted: src/app/data
📁 Removing example components...
  ✓ Deleted: src/app/shared/example-component
📁 Removing duplicate home folder...
  ✓ Deleted: src/app/home
📝 Updating routes...
  ✓ Updated app.routes.ts
📝 Updating home component...
  ✓ Updated home.html
  ✓ Updated home.ts
  ✓ Updated home.scss
📝 Updating header component...
  ✓ Updated header.ts
  ✓ Updated header.html
📝 Updating sidenav component...
  ✓ Updated sidenav.ts
📝 Updating README...
  ✓ Updated README.md
✅ Template cleanup complete!
```

#### File System Verification

```bash
# Should NOT exist
ls src/app/auth                    # ❌ Should fail
ls src/app/data                    # ❌ Should fail
ls src/app/shared/example-component # ❌ Should fail
ls src/app/home                    # ❌ Should fail

# Should exist
ls src/app/core/home               # ✅ Should succeed
ls src/app/core/header             # ✅ Should succeed
ls src/app/core/sidenav            # ✅ Should succeed
ls src/app/shared/notification     # ✅ Should succeed
```

#### Code Verification

**Check header.ts:**

```bash
cat src/app/core/header/header.ts
```

Should see:

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterModule } from "@angular/router";
// ✅ NO auth imports!

@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  // ✅ NO AsyncPipe needed
  templateUrl: "./header.html",
  styleUrl: "./header.scss",
})
export class Header {
  // ✅ No auth service injection
}
```

**Check header.html:**

```bash
cat src/app/core/header/header.html
```

Should see:

```html
<header class="navbar bg-base-100 shadow-lg">
  <div class="flex-1">
    <a routerLink="/" class="btn btn-ghost text-xl"> 🚀 AngularVibeCoding </a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a routerLink="/">Home</a></li>
      <li><a href="https://angular.dev" target="_blank">Docs</a></li>
      <li><a href="https://github.com/AntonioCardenas/angularvibecoding" target="_blank">GitHub</a></li>
    </ul>
  </div>
</header>
```

**Check sidenav.ts:**

```bash
cat src/app/core/sidenav/sidenav.ts | grep -A 3 "navItems ="
```

Should see:

```typescript
navItems = signal<NavItem[]>([
  { label: "Home", link: "/", icon: "🏠", visited: false },
  // Add your navigation items here
]);
```

**Check routes:**

```bash
cat src/app/app.routes.ts
```

Should see:

```typescript
export const routes: Routes = [
  {
    path: "",
    component: Layout,
    // ✅ NO canActivate: [authGuard]
    children: [
      { path: "", component: Home, title: "Home" },
      // Add your routes here
    ],
  },
  { path: "**", component: NotFound, title: "404 - Not Found" },
];
```

#### Browser Verification

Visit `http://localhost:4200`:

1. **Home Page**

   - ✅ Gradient background (primary to secondary)
   - ✅ Large heading: "🚀 Welcome to Angular VibeCoding!"
   - ✅ Stats cards showing Angular 20, Standalone, Signals
   - ✅ Links to Angular Docs and GitHub repo

2. **Header**

   - ✅ Logo/title on the left
   - ✅ Three links: Home, Docs, GitHub
   - ✅ Clean styling with DaisyUI navbar
   - ✅ No errors in console

3. **Sidenav**

   - ✅ Toggle button works
   - ✅ Shows only "Home" link
   - ✅ Can be collapsed/expanded
   - ✅ No broken links

4. **Console**
   - ✅ No TypeScript errors
   - ✅ No 404 errors for missing modules
   - ✅ No warnings about missing components

---

## Test Scenario 4: Adding Custom Route

### Steps

```bash
# After clean template, add a new component
ng generate component features/dashboard

# Update app.routes.ts
# Add: { path: 'dashboard', component: Dashboard, title: 'Dashboard' }

# Update sidenav.ts
# Add: { label: 'Dashboard', link: '/dashboard', icon: '📊', visited: false }

# Start app
npm start
```

### Expected Result

- ✅ New component generates successfully
- ✅ Route works
- ✅ Sidenav shows new link
- ✅ No build errors
- ✅ Navigation works smoothly

---

## Test Scenario 5: Undo Test

### Steps

```bash
# Try to undo (should fail gracefully)
npm run clean-template
# Type: yes (again)
```

### Expected Result

- ✅ Script runs
- ✅ Shows warnings for already-deleted folders
- ✅ Doesn't crash
- ✅ Updates already-clean files
- ✅ No harm done

---

## Common Issues & Solutions

### Issue 1: Script Permission Denied

```bash
chmod +x scripts/clean-template.js
npm run clean-template
```

### Issue 2: Can't Find script

```bash
# Make sure you're in project root
pwd  # Should show: .../angularvibecoding
ls scripts/  # Should show: clean-template.js
```

### Issue 3: Want to Restore Examples

```bash
git restore .
git clean -fd
npm install
npm start
```

---

## Performance Test

### Metrics to Check

**Before Cleaning:**

- Build time: ~X seconds
- Bundle size: ~Y MB
- Number of files: ~Z files

**After Cleaning:**

- Build time: Should be similar or faster
- Bundle size: Should be smaller (fewer components)
- Number of files: Significantly fewer

---

## Acceptance Criteria

✅ All of these must be true:

1. [ ] Script runs without errors
2. [ ] All demo folders are deleted
3. [ ] Header component has no auth imports
4. [ ] Sidenav has minimal navigation
5. [ ] App builds successfully (`npm start`)
6. [ ] No TypeScript errors in console
7. [ ] No 404 errors in browser console
8. [ ] Welcome page displays correctly
9. [ ] Header navigation works
10. [ ] Sidenav toggle works
11. [ ] Can add new routes without issues
12. [ ] TailwindCSS styling works
13. [ ] DaisyUI components work
14. [ ] Documentation is updated
15. [ ] README shows clean template note

---

## Test Results Template

```
Test Date: ___________
Tester: ___________
Node Version: ___________
npm Version: ___________

[ ] Scenario 1: Before Cleaning - PASS / FAIL
[ ] Scenario 2: Manual Deletion - PASS / FAIL
[ ] Scenario 3: Clean Script - PASS / FAIL
[ ] Scenario 4: Custom Route - PASS / FAIL
[ ] Scenario 5: Undo Test - PASS / FAIL

Notes:
_________________________________
_________________________________
_________________________________

Conclusion: ✅ PASS / ❌ FAIL
```

---

## Automated Test Commands

```bash
# Run all tests
npm run test

# Check TypeScript
npx tsc --noEmit

# Build production
npm run build

# Verify build output
ls dist/
```

---

**Status**: Ready for Testing  
**Priority**: High  
**Estimated Time**: 15-20 minutes

🧪 **Happy Testing!**
