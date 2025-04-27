"use strict";

//functions

//Helper function to return name of the day depends of the number.
const getDayName = function (dayNum) {
  let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let pos = weekDays.indexOf(dayNum);
  return weekDays[pos];
};

const getCalendarContainer = function (
  calendarContId = calendarContainerIdDefault
) {
  if (!calendarContId) throw new Error("Missing or invalid container id.");

  const container = document.getElementById(calendarContId);
  if (!container)
    throw new Error(`No element found with id "${calendarContId}"`);

  return container;
};

//Helper function to return how many empty cells must be available on the second row on the table depending when is the first day of the month. If the first day of the month is monday, then there is 0 empty cells. If first day is thursday for example, then there are 3 empty cell in the second row - monday, tuesday and wednesday must be empty.
const calcEmptyCols = function (dayName) {
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
};

const getCurrentMonthName = function (language) {
  let currentDate = new Date(year, monthGlobal + 1, 0) + " ";
  let monthName = currentDate.split(" ")[1];

  if (language == "bg") {
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
};

//Following function generate first row of the table with the name of the days
const genCalTopRow = function (language) {
  let monthName = getCurrentMonthName(language);
  switch (language) {
    case "bg":
      return `<table tabindex="0" id="${simpleCalendarTableId}">
              <tr>
                <th colspan="7">
                    <button  arrow" onclick="prevMonth();">&lt;</button>
                        <div class="monthName">
                            <a href="#" onclick="showDates();">${todayDate}</a> 
                            <a href="#" onclick="showMonths();">${monthName}</a> 
                            <a href="#" onclick="showYears();">${year}</a>
                        </div>
                    <button arrow" onclick="nextMonth();">&gt;</button>
                </th>
                </tr>  
            
              <tr id="${weekDaysRowId}">
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
      return `<table id="${simpleCalendarTableId}">
            <tr>
              <th colspan="7">
                  <button  arrow" onclick="prevMonth();">&lt;</button>
                      <div class="monthName">
                          <a href="#" onclick="showDates();">${todayDate}</a> 
                          <a href="#" onclick="showMonths();">${monthName}</a> 
                          <a href="#" onclick="showYears();">${year}</a>
                      </div>
                  <button arrow" onclick="nextMonth();">&gt;</button>
              </th>
              </tr>  
          
        <tr id="${weekDaysRowId}">
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
};

//Generate second row of the table. Use variable emptyCols to draw empty cells in depends when is the first day of the month. For example if the first day of the month is monday, then the value of the empyCols is 0. If the first day is tusday, then monday is empty so the value of the emptyCols is 1. If the first day is wednesday, then before this day there are two empty days - monday and tuesday, so the valye of emptyCols is 2 and so on...
const genCalSecondRow = function () {
  const DAYS_COUNT = 7;
  let startDate = 1;
  let previousMont = new Date(year, monthGlobal, 0) + " ";
  let previousMontDays = parseInt(previousMont.split(" ")[2]);
  let prevMontStart = previousMontDays + 1 - emptyCols;
  let counter = 1;
  let day = 0;
  simpleCalendarTable = document.getElementById(simpleCalendarTableId);
  simpleCalendarTable = simpleCalendarTable.insertRow();
  simpleCalendarTable.setAttribute("id", "secondRow");

  for (let i = 0; i < DAYS_COUNT; i++) {
    if (i < emptyCols) {
      let newTd = simpleCalendarTable.insertCell();
      newTd.innerHTML = `${prevMontStart}`;

      if (day == 5 || day == 6) {
        newTd.setAttribute("class", `saturdaySunday`);
      } else {
        newTd.setAttribute("class", `disabled`);
      }
      newTd.onclick = (e) => showDisabledDatePrev(e);
      prevMontStart++;
      day++;
    } else {
      if (todayDate == startDate) {
        let anotherTd = simpleCalendarTable.insertCell();
        anotherTd.innerHTML = `${startDate}`;
        anotherTd.setAttribute("class", `${seasonTheme}Hightlight highlight`);
        anotherTd.onclick = (e) => showDate(e);
      } else {
        if (userSelectedDay == startDate - counter + counter) {
          let userSelectedTd = simpleCalendarTable.insertCell();
          userSelectedTd.innerHTML = `${startDate}`;
          userSelectedTd.setAttribute("class", `userSelected`);
          userSelectedTd.onclick = (e) => showDate(e);
        } else {
          let thirdCell = simpleCalendarTable.insertCell();
          thirdCell.innerHTML = `${startDate}`;
          if (i == DAYS_COUNT - 2 || i == DAYS_COUNT - 1) {
            thirdCell.setAttribute("class", "saturdaySunday");
          }
          thirdCell.onclick = (e) => showDate(e);
        }
      }
      startDate++;
    }
  }
  return startDate;
};

const drawCalendarBody = function () {
  firstDayOfMonth = new Date(year, monthGlobal).toString();
  emptyCols = calcEmptyCols(firstDayOfMonth.split(" ")[0]);
  let topRow = genCalTopRow(language);
  simpleCalendarContainer.innerHTML = "";
  simpleCalendarContainer.innerHTML += topRow;
  dateNum = genCalSecondRow(monthGlobal);
  genTableBody(dateNum);
};

const nextMonth = function () {
  monthGlobal++;
  if (monthGlobal > 11) {
    monthGlobal = 0;
    year++;
  }
  drawCalendarBody();
};

//recursively remove table rows
const removeTableRows = function (rowIndex, length, table) {
  if (rowIndex >= length) return;
  if (table.rows[rowIndex].className == "tableBodyCell") {
    table.deleteRow(rowIndex);
    rowIndex--;
  }
  removeTableRows(rowIndex + 1, table.rows.length, table);
};

const changeMonth = function (e) {
  let index = "";
  switch (language) {
    case "bg":
      index = monthBgNames.indexOf(e.target.innerHTML);
      break;
    case "en":
      index = monthEnNames.indexOf(e.target.innerHTML);
      break;
    default:
      index = monthEnNames.indexOf(e.target.innerHTML);
      break;
  }
  if (index < 0) {
    alert("No such month");
  }

  monthGlobal = index;
  drawCalendarBody();
};

const appendMonths = function (table) {
  table.innerHTML = "";
  // let table = document.getElementById("simpleCalendar");
  let tr = "";
  let td = "";

  for (let m = 0; m < monthBgNames.length; m++) {
    if (m == 0) {
      tr = table.insertRow();
      switch (language) {
        case "bg":
          tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">ЗАТВОРИ</a>
                    </td>`;
          break;
        case "en":
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
    switch (language) {
      case "bg":
        td.innerHTML = `${monthBgNames[m]}`;
        break;
      case "en":
        td.innerHTML = `${monthEnNames[m]}`;
      default:
        td.innerHTML = `${monthEnNames[m]}`;
        break;
    }
    td.onclick = (e) => changeMonth(e);
    if (m == monthGlobal) {
      td.setAttribute("class", "highlight");
    }
  }
};

const showMonths = function () {
  let table = document.getElementById(simpleCalendarTableId);
  let weekDaysRow = document.getElementById(weekDaysRowId);
  let secondRow = document.getElementById("secondRow");

  if (secondRow) {
    secondRow.parentNode.removeChild(secondRow);
  }
  if (weekDaysRow) {
    weekDaysRow.parentNode.removeChild(weekDaysRow);
  }
  removeTableRows(0, table.rows.length, table);
  appendMonths(table);
};

const prevMonth = function () {
  monthGlobal--;
  if (monthGlobal < 0) {
    monthGlobal = 11;
    year--;
  }
  drawCalendarBody();
};

const appendDates = function (table) {
  const MAX_MONTH_DAYS = 31;
  table.innerHTML = "";
  // let table = document.getElementById("simpleCalendar");
  let tr = "";
  let td = "";

  for (let m = 1; m <= MAX_MONTH_DAYS; m++) {
    if (m == 1) {
      tr = table.insertRow();
      switch (language) {
        case "bg":
          tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">ЗАТВОРИ</a>
                    </td>`;
          break;
        case "en":
          tr.innerHTML = `<td class="closeBtn" colspan="5">
                        <a href="#" onclick="closeMe();">CLOSE</a>
                    </td>`;
        default:
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
    if (m == todayDate) {
      td.setAttribute("class", "highlight");
    } else if (m == userSelectedDay) {
      td.setAttribute("style", "background: yellowgreen; color: black;");
    }

    if (m == 31) {
      td = tr.insertCell();
      td.setAttribute("colspan", "4");
      switch (language) {
        case "bg":
          td.innerHTML = `<a href="#" onclick="clearSelectedDate();">Изчисти Избраната Дата</a>`;
          break;
        case "en":
          td.innerHTML = `<a href="#" onclick="clearSelectedDate();">Clear Selected Date</a>`;
          break;
        default:
          td.innerHTML = `<a href="#" onclick="clearSelectedDate();">Clear Selected Date</a>`;
          break;
      }
    }
  }
};

const showDates = function () {
  let table = document.getElementById(simpleCalendarTableId);
  let secondRow = document.getElementById("secondRow");
  let weekDaysRow = document.getElementById(weekDaysRowId);

  if (secondRow) {
    secondRow.parentNode.removeChild(secondRow);
  }

  if (weekDaysRow) {
    weekDaysRow.parentNode.removeChild(weekDaysRow);
  }

  removeTableRows(0, table.rows.length, table);
  appendDates(table);
};

const arrowsMove = function (e) {
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
      drawCalendarBody();
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
};

const attachKeyDownEvent = function () {
  document
    .getElementById(simpleCalendarTableId)
    .addEventListener("keydown", arrowsMove);
  document.getElementById("simpleCalendar").focus();
};

const genTableBody = function (dateNum) {
  let currentDate = new Date(year, monthGlobal + 1, 0) + " ";
  let countDays = parseInt(currentDate.split(" ")[2]);
  let currentMonthDays = countDays;
  let lastDayOfMonthName = currentDate.split(" ")[0];
  simpleCalendarTable = document.getElementById(simpleCalendarTableId);
  let tr = "";
  let pastTheMont = false;
  let counter = 1;

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
  if (monthGlobal == 1 && lastDayOfMonthName == "Mon" && countDays == 28) {
    countDays += 13;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Mon" &&
    countDays == 29
  ) {
    countDays += 13;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Tue" &&
    countDays == 28
  ) {
    countDays += 12;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Tue" &&
    countDays == 29
  ) {
    countDays += 12;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Wed" &&
    countDays == 28
  ) {
    countDays += 11;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Wed" &&
    countDays == 29
  ) {
    countDays += 11;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Thu" &&
    countDays == 28
  ) {
    countDays += 10;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Thu" &&
    countDays == 29
  ) {
    countDays += 10;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Fri" &&
    countDays == 28
  ) {
    countDays += 9;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Fri" &&
    countDays == 29
  ) {
    countDays += 9;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Sat" &&
    countDays == 28
  ) {
    countDays += 8;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Sat" &&
    countDays == 29
  ) {
    countDays += 8;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Sun" &&
    countDays == 28
  ) {
    countDays += 14;
  } else if (
    monthGlobal == 1 &&
    lastDayOfMonthName == "Sun" &&
    countDays == 29
  ) {
    countDays += 14;
  }

  let rows = countDays - (7 - emptyCols);
  let rowsCounter = 6;
  let day = 0;

  for (let i = 0; i < rows; i++) {
    if (rowsCounter < 0) break;
    if (i % 7 == 0) {
      rowsCounter--;
      day = 0;
      if (rowsCounter != 0) {
        tr = simpleCalendarTable.insertRow();
        tr.setAttribute("class", "tableBodyCell");
      } else {
        break;
      }
    }
    if (dateNum > currentMonthDays || dateNum > 31) {
      dateNum = 1;
      pastTheMont = true;
    }

    if (dateNum == todayDate) {
      let todayCell = tr.insertCell();
      todayCell.innerHTML = `${dateNum}`;

      if (!pastTheMont) {
        todayCell.setAttribute(`class`, `highlight`);
      } else {
        if (day == 5 || day == 6) {
          todayCell.setAttribute(`class`, `day${dateNum} saturdaySunday`);
        } else {
          todayCell.setAttribute(`class`, `disabled`);
        }
      }

      todayCell.onclick = (e) => showDate(e);
    } else {
      // if (that.userSelectedDay == (startDate - 1) + counter) {
      //     let userSelectedTd = that.simpleCalendarTable.insertCell();
      //     userSelectedTd.innerHTML = `${startDate}`;
      //     userSelectedTd.setAttribute("class", `userSelected`);
      //     userSelectedTd.setAttribute("style", "background: yellowgreen; color: black;");
      //     userSelectedTd.onclick = e => showDate(e);
      // }

      let todayCell = tr.insertCell();
      todayCell.innerHTML = `${dateNum}`;

      if (pastTheMont) {
        todayCell.innerHTML = `${dateNum}`;
        if (day == 5 || day == 6) {
          todayCell.setAttribute(`class`, `day${dateNum} saturdaySunday`);
        } else {
          todayCell.setAttribute(`class`, `day${dateNum} disabled`);
        }
        todayCell.onclick = (e) => showDisabledDateNext(e);
      } else if (userSelectedDay == dateNum - 1 + counter) {
        todayCell.setAttribute("class", `userSelected`);
        // todayCell.setAttribute("style", "background: yellowgreen; color: black;");
      } else {
        todayCell.onclick = (e) => showDate(e);
        if (day == 5 || day == 6) {
          todayCell.setAttribute(`class`, `day${dateNum} saturdaySunday`);
        } else {
          todayCell.setAttribute(`class`, `day${dateNum}`);
        }
      }
    }
    dateNum++;
    day++;
  }
  attachKeyDownEvent();
};

//settings
const calendarContainerIdDefault = "simpleCalendarContainer";
const simpleCalendarTableId = "simpleCalendar";
const weekDaysRowId = "weekDaysRow";
let language = "bg";
let monthGlobal = new Date().getMonth();
let year = new Date().getFullYear();
let simpleCalendarTable = document.getElementById(simpleCalendarTableId);
let todayDate = new Date().getDate();
let firstDayOfMonth = new Date(year, monthGlobal, 1).toString();
const monthBgNames = [
  "Януари",
  "Февруари",
  "Март",
  "Април",
  "Май",
  "Юни",
  "Юли",
  "Август",
  "Септември",
  "Октомври",
  "Ноември",
  "Декември",
];

const monthEnNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonthDays = new Date(year, monthGlobal + 1, 0).getDate();
let selectedDay = 0;
let userSelectedDay = 0;
let dayName = getDayName(firstDayOfMonth.split(" ")[0]);
let emptyCols = calcEmptyCols(dayName);

let dateNum = 0;
// let calendarTopRow = genCalTopRow(language);

//main calendar function - starting point

export const simpleCalendar = function (options = {}) {
  try {
    language = options?.language ?? "bg";
    const calendarContainerId =
      options?.containerId ?? calendarContainerIdDefault;
    const simpleCalendarContainer = getCalendarContainer(calendarContainerId);
    let calendarTopRow = genCalTopRow(language);

    simpleCalendarContainer.innerHTML += calendarTopRow;
    dateNum = genCalSecondRow();
    genTableBody(dateNum);
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
