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
