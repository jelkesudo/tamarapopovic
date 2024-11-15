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
    let html= "";
    let dotHtml = "";

    for (let index = 0; index < data.length; index++) {
        const d = data[index];
        html += `<div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="${index === 0 ? "5000" : "2000"}">
                            <img src="assets/img/nas-razred/14-tamara-popovic-pozoriste-67362e62d418e.webp"
                                class="d-block w-100" alt="...">
                            <div class="carousel-caption">
                                <h5>Ime Projekta ${index + 1}</h5>
                                <div class="d-none d-md-block">
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                                <button class="btn btn-primary">Go to project</button>
                            </div>
                        </div>`;
    }
    html += `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>`
    $("#imagePrint").html(html);
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