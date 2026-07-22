// ======================================
// 持ち物データ
// ======================================

let lists = {
    first: [
        { id: "sheet", icon: "🛏️", text: "しーつ" },
        { id: "futon", icon: "🛌", text: "おふとん" },
        { id: "shoes", icon: "👟", text: "うわばき" },
        { id: "hat", icon: "🧢", text: "ぼうし" },
        { id: "towel", icon: "🧺", text: "たおる（２まい）" },
        { id: "shirt", icon: "👕", text: "はんそで" },
        { id: "pants", icon: "👖", text: "ずぼん" },
        { id: "underwear", icon: "👙", text: "したぎ" },
        { id: "bag", icon: "🛍️", text: "よごれた せんたくものを いれる ふくろ" },
        { id: "swimsuit", icon: "🩱", text: "みずぎ" },
        { id: "poolTowel", icon: "🏖️", text: "ぷーるたおる" },
        { id: "cup", icon: "🥤", text: "こっぷ と こっぷいれ" },
        { id: "tea", icon: "🧃", text: "むぎちゃ" }
    ],

    normal: [
        { id: "towel", icon: "🧺", text: "たおる（２まい）" },
        { id: "shirt", icon: "👕", text: "はんそで" },
        { id: "pants", icon: "👖", text: "ずぼん" },
        { id: "underwear", icon: "👙", text: "したぎ" },
        { id: "bag", icon: "🛍️", text: "よごれた せんたくものを いれる ふくろ" },
        { id: "swimsuit", icon: "🩱", text: "みずぎ" },
        { id: "poolTowel", icon: "🏖️", text: "ぷーるたおる" },
        { id: "cup", icon: "🥤", text: "こっぷ と こっぷいれ" },
        { id: "tea", icon: "🧃", text: "むぎちゃ" }
    ]
};

const morningList = [

    { id: "toilet", icon: "🚽", text: "といれ" },

    { id: "clothes", icon: "👕", text: "おきがえ" },

    { id: "temperature", icon: "🌡️", text: "たいおん" },

    { id: "items", icon: "🎒", text: "もちものちぇっく" },

    { id: "brushHair", icon: "🧜‍♀️", text: "かみのけをとかす" },

    { id: "breakfast", icon: "🍚", text: "あさごはん・かみのけ" },

    { id: "brushTeeth", icon: "🪥", text: "はみがき・おかお" },

    { id: "pajama", icon: "🛏️", text: "ぱじゃまをかたづける" },

    { id: "contact", icon: "📖", text: "まま れんらくちょう" },

    { id: "pool", icon: "🏊", text: "ぷーるかーど" }

];

// ======================================
// しんくんにあえるひ
// ======================================

const shinDays = [

    new Date(2026, 7, 20), // 2026/8/20
    new Date(2026, 8, 18), // 2026/9/18

];


// ======================================
// アプリの状態
// ======================================

const state = {

    screen: "start",

    mode: null,

    checked: [],

    checkedMorning: [],

    morningComplete: false,

    playerHand: null,
    cpuHand: null,
    result: ""

};

// ======================================
// DOM
// ======================================

const app = document.getElementById("app");

// ======================================
// 初期化
// ======================================

function init() {

    render();

}

document.addEventListener("DOMContentLoaded", init);

// ======================================
// 画面描画
// ======================================
let previousScreen = "";

function render() {

    if (previousScreen !== state.screen) {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        previousScreen = state.screen;
    }

    switch (state.screen) {

        case "start":
            renderStart();
            break;

        case "menu":
            renderMenu();
            break;

        case "check":
            renderCheck();
            break;

        case "finish":
            renderFinish();
            break;

        case "stamp":
            renderStamp();
            break;

        case "mode":
            renderMode();
            break;

        case "countdown":
            renderCountdown();
            break;

        case "janken":
            renderJanken();
            break;

        case "jankenResult":
            renderJankenResult();
            break;
    }

}

// ======================================
// チェック画面
// ======================================

