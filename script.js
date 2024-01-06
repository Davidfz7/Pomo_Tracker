console.log("Hello world");
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
        cell.innerHTML = counter; 
    }
      
}






