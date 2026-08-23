import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

//============================
// THÔNG TIN HỌC SINH
//============================

const studentName = localStorage.getItem("studentName");
const studentPhone = localStorage.getItem("studentPhone");

const userBox = document.getElementById("userBox");
const loginBtn = document.getElementById("loginBtn");

//============================
// HIỂN THỊ USER
//============================

if(studentName){

    if(loginBtn){
        loginBtn.style.display="none";
    }

    userBox.innerHTML=`
        👋 Xin chào <b>${studentName}</b>
        <br><br>
        <button id="logoutBtn"
        style="
        padding:8px 18px;
        border:none;
        border-radius:8px;
        background:#fff;
        color:#0057ff;
        cursor:pointer;
        font-weight:bold;">
        Đăng xuất
        </button>
    `;

    document
    .getElementById("logoutBtn")
    .onclick=logout;

}

//============================
// ĐĂNG XUẤT
//============================

function logout(){

    localStorage.removeItem("studentName");
    localStorage.removeItem("studentPhone");

    location.reload();

}

//============================
// LOAD MỤC TIÊU
//============================

async function loadGoal(){

    document.getElementById("goalCard").style.display="block";

    if(!studentPhone){

        document.getElementById("goalName").innerHTML=
        "🎯 Hãy đăng nhập để bắt đầu.";

        return;

    }

    try{

        const ref = doc(db, "hoc_sinh", studentPhone);
        const snap=await getDoc(ref);
        console.log("Có dữ liệu:", snap.exists());

        if (snap.exists()) {
        console.log(snap.data());
        }
        if(!snap.exists()){

            document.getElementById("goalName").innerHTML=
            "🎯 Em chưa thiết lập mục tiêu";

            document.getElementById("goalPercent").innerHTML=
            "0% hoàn thành";

            document.getElementById("goalBar").style.width="0%";

            document.getElementById("goalBtn").innerHTML=
            "🎯 Thiết lập mục tiêu";

            return;

        }

        const data=snap.data();

       let html = "";

if (data.goals && data.goals.length > 0) {

    data.goals.forEach(item => {

        html += `
        <span class="goal-tag">
            🎯 ${item}
        </span>
        `;

    });

}
else if(data.goal){

    html = `
    <span class="goal-tag">
        🎯 ${data.goal}
    </span>
    `;

}
else{

    html = `
    <span class="goal-tag">
        Chưa thiết lập mục tiêu
    </span>
    `;

}

document.getElementById("goalName").innerHTML = html;

        const progress=data.progress||0;

        document.getElementById("goalBar").style.width=
        progress+"%";

        document.getElementById("goalPercent").innerHTML=
        progress+"% hoàn thành";

        document.getElementById("streak").innerHTML=
        (data.streak||0)+" ngày";

        document.getElementById("badge").innerHTML=
        data.badge||"🌱 Khởi đầu";

        document.getElementById("questionCount").innerHTML=
        (data.totalQuestion||0)+" câu";

        document.getElementById("examCount").innerHTML=
        (data.totalExam||0)+" đề";

        document.getElementById("goalBtn").innerHTML=
        "⚙️ Chỉnh sửa mục tiêu";

    }

    catch(err){

        console.log(err);

    }

}

loadGoal();

//============================
// NÚT MỤC TIÊU
//============================

document
.getElementById("goalBtn")
.onclick=function(){

    if(!studentPhone){

        location.href="login.html";

        return;

    }

    location.href="goal.html";

}

//============================
// VÀO THI
//============================

window.vaoThi=function(link){

    if(!studentPhone){

        alert("Vui lòng đăng nhập trước.");

        location.href="login.html";

        return;

    }

    location.href=link;

}
/* =====================================
   TRÁI TIM HẠT CHUYỂN ĐỘNG
===================================== */

const canvas = document.getElementById("heartCanvas");

