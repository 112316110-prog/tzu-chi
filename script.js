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

function showIntro(){

    // 隱藏首頁內容
    document.querySelector(".news").style.display="none";
    document.querySelector(".calendar-layout").style.display="none";


    // 顯示教學部簡介
    document.getElementById("introContent").style.display="block";

}