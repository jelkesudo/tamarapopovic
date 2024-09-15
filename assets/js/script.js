window.onload = function(){
    
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
    let html = "";
    for(let d of data){
        html += `<img src="${d.src}" alt="${d.alt}" class="carousel-image">`;
    }
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