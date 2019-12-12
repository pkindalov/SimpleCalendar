let container = document.getElementById("container");
// container.innerHTML = "<h1>Works</h1>";


//give a class name of the calendar theme according to the current season
function getSeasonTheme(month) {
    let theme = 'january';

    switch (month) {
        case 1:
            theme = 'january';
            break;
        case 2:
            theme = 'february';
            break;
        case 3:
            theme = 'march';
            break;
        case 4:
            theme = 'april';
            break;
        case 5:
            theme = 'may';
            break;
        case 6:
            theme = 'june';
            break;
        case 7:
            theme = 'july';
            break;
        case 8:
            theme = 'august';
            break;
        case 9:
            theme = 'september';
            break;
        case 10:
            theme = 'october';
            break;
        case 11:
            theme = 'november';
            break;
        case 12:
            theme = 'december';
            break;
        default:
            theme = 'january';
            break;
    }

    return theme;

}

//functions about generating calendar
function genCalTopRow(seasonTheme) {
    return `<table class=${seasonTheme} id="calendar">
      <tr>
        <th>Пон.</th>
        <th>Вто.</th>
        <th>Сря.</th>
        <th>Чет.</th>
        <th>Пет.</th>
        <th>Съб.</th>
        <th>Нед.</th>
      </tr>
    </table>  
    `;
}

function genCalSecondRow(table, month, year, todayDate, emptyCols) {
    const DAYS_COUNT = 7;
    let startDate = 1;
    // let firstDayOfMonth = new Date(year, month, 1).toString();
    // let dayName = getDayName(firstDayOfMonth.split(" ")[0]);
    // let emptyCols = calcEmptyCols(dayName);
    let secondRow = table.insertRow();
    let textNode = "";



    for (let i = 0; i < DAYS_COUNT; i++) {
        if (i < emptyCols) {
            //   console.log(i);
            // secondRow.insertCell();
            //   textNode = document.createTextNode(` `);
            //   secondRow.appendChild(textNode);
            secondRow.innerHTML += `<td></td>`;
        } else {
            // secondRow.insertCell();
            // textNode = document.createTextNode(`${startDate++}`);
            // secondRow.appendChild(textNode);
            if (todayDate == startDate) {
                secondRow.innerHTML += `<td class="hightlight">${startDate++}</td>`;
            } else {
                secondRow.innerHTML += `<td>${startDate++}</td>`;
            }
        }
        // for (let e = 0; e < emptyCols; e++) {
        //   row += `<td></td>`;
        // }
        // return startDate;
        // row += `<td>${i}</td>`;
    }

    //   row += `</tr>`;
    //   console.log(row);

    //   return row;
    // alert(startDate + " " + dayName + " " + emptyCols);
    return startDate;
}

function getDayName(dayNum) {
    let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let pos = weekDays.indexOf(dayNum);
    return weekDays[pos];
}

function calcEmptyCols(dayName) {
    let emptyCols = 0;

    switch (dayName) {
        case "Mon":
            emptyCols = 0;
            break;
        case "Tue":
            emptyCols = 1;
            break;
        case "Wed":
            emptyCols = 2;
            break;
        case "Thu":
            emptyCols = 3;
            break;
        case "Fri":
            emptyCols = 4;
            break;
        case "Sat":
            emptyCols = 5;
            break;
        case "Sun":
            emptyCols = 6;
            break;
        default:
            throw error("No valid dayName");
    }

    return emptyCols;
}

function genTableBody(dateNum, table, month, year, todayDate, emptyCols) {
    const CURRENT_MONTH_DAYS = parseInt(
        new Date(year, month + 1, 0).toString().split(" ")[2]
    );
    // alert(CURRENT_MONTH_DAYS);
    const WRITED_CELLS_IN_CALENDAR = 7;
    const CELLS_TO_DRAW = CURRENT_MONTH_DAYS - (WRITED_CELLS_IN_CALENDAR - emptyCols);
    // alert(CELLS_TO_DRAW);
    let dynamicRow = "";

    for (let i = 0; i < CELLS_TO_DRAW; i++) {
        if (i % 7 == 0) {
            // console.log(i + " in -> " + dateNum);
            // console.log(i);
            dynamicRow = table.insertRow();

            // table.innerHTML += `</tr>`;
            // let dynamicRow = table.insertRow();
            // dynamicRow.innerHTML = `<td>${dateNum++}</td>`;
        }
        // dynamicRow.insertCell(i);
        if (dateNum == todayDate) {
            dynamicRow.innerHTML += `<td class="${seasonTheme}Hightlight">${dateNum}</td>`;
        } else {
            // if (dateNum < 32) {
            // }
            dynamicRow.innerHTML += `<td>${dateNum}</td>`;
            // console.log(i + " -> " + dateNum);
        }

        dateNum++;

    }
}

let month = new Date().getMonth();
let seasonTheme = getSeasonTheme(month + 1);
let calendarTopRow = genCalTopRow(seasonTheme);
container.innerHTML += calendarTopRow;
let table = document.getElementById("calendar");
let year = new Date().getFullYear();
let todayDate = new Date().getDate();
let firstDayOfMonth = new Date(year, month, 1).toString();
let dayName = getDayName(firstDayOfMonth.split(" ")[0]);
let emptyCols = calcEmptyCols(dayName);
let dateNum = genCalSecondRow(table, month, year, todayDate, emptyCols);

genTableBody(dateNum, table, month, year, todayDate, emptyCols, seasonTheme);