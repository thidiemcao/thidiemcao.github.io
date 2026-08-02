import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyAn5qW3LKUyEAgGBd0Yb8T4_ZoBujQKFbY",

authDomain: "thidiemcao-4097d.firebaseapp.com",

projectId: "thidiemcao-4097d",

storageBucket: "thidiemcao-4097d.firebasestorage.app",

messagingSenderId: "333180855649",

appId: "1:333180855649:web:e46ce1e15a715b3f0c5120"

};

const app=initializeApp(firebaseConfig);

export const db=getFirestore(app);
