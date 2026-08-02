import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// ======================
// Thông tin học sinh
// ======================

const studentName = localStorage.getItem("studentName");
const studentPhone = localStorage.getItem("studentPhone");

const userBox = document.getElementById("userBox");
const loginBtn = document.getElementById("loginBtn");

if(studentName){

    userBox.innerHTML = `
        👋 Xin chào <b>${studentName}</b>
        <br><br>
        <button id="logoutBtn"
        style="
        padding:8px 16px;
        border:none;
        border-radius:8px;
        background:white;
        color:#0057ff;
        cursor:pointer;
        font-weight:bold;">
        Đăng xuất
        </button>
    `;

    if(loginBtn){
        loginBtn.style.display="none";
    }

    document.getElementById("logoutBtn").onclick = logout;

}

function logout(){

    localStorage.removeItem("studentName");
    localStorage.removeItem("studentPhone");

    location.reload();

}

// ======================
// Đọc mục tiêu
// ======================

async function loadGoal(){

    if(!studentPhone) return;

    document.getElementById("goalCard").style.display="block";

    try{

        const ref = doc(db,"goals",studentPhone);

        const snap = await getDoc(ref);

        if(!snap.exists()){

            document.getElementById("goalName").innerHTML =
            "🎯 Em chưa thiết lập mục tiêu";

            document.getElementById("goalPercent").innerHTML =
            "0% hoàn thành";

            document.getElementById("goalBar").style.width = "0%";

            document.getElementById("streak").innerHTML = "0 ngày";

            document.getElementById("badge").innerHTML = "🌱 Khởi đầu";

            document.getElementById("questionCount").innerHTML = "0 câu";

            document.getElementById("examCount").innerHTML = "0 đề";

            document.getElementById("goalBtn").innerHTML =
            "🎯 Thiết lập mục tiêu";

            return;

        }

        const data = snap.data();

        document.getElementById("goalName").innerHTML =
        "🎯 " + data.goal;

        const progress = data.progress || 0;

        document.getElementById("goalBar").style.width =
        progress + "%";

        document.getElementById("goalPercent").innerHTML =
        progress + "% hoàn thành";

        document.getElementById("streak").innerHTML =
        (data.streak || 0) + " ngày";

        document.getElementById("badge").innerHTML =
        data.badge || "🌱 Khởi đầu";

        document.getElementById("questionCount").innerHTML =
        (data.totalQuestion || 0) + " câu";

        document.getElementById("examCount").innerHTML =
        (data.totalExam || 0) + " đề";

        document.getElementById("goalBtn").innerHTML =
        "⚙️ Chỉnh sửa mục tiêu";

    }catch(err){

        console.log(err);

    }

}

loadGoal();

// ======================
// Nút mục tiêu
// ======================

const goalBtn=document.getElementById("goalBtn");

if(goalBtn){

    goalBtn.onclick=function(){

        location.href="goal.html";

    }

}

// ======================
// Chuyển trang thi
// ======================

window.vaoThi=function(link){

    if(!studentPhone){

        alert("Vui lòng đăng nhập trước!");

        location.href="login.html";

        return;

    }

    location.href=link;

}
