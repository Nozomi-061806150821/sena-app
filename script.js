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

    { id: "temperature", icon: "🌡️", text: "たいおん" },

    { id: "items", icon: "🎒", text: "もちものちぇっく" },

    { id: "breakfast", icon: "🍚", text: "あさごはん・かみのけ" },

    { id: "brush", icon: "🪥", text: "はみがき・おかお" }

];


// ======================================
// アプリの状態
// ======================================

const state = {

    screen: "start",

    mode: null,

    checked: [],

    checkedMorning: [],

    morningComplete: false

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

function render() {

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

            alert("もうすぐできるよ♡");

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