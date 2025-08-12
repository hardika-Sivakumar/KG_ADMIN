// toast.js — classic global version
window.showToast = function (type = 'primary', message = 'This is a toast') {
    const icons = {
        primary: 'feather-info',
        secondary: 'feather-check-circle',
        warning: 'feather-alert-triangle',
        danger: 'feather-alert-octagon'
    };

    // Load feather icons if not already present
    if (!window.feather && !document.querySelector('script[src*="feather-icons"]')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/feather-icons';
        script.onload = () => feather.replace();
        document.head.appendChild(script);
    }

    // Create toast container if not present
    let container = document.querySelector('#toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '12px';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show custom-alert-icon shadow d-flex align-items-center`;
    toast.setAttribute('role', 'alert');
    toast.style.padding = '1rem 1.25rem';
    toast.style.fontSize = '1.1rem';
    toast.style.minWidth = '280px';
    toast.style.maxWidth = '400px';

    toast.innerHTML = `
        <i data-feather="${icons[type] || 'feather-info'}" class="flex-shrink-0 me-2"></i>
        <span class="flex-grow-1">${message}</span>
        <button type="button" class="btn-close ms-3" data-bs-dismiss="alert" aria-label="Close">
            <i class="fas fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);

    // Activate feather icons
    if (window.feather) feather.replace();

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 5000);
};
