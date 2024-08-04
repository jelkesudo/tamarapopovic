window.onload = function(){
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