# 📄 Phase 08 - Recipe Details Page

## Objective

Build a modern, informative and responsive Recipe Details page.

This page should display complete recipe information using real API data.

Do NOT use dummy data.

Do NOT implement Dashboard.

---

# Read First

Before writing any code, carefully read

- docs/PROJECT.md
- docs/API_SPEC.md
- docs/UI_GUIDE.md
- docs/COMPONENTS.md
- docs/RULES.md
- docs/TASKS.md
- docs/CLAUDE.md

---

# Goal

Build a professional recipe details page that provides an excellent reading experience and encourages users to explore more recipes.

---

# Route

/recipes/[slug]

Public Route

---

# Files to Create

Frontend

- app/recipes/[slug]/page.tsx
- features/recipe-details/
- components/recipe/
- services/recipe.service.ts (update if needed)

Backend

No new APIs unless required.

Reuse the existing

GET /api/v1/recipes/:slug

endpoint.

---

# API Integration

Fetch recipe details using the slug.

Display loading skeleton while fetching.

Handle errors gracefully.

---

# Hero Section

Display

- Large Cover Image
- Recipe Title
- Short Description
- Category Badge
- Difficulty Badge
- Cooking Time
- Servings
- Author Name
- Publish Date

---

# Image Gallery

Support

- Main Image
- Additional Images (optional)

If multiple images exist

Display thumbnail gallery.

---

# Recipe Overview

Display

- Full Description
- Cuisine
- Category
- Difficulty
- Cooking Time
- Servings

Use clean typography.

---

# Ingredients Section

Display ingredients as a checklist.

Each ingredient should have

- Bullet/Icon
- Quantity
- Name

---

# Cooking Instructions

Display numbered steps.

Each step should be clearly separated.

Maintain readable spacing.

---

# Recipe Information Card

Display

- Cooking Time
- Difficulty
- Servings
- Category
- Cuisine

Desktop

Sticky Sidebar

Mobile

Stack below content.

---

# Author Section

Display

- Author Name
- Avatar (if available)
- Total Recipes (optional)

---

# Related Recipes

Fetch recipes from the same category.

Display

Maximum 4 cards.

Each card includes

- Image
- Title
- Category
- View Details

---

# Call To Action

Encourage users to

- Explore More Recipes
- Add Their Own Recipe

---

# Loading State

Create

Recipe Details Skeleton

Include

- Image Skeleton
- Title Skeleton
- Text Skeleton
- Sidebar Skeleton

---

# Error State

If recipe not found

Display

- Friendly Message
- Back to Explore Button

---

# Responsive Design

Optimize for

- Mobile
- Tablet
- Desktop

Sidebar should become full-width on smaller screens.

---

# Accessibility

Ensure

- Semantic HTML
- Alt Text
- Keyboard Navigation
- Proper Heading Structure

---

# Performance

Use

next/image

Dynamic Metadata

Lazy Loading

Avoid unnecessary Client Components.

---

# Verification

Before stopping verify

✓ Recipe loads successfully

✓ Slug routing works

✓ Ingredients displayed

✓ Instructions displayed

✓ Related recipes displayed

✓ Loading state works

✓ Error state works

✓ Responsive layout

✓ No TypeScript errors

✓ No ESLint errors

✓ Build passes

---

# Deliverables

Expected Output

Complete Recipe Details Page

Image Gallery

Recipe Information

Ingredients

Instructions

Related Recipes

Loading Skeleton

Responsive Design

Production-ready UI

---

# Update

Update

docs/TASKS.md

Mark Recipe Details tasks as completed.

---

# Stop

Do not build Dashboard.

Wait for the next prompt.
