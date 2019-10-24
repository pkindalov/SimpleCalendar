const LANGUAGE = "bg";
var that = this;
that.simpleCalendarContainer = document.getElementById("simpleCalendarContainer");
// that.simpleCalendarContainer.onkeypress = moveBack(event);
that.monthGlobal = new Date().getMonth();
that.year = new Date().getFullYear();
// that.prevNextButtonsYear = that.year;
// that.seasonTheme = getSeasonTheme(that.monthGlobal + 1);
let calendarTopRow = genCalTopRow(LANGUAGE);
simpleCalendarContainer.innerHTML += calendarTopRow;
that.simpleCalendarTable = document.getElementById("simpleCalendar");
that.todayDate = new Date().getDate();
that.listOfYearsContainer = document.getElementById('listOfYears');
that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
that.monthBgNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
let dayName = getDayName(that.firstDayOfMonth.split(" ")[0]);
that.emptyCols = calcEmptyCols(dayName);
let dateNum = genCalSecondRow();

//give a class name of the calendar theme according to the current season
function getSeasonTheme() {
    let theme = "january";
    let month = that.monthGlobal == -1 ? 11 : that.monthGlobal;
    // that.monthGlobal = that.monthGlobal > 12 ? 0 : that.monthGlobal;
    // alert(that.monthGlobal);
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
    // that.seasonTheme = getSeasonTheme();
    if (that.monthGlobal < 0) {
        that.monthGlobal = 11;
        // that.year = parseInt(new Date().getFullYear()) - 1;
        that.year--;
        // that.prevNextButtonsYear--;
    }

    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    let dateNum = genCalSecondRow(that.monthGlobal);

    // console.log("Prev: " + that.monthGlobal);
    genTableBody(dateNum);
    // let yearsOptions = document.getElementById("listOfYears");
    // yearsOptions.children[0].value = that.year;
    // yearsOptions.children[0].innerText = that.year;
    // genYearsOptions(that.year);
    // console.log(that.prevNextButtonsYear);
    // alert(dateNum);
}

function nextMonth() {

    var that = this;
    that.monthGlobal++;
    // that.seasonTheme = getSeasonTheme();
    if (that.monthGlobal > 11) {
        that.monthGlobal = 0;
        // that.year = parseInt(new Date().getFullYear()) - 1;
        that.year++;
    }
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    let dateNum = genCalSecondRow(that.monthGlobal);

    // console.log("Next: " + that.monthGlobal);
    genTableBody(dateNum);
    // let yearsOptions = document.getElementById("listOfYears");
    // yearsOptions.children[0].value = that.year;
    // yearsOptions.children[0].innerText = that.year;
    // genYearsOptions(that.year);

    // var that = this;
    // that.monthGlobal = that.monthGlobal + 1;
    // let seasonTheme = getSeasonTheme();
    // let topRow = genCalTopRow(seasonTheme, LANGUAGE);
    // let simpleCalendarContainer = document.getElementById("simpleCalendarsimpleCalendarContainer");
    // simpleCalendarContainer.innerHTML = "";
    // simpleCalendarContainer.innerHTML += topRow;
    // let table = document.getElementById("simpleCalendar");
    // let dateNum = genCalSecondRow(table, that.monthGlobal);

    // genTableBody(dateNum, table, todayDate, seasonTheme);

}

function nextYear() {
    that.year++;
    // that.prevNextButtonsYear = parseInt(document.getElementById("listOfYears").value);
    // that.prevNextButtonsYear++;

    // that.seasonTheme = getSeasonTheme();
    if (that.monthGlobal > 11) {
        that.monthGlobal = 0;
        // that.year = parseInt(new Date().getFullYear()) - 1;
        that.year++;
    }
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    let dateNum = genCalSecondRow(that.monthGlobal);

    // console.log("Next: " + that.monthGlobal);
    genTableBody(dateNum);
    // let yearsOptions = document.getElementById("listOfYears");
    // yearsOptions.children[0].value = that.year;
    // yearsOptions.children[0].innerText = that.year;
    // genYearsOptions(that.year);


}

