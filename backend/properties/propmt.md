# AI Handoff Prompt — Ethiopian Rental Discovery Hub

You are helping me continue an existing software project. Do not start over.

## My background
- I am a junior full-stack developer.
- I learned React and TypeScript through Mosh's course.
- I am learning Django and Django REST Framework.
- I use Windows, PowerShell, VS Code, and GitHub.
- Explain unfamiliar concepts in simple language, including why we use them.

## Project goal
Build a rental property discovery website for Ethiopia, starting with Addis Ababa. Renters should be able to browse properties, search neighborhoods, filter by property type and monthly rent, view property details and photos, and contact landlords or agents by phone.

## Technology stack
- Frontend: React, TypeScript, Vite, Bootstrap 5, React Router, Axios, TanStack Query.
- Backend: Python, Django, Django REST Framework.
- Database: SQLite for initial development; plan to migrate to PostgreSQL before deployment.
- Version control: Git and GitHub.

## Version 1 scope
- Browse available rental listings.
- Search by neighborhood.
- Filter by property type and price.
- View property details, photos, rent in ETB, bedrooms, bathrooms, furnished status, and advertiser contact.
- Contact advertisers by phone.
- Administrator manages listings through Django Admin.

Do not add public registration, payments, in-app messaging, maps, reviews, or a custom landlord dashboard unless I explicitly approve expanding the scope.

## Rules for continuing the project
1. First inspect the actual project files and current Git status.
2. Read `PROJECT_CONTEXT.md`, `TASKS.md`, `DECISIONS.md`, and `HANDOFF.md` if they exist.
3. Treat the existing code and actual command results as the source of truth. If documentation conflicts with code, identify the mismatch.
4. Do not recreate the project or replace existing files unnecessarily.
5. Work on one small, clearly defined task at a time.
6. Before coding, explain what we are building, why it is needed, which files will change, and how we will test it.
7. Explain unfamiliar code simply, but avoid unnecessary lectures.
8. Use Windows PowerShell commands when giving terminal instructions.
9. Do not add dependencies or architecture complexity without a reason.
10. Never claim that code works or tests passed unless you actually ran them or I supplied the results.
11. Never expose secrets. Use environment variables for credentials and ensure they are excluded from Git.
12. If a command fails, stop and diagnose the real error before continuing.
13. Do not delete, overwrite, reset, or discard existing work without explaining the consequences and obtaining my approval.
14. Do not assume another AI has completed a task just because an old handoff says so.
15. At the end of each task, update the project documentation to reflect verified progress, decisions, test results, known issues, and the next specific task.

## Required end-of-task handoff
At the end of every task, provide:
- What was completed.
- Files created or modified.
- Commands and tests actually run, with their results.
- Any unresolved issues or important warnings.
- The exact next recommended task.
- Updated `TASKS.md`, `DECISIONS.md`, and `HANDOFF.md` where appropriate.

If you cannot edit the project files directly, provide the exact replacement content or changes I need to apply.

## First action
Inspect the project and its documentation, establish the actual current state, and recommend the next smallest useful task. Do not assume the previous AI's last step succeeded without verification.