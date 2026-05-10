# Angular Front-End Technical Challenge

## Project Overview

This project is a technical assessment focused on Angular 17+, RxJS, Signals, NgRx, Angular Material, TypeScript and reactive architecture.

The goal is not only to build screens, but to demonstrate:

* Front-end architecture thinking
* Reactive programming knowledge
* State management organization
* Angular best practices
* Clean code principles
* Performance optimization
* Scalability mindset
* Component modularization
* Testability

The project must prioritize:

* maintainability
* readability
* strong typing
* modular structure
* reactive patterns
* clean separation of responsibilities

---

# Mandatory Stack

* Angular 17+
* TypeScript
* RxJS
* Angular Material
* Signals or NgRx
* Standalone Components
* Jest or Vitest

---

# Development Philosophy

This project follows enterprise Angular architecture principles.

Before generating code:

* analyze the folder context
* understand component responsibility
* respect reactive architecture
* avoid duplicated logic
* avoid imperative patterns when RxJS can solve elegantly
* prefer composition over complexity
* maintain strong typing
* keep code scalable and testable

---

# Architecture Goals

The architecture must:

* separate UI from business logic
* isolate state management
* centralize API communication
* reduce unnecessary change detection cycles
* keep components small and reusable
* avoid nested subscriptions
* avoid memory leaks
* use reactive flows consistently

---

# Main Technical Priorities

## 1. Strong TypeScript

Requirements:

* avoid any
* use interfaces
* use utility types when useful
* maintain strong typing
* keep functions predictable
* prefer readonly when possible

---

## 2. Reactive Angular Architecture

The application must:

* use standalone components
* use reactive forms
* use RxJS operators correctly
* use async pipe whenever possible
* manage subscriptions safely
* avoid imperative state mutations

---

## 3. RxJS Best Practices

Prefer:

* switchMap
* debounceTime
* distinctUntilChanged
* catchError
* finalize
* combineLatest
* forkJoin

Avoid:

* subscribe inside subscribe
* unnecessary manual subscriptions
* duplicated streams

Subscription management:

* takeUntilDestroyed
* async pipe
* take(1)
* automatic cleanup

---

# Folder Structure

src/app/

* core/
* shared/
* features/
* state/
* models/
* services/
* material/
* utils/

---

# Folder Responsibilities

## core/

Global application infrastructure.

Contains:

* interceptors
* guards
* app configuration
* global services
* auth infrastructure

Rules:

* singleton services only
* reusable application-wide logic

---

## shared/

Reusable UI and utilities.

Contains:

* shared components
* pipes
* directives
* reusable form controls
* utility helpers

Rules:

* no business logic
* generic reusable components only

---

## features/

Feature-based architecture.

Each feature should contain:

* pages
* components
* services
* state
* models

Example:
features/users/

Rules:

* isolate feature responsibility
* keep feature self-contained
* avoid cross-feature coupling

---

## state/

Global state management.

Contains:

* ngrx store
* actions
* reducers
* selectors
* effects

Rules:

* state must remain immutable
* selectors should be memoized
* reducers must remain pure

---

## models/

Application typings and interfaces.

Contains:

* DTOs
* interfaces
* enums
* response types

Rules:

* never use any
* centralize shared types

---

## services/

API communication layer.

Contains:

* HTTP services
* data mapping
* backend integration

Rules:

* components should not call HttpClient directly
* services return observables
* keep services stateless when possible

---

# Component Architecture Rules

Each component should:

* have a single responsibility
* minimize local state
* prefer signals/computed when appropriate
* avoid large templates
* avoid large component files

Container components:

* handle state
* connect services/store
* orchestrate flows

Presentational components:

* receive inputs
* emit outputs
* remain reusable

---

# Angular Signals Guidelines

Use Signals for:

* local UI state
* computed values
* lightweight reactive state

Use computed():

* derived values
* totals
* filtered data

Use effect():

* side effects only

Avoid:

* unnecessary signal nesting
* mixing imperative patterns

---

# NgRx Guidelines

Use NgRx for:

* shared/global feature state
* async flows
* scalable data management

Structure:

* actions
* reducer
* selectors
* effects

Effects responsibilities:

* async requests
* API calls
* side effects

Reducers responsibilities:

* pure state transitions only

Selectors responsibilities:

* derive memoized state

---

# Performance Guidelines

## ChangeDetectionStrategy.OnPush

Prefer OnPush whenever possible.

Benefits:

* fewer detection cycles
* better scalability
* better rendering performance

When using OnPush:

* avoid mutating objects directly
* prefer immutable updates
* use observables/signals correctly

---

## trackBy

Always use trackBy on large lists.

Benefits:

* prevents unnecessary DOM recreation
* improves rendering performance
* minimizes Angular diff operations

---

# Forms Guidelines

Use:

* Reactive Forms

Requirements:

* validation messages
* reusable validators
* disabled submit on invalid state
* typed forms when possible

---

# API Layer Guidelines

API services should:

* centralize requests
* map responses
* handle errors
* expose observables only

Avoid:

* API logic inside components

---

# Testing Philosophy

Tests should validate:

* component rendering
* reactive flows
* form validation
* state management
* reducers
* selectors
* effects

Prefer:

* isolated unit tests
* deterministic tests
* high readability

Coverage target:

* 60%+

---

# Cursor AI Development Rules

Before generating code:

1. Analyze folder responsibility
2. Respect Angular architecture
3. Maintain reactive patterns
4. Avoid anti-patterns
5. Keep components modular
6. Use strong typing
7. Avoid memory leaks
8. Prefer RxJS solutions
9. Keep scalability in mind
10. Generate production-oriented code

---

# Development Execution Order

## Phase 1

* Angular setup
* Angular Material
* Folder structure
* Routing
* Core/shared architecture

---

## Phase 2

* User list page
* Mock API/service
* Loading and error states
* Search with debounce

---

## Phase 3

* Modal form
* Reactive forms
* Validations
* Edit mode

---

## Phase 4

* Signals or NgRx state
* Selectors/computed values
* State organization

---

## Phase 5

* Performance optimizations
* OnPush
* trackBy
* RxJS refinements

---

## Phase 6

* Unit tests
* Coverage improvements
* Final cleanup

---

# Main Objective

This project should demonstrate:

* modern Angular architecture
* reactive programming skills
* enterprise-level organization
* maintainable front-end structure
* strong TypeScript usage
* scalable component design
* professional engineering mindset
