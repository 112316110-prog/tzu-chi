let today = new Date();

let currentMonth = today.getMonth();

let currentYear = today.getFullYear();

// 所有活動

let events = JSON.parse(localStorage.getItem("events")) || {};

function saveEvents(){

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

}

function renderCalendar(){

    const tbody = document.querySelector("#calendar tbody");

    tbody.innerHTML="";

    const title=document.getElementById("monthTitle");

    title.innerHTML=currentYear+" 年 "+(currentMonth+1)+" 月";

    let firstDay=new Date(currentYear,currentMonth,1).getDay();

    let days=new Date(currentYear,currentMonth+1,0).getDate();

    let row=document.createElement("tr");

    // 空白

    for(let i=0;i<firstDay;i++){

        row.appendChild(document.createElement("td"));

    }

    for(let day=1;day<=days;day++){

        if((firstDay+day-1)%7===0 && day!==1){

            tbody.appendChild(row);

            row=document.createElement("tr");

        }

        let td=document.createElement("td");

        let date=document.createElement("div");

        date.className="date";

        date.innerHTML=day;

        td.appendChild(date);

        let key=currentYear+"-"+String(currentMonth+1).padStart(2,"0")+"-"+String(day).padStart(2,"0");

        if(events[key]){

            events[key].forEach(e=>{

                let div=document.createElement("div");

                div.className="event-item";

                div.innerHTML=e;

                td.appendChild(div);

            });

        }

        row.appendChild(td);

    }

    while(row.children.length<7){

        row.appendChild(document.createElement("td"));

    }

    tbody.appendChild(row);

}

renderCalendar();

document.getElementById("prevMonth").onclick=function(){

    currentMonth--;

    if(currentMonth<0){

        currentMonth=11;

        currentYear--;

    }

    renderCalendar();

}

document.getElementById("nextMonth").onclick=function(){

    currentMonth++;

    if(currentMonth>11){

        currentMonth=0;

        currentYear++;

    }

    renderCalendar();

}

document.getElementById("addEvent").onclick=function(){

    let date=document.getElementById("eventDate").value;

    let text=document.getElementById("eventText").value;

    if(date===""||text===""){

        alert("請輸入日期及事項");

        return;

    }

    if(!events[date]){

        events[date]=[];

    }

    events[date].push(text);

    saveEvents();

    renderCalendar();

    document.getElementById("eventText").value="";

}

function createYearMonth(yearID, monthID){


    let yearSelect=document.getElementById(yearID);


    if(yearSelect){

        for(let i=96;i<=115;i++){

            let option=document.createElement("option");

            option.value=i;

            option.text=i+" 年";

            yearSelect.appendChild(option);

        }

    }



    let monthSelect=document.getElementById(monthID);


    if(monthSelect){

        for(let i=1;i<=12;i++){

            let option=document.createElement("option");

            option.value=i;

            option.text=i+" 月";

            monthSelect.appendChild(option);

        }

    }

}
createYearMonth(
    "yearSelect",
    "monthSelect"
);


createYearMonth(
    "careYearSelect",
    "careMonthSelect"
);


createYearMonth(
    "orgYearSelect",
    "orgMonthSelect"
);

function hideAllContent(){

    let pages=[
        "introContent",
        "trainingDirectorContent",
        "wholeCareContent",
        "organizationContent"
    ];


    pages.forEach(function(id){

        let element=document.getElementById(id);

        if(element){

            element.style.display="none";

        }

    });


    let news=document.querySelector(".news");

    if(news){

        news.style.display="none";

    }


    let calendar=document.querySelector(".calendar-layout");

    if(calendar){

        calendar.style.display="none";

    }

}



function showIntro(){

    hideAllContent();

    document.getElementById("introContent").style.display="block";

}



function showTrainingDirector(){

    hideAllContent();

    document.getElementById("trainingDirectorContent").style.display="block";

}



function showWholeCare(){

    hideAllContent();

    document.getElementById("wholeCareContent").style.display="block";

}



function showOrganization(){

    hideAllContent();

    document.getElementById("organizationContent").style.display="block";

}