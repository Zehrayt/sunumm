document.addEventListener('DOMContentLoaded', () => {
    const presentationSteps = [
        { title: 'Hakkımızda', file: 'hakkimizda.html' },
        { title: 'Makinelerimiz', file: 'makineler.html' },
        { title: 'Ürünlerimiz', file: 'products.html' },
        { title: 'Sevkiyat', file: 'sevkiyat.html' },
        { title: 'Uygulama ve Montaj', file: 'montaj.html' },
        { title: 'Kalite ve Ar-Ge', file: 'kalite-arge.html' }
    ];
    const navContainer = document.querySelector('.presentation-nav');
    const contentContainer = document.getElementById('content-container');
    let currentPageIndex = 0;

    function goToPage(index) {
        if (index < 0 || index >= presentationSteps.length) return;
        const currentActivePage = document.querySelector('.page-wrapper.active');
        if (currentActivePage) {
            currentActivePage.classList.add('exiting');
            currentActivePage.classList.remove('active');
        }
        setTimeout(() => {
            if (currentActivePage) { contentContainer.innerHTML = ''; }
            loadPage(index);
        }, 500);
        document.querySelectorAll('.nav-step').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-step[data-index='${index}']`).classList.add('active');
        currentPageIndex = index;
    }

    function loadPage(index) {
        const step = presentationSteps[index];
        const wrapper = document.createElement('div');
        wrapper.className = 'page-wrapper';
        const iframe = document.createElement('iframe');
        iframe.src = step.file;
        wrapper.appendChild(iframe);
        contentContainer.appendChild(wrapper);
        setTimeout(() => wrapper.classList.add('active'), 50);
    }

    presentationSteps.forEach((step, index) => {
        const button = document.createElement('button');
        button.className = 'nav-step';
        button.textContent = step.title;
        button.dataset.index = index;
        button.addEventListener('click', () => goToPage(index));
        navContainer.appendChild(button);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToPage(currentPageIndex + 1);
        else if (e.key === 'ArrowLeft') goToPage(currentPageIndex - 1);
    });

    goToPage(0);
});