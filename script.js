var counter = 6;
var extraCounter = 0;
var table   = document.getElementById("calendar");
var row  = table.insertRow();
for(var i = 0; i < 25; i++){
    if(extraCounter == 7){
        var row = table.insertRow();   
        extraCounter = 0;
    } 
    extraCounter += 1;
    counter += 1; 
    var cell = row.insertCell();
    if(counter < 10){
       cell.innerHTML = "0"+counter;   
    }else{
        cell.innerHTML = counter+
                        `<dialog id="cellInfo">
                         Hello world</dialog>`; 
    }
      
}

var cells = table.getElementsByTagName("td");

for(var i = 0; i< cells.length; i++){
   (function(index){
        cells[index].addEventListener("click", function() {
            const dialogg = document.getElementById('cell-info-dialog');

            dialogg.showModal();

        });
    })(i);
}
console.log(sessionStorage);
// var dialogsTd = table.getElementsByTagName("dialog");
// var listDialog = [];
// for(var j = 0; j< dialogsTd.length; j++){ 
//     dialogsTd[j].show();
// }
//console.log(dialogsTd);

var colorScale = document.getElementById("color-scale");


var colors = ["rgb(0, 170, 0)", "rgb(0, 190, 0)", "rgb(0, 210, 0)",
             "rgb(0, 230, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)",
             "rgb(230, 0, 0)", "rgb(210, 0, 0)", "rgb(190, 0, 0)",
             "rgb(170, 0, 0)"];
for(var i = 0; i < colors.length; i++){
    var newDiv = document.createElement("div");
    newDiv.style.backgroundColor = colors[i];
    newDiv.className = "color-box";
    colorScale.appendChild(newDiv);
}