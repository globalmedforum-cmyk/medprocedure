Read `AGENTS.md` before starting.

We are refining the authentication UI and layout to match the minimalist dark split-panel design from the visual reference.

### Scope

1. **Two-Panel Layout (`components/auth/auth-shell.tsx`)**:
   - Background: Pure deep black (`#000000` / `bg-black`).
   - Left Column (visible on `lg` screens):
     - Vertical border right (`border-r border-zinc-800/70`).
     - Vertically centered branding block:
       - Title: "medprocedure" in elegant serif font styling.
       - Subtitle/Tagline: "Qualification et installation médicale."
       - Feature list with cyan/teal em-dash bullets (`—` in cyan accent `#06b6d4` / `#0284c7`).
     - Bottom-left discreet circular brand avatar/badge.
   - Right Column:
     - Centered Clerk authentication card with generous spacing and backdrop.
   - Mobile: Clean single-column layout centered on the form.

2. **Clerk Appearance Customization (`app/layout.tsx` & `globals.css`)**:
   - Card container: Deep dark surface (`#0d0d0d` / `rgb(13, 13, 13)`), `border border-zinc-800`, `rounded-2xl`, no heavy drop shadows.
   - Primary submit button: Vibrant cyan/teal accent (`#06b6d4` / `#00d2d3`), rounded corners, bold dark text (`text-black`), arrow indicator.
   - Form fields: Dark input backgrounds (`#18181b`), subtle borders, rounded corners.
   - Social buttons: Google & GitHub in dark block button style with clean borders.
   - Links & accents: Cyan highlight for "Sign up" / "Sign in" switch links.

3. **Check when done**:
   - `/sign-in` and `/sign-up` render the split-screen design matching the visual reference.
   - Primary action button uses the signature cyan/teal CTA styling.
   - `npm run build` and `npm run lint` pass without errors.
