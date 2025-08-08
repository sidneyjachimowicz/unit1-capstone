# Design Document

This document outlines the design and user stories for the Spoonful application.

**Figma Link:** [Spoonful Figma Design](https://www.figma.com/design/4UKIjxdUxW0IodUmodX8j7/Spoonful?node-id=1-2082)

## Core Features

| Feature          | Description                                | Access       |
| ---------------- | ------------------------------------------ | ------------ |
| Landing Page     | Welcome message and call-to-action         | All users    |
| Authentication   | Email/password login                       | Creators only|
| Recipe Creation  | Form input: title, photo, ingredients, instructions | Creators only|
| Recipe Update    | Edit existing recipe entries               | Creators only|
| Recipe Deletion  | Delete recipe with confirmation            | Creators only|
| Browse Recipes   | Public recipe viewing                      | All users    |
| Search/Filter    | Find by keyword, tag, or ingredient        | All users    |

<hr/>

## Key Flows

### Landing Page
- **GET /** → Public entry point.
- **Show CTA:**
    - **Explore Recipes** → routes to `/recipes` (public index)
    - **Login** → routes to `/login`

### Login / Signup
- **POST /login** and **POST /signup** → Auth flow for creators only.
- On success, redirect to `/dashboard`
- Protect `/dashboard` and recipe CRUD routes with auth guard.

### Create Recipe
- **POST /recipes** → Accessible from `/dashboard`
- Form inputs: title, image, ingredients, instructions
- Validate → Submit → Show success toast/modal
- Update UI without reload

### Update Recipe
- **PUT /recipes/:id** → Click "Edit" on a dashboard item
- Prefill form with existing data
- On submit: update, show success, refresh list

### Delete Recipe
- **DELETE /recipes/:id** → Button in dashboard
- Confirm dialog → On accept, delete and update UI
- Handle edge cases (404, permission errors)

### Browse + Search Recipes
- **GET /recipes** → Publicly accessible
- List + Search input
- Query by title/tag/ingredient
- Click recipe card → route to **GET /recipes/:id**

## User Stories

### Recipe Management

**1. Create a Recipe**
> *As a recipe creator, I want to add new recipes so I can store and share them.*

**Acceptance Criteria:**
- Form includes title, image, ingredients, and instructions.
- Required field validation.
- Success message on submission.

---

**2. View Recipes**
> *As any user, I want to view a list of recipes so I can find something to cook.*

**Acceptance Criteria:**
- Recipe cards show key info.
- Click to open full recipe.
- Works for both logged-in and guest users.

---

**3. Edit a Recipe**
> *As a creator, I want to edit my recipe so I can fix or improve it.*

**Acceptance Criteria:**
- "Edit" button appears on creator dashboard.
- Prefilled form loads existing data.
- Save updates the recipe.

---

**4. Delete a Recipe**
> *As a creator, I want to delete my recipe so I can manage my content.*

**Acceptance Criteria:**
- "Delete" button on dashboard.
- Confirmation prompt required.
- Removed from all views on success.

### Recipe Discovery

**5. Search Recipes**
> *As a viewer, I want to search by keyword so I can quickly find recipes.*

**Acceptance Criteria:**
- Search input visible on browse page.
- Results update dynamically.
- "No match" message if empty.

---

**6. Guest Browsing**
> *As a visitor, I want to browse recipes without logging in.*

**Acceptance Criteria:**
- No login required to view recipes.
- Read-only access to recipe content.