function renderCheck() {

    const list = lists[state.mode];

    let html = "";

    list.forEach(item => {

        const checked = state.checked.includes(item.id);

        html += `
            <button
                class="check-button ${checked ? "done" : ""}"
                data-id="${item.id}">
                ${checked ? "✅" : item.icon}
                ${item.text}
            </button>

            <br><br>
        `;

    });

    const complete = state.checked.length === list.length;

    if (complete) {

        homeSound.pause();
        homeSound.currentTime = 0;

        finishSound.currentTime = 0;
        finishSound.play();

        if (!state.checkedMorning.includes("items")) {

            state.checkedMorning.push("items");

        }

        state.screen = "menu";

        render();

        return;
    }

    app.innerHTML = `
        <section class="check-screen">

            <h2>🎀<br>

            <h2>もちものちぇっく</h2>

            ${html}

            <button id="backCheck">

    ⬅️<br>
    もどる

</button>

            ${complete ? `
                <h2>🎉🎉🎉</h2>
                <h1>じゅんびできたね！✨</h1>
                <p>ほいくえんたのしんでね💕</p>
            ` : ""}

        </section>
    `;

    document.querySelectorAll(".check-button").forEach(button => {

        button.addEventListener("click", () => {

            toggleCheck(button.dataset.id);

        });

    });

    document
        .getElementById("backCheck")
        .addEventListener("click", () => {

            state.checked = [];

            state.screen = "mode";

            render();

        });

}

function renderStart() {

    finishSound.pause();

    app.innerHTML = `

<section class="start-screen">

<img
    src="assets/images/logo.png"
    class="logo"
    alt="せなちゃれ♡">

<button id="morningButton">

🌞<br>
あさちゃれんじ
${state.morningComplete ? "<br>✅" : ""}

</button>

<button id="stampButton">

🏆<br>
すたんぷかーど

</button>

<button
    id="fortuneButton"
    ${state.morningComplete ? "" : "disabled"}>

🔮<br>
きょうのうらない

</button>

<button
    id="jankenButton"
    ${state.morningComplete ? "" : "disabled"}>

✌️<br>
じゃんけんたいむ

</button>

<button id="countdownButton">

🥰<br>

つぎ あえるまで<br>

あと なんにち？

</button>

</section>

`;

    document
        .getElementById("morningButton")
        .addEventListener("click", () => {

            state.screen = "menu";
            render();

        });

    document
        .getElementById("stampButton")
        .addEventListener("click", () => {

            state.screen = "stamp";
            render();

        });

    document
        .getElementById("fortuneButton")
        .addEventListener("click", () => {

            alert("もうすぐできるよ♡");

        });

    document
        .getElementById("jankenButton")
        .addEventListener("click", () => {

            state.screen = "janken";

            render();

        });

    document
        .getElementById("countdownButton")
        .addEventListener("click", () => {

            state.screen = "countdown";

            render();

        });

}

function renderFinish() {

    app.innerHTML = `

    <section class="finish-screen">

        <div class="sparkle">

            ✨👑✨<br>
            🌈💖🌈

        </div>

        <h1>

            じゅんび<br>
            できたね！

        </h1>

        <img
            src="assets/images/princess.jpeg"
            class="princess"
        >

        <p>

            せなちゃん<br>

            とってもえらいね💕

            <br><br>

            ほいくえん

            <br>

            たのしんできてね✨

        </p>

        <button id="backButton">

            👑
            さいしょにもどる

        </button>

    </section>

    `;

    document
        .getElementById("backButton")
        .addEventListener("click", () => {

            state.checkedMorning = [];
            state.checked = [];
            state.mode = null;

            state.morningComplete = true;

            state.screen = "start";

            render();

        });

}

// ======================================
// メニュー画面
// ======================================

function renderMenu() {

    let html = "";

    morningList.forEach(item => {

        const checked =
            state.checkedMorning.includes(item.id);

        html += `
            <button
                class="morning-button ${checked ? "done" : ""}"
                data-id="${item.id}">

                ${checked ? "✅" : item.icon}
                ${item.text}

            </button>

            <br><br>
        `;

    });

    app.innerHTML = `

    <section class="check-screen">

        <h2>
            🌞<br>
            あさちゃれんじ
        </h2>

        ${html}

        <button id="backMenu">

            ⬅️<br>
            もどる

        </button>

    </section>

    `;

    document
        .querySelectorAll(".morning-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                toggleMorning(button.dataset.id);

            });

        });

    document
        .getElementById("backMenu")
        .addEventListener("click", () => {

            state.screen = "start";

            render();

        });

}

