// ======================================
// Supabase 接続
// ======================================

const SUPABASE_URL = "https://ucgmplxcfsaiqcmqnuzv.supabase.co";
const SUPABASE_KEY = "sb_publishable_XzAlNY6JAiiOmnHUF2LCEw_EPefqeLQ";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

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
            "おともだちと たのしいことが はじまりそう🌸",
            "たのしいことが いっぱい みつかりそう♡",
            "にこにこしていると いいことが おこるかも💕",
            "おともだちと いっぱい わらえそう！",
            "せんせいと たのしく おはなしできそう✨",
            "きょうは るんるんきぶんで すごせそう🌈"
        ],

        luckyPlay: [
            "おままごと",
            "おえかき",
            "おにごっこ",
            "おもちゃあそび",
            "しっぽとり"
        ],

        luckyItem: [
            "おきにいりの おもちゃ",
            "おえかきの くれよん",
            "すきな ぬいぐるみ",
            "かわいい たおる",
            "おきにいりの おようふく"
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
// 💍 結婚記念日
// ======================================

const anniversaryDay = new Date(2027, 1, 27);


// ======================================
// アプリの状態
// ======================================

const state = {

    screen: "start",

    calendarStart: new Date().getMonth(),

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

つぎのいべんとまで<br>

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

    for (let i = 0; i < 7; i++) {

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
                ${state.stamps} / 7
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

// ======================================
// 💍 結婚記念日まであと何日？
// ======================================

function getAnniversaryCountdown() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const day = new Date(anniversaryDay);

    day.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
        (day - today) /
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

// ======================================
// 📅 カレンダー作成
// ======================================

function createCalendar(year, month, events) {

    const today = new Date();

    let html = `

    <div class="calendar-box">

        <h3 class="month-title">
            🌈 ${year}ねん ${month + 1}がつ 🌈
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

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();

    const startWeek = firstDay.getDay();

    // 月初までの空白
    for (let i = 0; i < startWeek; i++) {

        html += `
            <div class="day empty"></div>
        `;

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

        // YYYY-MM-DD を作る
        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

        // この日のイベント
        const dayEvents = events.filter(event =>
            event.event_date === dateString
        );

        // しんくんにあえるひ
        const isShinDay = dayEvents.some(event =>
            event.event_type === "shin"
        );

        if (isShinDay) {

            cls += " shin";

        }

        // ======================================
        // 🌸 イベントがあるか
        // ======================================

        const hasEvent = dayEvents.length > 0;

        if (hasEvent) {

            cls += " has-event";

        }

        // ======================================
        // 💖 カレンダーに表示するイベント
        // ======================================

        let eventHTML = "";

        if (dayEvents.length > 0) {

            eventHTML = dayEvents
                .map(event => {

                    // 今は icon カラムがなくてもOK
                    // 将来 icon カラムを追加したら自動的に使える
                    const icon = event.icon || "🌸";

                    return `
                        <div class="calendar-event">
                            ${icon}
                        </div>
                    `;

                })
                .join("");

        }

        html += `

        <div
            class="${cls}"
            data-date="${dateString}"
        >

            <div class="calendar-day-number">
                ${d}
            </div>

            ${eventHTML}

        </div>

        `;

    }

    html += `

        </div>

    </div>

    `;

    return html;
}

async function renderCountdown() {

    // ======================================
    // ☁️ Supabaseからイベントを取得
    // ======================================

    const events = await loadEventsFromSupabase();

    // ======================================
    // 💖 次のしんくんにあえるひ
    // ======================================

    const nextShin = getNextShinEvent(events);

    // ======================================
    // 📅 今日
    // ======================================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    // ======================================
    // 💖 しんくんカウントダウン
    // ======================================

    let shinCountdownText = "よていは まだないよ♡";

    if (nextShin) {

        const diff = Math.ceil(
            (nextShin.date - today) /
            (1000 * 60 * 60 * 24)
        );

        shinCountdownText = `あと ${diff} にち♡`;

    }

    // ======================================
    // 📅 表示する最初の月
    // ======================================

    const startMonth = new Date(
        today.getFullYear(),
        state.calendarStart,
        1
    );

    // ======================================
    // 📅 2か月分のカレンダーを作成
    // ======================================

    let calendarHTML = "";

    for (let i = 0; i < 2; i++) {

        const targetMonth = new Date(
            startMonth.getFullYear(),
            startMonth.getMonth() + i,
            1
        );

        calendarHTML += createCalendar(
            targetMonth.getFullYear(),
            targetMonth.getMonth(),
            events
        );

    }

    // ======================================
    // 📅 カレンダーのタイトル
    // ======================================

    const secondMonth = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + 1,
        1
    );

    const calendarYearText =
        startMonth.getFullYear() === secondMonth.getFullYear()
            ? `${startMonth.getFullYear()}ねん`
            : `${startMonth.getFullYear()}ねん・${secondMonth.getFullYear()}ねん`;

    const calendarPeriodText =
        `${startMonth.getMonth() + 1}がつ・${secondMonth.getMonth() + 1}がつ`;

    // ======================================
    // 🖥️ 画面
    // ======================================

    app.innerHTML = `

    <section class="finish-screen">

        <h2>
            💛💚💙❤️🧡<br>
            つぎの いべんとまで<br>
            💛💚💙❤️🧡
        </h2>

        <h1>
            ${shinCountdownText}
        </h1>


        <!-- 💍 結婚記念日 -->

        <div class="anniversary-countdown">

            💗💗💗

            <h2>
                あいちにいくまで
            </h2>

            <h1>
                あと ${getAnniversaryCountdown()} にち☆
            </h1>

            <p>
                🌟 よていは 2027ねん 2がつ 27にち
            </p>

        </div>


        <!-- 📅 カレンダー切り替え -->

        <div class="calendar-navigation">

            <h3 class="calendar-period-title">
                ${calendarYearText}<br>
                ${calendarPeriodText}
            </h3>

            <div class="calendar-nav-buttons">

                <button id="prevCalendar">
                    〈
                </button>

                <button id="nextCalendar">
                    〉
                </button>

            </div>

        </div>


        <!-- 📅 カレンダー -->

        <div class="calendar-wrapper">

            ${calendarHTML}

        </div>


        <!-- 📖 凡例 -->

        <div class="calendar-legend">

            <div class="legend-item">

                <div class="today-color"></div>

                きょう

            </div>

            <div class="legend-item">

                <div class="shin-color"></div>

                しんくんに あえるひ

            </div>

        </div>


        <!-- ⬅️ 戻る -->

        <button id="backCountdown">

            ⬅️ もどる

        </button>

    </section>

    `;


    // ======================================
    // 〈 前の月へ
    // ======================================

    document
        .getElementById("prevCalendar")
        .addEventListener("click", () => {

            state.calendarStart -= 1;

            renderCountdown();

        });


    // ======================================
    // 〉 次の月へ
    // ======================================

    document
        .getElementById("nextCalendar")
        .addEventListener("click", () => {

            state.calendarStart += 1;

            renderCountdown();

        });

    // ======================================
    // 📅 カレンダーの日付をタップ
    // ======================================

    document
        .querySelectorAll(".calendar .day:not(.empty)")
        .forEach(day => {

            day.addEventListener("click", () => {

                const date = day.dataset.date;

                // その日のイベントを取得
                const dayEvents = events.filter(event =>
                    event.event_date === date
                );

                // イベントがない日は何もしない
                if (dayEvents.length === 0) {
                    return;
                }


                // ======================================
                // 💗 すでに開いている吹き出しを閉じる
                // ======================================

                const oldPopup =
                    document.querySelector(".event-popup");

                if (oldPopup) {
                    oldPopup.remove();
                }


                // ======================================
                // 🌸 イベント内容
                // ======================================

                const eventHTML = dayEvents
                    .map(event => `
                    <div class="event-popup-item">
                        🌸 ${event.title}
                    </div>
                `)
                    .join("");


                // ======================================
                // 💗 吹き出しを作る
                // ======================================

                const popup =
                    document.createElement("div");

                popup.className = "event-popup";


                // 日付を見やすくする
                const [year, month, dayNumber] =
                    date.split("-");


                popup.innerHTML = `

                <button
                    class="event-popup-close"
                    aria-label="とじる"
                >
                    ×
                </button>

                <div class="event-popup-date">
                    ${month}がつ${dayNumber}にち
                </div>

                <div class="event-popup-events">
                    ${eventHTML}
                </div>

            `;


                // ======================================
                // 📍 日付の中に追加
                // ======================================

                day.appendChild(popup);


                // ======================================
                // 📱 画面からはみ出さないように調整
                // ======================================

                requestAnimationFrame(() => {

                    const rect =
                        popup.getBoundingClientRect();

                    const margin = 8;

                    let shiftX = 0;


                    // 左にはみ出す
                    if (rect.left < margin) {

                        shiftX =
                            margin - rect.left;

                    }


                    // 右にはみ出す
                    if (
                        rect.right >
                        window.innerWidth - margin
                    ) {

                        shiftX =
                            window.innerWidth -
                            margin -
                            rect.right;

                    }


                    if (shiftX !== 0) {

                        popup.style.marginLeft =
                            `${shiftX}px`;

                    }

                });


                // ======================================
                // ✕ 閉じる
                // ======================================

                popup
                    .querySelector(".event-popup-close")
                    .addEventListener("click", (e) => {

                        e.stopPropagation();

                        popup.remove();

                    });

            });

        });

    // ======================================
    // ⬅️ 戻る
    // ======================================

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
<section class="janken-screen">

    <!-- キラキラ -->
    <div class="janken-sparkle sparkle-1">✨</div>
    <div class="janken-sparkle sparkle-2">💎</div>
    <div class="janken-sparkle sparkle-3">✨</div>
    <div class="janken-sparkle sparkle-4">💖</div>
    <div class="janken-sparkle sparkle-5">⭐</div>

    <!-- タイトル -->
    <div class="janken-title-area">

        <div class="janken-crown">
            👑✨👑
        </div>

        <h2 class="janken-title">
            じゃんけんたいむ
        </h2>

        <p class="janken-subtitle">
            どっちが かつかな？
        </p>

    </div>


    <!-- キャラクターバトル -->
    <div class="janken-battle">

        <!-- うさぎ -->
        <div class="janken-character rabbit-character">

            <div class="character-name">
                🐰 うさぎちゃん
            </div>

            <div class="character-image-wrap">
                <img
                    src="assets/images/rabbit.png"
                    class="janken-character-image"
                >
            </div>

            <div class="character-label">
                がんばれ〜！
            </div>

        </div>


        <!-- VS -->
        <div class="janken-vs">

            <div class="vs-star">✨</div>

            <div class="vs-text">
                VS
            </div>

            <div class="vs-star">✨</div>

        </div>


        <!-- ねこ -->
        <div class="janken-character cat-character">

            <div class="character-name">
                🐱 ねこちゃん
            </div>

            <div class="character-image-wrap">
                <img
                    src="assets/images/cat.png"
                    class="janken-character-image"
                >
            </div>

            <div class="character-label">
                まけないよ〜！
            </div>

        </div>

    </div>


    <!-- セリフ -->
    <div class="janken-message">
        ✨ ぐー・ちょき・ぱー ✨
        <br>
        すきなのを えらんでね♡
    </div>


    <!-- 手のボタン -->
    <div class="janken-hands">

        <button class="janken-hand hand-rock" data-hand="rock">

            <span class="hand-icon">
                ✊
            </span>

            <span class="hand-name">
                ぐー
            </span>

            <span class="hand-decoration">
                💎
            </span>

        </button>


        <button class="janken-hand hand-scissors" data-hand="scissors">

            <span class="hand-icon">
                ✌️
            </span>

            <span class="hand-name">
                ちょき
            </span>

            <span class="hand-decoration">
                ⭐
            </span>

        </button>


        <button class="janken-hand hand-paper" data-hand="paper">

            <span class="hand-icon">
                ✋
            </span>

            <span class="hand-name">
                ぱー
            </span>

            <span class="hand-decoration">
                💖
            </span>

        </button>

    </div>


    <!-- もどる -->
    <button id="backJanken" class="janken-back-button">
        ⬅️
        <br>
        もどる
    </button>

</section>
`;


    // ======================================
    // 手のボタン
    // ======================================

    document.querySelectorAll(".janken-hand").forEach(button => {

        button.addEventListener("click", () => {

            // 連打防止
            document.querySelectorAll(".janken-hand").forEach(btn => {
                btn.disabled = true;
            });

            // 押したボタンをちょっと強調
            button.classList.add("selected");

            playJanken(button.dataset.hand);

        });

    });

    // ======================================
    // もどる
    // ======================================

    document.getElementById("backJanken").addEventListener("click", () => {

        state.screen = "start";
        render();

    });

}

// ======================================
// じゃんけんの勝負処理
// ======================================

function playJanken(hand) {

    // せなが選んだ手
    state.playerHand = hand;

    // ねこちゃんの手をランダムに決める
    const hands = ["rock", "scissors", "paper"];

    state.cpuHand =
        hands[Math.floor(Math.random() * hands.length)];

    // 勝ち負けを判定
    if (state.playerHand === state.cpuHand) {

        state.result = "あいこ";

    } else if (
        (state.playerHand === "rock" &&
            state.cpuHand === "scissors") ||

        (state.playerHand === "scissors" &&
            state.cpuHand === "paper") ||

        (state.playerHand === "paper" &&
            state.cpuHand === "rock")
    ) {

        state.result = "かった";

    } else {

        state.result = "まけ";

    }

    // 結果画面へ！
    state.screen = "jankenResult";

    render();
}

// ======================================
// じゃんけんの手の名前
// ======================================

function getHandName(hand) {

    const names = {
        rock: "ぐー！",
        scissors: "ちょき！",
        paper: "ぱー！"
    };

    return names[hand] || "";

}

// ======================================
// じゃんけん結果
// ======================================

function renderJankenResult() {

    const icon = {
        rock: "✊",
        scissors: "✌️",
        paper: "✋"
    };


    // ======================================
    // 結果によって表示を変更
    // ======================================

    let resultClass = "";
    let resultMessage = "";
    let resultSubMessage = "";
    let resultIcon = "";

    if (state.result.includes("かった")) {

        resultClass = "janken-win";

        resultMessage = "かったーーー！！";

        resultSubMessage = "すごい！ せなちゃんの かち♡";

        resultIcon = "👑✨";

    }
    else if (state.result.includes("まけ")) {

        resultClass = "janken-lose";

        resultMessage = "まけちゃった〜";

        resultSubMessage = "もういっかい ちょうせんしよう♡";

        resultIcon = "🌸💖";

    }
    else {

        resultClass = "janken-draw";

        resultMessage = "あいこーーー！";

        resultSubMessage = "もういっかい しょうぶ♡";

        resultIcon = "✨💎✨";

    }


    app.innerHTML = `
<section class="janken-result-screen ${resultClass}">

    <!-- 背景キラキラ -->
    <div class="result-sparkle result-sparkle-1">✨</div>
    <div class="result-sparkle result-sparkle-2">💖</div>
    <div class="result-sparkle result-sparkle-3">⭐</div>
    <div class="result-sparkle result-sparkle-4">💎</div>
    <div class="result-sparkle result-sparkle-5">✨</div>


    <!-- じゃんけん演出 -->
    <div class="janken-pon">

        <span>じゃん！</span>
        <span>けん！</span>
        <strong>ぽーーん！！</strong>

    </div>


    <!-- タイトル -->
    <div class="result-title">

        <div class="result-crown">
            ${resultIcon}
        </div>

        <h2>
            しょうぶの けっか！
        </h2>

    </div>


    <!-- バトル -->
    <div class="result-battle">


        <!-- せな側 -->
        <div class="result-player">

            <div class="result-name">
                💖 せなちゃん
            </div>

            <div class="result-hand-card player-card">

                <div class="card-shine"></div>

                <span class="result-hand-icon">
                    ${icon[state.playerHand]}
                </span>

            </div>

            <div class="result-hand-name">
                ${getHandName(state.playerHand)}
            </div>

        </div>


        <!-- VS -->
        <div class="result-vs">

            <div>✨</div>

            <strong>VS</strong>

            <div>✨</div>

        </div>


        <!-- ねこ側 -->
        <div class="result-player">

            <div class="result-name">
                🐱 ねこちゃん
            </div>

            <div class="result-hand-card cpu-card">

                <div class="card-shine"></div>

                <span class="result-hand-icon">
                    ${icon[state.cpuHand]}
                </span>

            </div>

            <div class="result-hand-name">
                ${getHandName(state.cpuHand)}
            </div>

        </div>

    </div>


    <!-- 結果 -->
    <div class="result-message-box">

        <div class="result-main-message">
            ${resultMessage}
        </div>

        <div class="result-sub-message">
            ${resultSubMessage}
        </div>

    </div>


    <!-- もういっかい -->
    <button id="again" class="janken-again-button">

        <span class="again-star">✨</span>

        <span>
            もういっかい！
        </span>

        <span class="again-star">✨</span>

    </button>


    <!-- もどる -->
    <button id="backJanken" class="janken-back-button">

        ⬅️
        <br>
        もどる

    </button>

</section>
`;


    // ======================================
    // もういっかい
    // ======================================

    document.getElementById("again").addEventListener("click", () => {

        state.screen = "janken";

        render();

    });


    // ======================================
    // もどる
    // ======================================

    document.getElementById("backJanken").addEventListener("click", () => {

        state.screen = "start";

        render();

    });

}

// ======================================
// Supabase イベント取得
// ======================================

async function loadEventsFromSupabase() {

    const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

    if (error) {

        console.error("イベント取得エラー:", error);

        return [];

    }

    console.log("Supabaseから取得したイベント：", data);

    return data;

}

// ======================================
// 次の「しんくんにあえるひ」を取得
// ======================================

function getNextShinEvent(events) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const shinEvents = events
        .filter(event => event.event_type === "shin")
        .map(event => {

            const [year, month, day] = event.event_date
                .split("-")
                .map(Number);

            const date = new Date(year, month - 1, day);

            return {
                ...event,
                date: date
            };

        })
        .filter(event => event.date >= today)
        .sort((a, b) => a.date - b.date);

    return shinEvents[0] || null;
}

// ======================================
// 次のしんくん動作確認
// ======================================

async function testNextShinEvent() {

    const events = await loadEventsFromSupabase();

    const nextShin = getNextShinEvent(events);

    console.log("次のしんくんにあえるひ：", nextShin);

}

testNextShinEvent();