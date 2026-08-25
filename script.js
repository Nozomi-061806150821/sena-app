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
        { id: "cup", icon: "🥤", text: "こっぷ と こっぷいれ" },
        { id: "tea", icon: "🧃", text: "むぎちゃ" }
    ],

    normal: [
        { id: "towel", icon: "🧺", text: "たおる（２まい）" },
        { id: "shirt", icon: "👕", text: "はんそで" },
        { id: "pants", icon: "👖", text: "ずぼん" },
        { id: "underwear", icon: "👙", text: "したぎ" },
        { id: "bag", icon: "🛍️", text: "よごれた せんたくものを いれる ふくろ" },
        { id: "cup", icon: "🥤", text: "こっぷ と こっぷいれ" },
        { id: "tea", icon: "🧃", text: "むぎちゃ" }
    ]
};

const morningList = [

    { id: "toilet", icon: "🚽", text: "といれ" },

    { id: "clothes", icon: "👕", text: "おきがえ" },

    { id: "pajama", icon: "🛏️", text: "ぱじゃまをかたづける" },

    { id: "temperature", icon: "🌡️", text: "たいおん" },

    { id: "items", icon: "🎒", text: "もちものちぇっく" },

    { id: "brushHair", icon: "🧜‍♀️", text: "かみのけをとかす" },

    { id: "breakfast", icon: "🍚", text: "あさごはん・かみのけ" },

    { id: "shokki", icon: "🥄", text: "たべたものをかたづける" },

    { id: "brushTeeth", icon: "🪥", text: "はみがき・おかお" },

    { id: "contact", icon: "📖", text: "まま れんらくちょう" }
];

// ======================================
// 🔮 きょうのうらない
// ======================================

const fortunes = [

    {
        title: "おともだちと<br>めっちゃなかよくできる<br>だいきち！",

        messages: [
            "おともだちと いっしょに あそべるかも♡",
            "「いっしょに あそぼ！」って いわれるかも💕",
            "おともだちと にこにこ できそう！",
            "おともだちと たのしいことが はじまりそう🌸"
        ],

        luckyPlay: [
            "おままごと",
            "おえかき",
            "おにごっこ",
            "おもちゃあそび"
        ],

        luckyItem: [
            "おきにいりの おもちゃ",
            "おえかきの くれよん",
            "すきな ぬいぐるみ",
            "かわいい ハンカチ"
        ]
    },

    {
        title: "いちにち<br>るんるんで<br>あそべる<br>だいきち！",

        messages: [
            "きょうは いっぱい あそべそう！🌈",
            "おそとあそびが たのしくなりそう♡",
            "おへやでも おそとでも るんるん💕",
            "たのしいことが いっぱい みつかるかも！"
        ],

        luckyPlay: [
            "おにごっこ",
            "かけっこ",
            "すべりだい",
            "おままごと",
            "おもちゃあそび"
        ],

        luckyItem: [
            "ぼうし",
            "おきにいりのおもちゃ",
            "ハンカチ",
            "すきな ぬいぐるみ"
        ]
    },

    {
        title: "なにかで<br>かつやくしちゃうかも<br>だいきち！",

        messages: [
            "せんせいに ほめてもらえるかも👑",
            "「すごいね！」って いわれちゃうかも✨",
            "じょうずに できることが ありそう！🌸",
            "おてつだいで かつやくしちゃうかも💕",
            "みんなの おてほんに なっちゃうかも！"
        ],

        luckyPlay: [
            "こうさく",
            "おえかき",
            "うた",
            "おどり",
            "ブロックあそび"
        ],

        luckyItem: [
            "くれよん",
            "おえかきちょう",
            "おきにいりの ハンカチ",
            "すきな おもちゃ"
        ]
    }

];

// ======================================
// しんくんにあえるひ
// ======================================

