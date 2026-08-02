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
