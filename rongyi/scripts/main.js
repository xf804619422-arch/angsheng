document.addEventListener('DOMContentLoaded', function() {
    initServiceCards();
    initOrderButton();
    initNavItems();
});

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            serviceCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            updateEstimate();
        });
    });
}

function initOrderButton() {
    const orderBtn = document.getElementById('orderBtn');
    
    orderBtn.addEventListener('click', function() {
        const startInput = document.querySelector('.location-item:first-child .location-input');
        const endInput = document.querySelector('.location-item:last-child .location-input');
        
        if (!startInput.value.trim()) {
            showToast('请输入起点位置');
            return;
        }
        
        if (!endInput.value.trim()) {
            showToast('请输入终点位置');
            return;
        }
        
        showToast('正在为您叫车...');
        
        setTimeout(() => {
            showToast('司机已接单，预计3分钟到达');
        }, 2000);
    });
}

function initNavItems() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function updateEstimate() {
    const priceValue = document.querySelector('.price-value');
    const estimateValue = document.querySelector('.estimate-time .estimate-value');
    
    const prices = [15, 20, 12, 18];
    const times = ['5分钟', '8分钟', '10分钟', '6分钟'];
    
    const activeCard = document.querySelector('.service-card.active');
    const index = Array.from(document.querySelectorAll('.service-card')).indexOf(activeCard);
    
    priceValue.textContent = prices[index];
    estimateValue.textContent = times[index];
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background-color: rgba(0, 0, 0, 0.75);
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        pointer-events: none;
    }
    
    .toast.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
`;
document.head.appendChild(style);