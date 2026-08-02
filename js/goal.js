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
        <option>Đỗ THPT công lập</option>
        <option>Đỗ THPT Chuyên</option>
        <option>Đỗ THPT Chuyên Lam Sơn</option>
        <option>Đỗ THPT Chuyên KHTN</option>
        <option>Đỗ THPT Chuyên Amsterdam</option>
        <option>Đỗ THPT Chuyên Phan Bội Châu</option>
        <option>Đỗ THPT Chuyên Lê Hồng Phong</option>
        `;

    }

    if (grade.value == "10") {

        goal.innerHTML = `
        <option>Đạt Học sinh Xuất sắc</option>
        <option>Điểm trung bình ≥ 9.0</option>
        <option>Top 10 lớp</option>
        <option>Top 5 lớp</option>
        `;

    }

    if (grade.value == "11") {

        goal.innerHTML = `
        <option>Đạt Học sinh Xuất sắc</option>
        <option>Điểm trung bình ≥ 9.2</option>
        <option>Top 5 lớp</option>
        <option>Sẵn sàng thi THPT</option>
        `;

    }

    if (grade.value == "12") {

        goal.innerHTML = `
        <option>Đỗ Đại học Bách Khoa Hà Nội</option>
        <option>Đỗ Đại học Y Hà Nội</option>
        <option>Đỗ Đại học Ngoại thương</option>
        <option>Đỗ Đại học Kinh tế Quốc dân</option>
        <option>Đỗ Đại học Sư phạm Hà Nội</option>
        <option>Đỗ Đại học Công nghệ - ĐHQGHN</option>
        <option>Đỗ Học viện Kỹ thuật Quân sự</option>
        <option>Đỗ Học viện An ninh</option>
        <option>Đỗ Học viện Cảnh sát</option>
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
