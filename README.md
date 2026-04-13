# Google Forms Lite

A simplified Google Forms clone built as a monorepo with React, TypeScript, Redux Toolkit, and GraphQL.

## Tech Stack

### Client
- **React 19** + **TypeScript**
- **Redux Toolkit** + **RTK Query** - state management and data fetching
- **React Router** - routing
- **Tailwind CSS** - styling
- **Framer Motion** - animations
- **@dnd-kit** - drag and drop for question reordering
- **Lucide React** - icons
- **Vite** - build tool

### Server
- **Node.js** + **Express**
- **Apollo Server 5** - GraphQL server
- **In-memory store** - data storage (no database)

### Shared
- **GraphQL Codegen** - auto-generates TypeScript types and RTK Query hooks from GraphQL schema
- **@graphql-typed-document-node/core** - typed GraphQL documents

### Monorepo
- **pnpm workspaces** - monorepo management
- **concurrently** - runs client and server simultaneously

---

## Project Structure

```
google-forms-lite/
├── apps/
│   ├── client/          # React application
│   └── server/          # Apollo Server + Express
├── packages/
│   └── shared/          # Auto-generated types from GraphQL schema
├── pnpm-workspace.yaml
└── package.json
```

---

## Prerequisites

- **Node.js**
- **pnpm**

Install pnpm if you don't have it:
```bash
npm install -g pnpm
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mutednew/google-forms-lite.git
cd google-forms-lite
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Generate TypeScript types from GraphQL schema

```bash
pnpm codegen
```

### 4. Run both client and server

```bash
pnpm dev
```

This starts:
- **Server** at `http://localhost:5000/graphql`
- **Client** at `http://localhost:3000`

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Run client and server concurrently |
| `pnpm codegen` | Generate TypeScript types from GraphQL schema |
| `pnpm --filter @gfl/client dev` | Run client only |
| `pnpm --filter @gfl/server dev` | Run server only |
| `pnpm --filter @gfl/client build` | Build client |

---

## Features

- **Homepage** - list of all created forms with links to fill and view responses
- **Form Builder** - create forms with title, description and questions of 4 types:
    - Short Answer (text input)
    - Multiple Choice (radio buttons)
    - Checkboxes
    - Date picker
    - Drag and drop reordering of questions
    - Mark questions as required
- **Form Filler** - fill out a form and submit responses
    - Client-side validation for required fields
    - Success screen after submission
- **Form Responses** - view all submitted responses for a form
- **Dark mode** - toggle between light and dark theme

---

## GraphQL API

Apollo Sandbox is available at `http://localhost:5000/graphql` when the server is running.

### Queries

```graphql
# Get all forms
query {
  forms {
    id
    title
    description
    createdAt
  }
}

# Get a single form by ID
query {
  form(id: "FORM_ID") {
    id
    title
    questions {
      id
      title
      type
      required
      options {
        id
        value
      }
    }
  }
}

# Get all responses for a form
query {
  responses(formId: "FORM_ID") {
    id
    submittedAt
    answers {
      questionId
      values
    }
  }
}
```

### Mutations

```graphql
# Create a new form
mutation {
  createForm(
    title: "My Form"
    description: "Form description"
    questions: [
      { title: "Your name?", type: TEXT, required: true }
      {
        title: "Favorite color?"
        type: MULTIPLE_CHOICE
        required: false
        options: [{ value: "Red" }, { value: "Blue" }]
      }
    ]
  ) {
    id
    title
  }
}

# Submit a response
mutation {
  submitResponse(
    formId: "FORM_ID"
    answers: [
      { questionId: "QUESTION_ID", values: ["John"] }
      { questionId: "QUESTION_ID_2", values: ["OPTION_ID"] }
    ]
  ) {
    id
    submittedAt
  }
}
```

---

## Architecture Decisions

### Monorepo with pnpm workspaces
pnpm workspaces were chosen over Nx/Turborepo due to the project scope - a lightweight setup without unnecessary overhead. A single `pnpm-lock.yaml` ensures consistent dependency versions across all packages.

### GraphQL Codegen with typed-document-node
Instead of `typescript-rtk-query` plugin (which had compatibility issues with RTK v2 and Apollo Server v5), we use `typed-document-node` to generate typed `DocumentNode` objects in `@gfl/shared`. RTK Query endpoints are defined manually in `apps/client/src/store/api/api.ts`, which gives more explicit control over caching and invalidation.

### RTK Query cache invalidation
`tagTypes: ['Form', 'Response']` ensures that after creating a form or submitting a response, the relevant queries are automatically refetched - no manual cache updates needed.

### In-memory data store
Data is stored in plain JavaScript arrays on the server. All data is lost on server restart, which is expected behavior per the task requirements.