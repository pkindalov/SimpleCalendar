    const LANGUAGE = "bg";
    var that = this;
    let container = document.getElementById("simpleCalendarContainer");
    that.monthGlobal = new Date().getMonth();
    // that.numMont = 0;
    that.year = new Date().getFullYear();
    let seasonTheme = getSeasonTheme(that.monthGlobal + 1);
    let calendarTopRow = genCalTopRow(seasonTheme, LANGUAGE);
    container.innerHTML += calendarTopRow;
    let table = document.getElementById("simpleCalendar");
    let todayDate = new Date().getDate();
    let firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
    let dayName = getDayName(firstDayOfMonth.split(" ")[0]);
    that.emptyCols = calcEmptyCols(dayName);
    let dateNum = genCalSecondRow(table, todayDate, seasonTheme);

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
        // month--;
        return theme;
    }

    function prevMonth() {
        var that = this;
        that.monthGlobal--;
        let seasonTheme = getSeasonTheme();
        // alert(seasonTheme);
        let firstDayOfMonth = new Date(that.year, that.monthGlobal, 1).toString();
        that.emptyCols = calcEmptyCols(firstDayOfMonth.split(" ")[0]);
        let topRow = genCalTopRow(seasonTheme, LANGUAGE);
        let container = document.getElementById("simpleCalendarContainer");
        container.innerHTML = "";
        container.innerHTML += topRow;
        let table = document.getElementById("simpleCalendar");
        let dateNum = genCalSecondRow(table, that.monthGlobal);
        // console.log(that.monthGlobal);
        if (that.monthGlobal <= 0) {
            that.monthGlobal = 12;
            // that.year = parseInt(new Date().getFullYear()) - 1;
            that.year--;
        }

        console.log(that.monthGlobal);
        genTableBody(dateNum, table, todayDate, seasonTheme);
        // alert(dateNum);
    }

    function nextMonth() {

        var that = this;
        that.monthGlobal++;
        let seasonTheme = getSeasonTheme();
        // alert(seasonTheme);

        let firstDayOfMonth = new Date(that.year, that.monthGlobal, ).toString();
        that.emptyCols = calcEmptyCols(firstDayOfMonth.split(" ")[0]);
        let topRow = genCalTopRow(seasonTheme, LANGUAGE);
        let container = document.getElementById("simpleCalendarContainer");
        container.innerHTML = "";
        container.innerHTML += topRow;
        let table = document.getElementById("simpleCalendar");
        let dateNum = genCalSecondRow(table, that.monthGlobal);

        if (that.monthGlobal > 11) {
            that.monthGlobal = -1;
            // that.year = parseInt(new Date().getFullYear()) - 1;
            that.year++;
        }

        console.log(that.monthGlobal);

        genTableBody(dateNum, table, todayDate, seasonTheme);

        // var that = this;
        // that.monthGlobal = that.monthGlobal + 1;
        // let seasonTheme = getSeasonTheme();
        // let topRow = genCalTopRow(seasonTheme, LANGUAGE);
        // let container = document.getElementById("simpleCalendarContainer");
        // container.innerHTML = "";
        // container.innerHTML += topRow;
        // let table = document.getElementById("simpleCalendar");
        // let dateNum = genCalSecondRow(table, that.monthGlobal);

        // genTableBody(dateNum, table, todayDate, seasonTheme);

    }

    //functions about generating calendar
    //Following function generate first row of the table with the name of the days
    function genCalTopRow(seasonTheme, LANGUAGE) {
        let monthName = getCurrentMonthName(LANGUAGE);

        switch (LANGUAGE) {
            case "bg":
                return `<table class=${seasonTheme} id="simpleCalendar">
              <tr><th colspan="7"><button onclick="prevMonth(LANGUAGE);" style="color: orange">&lt;</button>${monthName}<button onclick="nextMonth(LANGUAGE);" style="color: orange">&gt;</button></th></tr>  
              <tr><th colspan="7"><button id="yearButton" onclick="chooseYear(e)">${that.year}</button></tr>
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
    function genCalSecondRow(table, todayDate, seasonTheme) {
        const DAYS_COUNT = 7;
        let startDate = 1;
        let previousMont = new Date(that.year, that.monthGlobal, 0) + " ";
        let previousMontDays = parseInt(previousMont.split(" ")[2]);
        let prevMontStart = previousMontDays + 1 - that.emptyCols;
        let secondRow = table.insertRow();

        for (let i = 0; i < DAYS_COUNT; i++) {
            if (i < that.emptyCols) {
                let newTd = secondRow.insertCell();
                newTd.innerHTML = `${prevMontStart}`;
                newTd.setAttribute("class", `${seasonTheme}Disabled`);
                // secondRow.innerHTML += `<td class="${seasonTheme}Disabled">${prevMontStart}</td>`;
                prevMontStart++;
            } else {
                if (todayDate == startDate) {
                    let anotherTd = secondRow.insertCell();
                    anotherTd.innerHTML = `${startDate}`;
                    anotherTd.setAttribute("class", `${seasonTheme}Hightlight`);
                    anotherTd.onclick = e => showDate(e);
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

    function genTableBody(dateNum, table, todayDate, seasonTheme) {
        let currentDate = new Date(that.year, that.monthGlobal + 1, 0) + " ";
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

    genTableBody(dateNum, table, todayDate, seasonTheme);