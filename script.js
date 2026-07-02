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
        { id: "cup", icon: "🥤", text: "こっぷ と こっぷいれ" },
        { id: "tea", icon: "🧃", text: "むぎちゃ" }
    ],

    normal: [
        { id: "towel", icon: "🧺", text: "たおる（２まい）" },
        { id: "shirt", icon: "👕", text: "はんそで" },
        { id: "pants", icon: "👖", text: "ずぼん" },
        { id: "underwear", icon: "👙", text: "したぎ" },
        { id: "cup", icon: "🥤", text: "こっぷ と こっぷいれ" },
        { id: "tea", icon: "🧃", text: "むぎちゃ" }
    ]
};

// ======================================
// アプリの状態
// ======================================

const state = {

    screen: "start",

    mode: null,

    checked: []

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

        state.screen = "finish";

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

<h2>
👑<br>
せなの じゅんびらんど
</h2>

<button id="morningButton">

💖<br>
あさのじゅんび

</button>

<button id="stampButton">

🌸<br>
すたんぷかーど

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
            もういちど

        </button>

    </section>

    `;

    document
        .getElementById("backButton")
        .addEventListener("click", () => {

            state.checked = [];
            state.mode = null;
            state.screen = "start";

            render();

        });

}

// ======================================
// メニュー画面
// ======================================

function renderMenu() {

    app.innerHTML = `

    <section class="start-screen">

        <h2>
            🌞<br>
            あさのじゅんび
        </h2>

        <button id="firstButton">

            💖<br>
            こんしゅう はじめて<br>
            ほいくえんに いくよ！

        </button>

        <button id="normalButton">

            💜<br>
            こんしゅう なんかいか<br>
            ほいくえんに いってるよ！

        </button>

        <button id="backMenu">

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
        .getElementById("backMenu")
        .addEventListener("click", () => {

            state.screen = "start";
            render();

        });

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