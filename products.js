document.addEventListener('DOMContentLoaded', () => {
    const slideData = [
        { title: "Kompozit Izgara", description: "Yüksek dayanımlı kompozit malzemeden üretilmiş, korozyona ve ağır yüklere karşı maksimum direnç gösteren yenilikçi ızgara çözümü.", cardImage: "resim/60x80.png", backgroundImage: "resim/ap7.png" },
        { title: "Rögar Kapağı", description: "Kent estetiğine uygun, sessiz ve güvenli bir kullanım sunan, en son teknoloji ile üretilmiş yeni nesil rögar kapağı.", cardImage: "resim/100x100.png", backgroundImage: "resim/ap8.png" },
        { title: "Ek Odası", description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.", cardImage: "resim/ekodası.png", backgroundImage: "resim/ap9.png" },
        { title: "Modüler Izgara", description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.", cardImage: "resim/60x60y.png", backgroundImage: "resim/ap2.png" },
        { title: "Kare Rögar Kapağı", description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.", cardImage: "resim/60x60.png", backgroundImage: "resim/arkaplan1.png" },
        { title: "Dikey Izgara", description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.", cardImage: "resim/45x60y.png", backgroundImage: "resim/ap5.png" },
        { title: "Standart Izgara", description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.", cardImage: "resim/ızgara.png", backgroundImage: "resim/ap4.png" },
        { title: "Geniş Rögar Kapağı", description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.", cardImage: "resim/80x80.png", backgroundImage: "resim/ap6.png" }
    ];

    const showcase = document.querySelector('.showcase');
    const bgSlider = document.querySelector('.background-slider');
    const textRotator = document.querySelector('.text-rotator');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const timelineNav = document.querySelector('.timeline-nav');

    if (!swiperWrapper) return;

    let currentIndex = 0;

    slideData.forEach((data, index) => {
        bgSlider.innerHTML += `<img src="${data.backgroundImage}" alt="">`;
        textRotator.innerHTML += `<article class="content-slide"><h1>${data.title}</h1><p>${data.description}</p></article>`;
        swiperWrapper.innerHTML += `<div class="swiper-slide"><img src="${data.cardImage}" alt="${data.title}"></div>`;
        timelineNav.innerHTML += `<button class="dot" data-index="${index}"></button>`;
    });

    const bgImages = bgSlider.querySelectorAll('img');
    const textSlides = textRotator.querySelectorAll('.content-slide');
    const navDots = timelineNav.querySelectorAll('.dot');

    const swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 50,
            depth: 250,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        on: {
            init: function () {
                updateContent(this.realIndex);
                showcase.classList.add('is-loaded');
            },
            slideChange: function () {
                updateContent(this.realIndex);
            },
        },
    });

    navDots.forEach(dot => {
        dot.addEventListener('click', () => swiper.slideToLoop(parseInt(dot.dataset.index)));
    });

    function updateContent(index) {
        if (currentIndex === index && showcase.classList.contains('is-loaded')) return;

        bgImages[currentIndex]?.classList.remove('is-active');
        textSlides[currentIndex]?.classList.remove('is-active');
        navDots[currentIndex]?.classList.remove('is-active');

        bgImages[index]?.classList.add('is-active');
        textSlides[index]?.classList.add('is-active');
        navDots[index]?.classList.add('is-active');

        currentIndex = index;
    }
});
