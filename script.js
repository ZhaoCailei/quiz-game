// ========== 题库（可自行增删） ==========
const questions = [
    {
        question: "HTML 的全称是什么？",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Mark Language",
            "Hyper Media Text Language"
        ],
        answer: 0
    },
    {
        question: "CSS 的主要作用是控制网页的什么？",
        options: ["内容结构", "样式表现", "交互逻辑", "数据存储"],
        answer: 1
    },
    {
        question: "JavaScript 主要用于实现网页的什么功能？",
        options: ["静态布局", "动态交互", "页面渲染", "服务器存储"],
        answer: 1
    },
    {
        question: "以下哪个不是 JavaScript 的数据类型？",
        options: ["String", "Boolean", "Float", "Undefined"],
        answer: 2
    },
    {
        question: "CSS 中用来设置文字大小的属性是？",
        options: ["font-size", "text-size", "font-style", "text-style"],
        answer: 0
    }
];

// ========== 状态变量 ==========
let currentQuestionIndex = 0;
let score = 0;

// ========== DOM 元素 ==========
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackText = document.getElementById('feedbackText');
const nextBtn = document.getElementById('nextBtn');

// ========== 加载题目 ==========
function loadQuestion() {
    feedbackText.innerText = '';
    nextBtn.style.display = 'none';
    optionsContainer.innerHTML = '';

    const currentQ = questions[currentQuestionIndex];
    questionTitle.innerText = `第 ${currentQuestionIndex + 1}/${questions.length} 题：${currentQ.question}`;

    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(btn, index);
        optionsContainer.appendChild(btn);
    });
}

// ========== 选择选项 ==========
function selectOption(selectedBtn, index) {
    const currentQ = questions[currentQuestionIndex];
    const allBtns = document.querySelectorAll('.option-btn');

    // 禁用所有选项
    allBtns.forEach(btn => btn.disabled = true);

    if (index === currentQ.answer) {
        selectedBtn.classList.add('correct');
        feedbackText.innerText = '✅ 回答正确！+10分';
        feedbackText.style.color = '#4caf50';
        score += 10;
    } else {
        selectedBtn.classList.add('wrong');
        allBtns[currentQ.answer].classList.add('correct');
        feedbackText.innerText = `❌ 回答错误，正确答案是：${currentQ.options[currentQ.answer]}`;
        feedbackText.style.color = '#f44336';
    }

    nextBtn.style.display = 'inline-block';
}

// ========== 下一题 / 结束 / 重来 ==========
nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionTitle.innerText = "🎉 答题结束！";
        optionsContainer.innerHTML = '';
        feedbackText.innerText = `本次总得分：${score} / ${questions.length * 10} 分`;
        nextBtn.innerText = "重新答题";
        nextBtn.onclick = () => {
            currentQuestionIndex = 0;
            score = 0;
            nextBtn.innerText = "下一题";
            loadQuestion();
        };
    }
};

// ========== 页面加载时初始化 ==========
document.addEventListener('DOMContentLoaded', loadQuestion);