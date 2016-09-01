var initialArr = [];
var filteredArr = [];

// var rows = 0;
//
// $(window).scroll(function() {
//
//  if ($(window).scrollTop() + $(window).height() === $(document).height()) {
//    rows += 30;
//    display();
//  }
// })

document.getElementById('file').onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();

  reader.onload = function() {
    lines = this.result.split('\n');
    ul = document.getElementById('ulist');
    result = '';
    trash = `<a class="pull-right glyphicon glyphicon-trash" onclick=deleteLi(this)></a>`
    var len = lines.length;
    for(var i = 0; i < len; i++) {
      result += `<li contentEditable=true><span>${lines[i]}</span>${trash}</li>`;
      initialArr[i] = lines[i];
      }
      ul.innerHTML = result;
  };

  reader.readAsText(file);
};

function filter() {
   var ul = document.getElementById("ulist");
   var input = document.getElementById("search").value;
   ul.innerHTML = "";
   var filt = [];
   var len = initialArr.length;
   for (var i = 0; i < len; i++) {
       if (initialArr[i].toLowerCase().search(input.toLowerCase()) !== -1) {
         filt += `<li contentEditable=true><span>${initialArr[i]}</span>${trash}</li>`;
       }
   }
   ul.innerHTML = filt;
   filteredArr = filt.split("<li contentEditable=true>");
}

function deleteLi(link) {
  var li = link.parentNode;
  var ul = li.parentNode;
  ul.removeChild(li);
  var elementToRemove = li.textContent.trim();
  for (var j = 0; j < initialArr.length; j++) {
    if(initialArr[j].trim() === elementToRemove) {
      initialArr.splice(j, 1);
      break;
    }
  }
  return initialArr;
}

var order = 0;
function sort() {
  var ul = document.getElementById('ulist');
  var result = "";
  if(order === 0) {
    var sortArr = filteredArr.sort(function (a, b) {
          a = a.toLowerCase();
          b = b.toLowerCase();
          return (a < b ? -1 : (a > b ? 1 : 0));
       });
    order = 1;
    for(var i = 1; i < sortArr.length; i++) {
      result += `<li contentEditable=true>${sortArr[i]}</li>`;
    }
  } else {
    order = 0;
    var sortArr = filteredArr.sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return (a > b ? -1 : (a < b ? 1 : 0));
       })
    for(var i = 0; i < sortArr.length - 1; i++) {
      result += `<li contentEditable=true>${sortArr[i]}</li>`;
    }
  }

  ul.innerHTML = result;
}

function add() {
  var ul = document.getElementById("ulist");
  var input = document.getElementById("add").value;
  initialArr.unshift(input);
  ul.innerHTML = "";
  var add = '';
  var len = initialArr.length;
  for (var i = 0; i < len; i++) {
      add += `<li contentEditable=true>${initialArr[i]}${trash}</li>`;
  }
  ul.innerHTML = add;

  console.log(initialArr);
  return initialArr;


  // var input = document.getElementById("add").value;
  // var node = document.createElement("LI");
  // var textnode = document.createTextNode(input);
  // node.appendChild(textnode);
  // var onTop = document.getElementById("ulist");
  // onTop.insertBefore(node, onTop.childNodes[0]);
  // onTop.childNodes[0].setAttribute('contentEditable','true');
  //
  // var node2 = document.createElement("a");
  // var textnode2 = document.createTextNode('X');
  // node2.appendChild(textnode2);
  // onTop.childNodes[0].appendChild(node2);
  // document.getElementsByTagName("a")[0].setAttribute("class", "pull-right");
  // document.getElementsByTagName("a")[0].setAttribute("onclick", "deleteLi(this)");
}
