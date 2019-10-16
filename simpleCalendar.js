const LANGUAGE = "bg";
let container = document.getElementById("simpleCalendarContainer");
let month = new Date().getMonth();
let year = new Date().getFullYear();
let seasonTheme = getSeasonTheme(month + 1);
let calendarTopRow = genCalTopRow(seasonTheme, LANGUAGE, month, year);
container.innerHTML += calendarTopRow;
let table = document.getElementById("simpleCalendar");
let todayDate = new Date().getDate();
let firstDayOfMonth = new Date(year, month, 1).toString();
let dayName = getDayName(firstDayOfMonth.split(" ")[0]);
let emptyCols = calcEmptyCols(dayName);
let dateNum = genCalSecondRow(
    table,
    month,
    year,
    todayDate,
    emptyCols,
    seasonTheme
);

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

function prevMonth(month, year) {
    // alert(month + ' ' + year);
    // let topRow = genCalTopRow(seasonTheme, LANGUAGE, month, year);
    // let container = document.getElementById("simpleCalendarContainer");
    // container.innerHTML = '';
    // container.innerHTML += topRow;
    // month--;
}

function nextMonth(month, year) {
    alert(month + 2 + ' ' + year);
}

//functions about generating calendar
//Following function generate first row of the table with the name of the days
function genCalTopRow(seasonTheme, LANGUAGE, month, year) {

    let monthName = getCurrentMonthName(LANGUAGE, month, year);


    switch (LANGUAGE) {
        case "bg":
            return `<table class=${seasonTheme} id="simpleCalendar">
              <tr><th colspan="7"><a onclick="prevMonth(month, year, seasonTheme, LANGUAGE);" style="color: orange" href="#">&lt;</a>${monthName}<a onclick="nextMonth(month, year);" style="color: orange" href="#">&gt;</a></th></tr>  
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
                 <tr><th colspan="7">${monthName}</th></tr>  
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

function getCurrentMonthName(LANGUAGE, month, year) {
    let currentDate = new Date(year, month + 1, 0) + " ";
    let monthName = currentDate.split(" ")[1];

    if (LANGUAGE == "bg") {
        switch (monthName) {
            case "Jan":
                monthName = "Януари";
                break;
            case "Feb":
                monthName = "Февруари";
                break;
            case "Mar":
                monthName = "Март";
                break;
            case "Apr":
                monthName = "Април";
                break;
            case "May":
                monthName = "Май";
                break;
            case "Jun":
                monthName = "Юни";
                break;
            case "Jul":
                monthName = "Юли";
                break;
            case "Aug":
                monthName = "Август";
                break;
            case "Sep":
                monthName = "Септември";
                break;
            case "Oct":
                monthName = "Октомври";
                break;
            case "Nov":
                monthName = "Ноември";
                break;
            case "Dec":
                monthName = "Декември";
                break;
        }
    } else {
        switch (monthName) {
            case "Jan":
                monthName = "January";
                break;
            case "Feb":
                monthName = "February";
                break;
            case "Mar":
                monthName = "March";
                break;
            case "Apr":
                monthName = "April";
                break;
            case "May":
                monthName = "May";
                break;
            case "Jun":
                monthName = "June";
                break;
            case "Jul":
                monthName = "July";
                break;
            case "Aug":
                monthName = "August";
                break;
            case "Sep":
                monthName = "September";
                break;
            case "Oct":
                monthName = "October";
                break;
            case "Nov":
                monthName = "November";
                break;
            case "Dec":
                monthName = "December";
                break;
        }
    }

    return monthName;
}

//Generate second row of the table. Use variable emptyCols to draw empty cells in depends when is the first day of the month. For example if the first day of the month is monday, then the value of the empyCols is 0. If the first day is tusday, then monday is empty so the value of the emptyCols is 1. If the first day is wednesday, then before this day there are two empty days - monday and tuesday, so the valye of emptyCols is 2 and so on...
function genCalSecondRow(
    table,
    month,
    year,
    todayDate,
    emptyCols,
    seasonTheme
) {
    const DAYS_COUNT = 7;
    let startDate = 1;
    let previousMont = new Date(year, month, 0) + " ";
    let previousMontDays = parseInt(previousMont.split(" ")[2]);
    let prevMontStart = previousMontDays + 1 - emptyCols;
    let secondRow = table.insertRow();

    for (let i = 0; i < DAYS_COUNT; i++) {
        if (i < emptyCols) {
            let newTd = secondRow.insertCell();
            newTd.innerHTML = `${prevMontStart}`;
            newTd.setAttribute('class', `${seasonTheme}Disabled`);
            // secondRow.innerHTML += `<td class="${seasonTheme}Disabled">${prevMontStart}</td>`;
            prevMontStart++;
        } else {
            if (todayDate == startDate) {
                let anotherTd = secondRow.insertCell();
                anotherTd.innerHTML = `${startDate}`;
                anotherTd.setAttribute('class', `${seasonTheme}Hightlight`)
                another.onclick = e => showDate(e);
                // secondRow.innerHTML += `<td id="${startDate}" class="hightlight">${startDate}</td>`;
                // secondRow.onclick = e => showDate(e);
            } else {
                let thirdCell = secondRow.insertCell();
                thirdCell.innerHTML = `${startDate}`;
                thirdCell.onclick = e => showDate(e);

                // secondRow.innerHTML += `<td id="${startDate}">${startDate}</td>`;
                // secondRow.onclick = e => showDate(e);
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

function genTableBody(
    dateNum,
    table,
    month,
    year,
    todayDate,
    emptyCols,
    seasonTheme
) {
    let currentDate = new Date(year, month + 1, 0) + " ";
    let countDays = parseInt(currentDate.split(" ")[2]);
    let currentMonthDays = countDays;
    let lastDayOfMonthName = currentDate.split(" ")[0];
    // alert(currentDate);
    let tr = "";
    let td = "";
    let pastTheMont = false;

    if (lastDayOfMonthName == "Mon" && countDays == 31) {
        countDays += 11;
    } else if (lastDayOfMonthName == "Mon" && countDays == 30) {
        countDays += 12;
    } else if (lastDayOfMonthName == "Tue" && countDays == 31) {
        countDays += 11;
    } else if (lastDayOfMonthName == "Tue" && countDays == 30) {
        countDays += 5;
    } else if (lastDayOfMonthName == "Wed" && countDays == 31) {
        countDays += 4;
    } else if (lastDayOfMonthName == "Wed" && countDays == 30) {
        countDays += 5;
    } else if (lastDayOfMonthName == "Thu" && countDays == 31) {
        countDays += 4;
    } else if (lastDayOfMonthName == "Thu" && countDays == 30) {
        countDays += 3;
    }

    // alert(countDays);
    // switch (lastDayOfMonthName) {
    //     case 'Mon':
    //         countDays += 11;
    //         break;
    //     case 'Tue':
    //         countDays += 11;
    //         break;
    //     case 'Thu':
    //         countDays += 4;
    //         break;
    // }

    for (let i = 0; i < countDays; i++) {
        if (i % 7 == 0) {
            tr = table.insertRow();
        }
        if (dateNum > currentMonthDays || dateNum > 31) {
            dateNum = 1;
            pastTheMont = true;
        }

        // td = tr.insertCell();

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
            let todayCell = tr.insertCell();
            todayCell.innerHTML = `${dateNum}`;
            todayCell.setAttribute(`class`, `${seasonTheme}Hightlight`);
            todayCell.onclick = e => showDate(e);
        } else {
            let todayCell = tr.insertCell();
            todayCell.innerHTML = `${dateNum}`;
            if (pastTheMont) {
                // let disabledDatesCell = tr.insertCell();
                todayCell.innerHTML = `${dateNum}`;
                todayCell.setAttribute(`class`, `day${dateNum} ${seasonTheme}Disabled`);
            } else {
                todayCell.onclick = e => showDate(e);
                todayCell.setAttribute(`class`, `day${dateNum}`);
            }
        }

        dateNum++;
    }
}

function showDate(e) {
    console.log(e.target.innerHTML);
    // alert(num);
}

genTableBody(dateNum, table, month, year, todayDate, emptyCols, seasonTheme);