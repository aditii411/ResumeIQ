/* ==========================================================================
   BULLET POINT OPTIMIZER & QUANTIFICATION REWRITER
   ========================================================================== */

const BULLET_REWRITER = {
  renderOptimizerView() {
    const container = document.getElementById('optimizer-view-container');
    if (!container) return;

    const bullets = window.SAMPLE_DATA.bulletOptimizations;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bullet Point Optimizer & Impact Rewriter</h1>
          <p class="page-subtitle">Transform passive task descriptions into quantified, action-verb driven career accomplishments</p>
        </div>
      </div>

      <!-- Interactive Rewriter Workbench -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="card-header">
          <div>
            <h3 class="card-title">Live Bullet Point AI Rewriter</h3>
            <p class="card-description">Paste any weak resume sentence to instantly generate 3 high-impact, ATS-optimized alternatives</p>
          </div>
          <span class="badge badge-matched">XYZ Formula Enabled</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="font-weight: 600; font-size: 0.85rem; color: #0F172A; display: block; margin-bottom: 0.4rem;">
              Draft / Current Bullet Point:
            </label>
            <textarea 
              id="user-bullet-input" 
              rows="3" 
              style="width: 100%; resize: vertical; line-height: 1.5;"
              placeholder="e.g. Worked on migrating the microservices to AWS and fixed database latency issues..."
            >Responsible for writing backend code, creating APIs, and handling server deployments on AWS.</textarea>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span style="font-size: 0.8rem; color: #64748B;">Quick Sample:</span>
              <button class="btn btn-secondary btn-sm" onclick="BULLET_REWRITER.loadSample(0)">Microservices</button>
              <button class="btn btn-secondary btn-sm" onclick="BULLET_REWRITER.loadSample(1)">Docker Migration</button>
              <button class="btn btn-secondary btn-sm" onclick="BULLET_REWRITER.loadSample(2)">Postgres Query</button>
            </div>

            <button class="btn btn-primary" onclick="BULLET_REWRITER.optimizeInput()">
              ${window.getIcon('sparkles')} Optimize & Quantify Impact
            </button>
          </div>

          <!-- Generated Results Box -->
          <div id="optimizer-results-box" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <!-- Rendered by optimizeInput() -->
          </div>
        </div>
      </div>

      <!-- Before & After Case Studies Grid -->
      <div style="margin-bottom: 1rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #0F172A; margin-bottom: 0.35rem;">
          High-Impact Transformation Examples
        </h3>
        <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1.25rem;">
          Real benchmark transformations showing how action verbs and numerical outcomes trigger top-tier recruiter scoring.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${bullets.map(b => `
          <div class="card" style="padding: 1.25rem 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
              <span style="font-size: 0.85rem; font-weight: 600; color: #0F172A;">${b.role}</span>
              <span class="badge badge-matched">${b.scoreGain} Impact</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <!-- Weak Before -->
              <div style="background-color: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px; padding: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #991B1B; margin-bottom: 0.4rem;">
                  ${window.getIcon('cross')} Before: Passive & Unquantified
                </div>
                <div style="font-size: 0.85rem; color: #475569; line-height: 1.5;">
                  "${b.weak}"
                </div>
                <div style="margin-top: 0.6rem; font-size: 0.75rem; color: #991B1B;">
                  Lacks specific scope, tooling, and business metrics.
                </div>
              </div>

              <!-- Strong After -->
              <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 10px; padding: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #065F46; margin-bottom: 0.4rem;">
                  ${window.getIcon('check')} After: Quantified Google "XYZ" Formula
                </div>
                <div style="font-size: 0.85rem; color: #065F46; line-height: 1.5; font-weight: 500;">
                  "${b.strong}"
                </div>
                <div style="margin-top: 0.6rem; display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  ${b.metrics.map(m => `<span class="badge badge-matched" style="font-size: 0.7rem; padding: 0.1rem 0.4rem;">${m}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Initialize with default optimization
    this.optimizeInput();
  },

  loadSample(index) {
    const samples = [
      'Worked on backend APIs, improved performance and handled customer bug fixes for the main product.',
      'Responsible for setting up Docker containers and migrating old servers to AWS.',
      'Helped the team with database queries and made things run faster with cache.'
    ];
    const input = document.getElementById('user-bullet-input');
    if (input && samples[index]) {
      input.value = samples[index];
      this.optimizeInput();
    }
  },

  optimizeInput() {
    const input = document.getElementById('user-bullet-input');
    const container = document.getElementById('optimizer-results-box');
    if (!input || !container) return;

    const raw = input.value.trim() || 'Built web applications and maintained cloud server instances.';

    const suggestions = [
      {
        title: 'Option A: High-Throughput & Scale Focus',
        text: `Architected and shipped resilient cloud microservices on AWS handling over 35,000 requests/second, improving API p95 latency by 42% and achieving 99.98% operational uptime.`,
        scoreGain: '+8 pts ATS gain',
        verbs: 'Architected, Shipped, Improving'
      },
      {
        title: 'Option B: Cost Efficiency & Infrastructure Optimization',
        text: `Engineered containerized deployment architecture utilizing Docker and automated CI/CD pipelines, slashing build times by 55% and reducing annual cloud compute spend by $84,000.`,
        scoreGain: '+9 pts ATS gain',
        verbs: 'Engineered, Containerized, Slashing'
      },
      {
        title: 'Option C: Cross-Functional Leadership & Velocity',
        text: `Championed engineering best practices and technical design RFCs across 4 squads, accelerating sprint delivery cadence by 28% while mentoring 3 junior engineers to promotion.`,
        scoreGain: '+7 pts ATS gain',
        verbs: 'Championed, Accelerating, Mentoring'
      }
    ];

    container.innerHTML = `
      <div style="font-weight: 600; color: #0F172A; font-size: 0.9rem; margin-top: 0.5rem; margin-bottom: 0.25rem;">
        AI-Generated High-Impact Variations:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${suggestions.map((s, idx) => `
          <div style="padding: 1rem; border: 1px solid #DBEAFE; background: #EFF6FF; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #1E40AF; font-size: 0.85rem;">${s.title}</span>
              <span class="badge badge-matched">${s.scoreGain}</span>
            </div>
            <div style="font-size: 0.875rem; color: #1E3A8A; line-height: 1.5; font-weight: 500;">
              "${s.text}"
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.25rem;">
              <span style="font-size: 0.75rem; color: #64748B;">Action Verbs: <strong>${s.verbs}</strong></span>
              <button class="btn btn-secondary btn-sm" onclick="BULLET_REWRITER.copyText('${s.text.replace(/'/g, "\\'")}')">
                ${window.getIcon('copy')} Copy to Clipboard
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (window.APP && window.APP.notify) {
      window.APP.notify('Optimized bullet copied to clipboard!');
    }
  }
};

if (typeof window !== 'undefined') {
  window.BULLET_REWRITER = BULLET_REWRITER;
}
