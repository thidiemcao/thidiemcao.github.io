let currentQuestion = 0;
let answers = new Array(questions.length).fill("");

const title = document.getElementById("question-title");
const content = document.getElementById("question-content");

const textA = document.getElementById("textA");
const textB = document.getElementById("textB");
const textC = document.getElementById("textC");
const textD = document.getElementById("textD");

const radios = document.getElementsByName("answer");
// ======================
// ĐỒNG HỒ ĐẾM NGƯỢC
// ======================

let totalTime = 90 * 60;

const timeElement = document.getElementById("time");

function updateTimer(){

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    timeElement.innerHTML =
        String(minutes).padStart(2,"0") +
        ":" +
        String(seconds).padStart(2,"0");

    if(totalTime <= 0){

        clearInterval(timer);

        alert("⏰ Hết giờ!");

        document.getElementById("submitBtn").click();

        return;
    }

    totalTime--;

}

updateTimer();

const timer = setInterval(updateTimer,1000);
function loadQuestion(index){

    const q = questions[index];

    title.innerHTML = "Câu " + (index+1);

    content.innerHTML = q.question;

    textA.innerHTML = q.A;
    textB.innerHTML = q.B;
    textC.innerHTML = q.C;
    textD.innerHTML = q.D;

    radios.forEach(r=>r.checked=false);

    if(answers[index]!=""){
        document.querySelector(
        'input[value="'+answers[index]+'"]'
        ).checked=true;
    }

    updateGrid();

}
radios.forEach(r=>{

    r.addEventListener("change",function(){

        answers[currentQuestion]=this.value;

        updateGrid();

    });

});

document.getElementById("nextBtn").onclick=function(){

    if(currentQuestion<questions.length-1){

        currentQuestion++;

        loadQuestion(currentQuestion);

    }

}

document.getElementById("prevBtn").onclick=function(){

    if(currentQuestion>0){

        currentQuestion--;

        loadQuestion(currentQuestion);

    }

}
function updateGrid(){

    const grid=document.getElementById("question-grid");

    grid.innerHTML="";

    for(let i=0;i<questions.length;i++){

        const btn=document.createElement("div");

        btn.className="question-number";

        if(i==currentQuestion){

            btn.classList.add("current");

        }
        else if(answers[i]!=""){

            btn.classList.add("answered");

        }
        else{

            btn.classList.add("unanswered");

        }

        btn.innerHTML=i+1;

        btn.onclick=function(){

            currentQuestion=i;

            loadQuestion(i);

        };

        grid.appendChild(btn);

    }

    document.getElementById("progress").innerHTML=
    "Đã làm: "+
    answers.filter(x=>x!="").length+
    "/"+
    questions.length+
    " câu";

}
document.getElementById("submitBtn").onclick=function(){

    let score=0;

    for(let i=0;i<questions.length;i++){

        if(answers[i]==questions[i].correct)
            score++;

    }
const today=new Date().toLocaleDateString();

const last=localStorage.getItem("lastStudy");

let streak=parseInt(localStorage.getItem("streak")||0);

if(last!=today){

streak++;

localStorage.setItem("streak",streak);

localStorage.setItem("lastStudy",today);

}
    let progress=parseInt(localStorage.getItem("goalPercent")||0);

progress+=2;

if(progress>100){

progress=100;

}

localStorage.setItem("goalPercent",progress);
    if(progress>=25){

localStorage.setItem("badge","🥉 Đồng");

}

if(progress>=50){

localStorage.setItem("badge","🥈 Bạc");

}

if(progress>=75){

localStorage.setItem("badge","🥇 Vàng");

}

if(progress>=100){

localStorage.setItem("badge","🏆 Chinh phục mục tiêu");

}
    const aiBox = document.getElementById("aiResult");

let percent = Math.round(score / questions.length * 100);

let comment = "";
let advice = "";
let strong = "";
let weak = "";
if(percent >= 90){

    comment = "🌟 Xuất sắc! Em nắm kiến thức rất chắc.";
    advice = "Tiếp tục luyện đề khó để hướng tới điểm tuyệt đối.";

}
else if(percent >= 70){

    comment = "👍 Khá tốt! Em đã có nền tảng vững.";
    advice = "Ôn lại các câu sai và luyện thêm 1-2 đề mỗi ngày.";

}
else if(percent >= 50){

    comment = "📚 Kiến thức ở mức trung bình.";
    advice = "Nên luyện lại các dạng bài cơ bản trước khi làm đề mới.";

}
else{

    comment = "💪 Đừng nản! Em vẫn còn nhiều cơ hội cải thiện.";
    advice = "Bắt đầu từ các chuyên đề cơ bản rồi luyện đề dần.";

}

aiBox.style.display = "block";

aiBox.innerHTML = `
<h3>🤖 Nhận xét bài làm:</h3>

<p><b>Điểm:</b> ${score}/${questions.length} (${percent}%)</p>

<p class="good">${comment}</p>

<div class="tip">
<b>🎯 Thầy Hoàng khuyên em:</b><br>
${advice}
</div>
`;

window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
});

}

loadQuestion(0);
updateGrid();
