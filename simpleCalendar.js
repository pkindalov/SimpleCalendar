const LANGUAGE = "bg";
let container = document.getElementById("simpleCalendarContainer");
let month = new Date().getMonth();
let seasonTheme = getSeasonTheme(month + 1);
let calendarTopRow = genCalTopRow(seasonTheme, LANGUAGE);
container.innerHTML += calendarTopRow;
let table = document.getElementById("simpleCalendar");
let year = new Date().getFullYear();
let todayDate = new Date().getDate();
let firstDayOfMonth = new Date(year, month, 1).toString();
let dayName = getDayName(firstDayOfMonth.split(" ")[0]);
let emptyCols = calcEmptyCols(dayName);
let dateNum = genCalSecondRow(table, month, year, todayDate, emptyCols, seasonTheme);

//give a class name of the calendar theme according to the current season
function getSeasonTheme(month) {
    let theme = "january";
    switch (month) {
        case 1:
            theme = "january";
            break;
        case 2:
            theme = "february";
            break;
        case 3:
            theme = "march";
            break;
        case 4:
            theme = "april";
            break;
        case 5:
            theme = "may";
            break;
        case 6:
            theme = "june";
            break;
        case 7:
            theme = "july";
            break;
        case 8:
            theme = "august";
            break;
        case 9:
            theme = "september";
            break;
        case 10:
            theme = "october";
            break;
        case 11:
            theme = "november";
            break;
        case 12:
            theme = "december";
            break;
        default:
            theme = "january";
            break;
    }
    return theme;
}

//functions about generating calendar
//Following function generate first row of the table with the name of the days
function genCalTopRow(seasonTheme, LANGUAGE) {
    switch (LANGUAGE) {
        case "bg":
            return `<table class=${seasonTheme} id="simpleCalendar">
              <tr>
                <th id="Mon">Пон.</th>
                <th id="Tue">Вто.</th>
                <th id="Wed">Сря.</th>
                <th id="Thu">Чет.</th>
                <th id="Fri">Пет.</th>
                <th id="Sat">Съб.</th>
                <th id="Sun">Нед.</th>
              </tr>
            </table>  
            `;
            break;
        case "en":
            return `<table class=${seasonTheme} id="simpleCalendar">
                  <tr>
                    <th id="Mon">Mon.</th>
                    <th id="Tue">Tue.</th>
                    <th id="Wed">Wed.</th>
                    <th id="Thu">Thu.</th>
                    <th id="Fri">Fri.</th>
                    <th id="Sat">Sat.</th>
                    <th id="Sun">Sun.</th>
                  </tr>
                </table>  
                `;
            break;
    }
}

//Generate second row of the table. Use variable emptyCols to draw empty cells in depends when is the first day of the month. For example if the first day of the month is monday, then the value of the empyCols is 0. If the first day is tusday, then monday is empty so the value of the emptyCols is 1. If the first day is wednesday, then before this day there are two empty days - monday and tuesday, so the valye of emptyCols is 2 and so on...
function genCalSecondRow(table, month, year, todayDate, emptyCols, seasonTheme) {
    const DAYS_COUNT = 7;
    let startDate = 1;
    let secondRow = table.insertRow();
    let previousMont = new Date(year, month, 0) + " ";
    let previousMontDays = parseInt(previousMont.split(" ")[2]);
    let prevMontStart = (previousMontDays + 1) - emptyCols;

    for (let i = 0; i < DAYS_COUNT; i++) {
        if (i < emptyCols) {
            secondRow.innerHTML += `<td class="${seasonTheme}Disabled">${prevMontStart}</td>`;
            prevMontStart++;
        } else {
            if (todayDate == startDate) {
                secondRow.innerHTML += `<td id="${startDate}" class="hightlight">${startDate}</td>`;
            } else {
                secondRow.innerHTML += `<td id="${startDate}">${startDate}</td>`;
            }
            startDate++;
        }
    }
    return startDate;
}

//Helper function to return name of the day depends of the number.
function getDayName(dayNum) {
    let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let pos = weekDays.indexOf(dayNum);
    return weekDays[pos];
}

//Helper function to return how many empty cells must be available on the second row on the table depending when is the first day of the month. If the first day of the month is monday, then there is 0 empty cells. If first day is thursday for example, then there are 3 empty cell in the second row - monday, tuesday and wednesday must be empty.
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

function genTableBody(dateNum, table, month, year, todayDate, emptyCols, seasonTheme) {
    let currentDate = new Date(year, month + 1, 0) + " ";
    let countDays = parseInt(currentDate.split(" ")[2]);
    let tr = '';
    let td = '';
    let pastTheMont = false;

    for (let i = 0; i < countDays; i++) {
        if (dateNum > countDays) {
            dateNum = 1;
            pastTheMont = true;
        }
        if (i % 7 == 0) {
            tr = table.insertRow();
        }
        td = tr.insertCell();

        // if (i < emptyCols) {
        //     // td = tr.insertCell();
        //     td.innerHTML = `${prevMontStart}dfdsfsdf`;
        //     prevMontStart++;
        // }

        // if (i < emptyCols) {
        //     td.innerHTML = ``;
        //     //  td.setAttribute(`class`, `${seasonTheme}Hightlight`);
        // } else {
        // }

        if (dateNum == todayDate) {
            td.innerHTML = `${dateNum}`;
            td.setAttribute(`class`, `${seasonTheme}Hightlight`);
        } else {
            td.innerHTML = `${dateNum}`;
            if (pastTheMont) {
                td.setAttribute(`class`, `day${dateNum} ${seasonTheme}Disabled`);

            } else {
                td.setAttribute(`class`, `day${dateNum}`);

            }
        }

        dateNum++;
    }

}


genTableBody(dateNum, table, month, year, todayDate, emptyCols, seasonTheme);