# Week 1 Capstone: React Application

### What You'll Build

You will consume an API and render it using React. The Figma design and user stories are provided. Your job is to connect the frontend to the backend and deliver a working, deployed product.

In addition to the original scope, your application must include an AI-powered feature that calls Claude directly and displays the response to the user. This uses the same tools already available to you this week — no new packages or services required.

### Setup

- clone this repo and `cd unit1-capstone`
- remove the git repo `rm -rf .git`
- initialize a new repo `git init`
- add and commit `setup starter code`
- add a github remote to the local repo

---

## Step 1: Setup Backend

- [backend commands reference](./backend/README.md)

---

## Step 2: Consult Design Docs

- [design docs](./DESIGN.md)

---

## Step 3: Build the React Frontend

- **Connect to Your Backend:**
  Your React app must call and use all the API endpoints you've built.

- **Set Up Routing:**
  Implement routing for navigation between all major app sections/components.

- **Responsive Design:**
  Use CSS and Flexbox so your app looks good on mobile, tablet, and desktop.

- **Match the Figma Design:**
  Strive for a pixel-perfect implementation of the provided UI.

- **Component Testing:**
  Write tests for at least four different UI components.

- [react client command reference](./client/README.md)

---

## Step 3.5: Add an AI-Powered Feature

Build a dedicated route in your app that calls Claude directly and displays the response. Choose one of the following (or propose your own of similar complexity):

- **A content generator** — user provides a topic or prompt, the app calls Claude and displays generated text
- **A text analyzer** — user pastes text, the app calls Claude to summarize it, extract key points, or classify its tone
- **A Q&A assistant** — user asks a question, the app calls Claude and displays the answer

### Calling Claude from the Frontend

Add your Anthropic API key to your frontend `.env` file:

```
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

```javascript
const callClaude = async (userPrompt) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
};
```

> **Note:** The `anthropic-dangerous-direct-browser-access` header is required to call Claude directly from a browser. This exposes your API key in the client bundle, which isn't a production best practice — but it's an acceptable simplification for this capstone since a backend proxy isn't part of this week's scope.

### Requirements

- Loading state while waiting for Claude's response
- Error handling if the API call fails
- Input validation — don't call Claude with an empty prompt
- The AI feature must be its own route, reachable from your navigation
- Maintain a history of at least the last 3 prompts/responses in the session (in-memory state is fine — no persistence required)

> **Never commit your API key.** Confirm `.env` is in `.gitignore` before your first commit.

---

## Step 4: Deploy Your Application

- **Deploy to S3 (or as instructed):**
  Follow course guidance to publish your app. Use the AWS CLI for the full deployment — bucket creation, policy configuration, and sync — and include your deployment commands in your README.

- **Configure Routing for Direct URL Access:**
  Set your S3 bucket's error document to `index.html` (same as your index document) so that navigating directly to a route like `/ai-feature` doesn't 404.

- **Submit a Working URL:**
  Make sure your deployed app is accessible and all main features work — including the AI feature, tested on the live deployed URL, not just locally.

---

## Must-Have Checklist

> 🥉 Bronze - complete all must-haves

- [ ] Backend supports full CRUD, all endpoints in use
- [ ] React app calls all endpoints
- [ ] Routing set up for major components
- [ ] Responsive CSS/Flexbox design
- [ ] Pixel-perfect Figma implementation
- [ ] Four or more tested React components
- [ ] AI-powered feature on its own route, with loading, error, and empty-input handling
- [ ] AI feature maintains a 3-item session history
- [ ] API key stored in `.env`, never committed
- [ ] Deployed via AWS CLI, error document configured for direct URL access
- [ ] Working, publicly accessible deployed URL

---

## Stretch Goals

> 🥈 Silver - complete 1 stretch goal <br> 🥇 Gold - complete 2

- Add a second AI-powered feature using a different Claude use case than your first
- Add Playwright end-to-end tests
- Set up GitHub Actions or other CI/CD for automated builds and tests

---

## Tips for Success

- **Work in small steps:** Build and test each part before moving on.
- **Test your AI feature early:** Confirm the Claude API call works in isolation before wiring it into your full component — it's easier to debug a fetch call on its own than inside a larger component tree.
- **Stick to the blueprint:** The Figma file and user stories define your target for the core app; the AI feature is yours to design within the requirements above.
- **Ask questions:** Don't spend too long blocked. Help is here if you need it!
