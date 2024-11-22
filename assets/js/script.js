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
            setBackground(resultSend);
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

function setBackground(data){
    document.getElementById("customBackgroud").style.backgroundImage = `url(${data[0].picture})`;
    document.getElementById("projectName").innerHTML = `<h1>${data[0].name}</h1>`;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function printImagesCarousel(data){
    let html= "";
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        const d = data[index];
        html += `<div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="${index === 0 ? "5000" : "2000"}">
                            <img src="${d.picture}"
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