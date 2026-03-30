# CLAUDE.md — The Affectionate Care Company

## Project Overview
Website for The Affectionate Care Company, a UK care company based in Dartford & Rochester, Kent. Three-page site: Landing, About, Contact. Stack: Next.js 14, TypeScript, Tailwind CSS.

---

## Design Context

### Users
Families and loved ones seeking care for people with autism, learning disabilities, age-related needs, or alcohol dependency. Secondary: care facilities seeking staffing, potential staff joining the team. Emotionally invested visitors who need to feel trust and calm immediately. Not technically sophisticated — every interaction must feel effortless.

### Brand Personality
**Three words: Calm. Credible. Human.**

Warm but never informal. Quiet confidence. The tone of a trusted professional who genuinely cares. Never clinical in the cold sense — clinical in the *private clinic* sense. Never shouts.

### Aesthetic Direction
**Futuristic pharmacy** — Apple meets a high-end private care clinic. Airy. Light. Simply sophisticated.

- **Base**: White (`#FFFFFF`) and warm off-white (`#FAFAF8`)
- **Primary accent**: Sage / eucalyptus green
- **Secondary accent**: Champagne / warm sand gold
- **Light mode only**
- **Typography**: Playfair Display (headings) + Nunito Sans (body/UI)
- **Motion**: Scroll-triggered fade-ins, gentle parallax, natural easing. Never abrupt, never bouncy. Breathes into view.
- **Anti-references**: No NHS blue, no budget care look, no dark mode, nothing loud or bouncy.

### Design Principles
1. **Breathe first.** Whitespace is calm. Every section needs room. Never crowd.
2. **Trust through restraint.** Do less, not more. Every element must justify its presence.
3. **Two accents, used sparingly.** Sage and gold are precious. One per section. Never competing.
4. **Motion as exhale.** Animations reveal the page gently. If it calls attention to itself, it's too much.
5. **Accessibility is dignity.** WCAG 2.1 AA minimum. This site serves vulnerable people — everyone must be able to use it.

### Canonical Design Tokens
See `.impeccable.md` for the full token reference including all colour scales, typography scale, spacing landmarks, and motion values.

### Accessibility
- Target: **WCAG 2.1 AA**
- Full keyboard navigation, semantic HTML, descriptive alt text
- Focus indicators visible (styled with sage-400)
- `prefers-reduced-motion: reduce` disables all transitions/animations

### 21st.dev Components (to adapt)
Hero, Testimonials, Footer, Services section — all others built from scratch.
