import { db } from "./firebase.js";

import {
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const studentPhone = localStorage.getItem("studentPhone");

const grade = document.getElementById("grade");
const goal = document.getElementById("goal");
const saveBtn = document.getElementById("saveBtn");


// =======================
// Danh sách mục tiêu
// =======================

grade.onchange = function () {

    goal.innerHTML = "";

    if (grade.value == "9") {

        goal.innerHTML = `
        <option>Đỗ THPT công lập NV1</option>
        <option>Đỗ THPT Chuyên Lê Quý Đôn</option>
        <option>Đạt giải số HSGTP</option>
        <option>Đạt Học sinh Xuất sắc</option>
        `;

    }

    if (grade.value == "10") {

        goal.innerHTML = `
        <option>Đạt Học sinh Xuất sắc</option>
        <option>Điểm trung bình ≥ 9.0</option>
        <option>Học bá Toán nhất lớp</option>
        <option>Top 3 lớp</option>
        `;

    }

    if (grade.value == "11") {

        goal.innerHTML = `
        <option>Đạt Học sinh Xuất sắc</option>
        <option>Điểm trung bình ≥ 9.0</option>
        <option>Học bá Toán nhất lớp</option>
        <option>Top 3 lớp</option>
        `;

    }

    if (grade.value == "12") {

        goal.innerHTML = `
        <option>Đỗ Đại học Kinh tế</option>
        <option>Đỗ Đại học Bách khoa</option>
        <option>Đỗ Đại học Ngoại ngữ</option>
        <option>Đỗ Đại học Sư phạm</option>
        <option>Đỗ Đại học Y Dược</option>
        <option>Đỗ Công An, Quân đội</option>
        <option>Đỗ Đại học Top đầu VN</option>
        `;

    }

};


// =======================
// Đọc mục tiêu đã lưu
// =======================

async function loadGoal() {

    if (!studentPhone) return;

    const ref = doc(db, "hoc_sinh", studentPhone);

    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    if (data.grade) {

        grade.value = data.grade;

        grade.dispatchEvent(new Event("change"));

    }

    if (data.goal) {

        goal.value = data.goal;

    }

}


// =======================
// Lưu mục tiêu
// =======================

saveBtn.onclick = async function () {

    if (grade.value == "") {

        alert("Hãy chọn lớp.");

        return;

    }

    if (goal.value == "") {

        alert("Hãy chọn mục tiêu.");

        return;

    }

    await setDoc(

        doc(db, "hoc_sinh", studentPhone),

        {

            grade: grade.value,

            goal: goal.value,

            progress: 0,

            streak: 0,

            badge: "🌱 Khởi đầu",

            totalQuestion: 0,

            totalExam: 0,

            updatedAt: new Date().toISOString()

        },

        {

            merge: true

        }

    );

    alert("🎉 Thiết lập mục tiêu thành công!");

    location.href = "index.html";

};


// =======================

loadGoal();