const shinDays = [

    new Date(2026, 8, 18), // 2026/9/18
    new Date(2026, 10, 21),// 2026/11/21
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

    morningStampReceived: false,

    playerHand: null,
    cpuHand: null,
    result: "",

    // 🔮 うらない
    fortuneResult: null,
    fortuneTapCount: 0,

    // 🌸 スタンプ
    stamps: Number(localStorage.getItem("senaStamps")) || 0,
    completedCards: Number(localStorage.getItem("senaCompletedCards")) || 0,

    // 🔐 じゃんけん裏コマンド
    debugCount: 0

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

        case "fortune":
            renderFortune();
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

        // 🧹 持ち物チェック終了後にリセット
        state.checked = [];

        state.screen = "menu";

        render();

        return;
    }

    app.innerHTML = `
    <section class="check-screen">

        <h2>
            🎀<br>
            もちものちぇっく
        </h2>

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
    class="${state.morningComplete ? "" : "locked"}">

🔮<br>
きょうのうらない

${state.morningComplete ? "" : "<br>🔒"}

</button>

<button
    id="jankenButton"
    class="${state.morningComplete ? "" : "locked"}">

✌️<br>
じゃんけんたいむ

${state.morningComplete ? "" : "<br>🔒"}

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

            // 🔐 動作確認用・裏コマンド
            state.fortuneTapCount++;

            // 3回押したら強制的に占い画面へ
            if (state.fortuneTapCount >= 3) {

                state.fortuneTapCount = 0;

                state.screen = "fortune";
                render();

                return;
            }

            // 通常時
            if (!state.morningComplete) {

                alert("🔒 あさちゃれんじを がんばってね♡");

                return;

            }

            state.screen = "fortune";
            render();

        });

    document
        .getElementById("jankenButton")
        .addEventListener("click", () => {

            // 🔐 動作確認用・裏コマンド
            state.debugCount++;

            // 3回押したら強制的にじゃんけん画面へ
            if (state.debugCount >= 3) {

                state.debugCount = 0;

                state.screen = "janken";
                render();

                return;
            }

            // 通常時
            if (!state.morningComplete) {

                alert("🔒 あさちゃれんじを がんばってね♡");

                return;

            }

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

            state.morningStampReceived = false;

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

    // ======================================
    // 🎒 持ち物チェックを押したら
    // ======================================

    if (id === "items") {

        // 持ち物チェック専用の状態をリセット
        state.checked = [];

        state.screen = "mode";

        render();

        return;
    }

    // ======================================
    // 🔔 チェック音
    // ======================================

    checkSound.currentTime = 0;
    checkSound.play();

    // ======================================
    // 🌸 チェック切り替え
    // ======================================

    if (state.checkedMorning.includes(id)) {

        state.checkedMorning =
            state.checkedMorning.filter(item => item !== id);

    } else {

        state.checkedMorning.push(id);

    }

    // ======================================
    // 🌸 あさちゃれんじ全部完了
    // ======================================

    const allMorningComplete =
        morningList.every(item =>
            state.checkedMorning.includes(item.id)
        );

    if (allMorningComplete) {

        finishSound.currentTime = 0;
        finishSound.play();

        state.morningComplete = true;

        // 🌸 まだスタンプをもらっていなければ追加
        if (!state.morningStampReceived) {

            addStamp();

            state.morningStampReceived = true;

        }

        // 🎁 ご褒美画面へ
        state.screen = "finish";

        render();

        return;
    }

    render();

}
// ======================================
// スタンプ画面
// ======================================

function renderStamp() {

    const stamps = [];

    for (let i = 0; i < 5; i++) {

        if (i < state.stamps) {

            stamps.push(`
                <div class="stamp active">
                    🌸
                </div>
            `);

        } else {

            stamps.push(`
                <div class="stamp">
                    ☆
                </div>
            `);

        }

    }

    app.innerHTML = `

    <section class="stamp-screen">

        <h2 id="stampTitle">
    🌸💖🌸<br>
    すたんぷかーど
