const LANGUAGE = 'bg';
let container = document.getElementById("simpleCalendarContainer");

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
function genCalTopRow(seasonTheme, LANGUAGE) {
    switch (LANGUAGE) {
        case 'bg':
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
        case 'en':
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

function genCalSecondRow(table, month, year, todayDate, emptyCols) {
    const DAYS_COUNT = 7;
    let startDate = 0;
    let secondRow = table.insertRow();
    for (let i = 0; i < DAYS_COUNT; i++) {
        if (i < emptyCols) {
            secondRow.innerHTML += `<td class="emptyCell"></td>`;
        } else {
            if (todayDate == startDate) {
                secondRow.innerHTML += `<td id="${startDate}" class="hightlight">${startDate}</td>`;
            } else {
                secondRow.innerHTML += `<td id="${startDate}">${startDate}</td>`;
            }
        }
        startDate++;
    }
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
    const WRITED_CELLS_IN_CALENDAR = 7;
    const CELLS_TO_DRAW = CURRENT_MONTH_DAYS - (WRITED_CELLS_IN_CALENDAR - emptyCols);
    let dynamicRow = "";

    for (let i = 0; i < CELLS_TO_DRAW; i++) {
        if (i % 7 == 0) {
            dynamicRow = table.insertRow();
        }
        if (dateNum == todayDate) {
            dynamicRow.innerHTML += `<td id="${dateNum}" class="${seasonTheme}Hightlight">${dateNum}</td>`;
        } else {
            dynamicRow.innerHTML += `<td id="${dateNum}">${dateNum}</td>`;
        }
        dateNum++;
    }
}

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
let dateNum = genCalSecondRow(table, month, year, todayDate, emptyCols);

genTableBody(dateNum, table, month, year, todayDate, emptyCols, seasonTheme);