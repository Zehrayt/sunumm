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
    
    if (!showcase || !bgSlider || !textRotator || !swiperWrapper || !timelineNav) {
        console.error('Gerekli HTML elemanlarından biri bulunamadı!');
        return;
    }

   slideData.forEach(data => {
        const bgImg = document.createElement('img');
        bgImg.src = data.backgroundImage;
        bgSlider.appendChild(bgImg);

        const textSlide = document.createElement('article');
        textSlide.classList.add('content-slide');
        textSlide.innerHTML = `<h1>${data.title}</h1><p>${data.description}</p>`;
        textRotator.appendChild(textSlide);

        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.innerHTML = `<img src="${data.cardImage}" alt="${data.title}">`;
        swiperWrapper.appendChild(swiperSlide);
    });
    
    const bgImages = document.querySelectorAll('.background-slider img');
    const textSlides = document.querySelectorAll('.content-slide');
    let currentIndex = 0;

    const swiper = new Swiper('.swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        on: {
            // Swiper hazır olduğunda ilk içeriği göster
            init: function () {
                updateContent(this.realIndex);
            },
            // Slayt değiştiğinde içeriği güncelle
            slideChange: function () {
                updateContent(this.realIndex);
            },
        },
    });

    let currentIndex = 0;

    function updateContent(index) {
        if (textSlides.length === 0) return;

        // Önceki aktif sınıfları temizle
        if (textSlides[currentIndex]) {
             textSlides[currentIndex].classList.remove('is-active');
             bgImages[currentIndex].classList.remove('is-active');
        }
       
        // Yeni aktif sınıfları ekle
        textSlides[index].classList.add('is-active');
        bgImages[index].classList.add('is-active');
        
        // Metin alanının yüksekliğini ayarla
        const activeTextSlide = textSlides[index];
        textRotator.style.height = `${activeTextSlide.scrollHeight}px`;
        
        // Mevcut index'i güncelle
        currentIndex = index;
    }
});
