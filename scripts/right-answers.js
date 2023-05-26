(function () {
        const Answers = {

            testQuestion: null,
            rightAnswers: [],
            quiz: null,
            init() {
                let linkToResult = document.getElementById('link-back-to-result')
                linkToResult.onclick = (function () {
                    location.href = 'result.html' + location.search;
                })

                checkUserData();
                const url = new URL(location.href)
                const urlAnswers = url.searchParams.get('answers');

                let usersData = document.getElementById('users-data')
                usersData.innerHTML = 'Тест выполнил ' + '<span>' + url.searchParams.get('name') + ', ' + url.searchParams.get('email');

                const id = url.searchParams.get('id');

                if (id && urlAnswers) {
                    const xhr = new XMLHttpRequest();
                    const xhr2 = new XMLHttpRequest();

                    xhr.open('GET', 'https://testologia.site/get-quiz?id=' + id, false);
                    xhr.send();

                    xhr2.open('GET', 'https://testologia.site/get-quiz-right?id=' + id, false);
                    xhr2.send();

                    if (xhr.status === 200 && xhr.responseText && xhr2.status === 200 && xhr2.responseText) {
                        try {
                            this.quiz = JSON.parse(xhr.responseText);
                            this.rightAnswers = JSON.parse(xhr2.responseText);
                        } catch (e) {
                            location.href = 'index.html';
                        }
                        this.startQuiz();
                    } else {
                        location.href = 'index.html';
                    }

                }

            },
            startQuiz() {
                this.testQuestion = document.getElementById('test-question');
               document.getElementById('right-answers-pre-title-text-span').innerText = this.quiz.name;
                this.showQuestion();
            },
            showQuestion() {
                console.log(this.rightAnswers)
                console.log(this.quiz)

                Array.from(this.quiz.questions).forEach(item => {

                    const block = document.createElement('div');
                    block.className = 'block';

                    const questionTittle = document.createElement('div');
                    questionTittle.className = 'question-tittle';
                    questionTittle.innerHTML = '<span>Вопрос ' + item.id + ': </span>' + item.question;

                    const rightAnswersOptions = document.createElement('div');
                    rightAnswersOptions.className = 'right-answers-options';


                    item.answers.forEach(el => {
                        const rightAnswersOption = document.createElement('div');
                        rightAnswersOption.className = 'right-answers-option';
                        const inputElement = document.createElement('input');
                        const labelElement = document.createElement('label');
                        const inputId = 'answers' + el.id;

                        labelElement.setAttribute('for', inputId);
                        inputElement.setAttribute('id', inputId);
                        inputElement.setAttribute('type', 'radio');
                        inputElement.setAttribute('name', 'answer');
                        inputElement.setAttribute('value', el.id);

                        const url = new URL(location.href)
                        const urlAnswers = url.searchParams.get('answers').split(',');


                        urlAnswers.forEach(item => {
                            if (inputElement.value === item) {
                                inputElement.style.borderColor = 'red';
                                inputElement.style.borderWidth = '5px';
                            }
                        })

                        Array.from(this.rightAnswers).forEach(el => {

                            if (inputElement.style.borderColor === 'red' && inputElement.value === String(el)) {
                                inputElement.style.borderColor = 'green';
                                inputElement.style.borderWidth = '5px';
                            }

                        })

                        labelElement.innerText = el.answer;

                        rightAnswersOption.appendChild(inputElement)
                        rightAnswersOption.appendChild(labelElement)
                        rightAnswersOptions.appendChild(rightAnswersOption)
                    })


                    block.appendChild(questionTittle)
                    block.appendChild(rightAnswersOptions)
                    this.testQuestion.appendChild(block);


                })
            }


        }

        Answers.init();
    }
)
();