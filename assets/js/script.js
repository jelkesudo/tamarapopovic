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

    const id = getQueryParam("id");
    ajaxCallBack("projects.json", function(result){
        if(id){
            let resultSend = result.filter(x => x.id == id);
            setBackground(resultSend, id);
        }
        else{
            printImagesCarousel(result);
        }
    });

    $(document).on("click", ".close-navigation", function() {
        $("#nav-menu").removeClass("active");
        $("#overlay").removeClass("active");
    });
}

function setBackground(data, id){
    document.getElementById("customBackgroud").style.backgroundImage = `url(${data[0].picture})`;
    document.getElementById("projectName").innerHTML = `<h1>${data[0].name}</h1>`;
    ajaxCallBack("images.json", function(result){
        result = result.filter(x => x.parentId == id)
        printGalery(result);
    })
}

function printGalery(data){
    let html = "";
    let mobileHtml = "<div class='row g-3'>";
    let index = 0;
    let row = 0;

    for(index = 0; index < data.length; index++) {
        const d = data[index];
        if(index % 6 == 0){
            html += `<div class="carousel-item ${index == 0 ? "active" : ""}">`;
        }
        if(index % 3 == 0){
            html += `<div class="d-flex justify-content-center">`;
        }
        html += `<div class="col-4 mx-2 ${row++ == 0 ? "mb-5" : ""}">
                        <img src="${d.src}" class="d-block w-100" alt="${d.alt}">
                      </div>`;
        if(index % 3 == 2 && index != 0){
            html += `</div>`;
        }
        if(index % 6 == 5 && index != 0){
            row = 0;
            html += `</div>`;
        }
        mobileHtml += `<div class="col-12">
                <img class="d-block w-100 ${index == data.length - 1 ? "mb-5" : ""}" src="${d.src}" alt="${d.alt}">
              </div>`;
    }
    if(index % 3 != 2){
        html += `</div>`;
    }
    if(index % 6 != 5){
        html += `</div>`;
    }
    html += '<div id="printButtonsCarousel"></div>';
    $("#printWall").html(html);
    if(data.length > 6){
        $("#printButtonsCarousel").html('<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev"><span class="carousel-control-prev-icon margin-right-100px" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next"><span class="carousel-control-next-icon margin-left-100px" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>');
    }
    mobileHtml += "</div>";
    
    $("#mobileGallery").html(mobileHtml);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function printImagesCarousel(data){
    let html= "";
    for (let index = 0; index < data.length; index++) {
        const d = data[index];
        html += `<div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="${index === 0 ? "5000" : "2000"}">
                            <img class="height500" src="${d.picture}"
                                class="d-block w-100" alt="...">
                            <div class="carousel-caption">
                                <h5${d.name}</h5>
                                <div class="d-none d-md-block">
                                    <p>"${d.desc}"</p>
                                </div>
                                <a href="project.html?id=${index + 1}">
                                <button class="btn btn-primary">Go to project</button>
                                </a>
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