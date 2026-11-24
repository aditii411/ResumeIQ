/* ==========================================================================
   CHARTS: Crisp, Minimalist High-Contrast SVG Visualizations
   (No Clutter, 100% Strict Light-Theme Compliant)
   ========================================================================== */

const SAAS_CHARTS = {
  /**
   * Generates a pristine SVG Radial Score Gauge
   */
  createRadialGaugeSVG(score, size = 180, strokeWidth = 14) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedScore = Math.max(0, Math.min(100, score));
    const offset = circumference - (clampedScore / 100) * circumference;
    
    // Determine tone based on score
    let strokeColor = '#2563EB'; // Blue-600 default
    if (clampedScore >= 85) strokeColor = '#059669'; // Green high
    else if (clampedScore < 60) strokeColor = '#DC2626'; // Red low

    return `
      <div class="gauge-wrapper" style="width: ${size}px; height: ${size}px; margin: 0 auto;">
        <svg class="gauge-svg" width="${size}" height="${size}">
          <!-- Background Track -->
          <circle 
            class="gauge-bg-circle" 
            cx="${size/2}" 
            cy="${size/2}" 
            r="${radius}" 
            stroke-width="${strokeWidth}" 
          />
          <!-- Progress Arc -->
          <circle 
            class="gauge-progress-circle" 
            cx="${size/2}" 
            cy="${size/2}" 
            r="${radius}" 
            stroke-width="${strokeWidth}" 
            stroke="${strokeColor}"
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${offset}" 
          />
        </svg>
        <div class="gauge-label">
          <span class="gauge-score" id="gauge-score-value">${clampedScore}%</span>
          <span class="gauge-subtext">ATS Match</span>
        </div>
      </div>
    `;
  },

  /**
   * Renders the category horizontal progress breakdown
   */
  renderCategoryBars(containerId, categories) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
    
    categories.forEach(cat => {
      let fillColor = '#2563EB';
      let badgeClass = 'badge-matched';
      let badgeLabel = 'Matched';

      if (cat.percentage >= 80) {
        fillColor = '#10B981';
        badgeClass = 'badge-matched';
        badgeLabel = 'Strong';
      } else if (cat.percentage >= 60) {
        fillColor = '#F59E0B';
        badgeClass = 'badge-partial';
        badgeLabel = 'Moderate';
      } else {
        fillColor = '#EF4444';
        badgeClass = 'badge-missing';
        badgeLabel = 'Needs Work';
      }

      html += `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-weight: 600; color: #0F172A; font-size: 0.85rem;">${cat.name}</span>
              <span class="badge ${badgeClass}" style="font-size: 0.7rem; padding: 0.15rem 0.45rem;">${badgeLabel}</span>
            </div>
            <span style="font-weight: 700; color: #0F172A; font-size: 0.875rem;">${cat.percentage}%</span>
          </div>
          <div class="progress-bar-container" style="height: 7px;">
            <div class="progress-bar-fill" style="width: ${cat.percentage}%; background-color: ${fillColor};"></div>
          </div>
          <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.25rem;">${cat.detail}</div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  },

  /**
   * High-contrast, clean SVG Comparison Chart
   */
  renderBenchmarkChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const metrics = [
      { label: 'Keywords', current: 72, target: 95 },
      { label: 'Experience', current: 85, target: 90 },
      { label: 'Formatting', current: 96, target: 100 },
      { label: 'Metrics', current: 64, target: 88 },
      { label: 'Leadership', current: 70, target: 85 }
    ];

    let svgBars = '';
    const chartHeight = 160;
    const barWidth = 24;
    const gap = 38;
    const startX = 40;

    metrics.forEach((m, idx) => {
      const x = startX + idx * (barWidth * 2 + gap);
      const currHeight = (m.current / 100) * (chartHeight - 30);
      const targetHeight = (m.target / 100) * (chartHeight - 30);
      const currY = chartHeight - currHeight;
      const targetY = chartHeight - targetHeight;

      svgBars += `
        <!-- Target Goal Bar (Subtle Tint Outline) -->
        <rect x="${x}" y="${targetY}" width="${barWidth}" height="${targetHeight}" rx="4" fill="#EFF6FF" stroke="#DBEAFE" stroke-width="1" />
        <text x="${x + barWidth/2}" y="${targetY - 6}" font-size="10" font-weight="600" fill="#64748B" text-anchor="middle">${m.target}%</text>

        <!-- Current Resume Bar (Primary Blue Solid) -->
        <rect x="${x + barWidth + 4}" y="${currY}" width="${barWidth}" height="${currHeight}" rx="4" fill="#2563EB" />
        <text x="${x + barWidth + 4 + barWidth/2}" y="${currY - 6}" font-size="10" font-weight="700" fill="#0F172A" text-anchor="middle">${m.current}%</text>

        <!-- Category Label -->
        <text x="${x + barWidth + 2}" y="${chartHeight + 20}" font-size="11" font-weight="500" fill="#475569" text-anchor="middle">${m.label}</text>
      `;
    });

    const svg = `
      <div style="overflow-x: auto; padding-top: 0.5rem;">
        <svg viewBox="0 0 460 195" style="width: 100%; max-width: 460px; height: auto; display: block; margin: 0 auto;">
          <!-- Grid lines -->
          <line x1="20" y1="${chartHeight}" x2="440" y2="${chartHeight}" stroke="#E2E8F0" stroke-width="1" />
          <line x1="20" y1="${chartHeight / 2}" x2="440" y2="${chartHeight / 2}" stroke="#F1F5F9" stroke-dasharray="3 3" stroke-width="1" />
          
          ${svgBars}
        </svg>
        <div style="display: flex; justify-content: center; gap: 1.5rem; margin-top: 0.75rem; font-size: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 12px; height: 12px; border-radius: 2px; background: #2563EB; display: inline-block;"></span>
            <span style="color: #0F172A; font-weight: 500;">Current Resume</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 12px; height: 12px; border-radius: 2px; background: #EFF6FF; border: 1px solid #DBEAFE; display: inline-block;"></span>
            <span style="color: #64748B; font-weight: 500;">Target Role Benchmark</span>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = svg;
  }
};

if (typeof window !== 'undefined') {
  window.SAAS_CHARTS = SAAS_CHARTS;
}
