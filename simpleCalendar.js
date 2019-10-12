let container = document.getElementById("container");
// container.innerHTML = "<h1>Works</h1>";

//functions about generating calendar
function genCalTopRow() {
    return `<table id="calendar">
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

function genCalSecondRow() {
    const DAYS_COUNT = 7;
    // var FirstDay = new Date(2019, 10, 1);
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let firstDayOfMonth = new Date(year, month, 1).toString();
    // alert(firstDayOfMonth);
    // alert(month);
    //   let row = `<tr>`;
    // let dayName = getDayName(new Date().getDay());
    let dayName = getDayName(firstDayOfMonth.split(' ')[0]);
    // alert(dayName);
    // return;
    let startDate = 1;
    let todayDate = new Date().getDate();
    let emptyCols = calcEmptyCols(dayName);
    // let indexWriteDaysNumBegin = startDate - emptyCols;
    // alert(emptyCols);
    let table = document.getElementById("calendar");
    let secondRow = table.insertRow();
    let textNode = "";

    // alert(FirstDay);

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
    let weekDays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

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

let calendarTopRow = genCalTopRow();

container.innerHTML += calendarTopRow;
let dateNum = genCalSecondRow();
alert(dateNum);
// alert(fromWhichNumToBeginTableBody);
// container.innerHTML += secondRow;
// let table = document.getElementById("calendar");
// let secondRow = table.insertRow(1);
// let secondRowCelss =