function prevYear() {
    that.year--;
    // that.prevNextButtonsYear = parseInt(document.getElementById("listOfYears").value);
    // that.prevNextButtonsYear--;

    // document.getElementById("listOfYears").value = that.prevNextButtonsYear;

    // for (let i = 0; i < yearsOptions.children.length; i++) {
    //     console.log(yearsOptions.children[i].value);
    //     if (parseInt(yearsOptions.children[i].value) == that.prevNextButtonsYear) {
    //         yearsOptions.children[i].setAttribute("selected", "selected");
    //         console.log(yearsOptions.children[i]);
    //     }
    // }
    //     for (let i = 0; i < yearsOptions.length; i++) {
    //         if (parseInt(yearsOptions[i].value) == that.prevNextButtonsYear) {
    //             yearsOptions[yearsOptions[i].selectedIndex].selected = true;

    // // country.options[country.options.selectedIndex].selected = true;
    //             yearsOptions.value = that.prevNextButtonsYear;

    //             break;
    //         }
    //         // console.log(typeof yearsOptions[i].value);
    //     }

    // console.log(that.prevNextButtonsYear);
    // alert(typeof startYear);

    // that.seasonTheme = getSeasonTheme();
    if (that.monthGlobal > 11) {
        that.monthGlobal = 0;
        // that.year = parseInt(new Date().getFullYear()) - 1;
        that.year++;
    }
    that.firstDayOfMonth = new Date(that.year, that.monthGlobal).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    let dateNum = genCalSecondRow(that.monthGlobal);

    // console.log("Next: " + that.monthGlobal);
    genTableBody(dateNum);
    // let yearsOptions = document.getElementById("listOfYears");
    // yearsOptions.children[0].value = that.year;
    // yearsOptions.children[0].innerText = that.year;
    // genYearsOptions(that.year);
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

function chooseYear() {
    // let select = document.createElement('select');
    // select.setAttribute('id', "listOfYears");

    // genYearsOptions(that.year);

    // let selYear = document.getElementById("listOfYears").value;
    // document.getElementById("listOfYears").onchange = function (e) {
    //     selYear = parseInt(this.value);

    //     //TO DRAW UPDATED MONTH HERE
    //     // that.seasonTheme = getSeasonTheme();

    //     that.firstDayOfMonth = new Date(selYear, that.monthGlobal).toString();
    //     that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    //     let topRow = genCalTopRow(LANGUAGE);
    //     that.simpleCalendarContainer.innerHTML = "";
    //     that.simpleCalendarContainer.innerHTML += topRow;
    //     let dateNum = genCalSecondRow(that.monthGlobal);

    //     // console.log("Next: " + that.monthGlobal);
    //     genTableBody(dateNum);

    //     let yearsOptions = document.getElementById("listOfYears");
    //     yearsOptions.children[0].value = selYear;
    //     yearsOptions.children[0].innerText = selYear;
    //     that.prevNextButtonsYear = selYear;
    // }

    // console.log(that.prevNextButtonsYear);
    // that.simpleCalendarContainer.appendChild(select);
}

function moveBack(event) {
    console.log(event);
}

//functions about generating calendar
//Following function generate first row of the table with the name of the days
function genCalTopRow(LANGUAGE) {
    let monthName = getCurrentMonthName(LANGUAGE);

    switch (LANGUAGE) {
        case "bg":
            return `<table class=${that.seasonTheme} id="simpleCalendar">
              <tr>
                <th colspan="7">
                    <button class="${that.seasonTheme} arrow" onclick="prevMonth(LANGUAGE);">&lt;</button>
                        <div class="monthName">
                            <a href="#" onclick="showMonths();">${monthName}</a> 
                            <a href="#" onclick="showYears();">${that.year}</a>
                        </div>
                    <button class="${that.seasonTheme} arrow" onclick="nextMonth(LANGUAGE);">&gt;</button>
                </th>
                </tr>  
            
              <tr id="weekDaysRow">
                <th class="weekDays id="Mon">Пон.</th>
                <th class="weekDays id="Tue">Вто.</th>
                <th class="weekDays id="Wed">Сря.</th>
                <th class="weekDays id="Thu">Чет.</th>
                <th class="weekDays id="Fri">Пет.</th>
                <th class="weekDays id="Sat">Съб.</th>
                <th class="weekDays id="Sun">Нед.</th>
              </tr>
            </table>  
            `;
            break;
        case "en":
            return `<table class=${that.seasonTheme} id="simpleCalendar">
                        <tr>
                            <th colspan="7">
                            <button class="${that.seasonTheme}" onclick="prevMonth(LANGUAGE);" style="color: orange">&lt;</button><div class="monthName">${monthName}</div>
                            <button class="${that.seasonTheme}" onclick="nextMonth(LANGUAGE);" style="color: orange">&gt;</button></th>
                        </tr>  
                        <tr>
                            <th colspan="7">
                                <button class="${that.seasonTheme}" id="prevYear"  onclick="prevYear()">&lt;</button>
                                <select id="listOfYears" onclick="chooseYear()">
                                <option value="${that.year}">${that.prevNextButtonsYear}</option>
                                </select>
                                <button class="${that.seasonTheme}" id="nextYear"   onclick="nextYear()">&gt;</button>
                            </th> 
                        </tr> 
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

// function getMonthShortName() {
//     switch (that.monthGlobal) {

//     }
// }

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
                genSec
                monthNagenSec
                break;
            case "Nov":
                genSec
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
            // secondRow.innerHTML += `<td class="${seasonTheme}Disabled">${prevMontStart}</td>`;
            prevMontStart++;
        } else {
            if (that.todayDate == startDate) {
                let anotherTd = that.simpleCalendarTable.insertCell();
                anotherTd.innerHTML = `${startDate}`;
                anotherTd.setAttribute("class", `${that.seasonTheme}Hightlight highlight`);
                anotherTd.onclick = e => showDate(e);
                // secondRow.innerHTML += `<td id="${startDate}" class="hightlight">${startDate}</td>`;
                // secondRow.onclick = e => showDate(e);
            } else {
                let thirdCell = that.simpleCalendarTable.insertCell();
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

function genTableBody(dateNum) {
    let currentDate = new Date(that.year, that.monthGlobal + 1, 0) + " ";
    let countDays = parseInt(currentDate.split(" ")[2]);
    let currentMonthDays = countDays;
    let lastDayOfMonthName = currentDate.split(" ")[0];
    that.simpleCalendarTable = document.getElementById("simpleCalendar");


    // alert(currentDate);
    let tr = "";
    let td = "";
    let pastTheMont = false;

    //Show 2 weeks after the last day of the current month.     
    if (lastDayOfMonthName == "Mon" && countDays == 31) {
        countDays += 13;
    } else if (lastDayOfMonthName == "Mon" && countDays == 30) {
        countDays += 13;
    } else if (lastDayOfMonthName == "Tue" && countDays == 30) {
        countDays += 12;
    } else if (lastDayOfMonthName == "Tue" && countDays == 31) {
        countDays += 12;
    } else if (lastDayOfMonthName == "Wed" && countDays == 30) {
        countDays += 11;
    } else if (lastDayOfMonthName == "Wed" && countDays == 31) {
        countDays += 11;
    } else if (lastDayOfMonthName == "Thu" && countDays == 30) {
        countDays += 10;
    } else if (lastDayOfMonthName == "Thu" && countDays == 31) {
        countDays += 10;
    } else if (lastDayOfMonthName == "Fri" && countDays == 30) {
        countDays += 16;
    } else if (lastDayOfMonthName == "Fri" && countDays == 31) {
        countDays += 16;
    } else if (lastDayOfMonthName == "Sat" && countDays == 30) {
        countDays += 15;
    } else if (lastDayOfMonthName == "Sat" && countDays == 31) {
        countDays += 15;
    } else if (lastDayOfMonthName == "Sun" && countDays == 30) {
        countDays += 14;
    } else if (lastDayOfMonthName == "Sun" && countDays == 31) {
        countDays += 14;
    }


    // if (lastDayOfMonthName == "Mon" && countDays == 31) {
    //     countDays += 11;
    // } else if (lastDayOfMonthName == "Mon" && countDays == 30) {
    //     countDays += 12;
    // } else if (lastDayOfMonthName == "Tue" && countDays == 31) {
    //     countDays += 11;
    // } else if (lastDayOfMonthName == "Tue" && countDays == 30) {
    //     countDays += 5;
    // } else if (lastDayOfMonthName == "Wed" && countDays == 31) {
    //     countDays += 4;
    // } else if (lastDayOfMonthName == "Wed" && countDays == 30) {
    //     countDays += 5;
    // } else if (lastDayOfMonthName == "Thu" && countDays == 31) {
    //     countDays += 4;
    // } else if (lastDayOfMonthName == "Thu" && countDays == 30) {
    //     countDays += 5;
    // } else if (lastDayOfMonthName == "Fri" && countDays == 31) {
    //     countDays += 4;
    // } else if (lastDayOfMonthName == "Fri" && countDays == 30) {
    //     countDays += 5;
    // } else if (lastDayOfMonthName == "Sat" && countDays == 31) {
    //     countDays += 4;
    // } else if (lastDayOfMonthName == "Sat" && countDays == 30) {
    //     countDays += 5;
    // } else if (lastDayOfMonthName == "Sun" && countDays == 31) {
    //     countDays += 11;
    // } else if (lastDayOfMonthName == "Sun" && countDays == 30) {
    //     countDays += 12;
    // }

    //separate check for february
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ДА ГИ ПРОВЕРЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!g
    if (that.monthGlobal == 1 && lastDayOfMonthName == "Mon" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Mon" && countDays == 29) {
        countDays += 6;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Tue" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Tue" && countDays == 29) {
        countDays += 6;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Wed" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Wed" && countDays == 29) {
        countDays += 6;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Thu" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Thu" && countDays == 29) {
        countDays += 6;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Fri" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Fri" && countDays == 29) {
        countDays += 6;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sat" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sat" && countDays == 29) {
        countDays += 8;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sun" && countDays == 28) {
        countDays += 7;
    } else if (that.monthGlobal == 1 && lastDayOfMonthName == "Sun" && countDays == 29) {
        countDays += 13;
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

    for (let i = 0; i < countDays - (7 - emptyCols); i++) {
        if (i % 7 == 0) {
            tr = that.simpleCalendarTable.insertRow();
            tr.setAttribute('class', 'tableBodyCell');
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

        if (dateNum == that.todayDate) {
            let todayCell = tr.insertCell();
            todayCell.innerHTML = `${dateNum}`;
            todayCell.setAttribute(`class`, `highlight`);
            todayCell.onclick = e => showDate(e);
        } else {
            let todayCell = tr.insertCell();
            todayCell.innerHTML = `${dateNum}`;
            if (pastTheMont) {
                // let disabledDatesCell = tr.insertCell();
                todayCell.innerHTML = `${dateNum}`;
                todayCell.setAttribute(`class`, `day${dateNum} ${that.seasonTheme}Disabled disabled`);
                todayCell.onclick = e => showDisabledDateNext(e);
            } else {
                todayCell.onclick = e => showDate(e);
                todayCell.setAttribute(`class`, `day${dateNum}`);
            }
        }

        dateNum++;
    }
}


function showDate(e) {
    let dateStr = that.year + '-' + (that.monthGlobal + 1) + '-' + e.target.innerHTML;
    let date = new Date(dateStr);
    console.log(dateStr);
    console.log(date);
}

function showDisabledDateNext(e) {
    let dateStr = that.year + '-' + (that.monthGlobal + 2) + '-' + e.target.innerHTML;
    let date = new Date(dateStr);
    console.log(dateStr);
    console.log(date);
}

function showDisabledDatePrev(e) {
    let dateStr = that.year + '-' + (that.monthGlobal) + '-' + e.target.innerHTML;
    let date = new Date(dateStr);
    console.log(dateStr);
    console.log(date);
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
    // alert(e.target.innerHTML);
    let index = that.monthBgNames.indexOf(e.target.innerHTML);
    if (index < 0) {
        alert('Няма такъв месец');
    }

    that.monthGlobal = index;

    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    let dateNum = genCalSecondRow(that.monthGlobal);

    // console.log("Prev: " + that.monthGlobal);
    genTableBody(dateNum);
}

function changeYear(e) {
    that.year = parseInt(e.target.innerHTML);

    that.firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    that.emptyCols = calcEmptyCols(that.firstDayOfMonth.split(" ")[0]);
    let topRow = genCalTopRow(LANGUAGE);
    that.simpleCalendarContainer.innerHTML = "";
    that.simpleCalendarContainer.innerHTML += topRow;
    let dateNum = genCalSecondRow(that.monthGlobal);

    // console.log("Prev: " + that.monthGlobal);
    genTableBody(dateNum);
}

function appendYears(table) {
    let tr = '';
    let td = '';
    let yearsBack = that.year - 21;

    for (let m = 0; m < 21; m++) {
        if (m % 7 == 0) {
            tr = table.insertRow();
        }

        td = tr.insertCell();
        td.innerHTML = `${yearsBack++}`;
        td.onclick = (e) => changeYear(e);
    }

    for (let m = 0; m < 21; m++) {
        if (m % 7 == 0) {
            tr = table.insertRow();
        }

        td = tr.insertCell();
        td.innerHTML = `${that.year++}`;
        td.onclick = (e) => changeYear(e);
    }

}

function appendMonths(table) {
    // let table = document.getElementById("simpleCalendar");
    let tr = '';
    let td = '';

    for (let m = 0; m < that.monthBgNames.length; m++) {
        if (m % 7 == 0) {
            tr = table.insertRow();
        }

        td = tr.insertCell();
        td.innerHTML = `${that.monthBgNames[m]}`;
        td.onclick = (e) => changeMonth(e);
    }
}


function showMonths() {
    let table = document.getElementById("simpleCalendar");
    let weekDaysRow = document.getElementById('weekDaysRow');
    let secondRow = document.getElementById('secondRow');
    // let currentRow = '';

    // for (let r = 0; r < table.rows.length; r++) {
    //     currentRow = table.rows[r];
    //     if (currentRow.id && currentRow.id == 'secondRow') {
    //         table.deleteRow(r);
    //     }

    //     if (currentRow.className && currentRow.className == 'tableBodyCell') {
    //         table.deleteRow(r);
    //     }
    // }

    // console.log(table.rows.length);
    let tableBodyRows = document.getElementsByClassName('tableBodyCell');

    // console.log(tableBodyRows);
    if (secondRow) {
        secondRow.parentNode.removeChild(secondRow);
    }

    if (weekDaysRow) {
        weekDaysRow.parentNode.removeChild(weekDaysRow);
    }


    removeTableRows(0, table.rows.length, table);
    appendMonths(table);


    // for (let r = 0; r < tableBodyRows.length; r++) {
    //     tableBodyRows[r].remove();
    //     // tableBodyRows[r].parentNode.removeChild(tableBodyRows[r]);
    // }

    // tableBodyRows.parentNode.removeChild(tableBodyRows);
    // that.simpleCalendarTable.deleteRow(secondRow);
    // that.simpleCalendarTable = that.simpleCalendarTable.deleteRow(tableBody);

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

genTableBody(dateNum);