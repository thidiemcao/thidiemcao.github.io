import { db } from "./firebase.js";

import {

doc,

setDoc,

getDoc

}

from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";
const studentPhone=localStorage.getItem("studentPhone");

const grade=document.getElementById("grade");

const goal=document.getElementById("goal");

const saveBtn=document.getElementById("saveBtn");
async function loadGoal(){

if(!studentPhone)return;

const ref=doc(db,"goals",studentPhone);

const snap=await getDoc(ref);

if(!snap.exists())return;

const data=snap.data();

grade.value=data.grade;

grade.dispatchEvent(new Event("change"));

goal.value=data.goal;

}
saveBtn.onclick=async function(){

if(grade.value==""){

alert("Hãy chọn lớp.");

return;

}

if(goal.value==""){

alert("Hãy chọn mục tiêu.");

return;

}

await setDoc(doc(db,"goals",studentPhone),{

grade:grade.value,

goal:goal.value,

progress:0,

streak:0,

badge:"Chưa có",

totalQuestion:0,

totalExam:0,

createdAt:new Date(),

updatedAt:new Date()

});

alert("🎉 Đã lưu mục tiêu thành công!");

location.href="index.html";

}
loadGoal();

