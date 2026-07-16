let today = new Date();

let currentMonth = today.getMonth();

let currentYear = today.getFullYear();


// 所有活動

let events =
    JSON.parse(localStorage.getItem("events")) || {};


// 儲存活動

function saveEvents(){

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

}


// 顯示行事曆

function renderCalendar(){

    const tbody =
        document.querySelector("#calendar tbody");

    if(!tbody){

        return;

    }

    tbody.innerHTML = "";


    const title =
        document.getElementById("monthTitle");

    if(title){

        title.innerHTML =
            currentYear +
            " 年 " +
            (currentMonth + 1) +
            " 月";

    }


    let firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();


    let days =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


    let row =
        document.createElement("tr");


    // 月初空白

    for(let i = 0; i < firstDay; i++){

        row.appendChild(
            document.createElement("td")
        );

    }


    // 建立日期

    for(let day = 1; day <= days; day++){

        if(
            (firstDay + day - 1) % 7 === 0 &&
            day !== 1
        ){

            tbody.appendChild(row);

            row =
                document.createElement("tr");

        }


        let td =
            document.createElement("td");


        let date =
            document.createElement("div");

        date.className = "date";

        date.textContent = day;

        td.appendChild(date);


        let key =
            currentYear +
            "-" +
            String(currentMonth + 1)
                .padStart(2, "0") +
            "-" +
            String(day)
                .padStart(2, "0");


        if(events[key]){

            events[key].forEach(
                function(eventText){

                    let div =
                        document.createElement("div");

                    div.className =
                        "event-item";

                    div.textContent =
                        eventText;

                    td.appendChild(div);

                }
            );

        }


        row.appendChild(td);

    }


    // 月底補空白

    while(row.children.length < 7){

        row.appendChild(
            document.createElement("td")
        );

    }


    tbody.appendChild(row);

}


// 初次顯示

renderCalendar();


// 上一個月

const prevMonthButton =
    document.getElementById("prevMonth");

if(prevMonthButton){

    prevMonthButton.onclick = function(){

        currentMonth--;

        if(currentMonth < 0){

            currentMonth = 11;

            currentYear--;

        }

        renderCalendar();

    };

}


// 下一個月

const nextMonthButton =
    document.getElementById("nextMonth");

if(nextMonthButton){

    nextMonthButton.onclick = function(){

        currentMonth++;

        if(currentMonth > 11){

            currentMonth = 0;

            currentYear++;

        }

        renderCalendar();

    };

}


// 新增活動

const addEventButton =
    document.getElementById("addEvent");

if(addEventButton){

    addEventButton.onclick = function(){

        const eventDateInput =
            document.getElementById(
                "eventDate"
            );

        const eventTextInput =
            document.getElementById(
                "eventText"
            );


        if(!eventDateInput || !eventTextInput){

            return;

        }


        let date =
            eventDateInput.value;


        let text =
            eventTextInput.value.trim();


        if(date === "" || text === ""){

            alert("請輸入日期及事項");

            return;

        }


        if(!events[date]){

            events[date] = [];

        }


        events[date].push(text);


        saveEvents();

        renderCalendar();


        eventTextInput.value = "";

    };

}


// 建立年度與月份

function createYearMonth(
    yearID,
    monthID
){

    let yearSelect =
        document.getElementById(yearID);


    if(
        yearSelect &&
        yearSelect.options.length === 0
    ){

        for(let i = 96; i <= 115; i++){

            let option =
                document.createElement(
                    "option"
                );

            option.value = i;

            option.text =
                i + " 年";

            yearSelect.appendChild(
                option
            );

        }

    }


    let monthSelect =
        document.getElementById(monthID);


    if(
        monthSelect &&
        monthSelect.options.length === 0
    ){

        for(let i = 1; i <= 12; i++){

            let option =
                document.createElement(
                    "option"
                );

            option.value = i;

            option.text =
                i + " 月";

            monthSelect.appendChild(
                option
            );

        }

    }

}


// 查詢頁面的年度與月份

createYearMonth(
    "yearSelect",
    "monthSelect"
);


const contentPageIDs = [

    "searchContent",
    "introContent",
    "trainingDirectorContent",
    "wholeCareContent",
    "organizationContent",
    "teachingMaterialContent",
    "internalMedicineContent",

    "UGYContent",
    "UGY6Content",
    "PostBacContent",
    "ResidentContent"

];

// 隱藏所有內容

function hideAllContent(){

    contentPageIDs.forEach(
        function(id){

            let element =
                document.getElementById(id);

            if(element){

                element.style.display = "none";

            }

        }
    );


    let news =
        document.querySelector(".news");

    if(news){

        news.style.display = "none";

    }


    let calendar =
        document.querySelector(
            ".calendar-layout"
        );

    if(calendar){

        calendar.style.display = "none";

    }

}


// 顯示指定內容

function showContent(contentID){

    hideAllContent();


    let content =
        document.getElementById(
            contentID
        );


    if(content){

        content.style.display = "block";

    }

}


// 顯示首頁

function showHome(){

    hideAllContent();


    let news =
        document.querySelector(".news");

    if(news){

        news.style.display = "flex";

    }


    let calendar =
        document.querySelector(
            ".calendar-layout"
        );

    if(calendar){

        calendar.style.display = "flex";

    }

}


// 顯示查詢頁面

function showSearch(){

    showContent(
        "searchContent"
    );

}


// 顯示教學部簡介

function showIntro(){

    showContent(
        "introContent"
    );

}


// 顯示訓練計畫主持人

function showTrainingDirector(){

    showContent(
        "trainingDirectorContent"
    );

}


// 顯示全人照護

function showWholeCare(){

    showContent(
        "wholeCareContent"
    );

}


// 顯示組織架構

function showOrganization(){

    showContent(
        "organizationContent"
    );

}


// 顯示教學教材

function showTeachingMaterial(){

    showContent(
        "teachingMaterialContent"
    );

}


// 顯示內科部內容

function showInternalMedicine(){

    showContent(
        "internalMedicineContent"
    );

}



function showUGY(){

    showContent("UGYContent");

}


function showUGY6(){

    showContent("UGY6Content");

}


function showPostBac(){

    showContent("PostBacContent");

}


function showResident(){

    showContent("ResidentContent");

}