function renderMode() {

    app.innerHTML = `

    <section class="start-screen">

        <h2>

            🎒<br>
            もちものちぇっく

        </h2>

        <button id="firstButton">

            🌸<br>
            こんしゅう はじめてだよ！

        </button>

        <button id="normalButton">

            💜<br>
            こんしゅう はじめてじゃないよ！

        </button>

        <button id="backMode">

            ⬅️<br>
            もどる

        </button>

    </section>

    `;

    document
        .getElementById("firstButton")
        .addEventListener("click", onClickFirst);

    document
        .getElementById("normalButton")
        .addEventListener("click", onClickNormal);

    document
        .getElementById("backMode")
        .addEventListener("click", () => {

            state.screen = "menu";
            render();

        });

}

function toggleMorning(id) {

    // 持ち物チェックを押したら
    if (id === "items") {

        // モード選択画面へ
        state.screen = "mode";
        render();
        return;

    }

    // チェック音
    checkSound.currentTime = 0;
    checkSound.play();

    // チェック切り替え
    if (state.checkedMorning.includes(id)) {

        state.checkedMorning =
            state.checkedMorning.filter(item => item !== id);

    } else {

        state.checkedMorning.push(id);

    }

    // 全部終わった？
    if (state.checkedMorning.length === morningList.length) {

        finishSound.currentTime = 0;
        finishSound.play();

        state.morningComplete = true;

        state.screen = "finish";

    }

    render();

}
// ======================================
// スタンプ画面
// ======================================

function renderStamp() {

    app.innerHTML = `

    <section class="finish-screen">

        <h1>🌸</h1>

        <h2>

            すたんぷかーど

        </h2>

        <p>

            じゅんびちゅうだから<br><br>

            もうすこしまってね💓🥰

        </p>

        <button id="backStamp">

            ⬅️ もどる

        </button>

    </section>

    `;

    document
        .getElementById("backStamp")
        .addEventListener("click", () => {

            state.screen = "start";
            render();

        });
}

// ======================================
// スタート画面イベント
// ======================================

function onClickFirst() {

    homeSound.currentTime = 0;
    homeSound.loop = true;
    homeSound.play();

    state.mode = "first";
    state.checked = [];
    state.screen = "check";

    render();

}

function onClickNormal() {

    homeSound.currentTime = 0;
    homeSound.loop = true;
    homeSound.play();

    state.mode = "normal";
    state.checked = [];
    state.screen = "check";

    render();
}

function getNextShinDay() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (const day of shinDays) {

        const d = new Date(day);
        d.setHours(0, 0, 0, 0);

        if (d >= today) {
            return d;
        }
    }

    return null;

}

function getShinCountdown() {

    const next = getNextShinDay();

    if (!next) {
        return null;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
        (next - today) /
        (1000 * 60 * 60 * 24)
    );

    return diff;

}

// ======================================
// サウンド
// ======================================
const homeSound = new Audio("assets/sounds/home.mp3");
const checkSound = new Audio("assets/sounds/check.mp3");
const finishSound = new Audio("assets/sounds/finish.mp3");
homeSound.loop = true;   // 繰り返し再生

// ======================================
// チェック切り替え
// ======================================

function toggleCheck(id) {

    // 音を鳴らす
    checkSound.currentTime = 0;
    checkSound.play();

    if (state.checked.includes(id)) {

        state.checked = state.checked.filter(item => item !== id);

    } else {

        state.checked.push(id);

    }

    render();

}

