/* ==========================================================================
   MODAL CONTROLLER: Strict Light-Theme Modal Management
   ========================================================================== */

const MODAL_CONTROLLER = {
  activeModal: null,

  init() {
    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });

    // Backdrop click listeners
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
    });
  },

  open(modalId) {
    this.close();
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('open');
    this.activeModal = modal;
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (this.activeModal) {
      this.activeModal.classList.remove('open');
      this.activeModal = null;
      document.body.style.overflow = '';
    }
    const custom = document.getElementById('custom-modal-overlay');
    if (custom) {
      custom.classList.remove('open');
    }
  },

  showCustomModal(title, bodyHTML) {
    let custom = document.getElementById('custom-modal-overlay');
    if (!custom) {
      custom = document.createElement('div');
      custom.id = 'custom-modal-overlay';
      custom.className = 'modal-overlay';
      custom.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="modal-title" id="custom-modal-title"></h3>
            <button class="btn btn-ghost btn-icon-only" onclick="MODAL_CONTROLLER.close()">
              ${window.getIcon('cross')}
            </button>
          </div>
          <div class="modal-body" id="custom-modal-body"></div>
        </div>
      `;
      document.body.appendChild(custom);
      custom.addEventListener('click', (e) => {
        if (e.target === custom) this.close();
      });
    }

    document.getElementById('custom-modal-title').textContent = title;
    document.getElementById('custom-modal-body').innerHTML = bodyHTML;
    custom.classList.add('open');
    this.activeModal = custom;
    document.body.style.overflow = 'hidden';
  }
};

if (typeof window !== 'undefined') {
  window.MODAL_CONTROLLER = MODAL_CONTROLLER;
}
