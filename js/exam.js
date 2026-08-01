let currentQuestion = 0;
let answers = new Array(questions.length).fill("");

const title = document.getElementById("question-title");
const content = document.getElementById("question-content");

const textA = document.getElementById("textA");
const textB = document.getElementById("textB");
const textC = document.getElementById("textC");
const textD = document.getElementById("textD");

const radios = document.getElementsByName("answer");

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

        const btn=document.createElement("button");

        btn.className="qbtn";

        if(i==currentQuestion)
            btn.classList.add("active");

        if(answers[i]!="")
            btn.style.background="#28a745";

        btn.innerHTML=i+1;

        btn.onclick=function(){

            currentQuestion=i;

            loadQuestion(i);

        }

        grid.appendChild(btn);

    }

}
document.getElementById("submitBtn").onclick=function(){

    let score=0;

    for(let i=0;i<questions.length;i++){

        if(answers[i]==questions[i].correct)
            score++;

    }

    alert(
        "Bạn đúng "
        +score+
        "/"+
        questions.length+
        " câu."
    );

}

loadQuestion(0);
