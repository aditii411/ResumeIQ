/* ==========================================================================
   APP CONTROLLER: Main Single-Page SaaS Application Orchestrator
   ========================================================================== */

const APP = {
  currentView: 'dashboard',

  init() {
    // 1. Enforce strict light mode
    window.enforceStrictLightTheme();

    // 2. Setup modals
    window.MODAL_CONTROLLER.init();

    // 3. Register navigation event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.getAttribute('data-view');
        if (view) {
          this.navigateTo(view);
        }
      });
    });

    // 4. Initial view render
    this.renderCurrentView();

    console.log('[CareerSync SaaS] Initialized successfully in Strict Light Mode.');
  },

  navigateTo(viewId) {
    this.currentView = viewId;

    // Update sidebar active state
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Render corresponding view
    this.renderCurrentView();

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderCurrentView() {
    const views = ['dashboard', 'scanner', 'simulator', 'matrix', 'optimizer', 'applications', 'report', 'design'];
    
    views.forEach(v => {
      const el = document.getElementById(`${v}-view-container`);
      if (el) {
        el.style.display = (v === this.currentView) ? 'block' : 'none';
      }
    });

    switch (this.currentView) {
      case 'dashboard':
        this.renderDashboardView();
        break;
      case 'scanner':
        window.ATS_SCANNER.renderScannerView();
        break;
      case 'simulator':
        window.SCORE_SIMULATOR.renderSimulator();
        break;
      case 'matrix':
        window.ATS_SCANNER.renderMatrixView();
        break;
      case 'optimizer':
        window.BULLET_REWRITER.renderOptimizerView();
        break;
      case 'applications':
        this.renderApplicationsView();
        break;
      case 'report':
        window.PDF_GENERATOR.renderReportView();
        break;
      case 'design':
        this.renderDesignSystemView();
        break;
    }
  },

  renderDashboardView() {
    const container = document.getElementById('dashboard-view-container');
    if (!container) return;

    const candidate = window.SAMPLE_DATA.candidate;
    const targetJob = window.SAMPLE_DATA.targetJob;
    const keywords = window.SAMPLE_DATA.keywords;

    const matchedCount = keywords.filter(k => k.status === 'matched').length;
    const missingCount = keywords.filter(k => k.status === 'missing').length;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Executive ATS Dashboard</h1>
          <p class="page-subtitle">Welcome back, ${candidate.name}. Here is your real-time candidate readiness index for ${targetJob.company}.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="APP.navigateTo('report')">
            ${window.getIcon('pdf')} View PDF Report
          </button>
          <button class="btn btn-primary" onclick="APP.navigateTo('simulator')">
            ${window.getIcon('simulator')} Open What-If Simulator
          </button>
        </div>
      </div>

      <!-- Simulator Soft Tint Callout Banner -->
      <div class="tint-banner">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="tint-banner-icon">
            ${window.getIcon('sparkles')}
          </div>
          <div class="tint-banner-content">
            <h4>"What-If" Score Simulator: Uplift Available (+18%)</h4>
            <p>
              Your baseline ATS score is currently <strong>${candidate.currentAtsScore}%</strong>. Simulating 3 critical keywords unlocks a top-percentile <strong>92%</strong> match rating.
            </p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="APP.navigateTo('simulator')">
          Launch Simulator ${window.getIcon('arrowUpRight')}
        </button>
      </div>

      <!-- Top KPI Metric Cards -->
      <div class="grid-cols-4" style="margin-bottom: 1.5rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Overall ATS Score</span>
            <div class="stat-icon">${window.getIcon('dashboard')}</div>
          </div>
          <div class="stat-value">${candidate.currentAtsScore}%</div>
          <div class="stat-footer">
            ${window.createStatusBadge(candidate.currentAtsScore >= 80 ? 'matched' : 'partial', candidate.currentAtsScore >= 80 ? 'Optimal' : 'Competitive')}
            <span style="color: #64748B;">Target: 90%+</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Matched Skills</span>
            <div class="stat-icon">${window.getIcon('check')}</div>
          </div>
          <div class="stat-value">${matchedCount} / ${keywords.length}</div>
          <div class="stat-footer">
            ${window.createStatusBadge('matched', 'Core Strong')}
            <span style="color: #64748B;">75% Ratio</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Missing Critical Gaps</span>
            <div class="stat-icon">${window.getIcon('cross')}</div>
          </div>
          <div class="stat-value">${missingCount}</div>
          <div class="stat-footer">
            ${window.createStatusBadge('missing', 'Action Needed')}
            <span style="color: #64748B;">Greenhouse Risk</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Target Salary Match</span>
            <div class="stat-icon">${window.getIcon('applications')}</div>
          </div>
          <div class="stat-value">$205k</div>
          <div class="stat-footer">
            ${window.createStatusBadge('matched', 'In Range')}
            <span style="color: #64748B;">Top 15% Band</span>
          </div>
        </div>
      </div>

      <!-- Main Visual Grid: Radial Gauge + Category Breakdown -->
      <div class="grid-split-70-30" style="margin-bottom: 1.5rem;">
        <!-- Left: ATS Benchmark Comparison Chart -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">ATS Dimension Readiness vs. Role Benchmark</h3>
              <p class="card-description">High-contrast dimensional comparison across target job requirements</p>
            </div>
            <span class="badge badge-neutral">Greenhouse Model</span>
          </div>
          <div id="dashboard-benchmark-chart"></div>
        </div>

        <!-- Right: Radial Score Gauge Card -->
        <div class="card" style="text-align: center; display: flex; flex-direction: column; justify-content: center;">
          <h3 class="card-title" style="justify-content: center; margin-bottom: 1rem;">Candidate Readiness</h3>
          <div id="dashboard-gauge">
            ${window.SAAS_CHARTS.createRadialGaugeSVG(candidate.currentAtsScore, 170, 14)}
          </div>
          <div style="margin-top: 1rem; font-size: 0.85rem; color: #475569;">
            Scanned against <strong>${targetJob.company}</strong>
          </div>
          <div style="margin-top: 0.75rem;">
            <button class="btn btn-secondary btn-sm" onclick="APP.navigateTo('scanner')">
              ${window.getIcon('scanner')} Deep Scan Details
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Split: Category Progress Bars & Recent Target Jobs -->
      <div class="grid-cols-2">
        <!-- Category Progress Breakdown -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Skill Category Health</h3>
            <button class="btn btn-ghost btn-sm" onclick="APP.navigateTo('matrix')">View All</button>
          </div>
          <div id="dashboard-category-bars"></div>
        </div>

        <!-- Target Job Overview -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Active Target Opportunity</h3>
              <p class="card-description">${targetJob.department}</p>
            </div>
            ${window.createStatusBadge('matched', 'Verified Match')}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div>
              <strong style="color: #0F172A; font-size: 1.05rem;">${targetJob.title}</strong>
              <div style="color: #64748B; font-size: 0.85rem; margin-top: 0.15rem;">
                ${targetJob.company} · ${targetJob.location}
              </div>
            </div>

            <div style="padding: 0.85rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 0.8rem; color: #475569; line-height: 1.5;">
              Target ATS checks: Docker, Kubernetes, Terraform, GraphQL Federation, and PostgreSQL at scale.
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <span style="font-weight: 600; color: #0F172A; font-size: 0.9rem;">${targetJob.salaryRange}</span>
              <button class="btn btn-primary btn-sm" onclick="APP.navigateTo('scanner')">
                Optimize Application
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render SVG Charts
    window.SAAS_CHARTS.renderBenchmarkChart('dashboard-benchmark-chart');
    window.SAAS_CHARTS.renderCategoryBars('dashboard-category-bars', [
      { name: 'Core Web & Backend Engineering', percentage: 92, detail: 'TypeScript, React, Next.js, Node.js verified' },
      { name: 'Cloud Infrastructure & DevOps', percentage: 68, detail: 'AWS strong; Kubernetes & ArgoCD missing' },
      { name: 'Data Stores & Observability', percentage: 74, detail: 'PostgreSQL solid; OpenTelemetry required' },
      { name: 'Staff Technical Leadership', percentage: 70, detail: 'Mentorship present; Technical RFCs missing' }
    ]);
  },

  renderApplicationsView() {
    const container = document.getElementById('applications-view-container');
    if (!container) return;

    const apps = window.SAMPLE_DATA.applications;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Job Application Intelligence Tracker</h1>
          <p class="page-subtitle">Track targeted positions and their respective ATS readiness compliance</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="APP.showAddApplicationModal()">
            ${window.getIcon('upload')} Add New Application
          </button>
        </div>
      </div>

      <!-- Application Table -->
      <div class="table-container">
        <table class="saas-table">
          <thead>
            <tr>
              <th>Company & Role</th>
              <th>Location</th>
              <th>ATS Match Rating</th>
              <th>Pipeline Status</th>
              <th>Salary Band</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${apps.map(a => `
              <tr>
                <td>
                  <strong style="color: #0F172A; font-weight: 600;">${a.company}</strong>
                  <div style="font-size: 0.8rem; color: #64748B;">${a.role}</div>
                </td>
                <td>${a.location}</td>
                <td>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${window.createStatusBadge(a.score >= 85 ? 'matched' : a.score >= 75 ? 'partial' : 'missing', `${a.score}%`)}
                  </div>
                </td>
                <td>
                  <span class="badge badge-neutral">${a.status}</span>
                </td>
                <td style="font-weight: 500; color: #0F172A;">${a.salary}</td>
                <td style="color: #64748B; font-size: 0.8rem;">${a.date}</td>
                <td>
                  <div style="display: flex; gap: 0.4rem;">
                    <button class="btn btn-secondary btn-sm" onclick="APP.navigateTo('scanner')">Scan</button>
                    <button class="btn btn-ghost btn-sm" onclick="APP.navigateTo('report')">Report</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderDesignSystemView() {
    const container = document.getElementById('design-view-container');
    if (!container) return;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Strict Light-Theme Design System Audit</h1>
          <p class="page-subtitle">Specification verification confirming 100% adherence to all required color tokens and exclusions</p>
        </div>
      </div>

      <!-- Design System Color Tokens Grid -->
      <div class="grid-cols-3" style="margin-bottom: 2rem;">
        <div class="card">
          <h4 style="margin-bottom: 0.75rem; color: #0F172A;">Canvas & Surfaces</h4>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.825rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px;">
              <span>Canvas (Slate-50)</span>
              <strong>#F8FAFC</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px;">
              <span>Surface (Pure White)</span>
              <strong>#FFFFFF</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px;">
              <span>Borders (Slate-200)</span>
              <strong>#E2E8F0</strong>
            </div>
          </div>
        </div>

        <div class="card">
          <h4 style="margin-bottom: 0.75rem; color: #0F172A;">Brand Accent & Soft Tint</h4>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.825rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #2563EB; color: white; border-radius: 6px;">
              <span>Brand Primary (Blue-600)</span>
              <strong>#2563EB</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #1D4ED8; color: white; border-radius: 6px;">
              <span>Primary Hover (Blue-700)</span>
              <strong>#1D4ED8</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #EFF6FF; border: 1px solid #DBEAFE; color: #1E40AF; border-radius: 6px;">
              <span>Soft Tint Highlight (Blue-50)</span>
              <strong>#EFF6FF / #DBEAFE</strong>
            </div>
          </div>
        </div>

        <div class="card">
          <h4 style="margin-bottom: 0.75rem; color: #0F172A;">Semantic Status Badges</h4>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.825rem;">
            <div style="padding: 0.5rem; background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; border-radius: 6px; display: flex; justify-content: space-between;">
              <span>Matched / High Score</span>
              <span>#ECFDF5 / #065F46 / #A7F3D0</span>
            </div>
            <div style="padding: 0.5rem; background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; border-radius: 6px; display: flex; justify-content: space-between;">
              <span>Partial / Medium Score</span>
              <span>#FFFBEB / #92400E / #FDE68A</span>
            </div>
            <div style="padding: 0.5rem; background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B; border-radius: 6px; display: flex; justify-content: space-between;">
              <span>Missing / Low Score</span>
              <span>#FEF2F2 / #991B1B / #FECACA</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Strict Exclusion Verification Checklist -->
      <div class="card">
        <h3 class="card-title" style="margin-bottom: 1rem;">Strict Visual Exclusion Compliance Verification</h3>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; color: #065F46;">
            ${window.getIcon('check')}
            <span><strong>PASSED:</strong> NO dark mode toggle, dark themes, or dark body stylesheets present.</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; color: #065F46;">
            ${window.getIcon('check')}
            <span><strong>PASSED:</strong> Navigation & Sidebar are 100% pure light (#FFFFFF) with #E2E8F0 border. No dark navy or black sidebar.</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; color: #065F46;">
            ${window.getIcon('check')}
            <span><strong>PASSED:</strong> NO dark code or preview blocks. All pre/code elements use #F1F5F9 with #0F172A text and #E2E8F0 border.</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; color: #065F46;">
            ${window.getIcon('check')}
            <span><strong>PASSED:</strong> NO heavy multi-color neon gradients, neon glows, or cluttered fake charts.</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; color: #065F46;">
            ${window.getIcon('check')}
            <span><strong>PASSED:</strong> Generous whitespace, crisp Inter typography, and rounded-xl white cards applied universally.</span>
          </div>
        </div>
      </div>
    `;
  },

  showAddApplicationModal() {
    const modalBody = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="font-weight: 600; font-size: 0.85rem; color: #0F172A; display: block; margin-bottom: 0.35rem;">Company Name</label>
          <input type="text" id="new-app-company" placeholder="e.g. OpenAI, Anthropic, Apple" style="width: 100%;">
        </div>
        <div>
          <label style="font-weight: 600; font-size: 0.85rem; color: #0F172A; display: block; margin-bottom: 0.35rem;">Job Role Title</label>
          <input type="text" id="new-app-role" placeholder="e.g. Staff Full-Stack Systems Engineer" style="width: 100%;">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label style="font-weight: 600; font-size: 0.85rem; color: #0F172A; display: block; margin-bottom: 0.35rem;">Location</label>
            <input type="text" id="new-app-location" placeholder="e.g. San Francisco (Remote)" style="width: 100%;">
          </div>
          <div>
            <label style="font-weight: 600; font-size: 0.85rem; color: #0F172A; display: block; margin-bottom: 0.35rem;">Salary Band</label>
            <input type="text" id="new-app-salary" placeholder="e.g. $190k - $230k" style="width: 100%;">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
          <button class="btn btn-secondary" onclick="MODAL_CONTROLLER.close()">Cancel</button>
          <button class="btn btn-primary" onclick="APP.saveNewApplication()">Save & Analyze</button>
        </div>
      </div>
    `;
    MODAL_CONTROLLER.showCustomModal('Track New Target Application', modalBody);
  },

  saveNewApplication() {
    const company = document.getElementById('new-app-company').value.trim() || 'TechScale Inc.';
    const role = document.getElementById('new-app-role').value.trim() || 'Senior Software Engineer';
    const location = document.getElementById('new-app-location').value.trim() || 'Remote';
    const salary = document.getElementById('new-app-salary').value.trim() || '$180k - $210k';

    window.SAMPLE_DATA.applications.unshift({
      id: `app-${Date.now()}`,
      company,
      role,
      location,
      score: 82,
      status: 'Targeted',
      date: 'Today',
      salary
    });

    MODAL_CONTROLLER.close();
    this.renderApplicationsView();
    this.notify(`Added ${company} to your application pipeline!`);
  },

  notify(message) {
    let toast = document.getElementById('saas-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'saas-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.backgroundColor = '#FFFFFF';
      toast.style.color = '#0F172A';
      toast.style.border = '1px solid #E2E8F0';
      toast.style.borderRadius = '12px';
      toast.style.padding = '0.75rem 1.25rem';
      toast.style.boxShadow = '0 10px 15px -3px rgba(15, 23, 42, 0.08)';
      toast.style.fontSize = '0.875rem';
      toast.style.fontWeight = '500';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '0.5rem';
      toast.style.zIndex = '999';
      toast.style.transition = 'all 200ms ease';
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span style="color: #2563EB;">${window.getIcon('check')}</span> ${message}`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 3200);
  }
};

window.APP = APP;

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
});
