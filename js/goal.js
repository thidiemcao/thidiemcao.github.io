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
loadGoal();
