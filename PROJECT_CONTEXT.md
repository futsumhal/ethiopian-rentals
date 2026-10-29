# Ethiopian Rental Discovery Hub

## Project Goal
Build a rental property discovery website for Ethiopia, starting with Addis Ababa. Renters can browse properties, search by neighborhood, filter results, view property details, and contact landlords or agents by phone.

## Target Users
- Renters looking for houses, apartments, or rooms
- Landlords and rental agents advertising properties
- Platform administrator managing listings

## Version 1 Features
1. Browse available rental properties.
2. Search by neighborhood.
3. Filter by property type and monthly rent.
4. View property details and photos.
5. Display rent in Ethiopian birr (ETB).
6. Display advertiser contact information with a direct phone-call link.
7. Manage listings through Django Admin.

## Not Included in Version 1
- Public user registration and login
- Online payments
- In-app messaging
- Reviews and ratings
- Maps
- Custom landlord dashboard
- Paid or promoted listings

## Technology Stack
### Frontend
- React
- TypeScript
- Vite
- Bootstrap 5
- React Router
- Axios
- TanStack Query

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL

### Tools
- VS Code
- Git and GitHub
- Windows and PowerShell

## Architecture
React provides the user interface and communicates with the Django REST API using HTTP requests. Django validates requests and interacts with PostgreSQL. Django Admin is used to manage property listings in Version 1.

## Development Principles
- Build one small feature at a time.
- Explain the purpose of commands and code.
- Test each feature before moving forward.
- Inspect existing code before modifying it.
- Avoid unnecessary dependencies.
- Never claim a test passed unless it was actually run.
- Keep project documentation updated when decisions or progress change.
- Never overwrite or delete important work without explaining the impact first.

## Definition of Success
A renter can browse, search, filter, view property details, and contact an advertiser. An administrator can manage listings. The website works on desktop and mobile and can eventually be deployed online.




