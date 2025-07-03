document.addEventListener('DOMContentLoaded', () => {

    const slideData = [
        {
            title: "Kompozit Izgara",
            subtitle: "Model A-100",
            description: "Yüksek dayanımlı kompozit malzemeden üretilmiş, korozyona ve ağır yüklere karşı maksimum direnç gösteren yenilikçi ızgara çözümü.",
            cardImage: "resim/60x80.png",
            backgroundImage: "resim/ap7.png"
        },
        {
            title: "Rögar Kapağı",
            subtitle: "Model B-250",
            description: "Kent estetiğine uygun, sessiz ve güvenli bir kullanım sunan, en son teknoloji ile üretilmiş yeni nesil rögar kapağı.",
            cardImage: "resim/100x100.png",
            backgroundImage: "resim/ap8.png"
        },
        {
            title: "Modüler Sistem",
            subtitle: "Model D-Serisi",
            description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.",
            cardImage: "resim/ekodası.png",
            backgroundImage: "resim/ap9.png"
        },
        {
            title: "Modüler Sistem",
            subtitle: "Model D-Serisi",
            description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.",
            cardImage: "resim/60x60y.png",
            backgroundImage: "resim/ap2.png"
        },
        {
            title: "Modüler Sistem",
            subtitle: "Model D-Serisi",
            description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.",
            cardImage: "resim/60x60.png",
            backgroundImage: "resim/arkaplan1.png"
        },
        {
            title: "Modüler Sistem",
            subtitle: "Model D-Serisi",
            description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.",
            cardImage: "resim/45x60y.png",
            backgroundImage: "resim/ap5.png"
        },
        {
            title: "Modüler Sistem",
            subtitle: "Model D-Serisi",
            description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.",
            cardImage: "resim/ızgara.png",
            backgroundImage: "resim/ap4.png"
        },
        {
            title: "Modüler Sistem",
            subtitle: "Model D-Serisi",
            description: "Farklı projelere kolayca uyum sağlayan, montajı pratik ve esnek modüler altyapı elemanları.",
            cardImage: "resim/80x80.png",
            backgroundImage: "resim/ap6.png"
        }
    ];

    const showcase = document.querySelector('.showcase');
    const backgroundSlider = document.querySelector('.background-slider');
    const textRotator = document.querySelector('.text-rotator');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const timelineNav = document.querySelector('.timeline-nav');

    slideData.forEach((data, index) => {
        const bgImg = document.createElement('img');
        bgImg.src = data.backgroundImage;
        bgImg.alt = `${data.title} arka planı`;
        backgroundSlider.appendChild(bgImg);

        const textSlide = document.createElement('article');
        textSlide.classList.add('content-slide');
        textSlide.innerHTML = `
            <h1>${data.title}</h1>
            <p>${data.description}</p>
        `;
        textRotator.appendChild(textSlide);

        const cardSlide = document.createElement('div');
        cardSlide.classList.add('swiper-slide');
        cardSlide.innerHTML = `
            <img src="${data.cardImage}" alt="${data.title}">
        `;
        swiperWrapper.appendChild(cardSlide);

        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Slayt ${index + 1}'e git`);
        dot.addEventListener('click', () => swiper.slideToLoop(index));
        timelineNav.appendChild(dot);
    });

    const bgImages = document.querySelectorAll('.background-slider img');
    const textSlides = document.querySelectorAll('.content-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    const swiper = new Swiper('.swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
    });

    function updateShowcase(index) {
        if (index === currentIndex) return;
        bgImages[currentIndex].classList.remove('is-active');
        textSlides[currentIndex].classList.remove('is-active');
        dots[currentIndex].classList.remove('is-active');
        bgImages[index].classList.add('is-active');
        textSlides[index].classList.add('is-active');
        dots[index].classList.add('is-active');
        textRotator.style.height = `${textSlides[index].scrollHeight}px`;
        currentIndex = index;
    }

    swiper.on('slideChange', () => {
        updateShowcase(swiper.realIndex);
    });

    function initialize() {
        bgImages[0].classList.add('is-active');
        textSlides[0].classList.add('is-active');
        dots[0].classList.add('is-active');
        textRotator.style.height = `${textSlides[0].scrollHeight}px`;
        showcase.classList.add('is-loaded');
    }

    initialize();
});