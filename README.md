This is a full-stack meeting management system for NEA, built with a React (client) and Node (server). The system allows users with different roles (such as Admin, GM, PA, MD) to log in, view, add, and manage meetings, and send meeting-related SMS notifications.

**Client (Frontend)**
Framework: React (SPA with React Router for navigation)
Key Features:
Authentication: Login, registration, and route protection based on user role using JWT tokens.
Role-Based Dashboards: Each user role (Admin, GM, PA, MD) gets a tailored dashboard to view meetings for today, tomorrow, and overmorrow, including meeting history.
Meeting Management: Users can add, update, and delete meetings. Meetings are displayed in paginated tables, with support for Nepali (BS) and Gregorian (AD) calendar conversion.
SMS Notifications: Admins/authorized users can send SMS notifications about meetings to selected recipients.
Session Management: Automatic logout on session expiry.
Responsive UI with components for headers, footers, forms, and modals.

**Backend (Server)**
Framework: Node.js with Express
Key Features:
User Authentication: Uses JWT tokens for secure login and route protection. Passwords are securely hashed with bcrypt.
Role Management: User roles are managed on registration, and included in JWT payloads for frontend use.
Meeting API: CRUD operations for meetings, including support for filtering meetings by date and user/role.
User API: Endpoints for user management and listing.
SMS API: Endpoints to send SMS notifications.
Security: Implements rate limiting, helmet for HTTP headers, and CORS.
Database: Meetings and users are stored in a database (MongoDB implied).
Session Expiry: Meetings can be set to expire automatically after a certain period.
In Summary:
NEA is a robust, role-based meeting management platform for organizations, featuring secure authentication, user/role dashboards, meeting CRUD, SMS notifications, and calendar support for Nepali and Gregorian dates. The system is designed for easy use by staff at different organizational levels (Admin, GM, PA, MD), with an emphasis on security and usability.
