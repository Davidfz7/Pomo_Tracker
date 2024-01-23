var table = document.getElementById("calendar-table");
console.log("This is a normal table", table);
var monthContainer = document.getElementById("month-january");
var calendarContainer = document.getElementById("calendar-container");
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
  "december",
];

function getMonthData() {
  fetch("months.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      paintMonths(data);
    });
}

function paintMonths(monthsData) {
  console.log(monthsData);
  for (var i = 0; i < monthsList.length; i++) {
    var month = monthsData["months"][i];
    var counter = 0;
    var row = table.insertRow();
    var rowForTheRest;
    var extraCounter = 0;
    var doit = false;
    var whoDaTable;
    var doitDummy = true;
    while (counter < month["days"]) {
      if (month["number"] === 1) {
        if (extraCounter == 7) {
          var row = table.insertRow();
          extraCounter = 0;
        }
        extraCounter += 1;
        counter += 1;
        if (counter == month["startingDay"] && doit == false) {
          var cell = row.insertCell();
          cell.style.backgroundColor = "white";
          cell.style.border = "none";
          counter = 0;
          doit = true;
        } else {
          var cell = row.insertCell();
          if (counter < 10) {
            cell.id = "january-" + "0" + counter;
            cell.innerHTML = "0" + counter;
          } else {
            cell.id = "january-" + counter;
            cell.innerHTML = counter;
          }
        }
      } else {
        if (counter == 0) {
          applyStyles(month);
          whoDaTable = document.getElementById(`month-${month["name"]}`);
          whoDaTable = whoDaTable.getElementsByTagName("table")[0];
          rowForTheRest = whoDaTable.insertRow();
        }
        if (extraCounter == 7) {
          rowForTheRest = whoDaTable.insertRow();
          extraCounter = 0;
        }
        extraCounter += 1;
        counter += 1;
        if (counter != month["startingDay"] && doit == false) {
          var cell = rowForTheRest.insertCell();
          cell.style.backgroundColor = "white";
          cell.style.border = "none";
        } else {
          doit = true;

          if (doit == true && doitDummy == true) {
            counter = 1;
            doitDummy = false;
          }
          var cell = rowForTheRest.insertCell();
          if (counter < 10) {
            cell.id = `${month["name"]}-` + "0" + counter;
            cell.innerHTML = "0" + counter;
          } else {
            cell.id = `${month["name"]}-` + counter;
            cell.innerHTML = counter;
          }
        }
      }
    }
  }
}

const dialogg = document.getElementById("cell-info-dialog");
var cells = table.getElementsByTagName("td");

for (var i = 0; i < cells.length; i++) {
  (function (index) {
    cells[index].addEventListener("click", function () {
      for (var i = 0; i < monthMetaData["registers"].length; i++) {
        selectedMonth = i;
      }
      console.log("the selectedMonth is", selectedMonth);
      var selectedMonthActivities =
        monthMetaData["registers"][selectedMonth]["activities"];
      dialogg.showModal();
      console.log(cells[index].id);
      optionPressed = cells[index].id.split("-");
      console.log("A dialog has been opened");
      console.log(
        "Selected month activities length: ",
        selectedMonthActivities.length
      );
      for (var j = 0; j < selectedMonthActivities.length; j++) {
        if (selectedMonthActivities.length === 0) {
          console.log("Empty list");
        }
        console.log("La verdad si entre a este for lol");
      }
    });
  })(i);
}

var colorScale = document.getElementById("color-scale");
var colorScaleResult = document.getElementById("color-scale-result");

var colors = [
  "rgb(0, 170, 0)",
  "rgb(0, 190, 0)",
  "rgb(0, 210, 0)",
  "rgb(0, 230, 0)",
  "rgb(0, 255, 0)",
  "rgb(255, 0, 0)",
  "rgb(230, 0, 0)",
  "rgb(210, 0, 0)",
  "rgb(190, 0, 0)",
  "rgb(170, 0, 0)",
];

for (var i = 0; i < colors.length; i++) {
  var newDiv = document.createElement("div");
  var newDivResult = document.createElement("div");
  newDiv.style.backgroundColor = colors[i];
  newDivResult.style.backgroundColor = colors[i];
  newDiv.className = "color-box";
  newDivResult.className = "color-box-stored";
  colorScale.appendChild(newDiv);
  colorScaleResult.appendChild(newDivResult);
}

function saveData() {
  var activityName = document.getElementById("activity-dropdown").value;
  var activityHours = document.getElementById("activity-hours").value;
  var apiURL = "http://localhost:8080/api/v1/save";
  console.log("Veamos esto: ", optionPressed[1]);
  if (selectedMonth + 1 < 10) {
    var selectedDate = `2024-0${selectedMonth + 1}-${optionPressed[1]}`;
  } else {
    var selectedDate = `2024-${selectedMonth + 1}-${optionPressed[1]}`;
  }

  var activityData = {
    activityType: activityName,
    hoursCount: parseInt(activityHours),
    dateRecorded: selectedDate,
  };
  console.log(activityData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  };
  fetch(apiURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      console.log("a ver desde aqui: ", response);
      return response;
    })
    .then((data) => {
      console.log("Server response: ", data);
    })
    .catch((error) => {
      console.error(error);
    });
}
function applyStyles(month) {
  var monthContainerClone = monthContainer.cloneNode(true);
  var monthContainerTable =
    monthContainerClone.getElementsByTagName("table")[0];
  var monthContainerTitle = monthContainerClone.getElementsByTagName("h1");
  var rowCount = monthContainerTable.rows.length;
  monthContainerTitle[0].innerText = capitalizeFirstLetter(`${month["name"]}`);
  monthContainerClone.id = `month-${month["name"]}`;
  monthContainerClone.style.display = "flex";
  monthContainerClone.style.flexDirection = "column";
  monthContainerClone.style.marginRight = "auto";
  monthContainerClone.style.marginLeft = "auto";
  monthContainerClone.style.marginBottom = "auto";
//  monthContainerClone.style.border = "solid black";
  for (var i = rowCount - 1; i > 0; i--) {
    monthContainerTable.deleteRow(i);
  }
  calendarContainer.appendChild(monthContainerClone);
  return monthContainerClone;
}

function capitalizeFirstLetter(str) {
  if (str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return str;
  }
}

getMonthData();
