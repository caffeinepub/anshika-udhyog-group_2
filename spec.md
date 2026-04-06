# Anshika Udhyog Group - Full Admin CMS & ID Card System

## Current State
- Admin dashboard exists with 30+ sections
- Content saved to backend via saveContent/getContent (key-value JSON store)
- Most pages read from contentMap but admin edit is partial
- Official Letters section exists but lacks A4 PDF generation
- No ID card generator exists
- Public pages (About, Training, Centers, etc.) have no direct admin edit interface
- Hero images on pages are static/hardcoded

## Requested Changes (Diff)

### Add
- `AdminPageContent.tsx`: CMS editor for ALL 22+ public pages. Each page has editable fields: hero title, hero subtitle, hero image upload (from gallery or upload), body content blocks (text, image, list). Changes saved to backend and rendered live on public pages.
- `AdminIDCards.tsx`: ID Card generator with 10 design templates. Fields: photo upload, full name, designation, member ID, organization, DOB, mobile, address, barcode (auto from member ID), seal image, signature image. PDF/print download. All 10 designs with distinct styles.
- Upgrade `AdminOfficialLetters.tsx`: A4 auto-generate letter previews with proper letterhead, content, signature, seal. Letter type auto-fills relevant template content. PDF download via browser print/window.print with A4 CSS. Related letter templates auto-suggest content based on type.
- Upgrade `AdminHomePage.tsx`: Add edit controls for ALL hero sections, ALL card grids (with icon/image upload from gallery), all stats. Upload option from gallery for hero background images.
- Add route `/admin/page-content` and `/admin/id-cards` in App.tsx
- Add nav items for Page Content and ID Cards in AdminLayout.tsx
- Public pages (Home, AboutUs, Training, etc.) read their content from contentMap keys set by AdminPageContent

### Modify
- `AdminHomePage.tsx`: Add hero image upload, full cards edit (add/edit/delete), schemes edit, gallery image selector
- `AdminOfficialLetters.tsx`: Add A4 print CSS, auto letter content templates, proper PDF layout
- `Home.tsx`: Read stats, hero text, hero image, cards from contentMap (already partially done, extend)

### Remove
- Nothing removed

## Implementation Plan
1. Create AdminPageContent.tsx - CMS for all public pages with hero + content block editing
2. Create AdminIDCards.tsx - 10 ID card designs with photo/seal/signature/barcode, PDF download
3. Upgrade AdminOfficialLetters.tsx - A4 layout, auto template content, PDF print
4. Upgrade AdminHomePage.tsx - hero upload, full card management, gallery image picker
5. Add new routes and nav items in App.tsx and AdminLayout.tsx
6. Update public pages to read from contentMap for hero/content
