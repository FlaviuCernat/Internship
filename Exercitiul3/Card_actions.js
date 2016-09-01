document.getElementById("pencil").addEventListener("mouseover", mouseOver);
document.getElementById("pencil").addEventListener("mouseout", mouseOut);

function mouseOver() {
    var x = document.getElementsByClassName("left");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.color = "black";
    }
    document.getElementById('m_letter').style.border = "2px solid gray";
    document.getElementById('e_letter').style.border = "2px solid gray";
}
function mouseOut() {
    var x = document.getElementsByClassName("left");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.color = "rgb(206, 206, 206)";
    }
    document.getElementById('m_letter').style.border = "2px solid rgb(238, 238, 238)";
    document.getElementById('e_letter').style.border = "2px solid rgb(238, 238, 238)";
}

document.getElementById("pencil").addEventListener("click", open);
document.getElementById("close_menu").addEventListener("click", close);

function open () {
  document.getElementById('activated_footer').style.height = "100%";
  document.getElementById('activated_footer').style.paddingTop = "2em";
  document.getElementById('activated_footer').style.paddingBottom= "92px";
  document.getElementById('java_sun').style.border = "2px solid rgb(238, 238, 238)";
  document.getElementById('java_sun').style.borderRadius = "7px";
  document.getElementById('java_sun').style.transition = ".3s";
}
function close () {
  document.getElementById('activated_footer').style.height = "10px";
  document.getElementById('activated_footer').style.paddingTop = "0";
  document.getElementById('activated_footer').style.paddingBottom= "0";
  document.getElementById('java_sun').style.border = "2px solid white";
}
