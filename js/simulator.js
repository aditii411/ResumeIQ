/* ==========================================================================
   WHAT-IF SCORE SIMULATOR: Real-Time Interactive ATS Score Modeler
   Banner: #EFF6FF with #DBEAFE border
   ========================================================================== */

const SCORE_SIMULATOR = {
  baseScore: 74,
  currentSimulatedScore: 74,
  selectedOptions: new Set(),
  experienceYears: 7,
  hasQuantifiedMetrics: false,

  init() {
    this.baseScore = window.SAMPLE_DATA.candidate.currentAtsScore || 74;
    this.currentSimulatedScore = this.baseScore;
    this.renderSimulator();
  },

  renderSimulator() {
    const container = document.getElementById('simulator-view-container');
    if (!container) return;

    const options = window.SAMPLE_DATA.simulatorOptions;

    container.innerHTML = `
      <!-- Soft Tint Highlight Banner (#EFF6FF background with #DBEAFE border) -->
      <div class="tint-banner simulator-banner">
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <div class="tint-banner-icon">
            ${window.getIcon('simulator')}
          </div>
          <div class="tint-banner-content">
            <h4>"What-If" Score Simulator</h4>
            <p>
              Model how adding missing technical competencies, cloud certifications, and quantifiable metrics will 
              directly boost your candidate rank in Greenhouse and Workday ATS algorithms before applying.
            </p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
          <button class="btn btn-secondary btn-sm" onclick="SCORE_SIMULATOR.resetSimulator()">
            ${window.getIcon('refresh')} Reset
          </button>
          <button class="btn btn-primary btn-sm" onclick="SCORE_SIMULATOR.applyToResume()">
            ${window.getIcon('sparkles')} Apply to Profile
          </button>
        </div>
      </div>

      <!-- Main Simulator Interactive Grid -->
      <div class="grid-split-60-40">
        <!-- Left: Interactive Controls -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Missing Qualification Levers</h3>
              <p class="card-description">Toggle keyword injections and credentials to observe instant score impact</p>
            </div>
            <span class="badge badge-neutral" id="sim-active-count">0 Levers Active</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${options.map(opt => `
              <div 
                id="sim-card-${opt.id}" 
                class="sim-option-item"
                style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border: 1px solid #E2E8F0; border-radius: 12px; background: #FFFFFF; transition: all 150ms;"
              >
                <div style="flex: 1; padding-right: 1rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="font-weight: 600; color: #0F172A; font-size: 0.9rem;">${opt.name}</span>
                    <span class="badge badge-matched" style="font-size: 0.7rem; padding: 0.1rem 0.45rem;">+${opt.scoreDelta}% Score</span>
                  </div>
                  <div style="font-size: 0.8rem; color: #64748B;">${opt.description}</div>
                </div>

                <label class="toggle-switch">
                  <input 
                    type="checkbox" 
                    id="chk-${opt.id}" 
                    onchange="SCORE_SIMULATOR.toggleOption('${opt.id}', ${opt.scoreDelta})"
                    ${this.selectedOptions.has(opt.id) ? 'checked' : ''}
                  >
                  <span class="toggle-slider"></span>
                </label>
              </div>
            `).join('')}
          </div>

          <!-- Secondary Levers: Experience & Metric Quantification -->
          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid #F1F5F9; display: flex; flex-direction: column; gap: 1.25rem;">
            <!-- Experience Slider -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label style="font-weight: 600; color: #0F172A; font-size: 0.875rem;">Relevant Experience Calibration</label>
                <span id="exp-val-display" style="font-weight: 700; color: #2563EB; font-size: 0.9rem;">7 Years</span>
              </div>
              <input 
                type="range" 
                class="range-slider" 
                min="4" 
                max="10" 
                value="${this.experienceYears}" 
                id="sim-exp-slider"
                oninput="SCORE_SIMULATOR.onExpChange(this.value)"
              >
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748B; margin-top: 0.35rem;">
                <span>4 Years (Mid)</span>
                <span>7 Years (Current)</span>
                <span>10+ Years (Senior Staff)</span>
              </div>
            </div>

            <!-- Quantified Metrics Toggle -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px;">
              <div>
                <div style="font-weight: 600; color: #0F172A; font-size: 0.875rem;">Quantified Metric Bullet Booster</div>
                <div style="font-size: 0.775rem; color: #64748B; margin-top: 0.15rem;">Rewrite bullets to include numerical business impact (+5% score gain)</div>
              </div>
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  id="chk-metrics" 
                  onchange="SCORE_SIMULATOR.toggleMetrics(this.checked)"
                  ${this.hasQuantifiedMetrics ? 'checked' : ''}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Right: Real-time Projection & Score Impact -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <!-- Score Gauge Card -->
          <div class="card" style="text-align: center;">
            <div class="card-header" style="justify-content: center;">
              <h3 class="card-title">Projected ATS Match Score</h3>
            </div>
            
            <div id="sim-gauge-container">
              ${window.SAAS_CHARTS.createRadialGaugeSVG(this.currentSimulatedScore, 190, 16)}
            </div>

            <div style="margin-top: 1.25rem; display: flex; justify-content: center; align-items: center; gap: 0.75rem;">
              <div style="font-size: 0.85rem; color: #64748B;">
                Base Score: <strong style="color: #0F172A;">${this.baseScore}%</strong>
              </div>
              <span id="sim-delta-badge" class="badge badge-matched" style="font-size: 0.8rem;">
                +0% Improvement
              </span>
            </div>

            <div style="margin-top: 1.25rem; padding: 1rem; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; font-size: 0.8rem; text-align: left; line-height: 1.5;">
              <div style="font-weight: 600; color: #0F172A; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.35rem;">
                ${window.getIcon('check')} ATS Recruiter Benchmark
              </div>
              <div style="color: #475569;" id="sim-verdict-text">
                Current profile is at 74%. Reaching 85%+ places your application in the top 5% automated interview queue.
              </div>
            </div>
          </div>

          <!-- Cumulative Impact Breakdown -->
          <div class="card">
            <h4 style="font-size: 0.95rem; font-weight: 600; color: #0F172A; margin-bottom: 0.75rem;">
              Score Factor Attribution
            </h4>
            <div id="sim-attribution-list" style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.825rem;">
              <div style="display: flex; justify-content: space-between; color: #475569; padding-bottom: 0.4rem; border-bottom: 1px solid #F1F5F9;">
                <span>Base Resume Match</span>
                <span style="font-weight: 600; color: #0F172A;">74%</span>
              </div>
              <div id="sim-levers-applied-summary" style="display: flex; flex-direction: column; gap: 0.35rem;">
                <span style="color: #64748B; font-style: italic;">No additional levers active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.updateGaugeAndStats();
  },

  toggleOption(optionId, delta) {
    if (this.selectedOptions.has(optionId)) {
      this.selectedOptions.delete(optionId);
    } else {
      this.selectedOptions.add(optionId);
    }
    this.recalculate();
  },

  onExpChange(val) {
    this.experienceYears = parseInt(val, 10);
    const display = document.getElementById('exp-val-display');
    if (display) display.textContent = `${this.experienceYears} Years`;
    this.recalculate();
  },

  toggleMetrics(checked) {
    this.hasQuantifiedMetrics = checked;
    this.recalculate();
  },

  recalculate() {
    let score = this.baseScore;
    const options = window.SAMPLE_DATA.simulatorOptions;

    // Calculate options delta
    options.forEach(opt => {
      if (this.selectedOptions.has(opt.id)) {
        score += opt.scoreDelta;
      }
    });

    // Calculate experience delta (above 7 years gives +2 per year up to +6)
    if (this.experienceYears > 7) {
      score += (this.experienceYears - 7) * 2;
    } else if (this.experienceYears < 7) {
      score -= (7 - this.experienceYears) * 3;
    }

    // Quantified metrics
    if (this.hasQuantifiedMetrics) {
      score += 5;
    }

    this.currentSimulatedScore = Math.min(99, Math.max(40, score));
    this.updateGaugeAndStats();
  },

  updateGaugeAndStats() {
    const gaugeContainer = document.getElementById('sim-gauge-container');
    if (gaugeContainer) {
      gaugeContainer.innerHTML = window.SAAS_CHARTS.createRadialGaugeSVG(this.currentSimulatedScore, 190, 16);
    }

    const delta = this.currentSimulatedScore - this.baseScore;
    const deltaBadge = document.getElementById('sim-delta-badge');
    const activeCount = document.getElementById('sim-active-count');
    const verdict = document.getElementById('sim-verdict-text');
    const summaryList = document.getElementById('sim-levers-applied-summary');

    if (deltaBadge) {
      if (delta > 0) {
        deltaBadge.className = 'badge badge-matched';
        deltaBadge.innerHTML = `+${delta}% Improvement`;
      } else if (delta < 0) {
        deltaBadge.className = 'badge badge-missing';
        deltaBadge.innerHTML = `${delta}% Score Impact`;
      } else {
        deltaBadge.className = 'badge badge-neutral';
        deltaBadge.innerHTML = `0% Baseline`;
      }
    }

    if (activeCount) {
      const totalActive = this.selectedOptions.size + (this.experienceYears !== 7 ? 1 : 0) + (this.hasQuantifiedMetrics ? 1 : 0);
      activeCount.textContent = `${totalActive} Levers Active`;
    }

    if (verdict) {
      if (this.currentSimulatedScore >= 90) {
        verdict.innerHTML = `<strong>Exceptional Candidate Ranking!</strong> At ${this.currentSimulatedScore}%, your profile matches the 99th percentile of applicant volume for this role.`;
      } else if (this.currentSimulatedScore >= 82) {
        verdict.innerHTML = `<strong>High Match Threshold Achieved!</strong> At ${this.currentSimulatedScore}%, your resume clears Greenhouse automated recruiter filters.`;
      } else {
        verdict.innerHTML = `Current profile is at ${this.currentSimulatedScore}%. Toggle additional skills to cross the 85% top-tier candidate threshold.`;
      }
    }

    if (summaryList) {
      let items = [];
      window.SAMPLE_DATA.simulatorOptions.forEach(opt => {
        if (this.selectedOptions.has(opt.id)) {
          items.push(`
            <div style="display: flex; justify-content: space-between; color: #065F46; font-weight: 500;">
              <span>+ ${opt.name}</span>
              <span>+${opt.scoreDelta}%</span>
            </div>
          `);
        }
      });
      if (this.experienceYears > 7) {
        items.push(`
          <div style="display: flex; justify-content: space-between; color: #065F46; font-weight: 500;">
            <span>+ Seniority Scale (${this.experienceYears} Yrs)</span>
            <span>+${(this.experienceYears - 7) * 2}%</span>
          </div>
        `);
      }
      if (this.hasQuantifiedMetrics) {
        items.push(`
          <div style="display: flex; justify-content: space-between; color: #065F46; font-weight: 500;">
            <span>+ Quantified Metrics Booster</span>
            <span>+5%</span>
          </div>
        `);
      }

      summaryList.innerHTML = items.length ? items.join('') : '<span style="color: #64748B; font-style: italic;">No additional levers active</span>';
    }
  },

  resetSimulator() {
    this.selectedOptions.clear();
    this.experienceYears = 7;
    this.hasQuantifiedMetrics = false;
    this.currentSimulatedScore = this.baseScore;
    this.renderSimulator();
  },

  applyToResume() {
    window.SAMPLE_DATA.candidate.currentAtsScore = this.currentSimulatedScore;
    
    // Convert simulated keywords to matched in SAMPLE_DATA
    if (this.selectedOptions.has('sim_k8s')) {
      const kw = window.SAMPLE_DATA.keywords.find(k => k.name.includes('Kubernetes'));
      if (kw) kw.status = 'matched';
    }
    if (this.selectedOptions.has('sim_graphql')) {
      const kw = window.SAMPLE_DATA.keywords.find(k => k.name.includes('GraphQL'));
      if (kw) kw.status = 'matched';
    }
    if (this.selectedOptions.has('sim_otel')) {
      const kw = window.SAMPLE_DATA.keywords.find(k => k.name.includes('OpenTelemetry'));
      if (kw) kw.status = 'matched';
    }

    if (window.APP && window.APP.notify) {
      window.APP.notify(`Simulation committed! Candidate ATS score updated to ${this.currentSimulatedScore}%.`);
      window.APP.renderCurrentView();
    }
  }
};

if (typeof window !== 'undefined') {
  window.SCORE_SIMULATOR = SCORE_SIMULATOR;
}
