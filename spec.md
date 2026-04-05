# Anshika Udhyog Group — NGO Management System

## Current State
Project is empty — no App.tsx, no pages, empty Motoko backend (actor {}), only shadcn/ui components installed.

## Requested Changes (Diff)

### Add
- Complete public website with 22+ pages (Home, About, Schemes, Centers, Training, Employment, Loan, Rewards, News, Gallery, Downloads, Legal Documents, Wishes, Our Team, Our Partners, Franchise, B2B Plan, Internship, Contact, FAQ, Terms, Rules, Complaint)
- Header: white top bar with logo, green navbar with "Self Employment Revolution Scheme" left + title center + Signup/Login right
- Category-wise mega menu with icons
- User auth system: Signup (with KYC fields: Aadhaar, PAN, Father Name, DOB, Gender, Address) → Pending → Admin Approval
- Secure login with role-based redirect
- KYC system: upload Aadhaar, PAN, Photo, Address Proof, Bank Details
- Admin Dashboard with 40+ management sections:
  - Users, KYC, Company Profile, News, Gallery (photo+video), YouTube, Slider, Training, Centers, Transport, Employment, Rewards, Loan, Legal Docs, Wishes, Products, Reviews, Applications, Franchise, Internship, B2B, Leadership, Official Letters, Footer Settings
- Role-based dashboards: User, Center, HR, Supervisor, Transport, Franchise Partner
- ID Cards, Certificates, Official Letterhead (10 designs, signature/seal upload)
- Shopping system with cart
- Utilities/Recharge page
- Franchise CRM with partner login
- PWA support (manifest, service worker, install button)
- WhatsApp floating button
- Image slider on homepage
- Reviews with star rating
- Language switcher (Google Translate)
- All data persisted in Motoko backend (no localStorage for critical data)

### Modify
- Organization name: "Anshika Udhyog Group" throughout
- Backend: add full data storage functions

### Remove
- Nothing (fresh build)

## Implementation Plan
1. Write spec.md (this file) + rename project
2. Generate Motoko backend with saveContent/getContent/getAllContent + user management + KYC + applications storage
3. Build frontend: App.tsx with routing, AppContext for state, all pages, admin dashboard, role-based dashboards
4. Validate and deploy