</h2>

        <div class="stamp-card">

            <h3>
                せなちゃんの<br>
                がんばりカード
            </h3>

            <div class="stamp-list">

                ${stamps.join("")}

            </div>

            <p class="stamp-count">
                ${state.stamps} / 5
            </p>

            <p>
                あさちゃれんじを<br>
                がんばるとスタンプがもらえるよ💕
            </p>

        </div>

        <div class="completed-card">

    🏆<br>
    こんぷりーとしたカード

    <strong>
        ${state.completedCards}まい
    </strong>

</div>

        <button id="backStamp">

            ⬅️<br>
            もどる

        </button>

    </section>

    `;

    document
        .getElementById("backStamp")
        .addEventListener("click", () => {

            state.screen = "start";

            render();

        });
    // ======================================
    // 🔐 保護者用・裏コマンド
    // タイトルを3回タッチ
    // ======================================

    let stampTapCount = 0;
    let stampTapTimer = null;

    document
        .getElementById("stampTitle")
        .addEventListener("click", () => {

            stampTapCount++;

            clearTimeout(stampTapTimer);

            stampTapTimer = setTimeout(() => {

                stampTapCount = 0;

            }, 1000);


            // 3回タッチで保護者モード
            if (stampTapCount >= 3) {

                stampTapCount = 0;

                const code = prompt(
                    "🔐 ほごしゃモード\n\n" +
                    "コードをいれてね"
                );


                // パスワードが違う
                if (code !== "0618") {

                    alert("ちがうよ〜🙅‍♀️");

                    return;

                }


                // ======================================
                // 🔐 保護者モード画面
                // ======================================

                app.innerHTML = `

                <section class="start-screen">

                    <h2>
                        🔐🌸🔐<br>
                        ほごしゃモード
                    </h2>


                    <!-- 🌸 スタンプ -->

                    <div class="parent-control">

                        <h3>
                            🌸 スタンプ
                        </h3>

                        <div class="parent-number">

    <button id="stampPlus" class="parent-plus">
        ＋
    </button>

    <strong id="stampValue">
        ${state.stamps}
    </strong>

    <button id="stampMinus" class="parent-minus">
        −
    </button>

                    </div>


                    <!-- 🏆 コンプリートカード -->

                   <div class="parent-number">

    <button id="cardPlus" class="parent-plus">
        ＋
    </button>

    <strong id="cardValue">
        ${state.completedCards}
    </strong>

    <button id="cardMinus" class="parent-minus">
        −
    </button>

