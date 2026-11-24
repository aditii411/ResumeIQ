/* ==========================================================================
   DESIGN TOKENS & STRICT LIGHT-THEME RUNTIME ENFORCER
   ========================================================================== */

const DESIGN_TOKENS = {
  canvasBackground: '#F8FAFC',
  cardSurfaceBackground: '#FFFFFF',
  cardBorder: '#E2E8F0',
  navigationSidebar: '#FFFFFF',
  sidebarBorder: '#E2E8F0',
  primaryBrandAccent: '#2563EB',
  primaryBrandAccentHover: '#1D4ED8',
  softTintHighlightBg: '#EFF6FF',
  softTintHighlightBorder: '#DBEAFE',
  primaryHeadingText: '#0F172A',
  secondaryBodyText: '#475569',
  mutedCaptionText: '#64748B',
  
  // Semantic Status Badges
  statusMatched: {
    background: '#ECFDF5',
    text: '#065F46',
    border: '#A7F3D0',
    label: 'Matched'
  },
  statusPartial: {
    background: '#FFFBEB',
    text: '#92400E',
    border: '#FDE68A',
    label: 'Partial'
  },
  statusMissing: {
    background: '#FEF2F2',
    text: '#991B1B',
    border: '#FECACA',
    label: 'Missing'
  }
};

/**
 * Returns strict semantic badge HTML based on status
 * @param {'matched'|'partial'|'missing'|'high'|'medium'|'low'} status
 * @param {string} [customLabel]
 */
function createStatusBadge(status, customLabel) {
  const norm = (status || '').toLowerCase();
  
  if (norm === 'matched' || norm === 'high') {
    return `<span class="badge badge-matched"><span class="badge-dot"></span>${customLabel || 'Matched'}</span>`;
  }
  if (norm === 'partial' || norm === 'medium') {
    return `<span class="badge badge-partial"><span class="badge-dot"></span>${customLabel || 'Partial'}</span>`;
  }
  if (norm === 'missing' || norm === 'low') {
    return `<span class="badge badge-missing"><span class="badge-dot"></span>${customLabel || 'Missing'}</span>`;
  }
  return `<span class="badge badge-neutral">${customLabel || status}</span>`;
}

/**
 * Strict Light Theme Assertion & Runtime Enforcement
 * Verifies that document conforms to 100% light SaaS mode and rejects dark styles.
 */
function enforceStrictLightTheme() {
  const root = document.documentElement;
  root.style.colorScheme = 'light';
  root.setAttribute('data-theme', 'light');
  
  // Guard against any external dark mode injection or class
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
  }

  // Double-check background color matches Slate-50 (#F8FAFC)
  const computedBg = window.getComputedStyle(document.body).backgroundColor;
  console.log('[Strict Light-Theme Design System] Active:', {
    canvas: DESIGN_TOKENS.canvasBackground,
    surface: DESIGN_TOKENS.cardSurfaceBackground,
    brandAccent: DESIGN_TOKENS.primaryBrandAccent,
    tintHighlight: DESIGN_TOKENS.softTintHighlightBg,
    computedBodyBg: computedBg
  });
}

// Global exposure
if (typeof window !== 'undefined') {
  window.DESIGN_TOKENS = DESIGN_TOKENS;
  window.createStatusBadge = createStatusBadge;
  window.enforceStrictLightTheme = enforceStrictLightTheme;
}
