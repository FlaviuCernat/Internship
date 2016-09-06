document.getElementById("uploaded_image").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("image_preview").src = e.target.result;
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);

};
document.getElementById("image_preview").addEventListener("mouseover", mouseOver);
document.getElementById("image_preview").addEventListener("mouseout", mouseOut);
document.getElementById("edit_btn").addEventListener("mouseover", mouseOver);
document.getElementById("delete_btn").addEventListener("mouseover", mouseOver);

function mouseOver() {
    var x = document.getElementsByClassName("btn");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
    }
}
function mouseOut() {
    var x = document.getElementsByClassName("btn");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
}
