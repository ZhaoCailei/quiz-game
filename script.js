const app = document.getElementById('app'); // 把 'app' 换成你实际的容器ID
if(!app) { 
  console.error('找不到挂载点！当前body内容:', document.body.innerHTML); 
} else {
  console.log('找到挂载点，准备渲染');
}
const questions = [
    { question: "HTML 的全称是什么？", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"], answer: 0 },
    { question: "CSS 主要用于什么？", options: ["网页结构", "网页样式", "网页交互逻辑"], answer: 1 },
    { question: "JS 中声明变量的关键字是？", options: ["var/let/const", "int", "string"], answer: 0 }
];
let currentIndex = 0, score = 0;
const qText = document.getElementById("question-text"), optContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn"), resContainer = document.getElementById("result-container"), qContainer = document.getElementById("question-container");

function loadQuestion() {
    optContainer.innerHTML = ""; nextBtn.style.display = "none";
    if(currentIndex >= questions.length) return showResult();
    const q = questions[currentIndex];
    qText.textContent = `${currentIndex+1}. ${q.question}`;
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button"); btn.className = "option-btn"; btn.textContent = opt;
        btn.onclick = () => selectOption(btn, i, q.answer); optContainer.appendChild(btn);
    });
}
function selectOption(btn, idx, ans) {
    Array.from(optContainer.children).forEach(b => b.disabled = true);
    if(idx === ans) { btn.classList.add("correct"); score++; } else { btn.classList.add("wrong"); }
    nextBtn.style.display = "block";
}
function nextQuestion() { currentIndex++; loadQuestion(); }
function showResult() {
    qContainer.style.display = "none"; nextBtn.style.display = "none"; resContainer.style.display = "block";
    document.getElementById("score").textContent = score; document.getElementById("total").textContent = questions.length;
}
function restartGame() { currentIndex = 0; score = 0; resContainer.style.display = "none"; qContainer.style.display = "block"; loadQuestion(); }
loadQuestion();