# SDR CRM AI — Full Stack Vibe Coding Challenge

## Overview

This project is a Mini CRM for SDR (Sales Development Representatives) teams with AI-powered personalized message generation.

The main goal is to create a scalable and organized full stack application focused on:

* Lead management
* Sales funnel visualization
* Campaign creation
* AI-generated outreach messages
* Workspace isolation (multi-tenant architecture)
* Automation workflows based on funnel stages

The system should prioritize:

* Clean architecture
* Maintainable code
* Modular structure
* Scalability
* Real-world product thinking
* Functional MVP first

---

# Technical Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios
* Drag and Drop library for Kanban

## Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Bcrypt

## AI Integration

* OpenAI API (or compatible LLM provider)

---

# Development Philosophy

This project follows these principles:

* Build functional features first
* Avoid overengineering
* Use modular architecture
* Keep components reusable
* Prefer clarity over complexity
* Separate business rules from UI logic
* Organize by responsibility
* Think like a product developer, not only a coder

---

# Architecture Goals

## Multi-Tenant Structure

All business data must be isolated by `workspace_id`.

Every entity must belong to a workspace:

* leads
* campaigns
* users
* funnel stages
* custom fields
* generated messages

Users should only access data from their own workspace.

---

# Main Modules

## 1. Authentication

Features:

* User registration
* User login
* JWT authentication
* Workspace creation
* Protected routes

---

## 2. Leads Management

Features:

* CRUD leads
* Assign responsible user
* Custom fields
* Lead details
* Lead stage movement

---

## 3. Funnel / Kanban

Features:

* Kanban visualization
* Drag and drop
* Funnel stages
* Transition validation
* Required fields validation

Default stages:

* Base
* Lead Mapped
* Trying Contact
* Connection Started
* Disqualified
* Qualified
* Meeting Scheduled

---

## 4. Campaigns

Features:

* Campaign creation
* Campaign context
* Prompt configuration
* Trigger stage automation

Campaigns must support:

* Offer description
* Tone of voice
* Persona definition
* Style instructions
* Dynamic lead field usage

---

## 5. AI Message Generation

Features:

* Generate 2–3 personalized messages
* Use:

  * campaign context
  * prompt instructions
  * lead data
  * custom fields
* Save generated messages
* Regenerate messages

When a message is sent:

* move lead automatically to:
  "Trying Contact"

---

## 6. Automation System

Features:

* Trigger AI generation automatically
* Background processing
* Trigger by funnel stage
* Save generated outputs

---

# Recommended Backend Structure

backend/src/

* controllers/
* routes/
* services/
* middlewares/
* jobs/
* prompts/
* config/
* utils/
* database/

Architecture rule:

* controllers handle request/response
* services contain business logic
* routes organize endpoints
* jobs handle background automation
* prompts contain AI prompt builders

---

# Recommended Frontend Structure

frontend/src/

* pages/
* components/
* layouts/
* services/
* hooks/
* context/
* routes/
* styles/
* utils/

Architecture rule:

* pages = screen structure
* components = reusable UI
* services = API communication
* hooks = reusable logic
* context = global state
* routes = application navigation

---

# Cursor AI Coding Rules

Before generating code:

1. Analyze the folder context
2. Respect project architecture
3. Reuse existing patterns
4. Avoid duplicated logic
5. Keep components modular
6. Use clean naming conventions
7. Keep scalability in mind
8. Avoid creating unnecessary abstractions
9. Prioritize readability
10. Maintain consistent code style

---

# Coding Conventions

## Backend

* Use async/await
* Use service layer pattern
* Keep controllers minimal
* Validate inputs
* Use environment variables
* Use RESTful naming

## Frontend

* Use functional components
* Use hooks
* Keep state localized when possible
* Avoid large monolithic components
* Separate UI from API logic

---

# MVP Priority Order

## Phase 1

* Project structure
* Authentication
* Database setup

## Phase 2

* Leads CRUD
* Funnel stages
* Kanban

## Phase 3

* Campaign creation
* AI integration

## Phase 4

* Automation workflows
* Trigger stages
* Background jobs

## Phase 5

* UI improvements
* Error handling
* UX refinements

---

# Database Design Principles

Main entities:

* users
* workspaces
* leads
* campaigns
* funnel_stages
* custom_fields
* generated_messages

All business entities must support:

* timestamps
* relational integrity
* workspace isolation

---

# Product Vision

This project should simulate a real SaaS CRM product focused on SDR workflows and AI-assisted communication.

The goal is not only to deliver screens, but to demonstrate:

* software architecture thinking
* product understanding
* scalable structure
* AI integration capability
* professional development workflow