if(canvas){

    const ctx = canvas.getContext("2d");

    const particles = [];

    function resizeCanvas(){

        const rect =
            canvas.getBoundingClientRect();

        canvas.width = rect.width;

        canvas.height = rect.height;

    }


    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =========================
       CÔNG THỨC HÌNH TRÁI TIM
    ========================= */

    function heartShape(t){

        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 * Math.cos(t)
            -
            5 * Math.cos(2 * t)
            -
            2 * Math.cos(3 * t)
            -
            Math.cos(4 * t);


        return{
            x:x,
            y:y
        };

    }


    /* =========================
       TẠO HẠT
    ========================= */

    function createParticles(){

        particles.length = 0;


        const particleCount =
            window.innerWidth < 600
            ? 700
            : 1600;


        for(
            let i = 0;
            i < particleCount;
            i++
        ){

            const angle =
                Math.random()
                *
                Math.PI
                *
                2;


            particles.push({

                angle:angle,

                speed:
                    0.001
                    +
                    Math.random()
                    *
                    0.003,


                offsetX:
                    (
                        Math.random()
                        - 0.5
                    )
                    *
                    18,


                offsetY:
                    (
                        Math.random()
                        - 0.5
                    )
                    *
                    18,


                size:
                    0.8
                    +
                    Math.random()
                    *
                    1.8,


                phase:
                    Math.random()
                    *
                    Math.PI
                    *
                    2

            });

        }

    }


    createParticles();


    window.addEventListener(
        "resize",
        function(){

            resizeCanvas();

            createParticles();

        }
    );


    /* =========================
       VẼ VÀ CHUYỂN ĐỘNG
    ========================= */

    function animate(time){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const centerX =
            canvas.width / 2;


        const centerY =
            canvas.height / 2
            +
            25;


        /* NHỊP ĐẬP */

        const beat =
            1
            +
            Math.sin(
                time * 0.003
            )
            *
            0.035;


        const scale =
            Math.min(

                canvas.width / 40,

                canvas.height / 32

            )
            *
            beat;


        particles.forEach(function(p){

            const movingAngle =
                p.angle
                +
                time
                *
                p.speed;


            const point =
                heartShape(
                    movingAngle
                );


            const waveX =
                Math.sin(
                    time * 0.002
                    +
                    p.phase
                )
                *
                p.offsetX;


            const waveY =
                Math.cos(
                    time * 0.002
                    +
                    p.phase
                )
                *
                p.offsetY;


            const x =
                centerX
                +
                point.x
                *
                scale
                +
                waveX;


            const y =
                centerY
                -
                point.y
                *
                scale
                +
                waveY;


            const alpha =
                0.5
                +
                Math.sin(
                    time * 0.003
                    +
                    p.phase
                )
                *
                0.3;


            ctx.beginPath();


            ctx.arc(

                x,

                y,

                p.size,

                0,

                Math.PI * 2

            );


            ctx.fillStyle =
                "rgba(255,105,180,"
                +
                alpha
                +
                ")";


            ctx.fill();

        });


        requestAnimationFrame(
            animate
        );

    }


    requestAnimationFrame(
        animate
    );


    /* =====================================
       CHỮ HIỆN DẦN TỪNG CHỮ
    ===================================== */

    const messageBox =
        document.getElementById(
            "heartMessage"
        );


    const message = [

        "IU TOÁN",

        "CÙNG THẦY HOÀNG"

    ];


    let wordIndex = 0;


    function showMessage(){

        if(
            wordIndex
            >=
            message.length
        ){

            return;

        }


        const word =
            document.createElement(
                "div"
            );


        word.className =
            "heart-word";


        word.innerHTML =
            message[wordIndex];


        word.style.animationDelay =
            "0.1s";


        messageBox.appendChild(
            word
        );


        wordIndex++;


        setTimeout(

            showMessage,

            900

        );

    }


    setTimeout(

        showMessage,

        1000

    );

}
/* ==============================
   TRÁI TIM IU TOÁN CÙNG THẦY HOÀNG
================================= */

const heartCanvas = document.getElementById("heartCanvas");
const heartMessage = document.getElementById("heartMessage");

if (heartCanvas && heartMessage) {

    const ctx = heartCanvas.getContext("2d");

    let width;
    let height;
    let particles = [];

    function resizeHeart() {

        const rect = heartCanvas.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const ratio = window.devicePixelRatio || 1;

        heartCanvas.width = width * ratio;
        heartCanvas.height = height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resizeHeart();

    window.addEventListener("resize", () => {

        resizeHeart();

        createHeart();

    });


    /* ==============================
       TẠO HÌNH TRÁI TIM
    ================================= */

    function heartPoint(t) {

        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        return { x, y };
    }


    function createHeart() {

        particles = [];

        const totalParticles = 1800;

        const scale = Math.min(width, height) * 0.026;

        for (let i = 0; i < totalParticles; i++) {

            const t =
                (Math.PI * 2 * i) / totalParticles;

            const point = heartPoint(t);

            const spread = (Math.random() - 0.5) * 20;

            const targetX =
                width / 2
                + point.x * scale
                + spread;

            const targetY =
                height / 2
                - point.y * scale
                + spread;

            particles.push({

                x:
                    width / 2
                    + (Math.random() - 0.5) * width,

                y:
                    height / 2
                    + (Math.random() - 0.5) * height,

                targetX: targetX,

                targetY: targetY,

                size:
                    Math.random() * 2.8 + 1,

                speed:
                    Math.random() * 0.03 + 0.02,

                alpha:
                    Math.random() * 0.5 + 0.5

            });

        }

    }


    createHeart();


    /* ==============================
       VẼ + CHUYỂN ĐỘNG TRÁI TIM
    ================================= */

    let startTime = Date.now();

    function animateHeart() {

        ctx.clearRect(0, 0, width, height);

        const elapsed =
            (Date.now() - startTime) / 1000;

        particles.forEach((p) => {

            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;

            p.x += dx * p.speed;
            p.y += dy * p.speed;

            const pulse =
                Math.sin(elapsed * 2) * 0.015 + 1;

            const drawX =
                width / 2
                + (p.x - width / 2) * pulse;

            const drawY =
                height / 2
                + (p.y - height / 2) * pulse;

            ctx.beginPath();

            ctx.arc(
                drawX,
                drawY,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 80, 170, ${p.alpha})`;

            ctx.fill();

        });

        requestAnimationFrame(animateHeart);

    }

    animateHeart();


    /* ==============================
       CHỮ HIỆN TỪNG CHỮ
    ================================= */

    const message =
        "IU TOÁN CÙNG THẦY HOÀNG";

    let characterIndex = 0;

    heartMessage.innerHTML = "";

    function typeMessage() {

        if (characterIndex < message.length) {

            heartMessage.innerHTML +=
                message.charAt(characterIndex);

            characterIndex++;

            setTimeout(
                typeMessage,
                110
            );

        }

    }


    /* Đợi trái tim tạo hình rồi mới hiện chữ */

    setTimeout(() => {

        typeMessage();

    }, 2200);

}
