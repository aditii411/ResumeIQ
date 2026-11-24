# CareerSync SaaS — Strict Light-Theme Career & ATS Platform

A modern, high-contrast, airy SaaS web application engineered with a **100% strict light-theme design system** (MANDATORY — NO DARK MODE). Designed for enterprise-grade ATS resume intelligence, career optimization, "What-If" scoring simulations, and standardized PDF audit reporting.

---

## 🎨 Strict Light-Theme Design System Compliance

Every page, sidebar, top navigation, modal dialog, chart, and exportable PDF report strictly adheres to the mandated design specification:

| Design Token | Value | Applied To |
| :--- | :--- | :--- |
| **Page Canvas Background** | `#F8FAFC` (Slate-50) | Main page body, application background canvas |
| **Card & Surface Background** | `#FFFFFF` (Pure White) | Rounded-xl white cards, content surfaces with 1px solid `#E2E8F0` and `shadow-sm` |
| **Navigation & Sidebar** | `#FFFFFF` (Light) | Left sidebar and top navigation with `#E2E8F0` border (**Strictly NO dark navy or black**) |
| **Primary Brand Accent** | `#2563EB` (Blue-600) | Primary action buttons, active navigation, key progress indicators (hover: `#1D4ED8`) |
| **Soft Tint Highlights** | `#EFF6FF` (Blue-50) | "What-If" Score Simulator banner, active filters, key callouts with `#DBEAFE` border |
| **Primary Heading Text** | `#0F172A` (Slate-900) | Page titles, card headings, modal headers, bold metrics |
| **Secondary Body Text** | `#475569` (Slate-600) | Paragraph descriptions, table text, contextual explanations |
| **Muted / Caption Text** | `#64748B` (Slate-500) | Metadata captions, subtext, timestamp labels, field hints |

### Semantic Status Badges (Soft Pastel Fills with Dark Readable Text)

| Status | Background | Text | Border | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Matched / High Score** | `#ECFDF5` | `#065F46` | `#A7F3D0` | Matched keywords, top tier ATS score (85%+), passing checks |
| **Partial / Medium Score** | `#FFFBEB` | `#92400E` | `#FDE68A` | Partial matches, medium priority warnings, moderate scores |
| **Missing / Low Score** | `#FEF2F2` | `#991B1B` | `#FECACA` | Missing critical keywords, low ATS score (<60%), failing checks |

---

## 🚫 Strict Visual Exclusions Enforced

- **NO Dark Mode**: Complete exclusion of dark themes, dark mode toggles, or dark body styles (`color-scheme: light !important;`).
- **NO Dark Headers or Dark Footers**: Navigation bars and footers use pure `#FFFFFF` with `#E2E8F0` dividers.
- **NO Dark Code or Preview Blocks**: All code/preview blocks use light slate backgrounds (`#F1F5F9`) with `#0F172A` text and `#E2E8F0` borders.
- **NO Heavy Multi-Color Neon Gradients or Glowing Effects**: All elevation uses subtle standard shadow tokens (`--shadow-sm`).
- **NO Cluttered Dashboards or Decorative Fake Charts**: Crisp, high-contrast, clean SVG radial gauges and comparison bar charts.
- **Generous Whitespace & Crisp Typography**: Inter / system sans-serif typography with `rounded-xl` (`12px`) white cards.

---

## 🚀 Core Features

1. **Executive ATS Dashboard**
   - Live candidate readiness index with high-contrast radial gauge.
   - Target opportunity overview (Role, Company, ATS system, Salary).
   - ATS Dimension Benchmark comparison chart.
   - Skill category health meters.

2. **ATS Resume Scanner & Matcher**
   - Side-by-side comparison of candidate resume vs. target job description.
   - Automated ATS diagnostic covering Greenhouse and Workday parsing algorithms.
   - One-click resume re-scan and modal upload.

3. **"What-If" Score Simulator**
   - Prominently styled in `#EFF6FF` soft tint banner with `#DBEAFE` 1px border.
   - Interactive levers: toggle missing keywords (Kubernetes EKS, GraphQL, OpenTelemetry, AWS Solutions Architect, RFCs).
   - Experience seniority slider (4 to 10+ years).
   - Quantified metrics toggle (+5% score boost).
   - Real-time radial gauge and delta indicator recalculation.
   - "Apply to Profile" action to commit simulated improvements.

4. **Keyword & Skills Gap Matrix**
   - Filter by All, Matched, Partial, and Missing skills.
   - Displays strict semantic status badges for each competency.
   - Real-time search and filtering.
   - "Quick Fix" modal offering recommended insertion phrasing for missing keywords.

5. **Bullet Point Optimizer & Impact Rewriter**
   - Before & After comparative case studies demonstrating the Google "XYZ" formula.
   - Live AI bullet optimizer: input weak, passive sentences to generate 3 high-impact, quantified variations with ATS score attribution.

6. **Job Application Pipeline Tracker**
   - Pipeline tracking target applications across Stripe, Datadog, Linear, Figma, Retool, etc.
   - Status tracking with ATS match indicators.
   - Add new job application modal with automatic score evaluation.

7. **Printable / Exportable PDF Report**
   - Standardized A4/Letter formatted executive report.
   - Dedicated print stylesheet (`@media print`) preserving exact light colors and semantic badges while omitting chrome/buttons.
   - JSON data export for automated reporting pipelines.

---

## 📦 Project File Structure

```text
careersync-saas/
├── index.html                   # Main SaaS Application Single Page Architecture
├── report-preview.html          # Standalone Direct Printable PDF Report
├── package.json                 # Project configuration and launch scripts
├── README.md                    # Comprehensive documentation and design system specs
├── serve.py                     # Zero-dependency Python HTTP server
├── start_app.bat                # Windows 1-click batch launcher
├── start_app.ps1                # PowerShell launcher script
├── css/
│   ├── design-system.css        # Strict light-theme tokens, variables, and typography
│   ├── layout.css               # Sidebar (#FFFFFF), top navigation, and responsive grid
│   ├── components.css           # Rounded-xl cards, semantic badges, buttons, modals, banner
│   └── print.css                # Dedicated print & PDF styling (@media print)
├── js/
│   ├── app.js                   # Application controller and view router
│   ├── design-tokens.js         # Runtime token definitions & strict light-theme enforcer
│   ├── data.js                  # Realistic candidate, job, and keyword datasets
│   ├── charts.js                # Minimalist, high-contrast SVG gauges & comparison bars
│   ├── simulator.js             # "What-If" Score Simulator interactive modeling engine
│   ├── scanner.js               # ATS parser and keyword gap matrix
│   ├── rewriter.js              # Bullet point optimizer & impact quantification
│   ├── pdf-generator.js         # PDF report generator & JSON exporter
│   └── modals.js                # Modal overlay and keyboard management
└── assets/
    └── icons/
        └── icons.js             # Crisp inline SVG vector icons (zero external dependencies)
```

---

## 🛠️ How to Run

### Option 1: 1-Click Launch (Windows)
Double-click `start_app.bat` or run:
```powershell
.\start_app.ps1
```

### Option 2: Using Python Standard Library
```bash
python serve.py
```
Then open your browser at `http://localhost:8080`.

### Option 3: Direct Browser Launch
Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari). Zero build step required!
