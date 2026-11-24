/* ==========================================================================
   PDF REPORT GENERATOR: Strict Light-Theme SaaS PDF Audit & Export
   ========================================================================== */

const PDF_GENERATOR = {
  renderReportView() {
    const container = document.getElementById('report-view-container');
    if (!container) return;

    const candidate = window.SAMPLE_DATA.candidate;
    const targetJob = window.SAMPLE_DATA.targetJob;
    const keywords = window.SAMPLE_DATA.keywords;

    container.innerHTML = `
      <div class="page-header no-print">
        <div>
          <h1 class="page-title">Candidate ATS Audit & Readiness Report</h1>
          <p class="page-subtitle">Standardized printable executive report formatted under 100% strict light-mode SaaS aesthetic</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="PDF_GENERATOR.exportJSON()">
            ${window.getIcon('download')} Export JSON Data
          </button>
          <button class="btn btn-primary" onclick="PDF_GENERATOR.triggerPrint()">
            ${window.getIcon('pdf')} Print / Save PDF Report
          </button>
        </div>
      </div>

      <!-- Printable PDF Report Document Canvas -->
      <div class="pdf-preview-viewport" id="printable-report-doc">
        <!-- Print Header -->
        <div class="pdf-header-row">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
              <span style="width: 24px; height: 24px; background: #2563EB; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: white;">
                ${window.getIcon('dashboard')}
              </span>
              <span style="font-weight: 700; font-size: 1.15rem; color: #0F172A; letter-spacing: -0.01em;">
                CareerSync AI — ATS Readiness Audit
              </span>
            </div>
            <div style="font-size: 0.85rem; color: #64748B;">
              Candidate Report ID: CS-2026-9941 · Generated on ${candidate.scannedDate}
            </div>
          </div>

          <div style="text-align: right;">
            <div class="badge badge-high" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">
              Target Match: ${candidate.currentAtsScore}%
            </div>
            <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.35rem;">
              ATS Engine: ${targetJob.atsSystem}
            </div>
          </div>
        </div>

        <!-- Section 1: Candidate & Target Role Summary -->
        <div class="pdf-section" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.85rem; border-left: 3px solid #2563EB; padding-left: 0.6rem;">
            1. Candidate & Target Position Profile
          </h3>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="pdf-meta-box">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: #64748B; font-weight: 600; margin-bottom: 0.4rem;">
                Candidate Information
              </div>
              <div style="font-size: 1rem; font-weight: 700; color: #0F172A;">${candidate.name}</div>
              <div style="font-size: 0.85rem; color: #475569; margin-top: 0.15rem;">${candidate.title}</div>
              <div style="font-size: 0.8rem; color: #64748B; margin-top: 0.35rem;">
                ${candidate.email} · ${candidate.phone} · ${candidate.location}
              </div>
            </div>

            <div class="pdf-meta-box">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: #64748B; font-weight: 600; margin-bottom: 0.4rem;">
                Target Job Specification
              </div>
              <div style="font-size: 1rem; font-weight: 700; color: #0F172A;">${targetJob.title}</div>
              <div style="font-size: 0.85rem; color: #475569; margin-top: 0.15rem;">${targetJob.company} (${targetJob.location})</div>
              <div style="font-size: 0.8rem; color: #64748B; margin-top: 0.35rem;">
                Salary: ${targetJob.salaryRange}
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Executive Scoring Breakdown -->
        <div class="pdf-section" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.85rem; border-left: 3px solid #2563EB; padding-left: 0.6rem;">
            2. Multi-Dimensional ATS Scoring Analysis
          </h3>

          <div style="display: grid; grid-template-columns: 180px 1fr; gap: 1.5rem; align-items: center; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
            <div style="text-align: center;">
              ${window.SAAS_CHARTS.createRadialGaugeSVG(candidate.currentAtsScore, 140, 12)}
              <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.4rem;">Overall ATS Index</div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span style="font-weight: 600; color: #0F172A;">Technical Hard Skills Match</span>
                  <span style="font-weight: 700; color: #0F172A;">75%</span>
                </div>
                <div class="progress-bar-container"><div class="progress-bar-fill" style="width: 75%;"></div></div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span style="font-weight: 600; color: #0F172A;">Experience Relevance & Seniority</span>
                  <span style="font-weight: 700; color: #0F172A;">88%</span>
                </div>
                <div class="progress-bar-container"><div class="progress-bar-fill success" style="width: 88%;"></div></div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span style="font-weight: 600; color: #0F172A;">Document Hierarchy & Parsing Quality</span>
                  <span style="font-weight: 700; color: #0F172A;">96%</span>
                </div>
                <div class="progress-bar-container"><div class="progress-bar-fill success" style="width: 96%;"></div></div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span style="font-weight: 600; color: #0F172A;">Quantified Metric Density</span>
                  <span style="font-weight: 700; color: #0F172A;">62%</span>
                </div>
                <div class="progress-bar-container"><div class="progress-bar-fill warning" style="width: 62%;"></div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Semantic Keyword Audit Matrix -->
        <div class="pdf-section" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.85rem; border-left: 3px solid #2563EB; padding-left: 0.6rem;">
            3. Skills Compliance & Keyword Matrix
          </h3>

          <div class="table-container">
            <table class="saas-table" style="font-size: 0.8rem;">
              <thead>
                <tr>
                  <th>Competency Keyword</th>
                  <th>Domain Category</th>
                  <th>Evaluation Status</th>
                  <th>JD Density</th>
                  <th>Detected in Resume</th>
                  <th>Recruiter Priority</th>
                </tr>
              </thead>
              <tbody>
                ${keywords.slice(0, 10).map(k => `
                  <tr>
                    <td><strong>${k.name}</strong></td>
                    <td><span class="badge badge-neutral" style="font-size: 0.7rem;">${k.category}</span></td>
                    <td>${window.createStatusBadge(k.status, k.status.toUpperCase())}</td>
                    <td>${k.jdCount} mentions</td>
                    <td style="color: ${k.resumeCount > 0 ? '#0F172A' : '#991B1B'}; font-weight: 600;">${k.resumeCount > 0 ? `${k.resumeCount} mentions` : 'Not Found'}</td>
                    <td style="font-weight: 600; color: ${k.weight === 'Critical' ? '#991B1B' : '#2563EB'};">${k.weight}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 4: What-If Score Simulator Findings -->
        <div class="pdf-section" style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.85rem; border-left: 3px solid #2563EB; padding-left: 0.6rem;">
            4. "What-If" Score Simulator Strategy Recommendations
          </h3>

          <div class="tint-banner" style="margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
              <span style="color: #2563EB; margin-top: 0.15rem;">${window.getIcon('simulator')}</span>
              <div>
                <strong style="color: #0F172A; font-size: 0.9rem;">Maximum Potential Score: 92% (+18% uplift available)</strong>
                <p style="font-size: 0.825rem; color: #475569; margin-top: 0.25rem;">
                  By incorporating 3 missing critical keywords (Kubernetes EKS, GraphQL Federation, OpenTelemetry) 
                  and structuring bullet points with quantified outcomes, your application advances into the top tier.
                </p>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
              <div style="font-weight: 600; color: #0F172A; font-size: 0.85rem; margin-bottom: 0.4rem;">
                High-Priority Fix #1: Container Orchestration
              </div>
              <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">
                Incorporate 2 bullets detailing production Kubernetes (EKS) cluster management, Helm deployments, and ingress controllers.
              </div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
              <div style="font-weight: 600; color: #0F172A; font-size: 0.85rem; margin-bottom: 0.4rem;">
                High-Priority Fix #2: Quantify Numerical Impact
              </div>
              <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">
                Replace general maintenance responsibilities with metrics (e.g. "Reduced cloud cost by $140K", "Sub-50ms latency at 45K RPM").
              </div>
            </div>
          </div>
        </div>

        <!-- Print Footer -->
        <div class="print-footer" style="padding-top: 1.5rem; border-top: 1px solid #E2E8F0; font-size: 0.75rem; color: #64748B; display: flex; justify-content: space-between;">
          <span>Confidential & Proprietary · CareerSync ATS Analytics Engine</span>
          <span>Verified 100% Light-Theme SaaS Compliance</span>
        </div>
      </div>
    `;
  },

  triggerPrint() {
    window.print();
  },

  exportJSON() {
    const reportData = {
      reportId: 'CS-2026-9941',
      candidate: window.SAMPLE_DATA.candidate,
      targetJob: window.SAMPLE_DATA.targetJob,
      skillsMatrix: window.SAMPLE_DATA.keywords,
      scoreSimulations: window.SAMPLE_DATA.simulatorOptions,
      designSystem: {
        theme: 'Strict Light-Mode SaaS',
        canvasBg: '#F8FAFC',
        surfaceBg: '#FFFFFF',
        brandAccent: '#2563EB',
        tintBanner: '#EFF6FF',
        badges: {
          matched: '#ECFDF5 / #065F46',
          partial: '#FFFBEB / #92400E',
          missing: '#FEF2F2 / #991B1B'
        }
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ATS_Report_${window.SAMPLE_DATA.candidate.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.APP && window.APP.notify) {
      window.APP.notify('Full ATS report exported as JSON file!');
    }
  }
};

if (typeof window !== 'undefined') {
  window.PDF_GENERATOR = PDF_GENERATOR;
}