</div>

                    </div>


                    <button id="parentBack">

                        ⬅️<br>
                        おわる

                    </button>

                </section>

                `;


                // ======================================
                // 🌸 スタンプ −1
                // ======================================

                document
                    .getElementById("stampMinus")
                    .addEventListener("click", () => {

                        if (state.stamps <= 0) {

                            return;

                        }

                        state.stamps -= 1;

                        localStorage.setItem(
                            "senaStamps",
                            String(state.stamps)
                        );

                        document
                            .getElementById("stampValue")
                            .textContent = state.stamps;

                    });


                // ======================================
                // 🌸 スタンプ ＋1
                // ======================================

                document
                    .getElementById("stampPlus")
                    .addEventListener("click", () => {

                        // 通常のスタンプ追加処理
                        addStamp();

                        // 表示を更新
                        document
                            .getElementById("stampValue")
                            .textContent =
                            state.stamps;

                        document
                            .getElementById("cardValue")
                            .textContent =
                            state.completedCards;

                    });


                // ======================================
                // 🏆 カード −1
                // ======================================

                document
                    .getElementById("cardMinus")
                    .addEventListener("click", () => {

                        if (state.completedCards <= 0) {

                            return;

                        }

                        state.completedCards -= 1;

                        localStorage.setItem(
                            "senaCompletedCards",
                            String(state.completedCards)
                        );

                        document
                            .getElementById("cardValue")
                            .textContent =
                            state.completedCards;

                    });


                // ======================================
                // 🏆 カード ＋1
                // ======================================

                document
                    .getElementById("cardPlus")
                    .addEventListener("click", () => {

                        state.completedCards += 1;

                        localStorage.setItem(
                            "senaCompletedCards",
                            String(state.completedCards)
                        );

                        document
                            .getElementById("cardValue")
                            .textContent =
                            state.completedCards;

                    });


                // ======================================
                // おわる
                // ======================================

                document
                    .getElementById("parentBack")
                    .addEventListener("click", () => {

                        state.screen = "stamp";

                        render();

                    });

            }

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

function createCalendar(year, month) {

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

    // 月初までの空白
    for (let i = 0; i < startWeek; i++) {

        html += `<div class="day empty"></div>`;

    }

    // 日付
    for (let d = 1; d <= lastDate; d++) {

        let cls = "day";

        // 今日
        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            cls += " today";

        }

        // しんくんに会える日
        const isShinDay = shinDays.some(day => {

            return (
                d === day.getDate() &&
                month === day.getMonth() &&
                year === day.getFullYear()
            );

        });

        if (isShinDay) {

            cls += " shin";

        }

        html += `

            <div class="${cls}">
                ${d}
            </div>

        `;

    }

    html += `

        </div>

    </div>

    `;

    return html;

}

function renderCountdown() {

    const next = getNextShinDay();

    // ★ 今日
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    // ======================================
    // 📅 今月・来月・再来月の3か月
    // ======================================

    let calendarHTML = "";

    for (let i = 0; i < 3; i++) {

        const targetMonth = new Date(
            year,
            month + i,
            1
        );

        calendarHTML += createCalendar(
            targetMonth.getFullYear(),
            targetMonth.getMonth()
        );

    }

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
// 🔮 うらない画面
// ======================================

function renderFortune() {

    // 3種類からランダムに選ぶ
    const fortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];

    // メッセージをランダムに選ぶ
    const message =
        fortune.messages[
        Math.floor(Math.random() * fortune.messages.length)
        ];

    // ラッキーあそび
    const luckyPlay =
        fortune.luckyPlay[
        Math.floor(Math.random() * fortune.luckyPlay.length)
        ];

    // ラッキーアイテム
    const luckyItem =
        fortune.luckyItem[
        Math.floor(Math.random() * fortune.luckyItem.length)
        ];


    app.innerHTML = `

    <section class="finish-screen">

        <h2>

            🔮💖🔮<br>
            きょうのうらない

        </h2>


        <div class="fortune-result">

            🌈✨🌈

            <h1>
                ${fortune.title}
            </h1>

            <p>
                ${message}
            </p>

            <div class="fortune-item">

                🎀<br>

                <strong>
                    きょうのラッキーあそび
                </strong>

                <br>

                ${luckyPlay}

            </div>


            <div class="fortune-item">

                🧸<br>

                <strong>
                    ラッキーアイテム
                </strong>

                <br>

                ${luckyItem}

            </div>

            🌸💖🌸

        </div>


        <button id="backFortune">

            ⬅️<br>
            もどる

        </button>

    </section>

    `;


    document
        .getElementById("backFortune")
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

// ======================================
// 🌸 スタンプを1個追加
// ======================================

function addStamp() {

    // 🌸 スタンプを1個追加
    state.stamps += 1;

    console.log("スタンプ追加:", state.stamps);

    // ⭐ 5個たまった？
    if (state.stamps >= 5) {

        // 🏆 コンプリートしたカードを1枚追加
        state.completedCards += 1;

        // 🌸 スタンプを0に戻す
        state.stamps = 0;

        // 💾 すぐ保存
        localStorage.setItem(
            "senaStamps",
            String(state.stamps)
        );

        localStorage.setItem(
            "senaCompletedCards",
            String(state.completedCards)
        );

        alert(
            "🎉🎉🎉\n\n" +
            "スタンプカード\n" +
            "コンプリート！！💕"
        );

        console.log(
            "カード完成！",
            "stamps =", state.stamps,
            "completedCards =", state.completedCards
        );

        return;
    }

    // 💾 5個未満でも保存
    localStorage.setItem(
        "senaStamps",
        String(state.stamps)
    );

    console.log(
        "保存しました:",
        state.stamps
    );
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

じゃーーーん<br>
けー－－－－ん！！

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