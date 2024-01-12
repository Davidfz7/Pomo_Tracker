var counter = 6;
var extraCounter = 0;
var table   = document.getElementById("calendar");
var optionPressed;
var monthsList = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];

const monthMetaData = {
    "registers": [{
        "month": "january",
        "activities": []     
    }]
};
var verifyLocal = localStorage.getItem('monthMetaData');
if(verifyLocal == null){
   localStorage.setItem("monthMetaData", JSON.stringify(monthMetaData)); 
}

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
       cell.id = 'january-'+"0"+counter;
       cell.innerHTML = "0"+counter;   
    }else{
        cell.id = 'january-'+counter; 
        cell.innerHTML = counter;
                       
    }
      
}
const dialogg = document.getElementById('cell-info-dialog');
var cells = table.getElementsByTagName("td");

for(var i = 0; i< cells.length; i++){
   (function(index){
        cells[index].addEventListener("click", function() {
            var selectedMonth;
            for(var i = 0; i < monthMetaData["registers"].length; i++){
                selectedMonth = i;
            }
            console.log("the selectedMonth is", selectedMonth);
            var selectedMonthActivities = monthMetaData["registers"][selectedMonth]["activities"] 
            dialogg.showModal();
            console.log(cells[index].id);    
            optionPressed = cells[index].id.split('-');
            console.log("A dialog has been opened")
            console.log("Selected month activities length: ",selectedMonthActivities.length);
            for(var j = 0; j < selectedMonthActivities.length; j++){
                if(selectedMonthActivities.length === 0 ){
                    console.log("Empty list");
                }
               console.log("La verdad si entre a este for lol");
            } 
        });
    })(i);
}

var colorScale = document.getElementById("color-scale");
var colorScaleResult = document.getElementById('color-scale-result');

var colors = ["rgb(0, 170, 0)", "rgb(0, 190, 0)", "rgb(0, 210, 0)",
             "rgb(0, 230, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)",
             "rgb(230, 0, 0)", "rgb(210, 0, 0)", "rgb(190, 0, 0)",
             "rgb(170, 0, 0)"];

for(var i = 0; i < colors.length; i++){
    var newDiv = document.createElement("div");
    var newDivResult = document.createElement("div");
    newDiv.style.backgroundColor = colors[i];
    newDivResult.style.backgroundColor = colors[i];
    newDiv.className = "color-box";
    newDivResult.className = "color-box-stored";
    colorScale.appendChild(newDiv);
    colorScaleResult.appendChild(newDivResult);
}


function saveData(){
    var programmingHours = document.getElementById('horasProgramacion').value;
    var readingHours = document.getElementById('horasLectura').value;
    var monthNumber;
    var formData = {
        "day": parseInt(optionPressed[1]),
        "programming" : programmingHours,
        "reading": readingHours,
        "status-day": "closed"
    }

    var objectStored = JSON.parse(localStorage.getItem('monthMetaData'));   
    var months = objectStored["registers"];
    for(var i = 0; i < monthsList.length; i++){
        if(optionPressed[0] === monthsList[i]){
            monthNumber = i;
        }

    }
    addDataToMonth(months[monthNumber], formData); 
    localStorage.removeItem("monthMetaData");
    localStorage.setItem("monthMetaData", JSON.stringify(objectStored));
    dialogg.close();
}

function addDataToMonth(month, activyData){
    var activities = month["activities"];   
    activities.push(activyData);
    console.log(activities);
}

function selectCorrectModal(){
    
}

function resetAll(){
    localStorage.clear();
    if(localStorage.getItem("random") == null){
        localStorage.setItem("monthMetaData", JSON.stringify(monthMetaData));
    }
}

var xD = document.getElementById("stored-data-dialog");

xD.showModal();
xD.close();