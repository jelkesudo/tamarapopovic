window.onload = function(){
    console.log("Screen width:", window.innerWidth);
    $("#hamburger-menu").on('click', (e) => {
        e.stopPropagation();
        $("#nav-menu").addClass("active");
        $("#overlay").addClass("active");
    });

    $("#close-nav").on('click', (e) => {
        $("#nav-menu").removeClass("active");
        $("#overlay").removeClass("active");
    });

    $("#overlay").on('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });

    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('nav-menu');

    document.addEventListener('click', (event) => {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
    
        if (!isClickInsideNav && !isClickOnHamburger) {
            $("#nav-menu").removeClass("active");
            $("#overlay").removeClass("active");
        }
    });
    getImages();
}

function getImages(){
    ajaxCallBack("images.json", function(result){
        printImages(result);
    });
}

function printImages(data){
    let html, dotHtml = "";
    let first = true;

    for (let index = 0; index < data.length; index++) {
        const d = data[index];
        console.log(d);
        html += `<div class="carousel-item active">
                        <div class="carousel-image">
                            <img src="${d.src}" alt="${d.alt}"/>
                        </div>
                        <div class="carousel-overlay">
                            <div class="carousel-content">
                                <div class="carousel-heading">
                                    <h3>Ime projekta</h3>
                                </div>
                                <div class="carousel-text">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, ipsum deleniti repudiandae a molestias fugit consequatur, saepe consequuntur nulla laudantium commodi repellat praesentium asperiores aut atque, accusamus autem harum dicta.</p>
                                </div>
                                <div class="carousel-button">
                                    <button>Go to project</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

        dotHtml += `<span class="dot" data-index="${index}"></span>`;
        if(first){
            html = `<div class="carousel-image active">
                        <img src="${d.src}" alt="${d.alt}"/>
                    </div>`;

            dotHtml = `<span class="dot active" data-index="${index}"></span>`;
            first = false;
        }
    }
    $("#imagePrint").html(html);
    $("#dotPrint").html(dotHtml);
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('#left-arrow');
    const rightArrow = document.querySelector('#right-arrow');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;

        images.forEach((img, index) => {
            img.classList.remove('active');
            if (index === currentIndex) {
                img.classList.add('active');
            }
        });
        dots.forEach((img, index) => {
            img.classList.remove('active');
            if (index === currentIndex) {
                img.classList.add('active');
            }
        });
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    rightArrow.addEventListener('click', showNextImage);
    leftArrow.addEventListener('click', showPreviousImage);

    let startX, endX;

    carouselImages.addEventListener('mousedown', (event) => {
        startX = event.pageX;
    });

    carouselImages.addEventListener('mouseup', (event) => {
        endX = event.pageX;
        if (startX > endX + 50) {
            showNextImage();
        } else if (startX + 50 < endX) {
            showPreviousImage();
        }
    });

    carouselImages.addEventListener('touchstart', (event) => {
        startX = event.touches[0].pageX;
    });

    carouselImages.addEventListener('touchend', (event) => {
        endX = event.changedTouches[0].pageX;
        if (startX > endX + 50) {
            showNextImage();
        } else if (startX + 50 < endX) {
            showPreviousImage();
        }
    });
}

function ajaxCallBack(address, f){
    $.ajax({
        url: "assets/data/" + address,
        type: "GET",
        data: "",
        success: f,
        error: function(xhr){
          console.error(xhr);
        }
    })
}