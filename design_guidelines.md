# EduMate – Your AI Mentor: Design Guidelines

## Design Approach

**Selected Framework:** Material Design with Educational Adaptation
**Justification:** EduMate is a utility-focused educational productivity tool requiring clear information hierarchy, strong visual feedback for interactions, and familiar patterns that reduce cognitive load for students. Material Design provides the structural foundation while we adapt it with warmer, education-friendly aesthetics.

**Key Design Principles:**
- Approachable & Student-Friendly: Reduce intimidation through soft colors and friendly UI patterns
- Clear Information Hierarchy: Students should instantly understand where to focus
- Responsive Feedback: Every interaction provides immediate visual/auditory confirmation
- Accessibility First: Voice features and clear contrast support diverse learning needs

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 220 90% 56% (Vibrant education blue - buttons, headers, active states)
- Primary Hover: 220 90% 48%
- Secondary: 260 60% 65% (Soft purple - accents, secondary actions)
- Success: 142 71% 45% (Career guidance positive indicators)
- Background: 0 0% 98% (Warm off-white base)
- Surface: 0 0% 100% (Cards, panels, chat bubbles)
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%
- Border: 214 32% 91%

**Dark Mode:**
- Primary: 220 90% 60%
- Primary Hover: 220 90% 68%
- Secondary: 260 50% 70%
- Success: 142 71% 55%
- Background: 222 47% 11%
- Surface: 217 33% 17%
- Text Primary: 0 0% 98%
- Text Secondary: 215 20% 65%
- Border: 217 33% 25%

**Semantic Colors:**
- AI Thinking: 260 60% 65% (pulsing indicator during API calls)
- Voice Active: 0 84% 60% (microphone recording state)
- Upload Preview: 200 18% 46% (file upload zones)

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, modern, excellent readability for UI
- Headings: 'Poppins' (Google Fonts) - Friendly, approachable for student audience
- Code/Technical: 'JetBrains Mono' (for code snippets in doubt solver)

**Type Scale:**
- Hero/Dashboard Title: text-4xl lg:text-5xl font-bold (Poppins)
- Section Headers: text-2xl lg:text-3xl font-semibold (Poppins)
- Card Titles: text-xl font-semibold (Poppins)
- Body Text: text-base (Inter)
- Chat Messages: text-sm lg:text-base (Inter)
- Helper Text: text-sm text-secondary (Inter)
- Buttons: text-sm lg:text-base font-medium (Inter)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-4 to gap-6
- Button padding: px-6 py-3

**Container Strategy:**
- Login/Registration: max-w-md centered
- Dashboard: max-w-7xl with grid-cols-1 md:grid-cols-3 for feature cards
- Chat Interface: max-w-4xl for optimal reading width
- Career Guidance: max-w-3xl for questionnaire, max-w-6xl for results grid
- Institute Finder: max-w-6xl with grid-cols-1 md:grid-cols-2 lg:grid-cols-3

### D. Component Library

**Navigation:**
- Top Header: Sticky navigation with EduMate logo (left), user greeting + logout (right), h-16 with shadow-sm
- Dashboard Cards: Elevated cards with hover lift effect (shadow-lg hover:shadow-xl transition)

**Forms:**
- Input Fields: Outlined style with focus ring, h-12, rounded-lg, clear labels above
- Subject Selector: Pill-style button group (rounded-full badges) before chat
- Career Quiz: Step-by-step cards with progress indicator at top
- File Upload: Dashed border dropzone with preview thumbnails below

**Chat Interface:**
- Messages: Rounded bubbles, user (right-aligned, primary bg), AI (left-aligned, surface bg with border)
- Input Bar: Sticky bottom, elevated with shadow, contains text input + mic + send + file upload buttons
- Voice Indicator: Pulsing red circle when recording, animated waveform during AI response
- Loading State: Three animated dots in AI bubble color

**Data Display:**
- Career Cards: Grid layout, icon at top, title, description, "Learn More" link
- Institute Cards: Image placeholder at top (if available), name as heading, address with location icon, rating stars, "Get Directions" button
- Chat History: Scrollable list with timestamp headers for each session

**Overlays:**
- Modal Dialogs: Centered overlay with backdrop blur, max-w-lg, rounded-xl
- File Preview: Full-screen lightbox for uploaded images/videos
- Confirmation: Small centered card for "Clear Chat" confirmation

### E. Animations

**Sparingly Used:**
- Card Hover: Subtle lift (translateY -2px) with shadow transition
- Button Press: Scale 0.98 on active state
- AI Thinking: Gentle pulse on loading indicator
- Voice Recording: Pulsing animation on mic icon
- Page Transitions: Simple fade-in for new sections (200ms)

**NO complex scroll animations, parallax, or decorative motion**

---

## Page-Specific Layouts

### Login/Registration Page
- Centered card design with EduMate logo at top
- Toggle between Login/Register modes
- Clean form with email, password, (name for registration)
- Primary CTA button: "Sign In" / "Create Account"
- Soft gradient background (220 90% 95% to 260 60% 95%)

### Dashboard
- Welcome header: "Welcome back, [Name]!" (text-3xl, Poppins)
- Three large cards in grid (equal height, hover effects):
  - AI Doubt Solver: Graduation cap icon, description, "Start Learning" button
  - Career Guidance: Compass icon, description, "Explore Careers" button
  - Local Institutes: Map pin icon, description, "Find Institutes" button
- Each card: p-8, rounded-xl, shadow-md

### AI Doubt Solver (Chat)
- Top bar: Subject selector pills (Math, Science, English, Coding, etc.)
- Chat area: Full height minus header and input, scrollable, messages with timestamps
- Bottom bar: Text input (grows to 3 lines max), mic button (left of input), file upload button, send button
- File previews: Below input bar as small thumbnails with remove X
- "Clear Chat" button in top-right corner

### Career Guidance
- Step 1: Questionnaire card with progress bar
- Questions: Multiple choice pills or text inputs, one per screen
- Step 2: Loading animation while generating
- Step 3: Results grid (2-3 columns) with career suggestion cards
- Each card: Icon, title, description, relevant subjects, "Learn More" link

### Local Institutes
- Top section: Current location display with "Detect Location" button
- Filter bar: Subject category pills
- Results grid: 2-3 columns of institute cards
- Each card: Placeholder image area (16:9), name, address with icon, rating, CTA button

---

## Images

**Hero Images:** No large hero images for this application
**Icon Library:** Material Icons via CDN (consistent with Material Design approach)
**User-Generated:** Student-uploaded files in chat (images/videos with preview)
**Institute Placeholders:** Generic education building illustrations or map thumbnails
**Dashboard Icons:** Large, colorful icons for each feature card (graduation cap, compass, map pin) - use Material Icons at 48px-64px size