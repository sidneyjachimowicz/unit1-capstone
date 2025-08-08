## Goal

The goal of this project is to write the readme's for my student's projects

## Task

**give brief summary of what each command is and when to use it**

- Create README.md in @backend
  - Should contain the commands to operate the backend. (The students will just be running the docker commands to deploy/run the server locally, no need to code anything)
  - `docker-compose -f docker-compose.dev.yml up --build -d`
  - `docker-compose -f docker-compose.dev.yml down`
  - `docker-compose container prune`
  - add any other relevant docker commands the students may need (like how to view the logs for the respective service, (look at the compose.yml file for the appropiate name)
  - Leave a placeholder saying need to add for deployment command
- Create README.md in the @client folder that contains the necessary commands to run this file
  - `docker-compose up --build -d`
  - `docker-compose down`
  - `docker-compose run --rm react-dev npm run test`
  - `docker-compose run --rm react-dev npm run build`
- CREATE a DESIGN.md file in the current working directory
  - Let the student know this file will contain a link to the figma file, user stories, key flows
  - Write out the user stories in nice formatted markdown
  - figma link - https://www.figma.com/design/4UKIjxdUxW0IodUmodX8j7/Spoonful?node-id=1-2082

User Stories [Recipe Management & Discovery]
Recipe Management

** This was a nice table** I want you to format to markdown
Core Features
Feature
Description
Access
Landing Page
Welcome message and call-to-action
All users
Authentication
Email/password login
Creators only
Recipe Creation
Form input: title, photo, ingredients, instructions
Creators only
Recipe Update
Edit existing recipe entries
Creators only
Recipe Deletion
Delete recipe with confirmation
Creators only
Browse Recipes
Public recipe viewing
All users
Search/Filter
Find by keyword, tag, or ingredient
All users

<hr/>

**Key Flows**

Landing Page
GET / → Public entry point.
Show CTA:

Explore Recipes → routes to /recipes (public index)

Login → routes to /login

Login / Signup
POST /login and POST /signup → Auth flow for creators only.
On success, redirect to /dashboard
Protect /dashboard and recipe CRUD routes with auth guard.

Create Recipe
POST /recipes → Accessible from /dashboard
Form inputs: title, image, ingredients, instructions
Validate → Submit → Show success toast/modal
Update UI without reload

Update Recipe
PUT /recipes/:id → Click "Edit" on a dashboard item
Prefill form with existing data
On submit: update, show success, refresh list

Delete Recipe
DELETE /recipes/:id → Button in dashboard
Confirm dialog → On accept, delete and update UI
Handle edge cases (404, permission errors)

Browse + Search Recipes
GET /recipes → Publicly accessible
List + Search input
Query by title/tag/ingredient
Click recipe card → route to GET /recipes/:id

User Story 1: Create a Recipe
As a recipe creator, I want to add new recipes so I can store and share them.

Acceptance Criteria:

Form includes title, image, ingredients, and instructions

Required field validation

Success message on submission

User Story 2: View Recipes
As any user, I want to view a list of recipes so I can find something to cook.

Acceptance Criteria:

Recipe cards show key info

Click to open full recipe

Works for both logged-in and guest users
User Story 3: Edit a Recipe
As a creator, I want to edit my recipe so I can fix or improve it.

Acceptance Criteria:

"Edit" button appears on creator dashboard

Prefilled form loads existing data

Save updates the recipe
User Story 4: Delete a Recipe
As a creator, I want to delete my recipe so I can manage my content.

Acceptance Criteria:

"Delete" button on dashboard

Confirmation prompt required

Removed from all views on success
Recipe Discovery
User Story 5: Search Recipes
As a viewer, I want to search by keyword so I can quickly find recipes

Acceptance Criteria:

Search input visible on browse page

Results update dynamically

"No match" message if empty

User Story 6: Guest Browsing
As a visitor, I want to browse recipes without logging in

Acceptance Criteria:

No login required to view recipes

Read-only access to recipe content

Data in the Recipe

1. Spicy Chickpea Stew
   "title": "Spicy Chickpea Stew",
   "description": "A hearty vegan dish with chickpeas and tomatoes.",
   "ingredients": ["1 tbsp olive oil", "1 onion", "2 cloves garlic", "1 can chickpeas", "1 can diced tomatoes", "1 tsp cumin", "1/2 tsp chili flakes", "Salt to taste"],
   "instructions": ["Sauté onions and garlic.", "Add chickpeas and tomatoes.", "Simmer for 20 minutes."],
   "tags": ["vegan", "gluten-free", "dinner"],
   "author": "Gaya Patel",
   "ownerId": "user_001",
   "createdAt": "2025-07-25T12:00:00Z",
   "updatedAt": "2025-07-25T12:30:00Z"

2. Vegan Caesar Salad
   "title": "Vegan Caesar Salad",
   "description": "Crunchy romaine with creamy cashew Caesar dressing.",
   "ingredients": ["1 head romaine lettuce", "1/2 cup cashews", "2 tbsp lemon juice", "1 tsp Dijon mustard", "1 garlic clove"],
   "instructions": ["Blend dressing.", "Toss with chopped romaine.", "Serve chilled."],
   "tags": ["vegan", "salad"],
   "author": "Hasan Minhaj",
   "ownerId": "user_002",
   "createdAt": "2025-07-26T08:45:00Z",
   "updatedAt": "2025-07-26T08:45:00Z"
