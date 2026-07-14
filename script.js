// ==============================
// 行事曆功能
// ==============================

// 取得今天日期
const today = new Date();

// 目前顯示月份
let currentMonth = today.getMonth();

// 目前顯示年份
let currentYear = today.getFullYear();

// 從 localStorage 讀取所有活動
let events = JSON.parse(
    localStorage.getItem("events")
) || {};

// 儲存活動
function saveEvents() {

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

}

// 建立 YYYY-MM-DD 格式
function createDateKey(year, month, day) {

    const monthText =
        String(month + 1).padStart(2, "0");

    const dayText =
        String(day).padStart(2, "0");

    return `${year}-${monthText}-${dayText}`;

}

// 判斷是否為今天
function isToday(year, month, day) {

    return (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate()
    );

}

// 顯示行事曆
function renderCalendar() {

    const tbody =
        document.querySelector("#calendar tbody");

    const title =
        document.getElementById("monthTitle");

    tbody.innerHTML = "";

    title.textContent =
        `${currentYear} 年 ${currentMonth + 1} 月`;

    // 該月第一天為星期幾
    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();

    // 該月總天數
    const totalDays =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

    let day = 1;

    // 一個月最多需要六列
    for (let week = 0; week < 6; week++) {

        const row =
            document.createElement("tr");

        for (let weekday = 0; weekday < 7; weekday++) {

            const td =
                document.createElement("td");

            const cellIndex =
                week * 7 + weekday;

            // 月初前與月底後保持空白
            if (
                cellIndex < firstDay ||
                day > totalDays
            ) {

                row.appendChild(td);

                continue;

            }

            // 顯示日期
            const dateElement =
                document.createElement("div");

            dateElement.className =
                "date";

            dateElement.textContent =
                day;

            td.appendChild(dateElement);

            // 今日樣式
            if (
                isToday(
                    currentYear,
                    currentMonth,
                    day
                )
            ) {

                td.classList.add("today");

            }

            const key =
                createDateKey(
                    currentYear,
                    currentMonth,
                    day
                );

            // 顯示當日活動
            if (events[key]) {

                events[key].forEach(
                    function (eventText) {

                        const eventElement =
                            document.createElement("div");

                        eventElement.className =
                            "event-item";

                        eventElement.textContent =
                            eventText;

                        td.appendChild(eventElement);

                    }
                );

            }

            row.appendChild(td);

            day++;

        }

        tbody.appendChild(row);

        if (day > totalDays) {
            break;
        }

    }

}

// 上一個月
document
    .getElementById("prevMonth")
    .addEventListener(
        "click",
        function () {

            currentMonth--;

            if (currentMonth < 0) {

                currentMonth = 11;

                currentYear--;

            }

            renderCalendar();

        }
    );

// 下一個月
document
    .getElementById("nextMonth")
    .addEventListener(
        "click",
        function () {

            currentMonth++;

            if (currentMonth > 11) {

                currentMonth = 0;

                currentYear++;

            }

            renderCalendar();

        }
    );

// 新增行事曆活動
document
    .getElementById("addEvent")
    .addEventListener(
        "click",
        function () {

            const dateInput =
                document.getElementById("eventDate");

            const textInput =
                document.getElementById("eventText");

            const date =
                dateInput.value;

            const text =
                textInput.value.trim();

            if (date === "" || text === "") {

                alert("請輸入日期及事項");

                return;

            }

            if (!events[date]) {

                events[date] = [];

            }

            events[date].push(text);

            saveEvents();

            // 切換到新增事項所在月份
            const selectedDate =
                new Date(date + "T00:00:00");

            currentYear =
                selectedDate.getFullYear();

            currentMonth =
                selectedDate.getMonth();

            textInput.value = "";

            renderCalendar();

        }
    );

// Enter 新增事項
document
    .getElementById("eventText")
    .addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                document
                    .getElementById("addEvent")
                    .click();

            }

        }
    );

// ==============================
// 公告與消息資料
// ==============================

const noticeData = [
    {
        title: "教學部會議通知",
        date: "2026/06/20"
    },
    {
        title: "PGY課程調整公告",
        date: "2026/06/18"
    },
    {
        title: "系統維護公告",
        date: "2026/06/15"
    },
    {
        title: "師資培育工作坊報名",
        date: "2026/06/10"
    },
    {
        title: "會議室借用申請說明",
        date: "2026/06/05"
    }
];

const newsData = [
    {
        title: "教學部與醫院合作計畫",
        date: "2026/06/20"
    },
    {
        title: "醫學教育研討會開放報名",
        date: "2026/06/18"
    },
    {
        title: "新增線上課程",
        date: "2026/06/15"
    },
    {
        title: "臨床技能競賽活動",
        date: "2026/06/12"
    },
    {
        title: "教師成長工作坊",
        date: "2026/06/08"
    }
];

// 顯示公告或消息
function renderMessageList(elementId, data) {

    const list =
        document.getElementById(elementId);

    if (!list) {
        return;
    }

    list.innerHTML = "";

    data.forEach(function (item) {

        const li =
            document.createElement("li");

        const title =
            document.createElement("span");

        const date =
            document.createElement("span");

        title.textContent =
            item.title;

        date.textContent =
            item.date;

        li.appendChild(title);

        li.appendChild(date);

        list.appendChild(li);

    });

}

// 初始顯示
renderCalendar();

renderMessageList(
    "noticeList",
    noticeData
);

renderMessageList(
    "newsList",
    newsData
);