var that = this;
const LANGUAGE = "bg";
that.simpleCalendarContainer = document.getElementById("simpleCalendarContainer");
that.monthGlobal = new Date().getMonth();
that.year = new Date().getFullYear();
that.simpleCalendarTable = document.getElementById("simpleCalendar");
that.todayDate = new Date().getDate();
that.listOfYearsContainer = document.getElementById('listOfYears');
that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
that.monthBgNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
that.monthEnNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
that.currentMonthDays = new Date(that.year, that.monthGlobal + 1, 0).getDate();
that.selectedDay = 0;
let dayName = getDayName(that.firstDayOfMonth.split(" ")[0]);
that.emptyCols = calcEmptyCols(dayName);

let calendarTopRow = genCalTopRow(LANGUAGE);
simpleCalendarContainer.innerHTML += calendarTopRow;
that.dateNum = genCalSecondRow();
genTableBody();

document.getElementById("simpleCalendar").addEventListener("keydown", arrowsMove);

//give a class name of the calendar theme according to the current season
function getSeasonTheme() {
    let theme = "january";
    let month = that.monthGlobal == -1 ? 11 : that.monthGlobal;

    switch (month + 1) {
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

function prevMonth() {
    var that = this;
    that.monthGlobal--;
    if (that.monthGlobal < 0) {
        that.monthGlobal = 11;
        that.year--;
    }

    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
    document.getElementById("simpleCalendar").addEventListener("keydown", arrowsMove);
    document.getElementById("simpleCalendar").focus();
}

function nextMonth() {
    var that = this;
    that.monthGlobal++;
    if (that.monthGlobal > 11) {
        that.monthGlobal = 0;
        that.year++;
    }
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
    document.getElementById("simpleCalendar").addEventListener("keydown", arrowsMove);
    document.getElementById("simpleCalendar").focus();
}

function nextYear() {
    that.year++;
    if (that.monthGlobal > 11) {
        that.monthGlobal = 0;
        that.year++;
    }
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
}

function prevYear() {
    that.year--;
    if (that.monthGlobal > 11) {
        that.monthGlobal = 0;
        that.year++;
    }
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
}

// function genYearsOptions(years) {
//     let listOfYears = years;
//     let option = '';
//     for (let i = 0; i < 50; i++) {
//         listOfYears--;
//         option = document.createElement('option');
//         option.text = listOfYears;
//         option.value = listOfYears;
//         that.listOfYearsContainer = document.getElementById('listOfYears');
//         that.listOfYearsContainer.appendChild(option);
//     }

// }

function arrowsMove(e) {
    switch (e.keyCode) {
        case 39:
            nextMonth();
            break;
        case 38:
            showMonths();
            break;
        case 37:
            prevMonth();
            break;
        case 40:
            break;
        case 68:
            showDates();
            break;
        case 77:
            showMonths();
            break;
        case 89:
            showYears();
            break;
    }
}



//functions about generating calendar
//Following function generate first row of the table with the name of the days
function genCalTopRow(LANGUAGE) {
    let monthName = getCurrentMonthName(LANGUAGE);
    switch (LANGUAGE) {
        case "bg":
            return `<table tabindex="0" id="simpleCalendar">
              <tr>
                <th colspan="7">
                    <button  arrow" onclick="prevMonth(LANGUAGE);">&lt;</button>
                        <div class="monthName">
                            <a href="#" onclick="showDates();">${that.todayDate}</a> 
                            <a href="#" onclick="showMonths();">${monthName}</a> 
                            <a href="#" onclick="showYears();">${that.year}</a>
                        </div>
                    <button arrow" onclick="nextMonth(LANGUAGE);">&gt;</button>
                </th>
                </tr>  
            
              <tr id="weekDaysRow">
                <th class="weekDays" id="Mon">Пон.</th>
                <th class="weekDays" id="Tue">Вто.</th>
                <th class="weekDays" id="Wed">Сря.</th>
                <th class="weekDays" id="Thu">Чет.</th>
                <th class="weekDays" id="Fri">Пет.</th>
                <th class="weekDays" id="Sat">Съб.</th>
                <th class="weekDays" id="Sun">Нед.</th>
              </tr>
            </table>  
            `;
            break;
        case "en":
            return `<table id="simpleCalendar">
            <tr>
              <th colspan="7">
                  <button  arrow" onclick="prevMonth(LANGUAGE);">&lt;</button>
                      <div class="monthName">
                          <a href="#" onclick="showDates();">${that.todayDate}</a> 
                          <a href="#" onclick="showMonths();">${monthName}</a> 
                          <a href="#" onclick="showYears();">${that.year}</a>
                      </div>
                  <button arrow" onclick="nextMonth(LANGUAGE);">&gt;</button>
              </th>
              </tr>  
          
            <tr id="weekDaysRow">
                <th class="weekDays" id="Mon">MON.</th>
                <th class="weekDays" id="Tue">TUE.</th>
                <th class="weekDays" id="Wed">WED.</th>
                <th class="weekDays" id="Thu">THU.</th>
                <th class="weekDays" id="Fri">FRI.</th>
                <th class="weekDays" id="Sat">SAT.</th>
                <th class="weekDays" id="Sun">SUN.</th>
            </tr>
          </table>  
                `;
            break;
    }
}

function getCurrentMonthName(LANGUAGE) {
    let currentDate = new Date(that.year, that.monthGlobal + 1, 0) + " ";
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
function genCalSecondRow() {
    const DAYS_COUNT = 7;
    let startDate = 1;
    let previousMont = new Date(that.year, that.monthGlobal, 0) + " ";
    let previousMontDays = parseInt(previousMont.split(" ")[2]);
    let prevMontStart = previousMontDays + 1 - that.emptyCols;
    that.simpleCalendarTable = document.getElementById("simpleCalendar");
    that.simpleCalendarTable = that.simpleCalendarTable.insertRow();
    that.simpleCalendarTable.setAttribute('id', 'secondRow');

    for (let i = 0; i < DAYS_COUNT; i++) {
        if (i < that.emptyCols) {
            let newTd = that.simpleCalendarTable.insertCell();
            newTd.innerHTML = `${prevMontStart}`;
            newTd.setAttribute("class", `${that.seasonTheme}Disabled disabled`);
            newTd.onclick = e => showDisabledDatePrev(e);
            prevMontStart++;
        } else {
            if (that.todayDate == startDate) {
                let anotherTd = that.simpleCalendarTable.insertCell();
                anotherTd.innerHTML = `${startDate}`;
                anotherTd.setAttribute("class", `${that.seasonTheme}Hightlight highlight`);
                anotherTd.onclick = e => showDate(e);
            } else {
                let thirdCell = that.simpleCalendarTable.insertCell();
                thirdCell.innerHTML = `${startDate}`;
                if (i == DAYS_COUNT - 2 || i == DAYS_COUNT - 1) {
                    thirdCell.setAttribute('class', 'saturdaySunday');
                }
                thirdCell.onclick = e => showDate(e);
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

function genTableBody() {
    let currentDate = new Date(that.year, that.monthGlobal + 1, 0) + " ";
    let countDays = parseInt(currentDate.split(" ")[2]);
    let currentMonthDays = countDays;
    let lastDayOfMonthName = currentDate.split(" ")[0];
    that.simpleCalendarTable = document.getElementById("simpleCalendar");
    let tr = "";
    let td = "";
    let pastTheMont = false;

    // Show 2 weeks after the last day of the current month.
    if (lastDayOfMonthName == "Mon" && countDays == 31) {
        countDays += 13;
    } else if (lastDayOfMonthName == "Mon" && countDays == 30) {
        countDays += 13;
    } else if (lastDayOfMonthName == "Tue" && countDays == 30) {
        countDays += 12;
    } else if (lastDayOfMonthName == "Tue" && countDays == 31) {
        countDays += 5;
    } else if (lastDayOfMonthName == "Wed" && countDays == 30) {
        countDays += 11;
    } else if (lastDayOfMonthName == "Wed" && countDays == 31) {
        countDays += 11;
    } else if (lastDayOfMonthName == "Thu" && countDays == 30) {
        countDays += 10;
    } else if (lastDayOfMonthName == "Thu" && countDays == 31) {
        countDays += 10;
    } else if (lastDayOfMonthName == "Fri" && countDays == 30) {
        countDays += 9;
    } else if (lastDayOfMonthName == "Fri" && countDays == 31) {
        countDays += 9;
    } else if (lastDayOfMonthName == "Sat" && countDays == 30) {
        countDays += 8;
    } else if (lastDayOfMonthName == "Sat" && countDays == 31) {
        countDays += 8;
    } else if (lastDayOfMonthName == "Sun" && countDays == 30) {
        countDays += 14;
    } else if (lastDayOfMonthName == "Sun" && countDays == 31) {
        countDays += 14;
    }

    //separate check for february
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ДА ГИ ПРОВЕРЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!g
    if (that.monthGlobal == 1 && lastDayOfMonthName == "Mon" && countDays == 28) {
        countDays += 13;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Mon" && countDays == 29) {
        countDays += 13;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Tue" && countDays == 28) {
        countDays += 12;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Tue" && countDays == 29) {
        countDays += 12;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Wed" && countDays == 28) {
        countDays += 11;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Wed" && countDays == 29) {
        countDays += 11;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Thu" && countDays == 28) {
        countDays += 10;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Thu" && countDays == 29) {
        countDays += 10;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Fri" && countDays == 28) {
        countDays += 9;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Fri" && countDays == 29) {
        countDays += 9;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sat" && countDays == 28) {
        countDays += 8;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sat" && countDays == 29) {
        countDays += 8;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sun" && countDays == 28) {
        countDays += 14;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sun" && countDays == 29) {
        countDays += 14;
    }

    let rows = countDays - (7 - emptyCols);
    let rowsCounter = 6;

    for (let i = 0; i < rows; i++) {
        if (rowsCounter < 0) break;
        if (i % 7 == 0) {
            rowsCounter--;
            if (rowsCounter != 0) {
                tr = that.simpleCalendarTable.insertRow();
                tr.setAttribute('class', 'tableBodyCell');
            } else {
                break;
            }
        }
        if (that.dateNum > currentMonthDays || that.dateNum > 31) {
            that.dateNum = 1;
            pastTheMont = true;
        }

        if (that.dateNum == that.todayDate) {
            let todayCell = tr.insertCell();
            todayCell.innerHTML = `${that.dateNum}`;

            if (!pastTheMont) {
                todayCell.setAttribute(`class`, `highlight`);
            } else {
                todayCell.setAttribute(`class`, `disabled`);
            }

            todayCell.onclick = e => showDate(e);
        } else {
            let todayCell = tr.insertCell();
            todayCell.innerHTML = `${that.dateNum}`;

            if (pastTheMont) {
                todayCell.innerHTML = `${that.dateNum}`;
                todayCell.setAttribute(`class`, `day${that.dateNum} disabled`);
                todayCell.onclick = e => showDisabledDateNext(e);
            } else {
                todayCell.onclick = e => showDate(e);
                todayCell.setAttribute(`class`, `day${that.dateNum}`);
            }
        }
        that.dateNum++;
    }

    document.getElementById("simpleCalendar").addEventListener("keydown", arrowsMove);
    document.getElementById("simpleCalendar").focus();
}

function showDate(e) {
    let dateStr = that.year + '-' + (that.monthGlobal + 1) + '-' + e.target.innerHTML;
    let date = new Date(dateStr);
}

function showDisabledDateNext(e) {
    let dateStr = that.year + '-' + (that.monthGlobal + 2) + '-' + e.target.innerHTML;
    let date = new Date(dateStr);
}

function showDisabledDatePrev(e) {
    let dateStr = that.year + '-' + (that.monthGlobal) + '-' + e.target.innerHTML;
    let date = new Date(dateStr);
}

//recursively remove table rows
function removeTableRows(rowIndex, length, table) {
    if (rowIndex >= length) return;
    if (table.rows[rowIndex].className == "tableBodyCell") {
        table.deleteRow(rowIndex);
        rowIndex--;
    }
    removeTableRows(rowIndex + 1, table.rows.length, table);
}

function changeMonth(e) {
    let index = '';
    switch (LANGUAGE) {
        case 'bg':
            index = that.monthBgNames.indexOf(e.target.innerHTML);
            break;
        case 'en':
            index = that.monthEnNames.indexOf(e.target.innerHTML);
            break;
    }
    if (index < 0) {
        alert('No such month');
    }

    that.monthGlobal = index;
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
}

function changeYear(e) {
    that.year = parseInt(e.target.innerHTML);
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
}

function showMorePrevDates() {
    let startElementValue = parseInt(document.getElementById('cell0').innerText);
    startElementValue--;
    for (let d = 0; d < 20; d++) {
        document.getElementById(`cell${d}`).innerText = startElementValue;
        startElementValue--;
    }
}

function showMoreNextDates() {
    let startElementValue = parseInt(document.getElementById('cell20').innerText);
    startElementValue++;
    for (let d = 20; d < 40; d++) {
        document.getElementById(`cell${d}`).innerText = startElementValue;
        startElementValue++;
    }
}

function appendYears(table) {
    table.innerHTML = '';
    let tr = '';
    let td = '';
    let yearsBack = that.year - 20;
    let bottomTdsId = 20;

    for (let m = 0; m < 20; m++) {
        if (m == 0) {
            tr = table.insertRow();

            switch (LANGUAGE) {
                case 'bg':
                    tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">ЗАТВОРИ</a>
                    </td>`;
                    break;
                case 'en':
                    tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">CLOSE</a>
                    </td>`;
                    break;
            }
        }

        if (m % 5 == 0) {
            tr = table.insertRow();
        }

        td = tr.insertCell();
        td.innerHTML = `${yearsBack++}`;
        td.setAttribute('id', `cell${m}`);
        td.onclick = (e) => changeYear(e);
    }

    for (let m = 0; m < 21; m++) {
        if (m % 5 == 0) {
            tr = table.insertRow();
        }

        if (m == 20) {
            tr.innerHTML = `<td class="closeBtn" colspan="5">
                                <a href="#" onclick="showMorePrevDates();">&lt;</a>
                                <a href="#" onclick="showMoreNextDates();">&gt;</a>
                             </td>`;
        }

        if (m < 20) {

            td = tr.insertCell();
            if (yearsBack == that.year) {
                td.setAttribute('class', 'highlight');
                td.setAttribute('id', `cell${bottomTdsId}`);
            }
            // console.log(yearsBack);
            td.innerHTML = `${yearsBack++}`;
            td.setAttribute('id', `cell${bottomTdsId}`);
            td.onclick = (e) => changeYear(e);
        }
        bottomTdsId++;
    }
}

function appendMonths(table) {
    table.innerHTML = '';
    // let table = document.getElementById("simpleCalendar");
    let tr = '';
    let td = '';

    for (let m = 0; m < that.monthBgNames.length; m++) {
        if (m == 0) {
            tr = table.insertRow();
            switch (LANGUAGE) {
                case 'bg':
                    tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">ЗАТВОРИ</a>
                    </td>`;
                    break;
                case 'en':
                    tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">CLOSE</a>
                    </td>`;
                    break;
            }
        }

        if (m % 3 == 0) {
            tr = table.insertRow();
        }

        td = tr.insertCell();
        switch (LANGUAGE) {
            case 'bg':
                td.innerHTML = `${that.monthBgNames[m]}`;
                break;
            case 'en':
                td.innerHTML = `${that.monthEnNames[m]}`;
                break;

        }
        td.onclick = (e) => changeMonth(e);
        if (m == that.monthGlobal) {
            td.setAttribute('class', 'highlight');
        }
    }
}

function changeDate(e) {
    that.todayDate = parseInt(e.target.innerHTML);
    that.selectedDay = that.todayDate;
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
}

function appendDates(table) {
    const MAX_MONTH_DAYS = 31;
    table.innerHTML = '';
    // let table = document.getElementById("simpleCalendar");
    let tr = '';
    let td = '';

    for (let m = 1; m <= MAX_MONTH_DAYS; m++) {
        if (m == 1) {
            tr = table.insertRow();
            switch (LANGUAGE) {
                case 'bg':
                    tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">ЗАТВОРИ</a>
                    </td>`;
                    break;
                case 'en':
                    tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">CLOSE</a>
                    </td>`;
                    break;

            }
        }
        if ((m - 1) % 5 == 0) {
            tr = table.insertRow();
        }
        td = tr.insertCell();
        td.innerHTML = `${m}`;
        td.onclick = (e) => changeDate(e);
        if (m == that.todayDate) {
            td.setAttribute('class', 'highlight');
        }
    }
}

function closeMe() {
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    that.dateNum = genCalSecondRow(that.monthGlobal);
    genTableBody();
}


function showMonths() {
    let table = document.getElementById("simpleCalendar");
    let weekDaysRow = document.getElementById('weekDaysRow');
    let secondRow = document.getElementById('secondRow');
    let tableBodyRows = document.getElementsByClassName('tableBodyCell');
    if (secondRow) {
        secondRow.parentNode.removeChild(secondRow);
    }
    if (weekDaysRow) {
        weekDaysRow.parentNode.removeChild(weekDaysRow);
    }
    removeTableRows(0, table.rows.length, table);
    appendMonths(table);
}

function showYears() {
    let table = document.getElementById("simpleCalendar");
    let secondRow = document.getElementById('secondRow');
    let tableBodyRows = document.getElementsByClassName('tableBodyCell');
    let weekDaysRow = document.getElementById('weekDaysRow');

    if (secondRow) {
        secondRow.parentNode.removeChild(secondRow);
    }

    if (weekDaysRow) {
        weekDaysRow.parentNode.removeChild(weekDaysRow);
    }

    removeTableRows(0, table.rows.length, table);
    appendYears(table);
}


function showDates() {
    let table = document.getElementById("simpleCalendar");
    let secondRow = document.getElementById('secondRow');
    let tableBodyRows = document.getElementsByClassName('tableBodyCell');
    let weekDaysRow = document.getElementById('weekDaysRow');

    if (secondRow) {
        secondRow.parentNode.removeChild(secondRow);
    }

    if (weekDaysRow) {
        weekDaysRow.parentNode.removeChild(weekDaysRow);
    }

    removeTableRows(0, table.rows.length, table);
    appendDates(table);
}