document.addEventListener('DOMContentLoaded', () => {

    // --- SLAYT VERİLERİ ---
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

    // --- HTML ELEMENTLERİNİ SEÇME ---
    const showcase = document.querySelector('.showcase');
    const bgSlider = document.querySelector('.background-slider');
    const textRotator = document.querySelector('.text-rotator');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const timelineNav = document.querySelector('.timeline-nav');
    
    // Hata kontrolü
    if (!showcase || !bgSlider || !textRotator || !swiperWrapper || !timelineNav) {
        console.error('HTML İskeleti Hatalı! Gerekli elemanlardan biri bulunamadı. Lütfen products.html dosyasını kontrol edin.');
        return;
    }

    // --- DEĞİŞKEN TANIMLAMA (SADECE BİR KEZ) ---
    let currentIndex = 0;

    // --- İÇERİĞİ DİNAMİK OLARAK OLUŞTURMA ---
    slideData.forEach((data, index) => {
        // Arka plan resmi oluştur
        const bgImg = document.createElement('img');
        bgImg.src = data.backgroundImage;
        bgSlider.appendChild(bgImg);
        
        // Metin slaytı oluştur
        const textSlide = document.createElement('article');
        textSlide.classList.add('content-slide');
        textSlide.innerHTML = `<h1>${data.title}</h1><p>${data.description}</p>`;
        textRotator.appendChild(textSlide);
        
        // Ürün kartı slaytı oluştur
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.innerHTML = `<img src="${data.cardImage}" alt="${data.title}">`;
        swiperWrapper.appendChild(swiperSlide);
        
        // Navigasyon noktası oluştur (masaüstü için)
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.dataset.index = index;
        timelineNav.appendChild(dot);
    });
    
    // Oluşturulan elementleri tekrar seç
    const bgImages = document.querySelectorAll('.background-slider img');
    const textSlides = document.querySelectorAll('.content-slide');
    const navDots = document.querySelectorAll('.dot');

    // --- SWIPER KÜTÜPHANESİNİ BAŞLATMA ---
    const swiper = new Swiper('.swiper', {
        effect: 'coverflow', // Masaüstü için Coverflow efekti
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
            // Swiper hazır olduğunda ve slayt değiştiğinde içeriği güncelle
            init: function () { updateContent(this.realIndex); },
            slideChange: function () { updateContent(this.realIndex); },
        },
    });
    
    // Nokta navigasyonuna tıklama olayı
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index, 10);
            swiper.slideToLoop(index);
        });
    });

    // --- İÇERİK GÜNCELLEME FONKSİYONU ---
    function updateContent(index) {
        if (currentIndex === index && showcase.classList.contains('is-loaded')) return; // İlk yükleme hariç aynıysa işlem yapma
        
        // Önceki aktif elemanları temizle
        if (bgImages[currentIndex]) bgImages[currentIndex].classList.remove('is-active');
        if (textSlides[currentIndex]) textSlides[currentIndex].classList.remove('is-active');
        if (navDots[currentIndex]) navDots[currentIndex].classList.remove('is-active');

        // Yeni elemanları aktif et
        if (bgImages[index]) bgImages[index].classList.add('is-active');
        if (textSlides[index]) {
            textSlides[index].classList.add('is-active');
            // Yüksekliği ayarla
            textRotator.style.height = `${textSlides[index].scrollHeight}px`;
        }
        if (navDots[index]) navDots[index].classList.add('is-active');
        
        // Mevcut index'i güncelle
        currentIndex = index;
        
        // Yüklenme animasyonunu tetikle
        if (!showcase.classList.contains('is-loaded')) {
             showcase.classList.add('is-loaded');
        }
    }
});
