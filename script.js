var counter = 6;
var extraCounter = 0;
var table   = document.getElementById("calendar");
var optionPressed;
var selectedMonth;
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
    var activityName = document.getElementById('activity-dropdown').value;
    var activityHours = document.getElementById('activity-hours').value;
    var apiURL = "http://localhost:8080/api/v1/save";
    console.log("Veamos esto: ", optionPressed[1]);
    if((selectedMonth+1) < 10){
        var selectedDate = `2024-0${selectedMonth+1}-${optionPressed[1]}`;
    }else{
        var selectedDate = `2024-${selectedMonth+1}-${optionPressed[1]}`;
   
    }
   
    var activityData ={
        "activityType": activityName,
        "hoursCount":  parseInt(activityHours), 
        "dateRecorded": selectedDate
    };
    console.log(activityData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
    }
    fetch(apiURL, requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error')
            }
            console.log("a ver desde aqui: ", response);
            return response.json();
        })
        .then(data => {
            console.log("Server response: ", data);
        })
        .catch(error => {
            console.error(error);
        })
 
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