function createCalendar(year, month, nextDay) {

    const today = new Date();

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();

    const startWeek = firstDay.getDay();

    let html = `

    <div class="calendar-box">

        <h3 class="month-title">
💖🌈 ${month + 1}がつ 🌈💖
</h3>

        <div class="calendar">

            <div class="week">日</div>
            <div class="week">月</div>
            <div class="week">火</div>
            <div class="week">水</div>
            <div class="week">木</div>
            <div class="week">金</div>
            <div class="week">土</div>

    `;

    for (let i = 0; i < startWeek; i++) {
        html += `<div class="day empty"></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {

        let cls = "day";

        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cls += " today";
        }

        if (
            nextDay &&
            d === nextDay.getDate() &&
            month === nextDay.getMonth() &&
            year === nextDay.getFullYear()
        ) {
            cls += " shin";
        }

        let text = d;

        html += `
<div class="${cls}">
    ${text}
</div>
`;
    }

    html += `
        </div>
    </div>
    `;

    return html;
}

const days = getShinCountdown();

function renderCountdown() {

    const next = getNextShinDay();

    // ★今日は何月？
    const today = new Date();

    const year1 = today.getFullYear();
    const month1 = today.getMonth();

    // ★次の月
    const nextMonth = new Date(year1, month1 + 1, 1);

    const calendarHTML =
        createCalendar(year1, month1, next) +
        createCalendar(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            next
        );

    app.innerHTML = `

    <section class="finish-screen">

        <h2>
        💛💚💙❤️🧡<br>
        つぎ あえるまで<br>
        💛💚💙❤️🧡
        </h2>

        <h1>
        あと ${getShinCountdown()} にち♡
        </h1>

        <div class="calendar-wrapper">

            ${calendarHTML}

        </div>

        <div class="calendar-legend">

<div class="legend-item">
<div class="today-color"></div>
きょう
</div>

<div class="legend-item">
<div class="shin-color"></div>
しんくんにあえるひ
</div>

</div>

        <button id="backCountdown">

            ⬅️ もどる

        </button>

    </section>

    `;

    document
        .getElementById("backCountdown")
        .addEventListener("click", () => {

            state.screen = "start";
            render();

        });
}

// ======================================
// じゃんけん
// ======================================

function renderJanken() {

    app.innerHTML = `

<section class="start-screen">

<h2>

🐰💕🐱<br>
じゃんけんたいむ

</h2>

<div style="
display:flex;
justify-content:center;
gap:30px;
margin:30px 0;
">

<img
src="assets/images/rabbit.png"
style="width:150px;">

<img
src="assets/images/cat.png"
style="width:150px;">

</div>

<p>

ぐー・ちょき・ぱーを
えらんでね♡

</p>

<button class="hand" data-hand="rock">
✊<br>ぐー
</button>

<button class="hand" data-hand="scissors">
✌️<br>ちょき
</button>

<button class="hand" data-hand="paper">
✋<br>ぱー
</button>

<button id="backJanken">
⬅️<br>
もどる
</button>

</section>

`;

    document.querySelectorAll(".hand").forEach(button => {

        button.addEventListener("click", () => {

            playJanken(button.dataset.hand);

        });

    });

    document
        .getElementById("backJanken")
        .addEventListener("click", () => {

            state.screen = "start";

            render();

        });

}

function playJanken(player) {

    const hands = [
        "rock",
        "scissors",
        "paper"
    ];

    const cpu =
        hands[Math.floor(Math.random() * 3)];

    state.playerHand = player;

    state.cpuHand = cpu;

    if (player === cpu) {

        state.result = "🤝 あいこ！";

    }

    else if (

        player === "rock" && cpu === "scissors" ||

        player === "scissors" && cpu === "paper" ||

        player === "paper" && cpu === "rock"

    ) {

        state.result = "🎉 かった！！";

    }

    else {

        state.result = "🥺 まけちゃった";

    }

    state.screen = "jankenResult";

    render();

}

function renderJankenResult() {

    const icon = {

        rock: "✊",

        scissors: "✌️",

        paper: "✋"

    };

    app.innerHTML = `

<section class="finish-screen">

<h2>

じゃーーーんけー－－－－ん！！

</h2>

<div style="font-size:90px;">

💃 ${icon[state.playerHand]}

<br><br>

VS

<br><br>

🐱 ${icon[state.cpuHand]}

</div>

<h1>

${state.result}

</h1>

<button id="again">

🌸<br>
もういっかい！

</button>

<button id="backJanken">

⬅️<br>
もどる

</button>

</section>

`;

    document
        .getElementById("again")
        .addEventListener("click", () => {

            state.screen = "janken";

            render();

        });

    document
        .getElementById("backJanken")
        .addEventListener("click", () => {

            state.screen = "start";

            render();

        });

}