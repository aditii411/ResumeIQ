/* ==========================================================================
   ATS SCANNER & KEYWORD GAP MATRIX ENGINE
   ========================================================================== */

const ATS_SCANNER = {
  currentFilter: 'all',
  searchQuery: '',

  renderScannerView() {
    const container = document.getElementById('scanner-view-container');
    if (!container) return;

    const candidate = window.SAMPLE_DATA.candidate;
    const targetJob = window.SAMPLE_DATA.targetJob;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">ATS Resume Scanner & Deep Matcher</h1>
          <p class="page-subtitle">Compare your resume against target job descriptions and analyze keyword parsing compatibility</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="MODAL_CONTROLLER.open('uploadModal')">
            ${window.getIcon('upload')} Load Different Resume
          </button>
          <button class="btn btn-primary" onclick="ATS_SCANNER.runLiveScan()">
            ${window.getIcon('scanner')} Re-Scan ATS Alignment
          </button>
        </div>
      </div>

      <!-- Quick Analysis KPI Cards -->
      <div class="grid-cols-4" style="margin-bottom: 1.5rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Overall Match Score</span>
            <div class="stat-icon">${window.getIcon('scanner')}</div>
          </div>
          <div class="stat-value" id="scanner-score-val">${candidate.currentAtsScore}%</div>
          <div class="stat-footer">
            ${window.createStatusBadge(candidate.currentAtsScore >= 80 ? 'matched' : candidate.currentAtsScore >= 65 ? 'partial' : 'missing', candidate.currentAtsScore >= 80 ? 'Interview Ready' : 'Moderate Match')}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Hard Skills Match</span>
            <div class="stat-icon">${window.getIcon('matrix')}</div>
          </div>
          <div class="stat-value">12 / 16</div>
          <div class="stat-footer">
            ${window.createStatusBadge('partial', '4 Critical Missing')}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">ATS Parsing Health</span>
            <div class="stat-icon">${window.getIcon('check')}</div>
          </div>
          <div class="stat-value">98%</div>
          <div class="stat-footer">
            ${window.createStatusBadge('matched', 'Clean Hierarchy')}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Recruiter Keyword Density</span>
            <div class="stat-icon">${window.getIcon('sparkles')}</div>
          </div>
          <div class="stat-value">3.4%</div>
          <div class="stat-footer">
            ${window.createStatusBadge('matched', 'Optimal (2-4% Range)')}
          </div>
        </div>
      </div>

      <!-- Side-by-Side Live Text Comparison -->
      <div class="grid-split-60-40">
        <!-- Target Job Description Reference -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Target Job Description</h3>
              <p class="card-description">${targetJob.title} · ${targetJob.company}</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="MODAL_CONTROLLER.open('jobModal')">
              Edit Job Text
            </button>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem; max-height: 380px; overflow-y: auto; font-family: inherit; font-size: 0.85rem; line-height: 1.6; color: #334155; white-space: pre-wrap;">${targetJob.descriptionText}</div>
        </div>

        <!-- ATS Parsing Findings & Recommendations -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Automated ATS Diagnostic</h3>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1rem; border-radius: 10px; background-color: #ECFDF5; border: 1px solid #A7F3D0;">
              <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 600; color: #065F46; font-size: 0.85rem; margin-bottom: 0.25rem;">
                ${window.getIcon('check')} Strong Foundational Signals
              </div>
              <div style="font-size: 0.8rem; color: #065F46;">
                Seniority matches target profile (7+ years). Deep TypeScript, React, and AWS production experience verified.
              </div>
            </div>

            <div style="padding: 1rem; border-radius: 10px; background-color: #FFFBEB; border: 1px solid #FDE68A;">
              <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 600; color: #92400E; font-size: 0.85rem; margin-bottom: 0.25rem;">
                ${window.getIcon('alert')} Partial Context Detected
              </div>
              <div style="font-size: 0.8rem; color: #92400E;">
                "Terraform" and "Kafka" are present in technical skills but lack quantified production achievement bullets.
              </div>
            </div>

            <div style="padding: 1rem; border-radius: 10px; background-color: #FEF2F2; border: 1px solid #FECACA;">
              <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 600; color: #991B1B; font-size: 0.85rem; margin-bottom: 0.25rem;">
                ${window.getIcon('cross')} High-Risk Keyword Gaps
              </div>
              <div style="font-size: 0.8rem; color: #991B1B;">
                Missing "Kubernetes (EKS)" and "GraphQL Federation". Greenhouse filters will score this resume lower for container lead positions.
              </div>
            </div>

            <div style="margin-top: 0.5rem;">
              <button class="btn btn-primary" style="width: 100%;" onclick="APP.navigateTo('simulator')">
                ${window.getIcon('simulator')} Open "What-If" Simulator for This Job
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderMatrixView() {
    const container = document.getElementById('matrix-view-container');
    if (!container) return;

    const keywords = window.SAMPLE_DATA.keywords;
    const filtered = keywords.filter(kw => {
      const matchesFilter = (this.currentFilter === 'all') || (kw.status === this.currentFilter);
      const matchesSearch = !this.searchQuery || 
        kw.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        kw.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    const matchedCount = keywords.filter(k => k.status === 'matched').length;
    const partialCount = keywords.filter(k => k.status === 'partial').length;
    const missingCount = keywords.filter(k => k.status === 'missing').length;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Keyword & Skills Gap Matrix</h1>
          <p class="page-subtitle">Detailed breakdown of job description requirements mapped against detected resume terms</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="APP.navigateTo('simulator')">
            ${window.getIcon('simulator')} Launch What-If Simulator
          </button>
        </div>
      </div>

      <!-- Filter Bar & Search -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1rem 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <!-- Filter Buttons -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button 
              class="btn btn-sm ${this.currentFilter === 'all' ? 'btn-primary' : 'btn-secondary'}" 
              onclick="ATS_SCANNER.setFilter('all')"
            >
              All Skills (${keywords.length})
            </button>
            <button 
              class="btn btn-sm ${this.currentFilter === 'matched' ? 'btn-primary' : 'btn-secondary'}" 
              onclick="ATS_SCANNER.setFilter('matched')"
            >
              Matched (${matchedCount})
            </button>
            <button 
              class="btn btn-sm ${this.currentFilter === 'partial' ? 'btn-primary' : 'btn-secondary'}" 
              onclick="ATS_SCANNER.setFilter('partial')"
            >
              Partial (${partialCount})
            </button>
            <button 
              class="btn btn-sm ${this.currentFilter === 'missing' ? 'btn-primary' : 'btn-secondary'}" 
              onclick="ATS_SCANNER.setFilter('missing')"
            >
              Missing (${missingCount})
            </button>
          </div>

          <!-- Search Input -->
          <div style="position: relative; width: 260px;">
            <input 
              type="text" 
              placeholder="Search keyword or domain..." 
              value="${this.searchQuery}"
              oninput="ATS_SCANNER.onSearch(this.value)"
              style="width: 100%; padding-left: 2.2rem; background: #F8FAFC;"
            >
            <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #64748B;">
              ${window.getIcon('search')}
            </span>
          </div>
        </div>
      </div>

      <!-- Matrix Table -->
      <div class="table-container">
        <table class="saas-table">
          <thead>
            <tr>
              <th>Skill / Keyword</th>
              <th>Category</th>
              <th>Status Badge</th>
              <th>JD Mentions</th>
              <th>Resume Mentions</th>
              <th>Priority Weight</th>
              <th>Contextual Analysis</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length ? filtered.map(item => `
              <tr>
                <td>
                  <strong style="color: #0F172A; font-weight: 600;">${item.name}</strong>
                </td>
                <td>
                  <span class="badge badge-neutral">${item.category}</span>
                </td>
                <td>
                  ${window.createStatusBadge(item.status, item.status.charAt(0).toUpperCase() + item.status.slice(1))}
                </td>
                <td style="font-weight: 600; color: #0F172A;">${item.jdCount}x</td>
                <td style="font-weight: 600; color: ${item.resumeCount > 0 ? '#0F172A' : '#991B1B'};">${item.resumeCount}x</td>
                <td>
                  <span style="font-size: 0.8rem; font-weight: 600; color: ${item.weight === 'Critical' ? '#991B1B' : item.weight === 'High' ? '#2563EB' : '#64748B'};">
                    ${item.weight}
                  </span>
                </td>
                <td style="font-size: 0.825rem; color: #475569; max-width: 320px;">
                  ${item.context}
                </td>
                <td>
                  <button 
                    class="btn btn-secondary btn-sm" 
                    title="View integration suggestion"
                    onclick="ATS_SCANNER.showKeywordHelper('${item.name}', '${item.context}')"
                  >
                    ${window.getIcon('sparkles')} Quick Fix
                  </button>
                </td>
              </tr>
            `).join('') : `
              <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: #64748B;">
                  No keywords match the selected filter.
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    `;
  },

  setFilter(filter) {
    this.currentFilter = filter;
    this.renderMatrixView();
  },

  onSearch(query) {
    this.searchQuery = query;
    this.renderMatrixView();
  },

  showKeywordHelper(name, context) {
    const modalBody = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h4 style="color: #0F172A; margin-bottom: 0.25rem;">How to integrate "${name}"</h4>
          <p style="font-size: 0.85rem; color: #64748B;">Context: ${context}</p>
        </div>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
          <div style="font-weight: 600; font-size: 0.85rem; color: #0F172A; margin-bottom: 0.35rem;">
            Recommended Bullet Point Insertion:
          </div>
          <div style="font-size: 0.85rem; color: #334155; line-height: 1.5; font-style: italic;">
            "Architected and deployed enterprise ${name} infrastructure across multi-region environments, achieving 99.95% service availability and cutting p95 response time by 32%."
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="btn btn-secondary btn-sm" onclick="MODAL_CONTROLLER.close()">Close</button>
          <button class="btn btn-primary btn-sm" onclick="ATS_SCANNER.copySuggestedText('${name}')">
            ${window.getIcon('copy')} Copy Suggested Bullet
          </button>
        </div>
      </div>
    `;

    MODAL_CONTROLLER.showCustomModal(`Integrate Keyword: ${name}`, modalBody);
  },

  copySuggestedText(name) {
    const text = `Architected and deployed enterprise ${name} infrastructure across multi-region environments, achieving 99.95% service availability and cutting p95 response time by 32%.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (window.APP && window.APP.notify) {
      window.APP.notify(`Copied suggested bullet for ${name} to clipboard!`);
    }
    MODAL_CONTROLLER.close();
  },

  runLiveScan() {
    if (window.APP && window.APP.notify) {
      window.APP.notify('Running deep ATS scan against parser algorithms...');
    }
    setTimeout(() => {
      this.renderScannerView();
      if (window.APP && window.APP.notify) {
        window.APP.notify('ATS scan completed. Match score refreshed.');
      }
    }, 400);
  }
};

if (typeof window !== 'undefined') {
  window.ATS_SCANNER = ATS_SCANNER;
}
