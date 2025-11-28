document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Sistema de Informação carregado com o novo fundo e chatbot.');

    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotCloseButton = document.querySelector('.chatbot-close-button');
    const chatbotBody = document.getElementById('chatbot-body');
    
    let isChatbotOpen = false;

    // Lista completa de perguntas/respostas do Chatbot
    const fullQaPairs = [
        {
            question: "O que faz um profissional de Sistemas de Informação?",
            answer: "Ele atua como uma ponte estratégica entre a Tecnologia e o negócio, modelando processos, gerenciando projetos e garantindo que os sistemas estejam alinhados aos objetivos organizacionais. Basicamente, transforma dados em inteligência para a empresa."
        },
        {
            question: "Quais as principais linguagens de programação que preciso aprender?",
            answer: "As mais importantes são Python, Java e SQL. Além delas, ter conhecimentos em Cloud Computing (AWS, Azure) e Segurança Cibernética é um grande diferencial."
        },
        {
            question: "Qual o salário médio para um recém-formado?",
            answer: "Um Analista Júnior (0-2 anos de experiência) pode esperar um salário entre R$ 3.500 e R$ 5.500, dependendo da região e certificações."
        },
        {
            question: "Quais as áreas de atuação mais promissoras?",
            answer: "Análise de Dados (Data Science), Cloud Computing, Cibersegurança e Gestão de Projetos Ágeis (Scrum Master)."
        }
    ];

    let currentQaPairs = [...fullQaPairs]; 

    // Funções do Chatbot (mantidas)

    function displayQuestions(targetElement) {
        targetElement.innerHTML = ''; 

        if (currentQaPairs.length === 0) {
            targetElement.innerHTML = '<p class="chatbot-message bot">Pronto, essas eram todas as minhas perguntas frequentes. Posso te ajudar com mais alguma coisa?</p>';
            return;
        }

        currentQaPairs.forEach((pair, index) => {
            const button = document.createElement('button');
            button.className = 'question-button';
            button.textContent = pair.question;
            button.dataset.index = index; 
            button.addEventListener('click', handleQuestionClick);
            targetElement.appendChild(button);
        });
    }

    function handleQuestionClick(event) {
        const index = parseInt(event.target.dataset.index);
        const selectedPair = currentQaPairs[index];

        const userMessage = document.createElement('p');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = selectedPair.question;
        chatbotBody.appendChild(userMessage);

        const botMessage = document.createElement('p');
        botMessage.className = 'chatbot-message bot';
        botMessage.textContent = selectedPair.answer;
        chatbotBody.appendChild(botMessage);

        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        currentQaPairs.splice(index, 1);
        
        const oldQuestionArea = document.getElementById('question-area');
        if (oldQuestionArea) {
            oldQuestionArea.remove();
        }

        const newQuestionArea = document.createElement('div');
        newQuestionArea.id = 'question-area';
        newQuestionArea.className = 'question-area';
        chatbotBody.appendChild(newQuestionArea);
        
        displayQuestions(newQuestionArea); 
    }

    chatbotButton.addEventListener('click', () => {
        isChatbotOpen = !isChatbotOpen;
        if (isChatbotOpen) {
            chatbotContainer.classList.add('open');
            
            chatbotBody.innerHTML = '<p class="chatbot-message bot">Olá! Eu sou seu assistente virtual. Em que posso ajudar hoje?</p><div id="question-area" class="question-area"></div>';

            const initialQuestionArea = document.getElementById('question-area');
            
            currentQaPairs = [...fullQaPairs]; 
            
            displayQuestions(initialQuestionArea); 
        } else {
            chatbotContainer.classList.remove('open');
        }
    });

    chatbotCloseButton.addEventListener('click', () => {
        isChatbotOpen = false;
        chatbotContainer.classList.remove('open');
    });

    // =========================================================
    // LÓGICA DO QUIZ SI (10 Questões, 1 por Vez) - CÓDIGO ATUALIZADO
    // =========================================================

    if (document.getElementById('quiz-container')) {
        let currentQuestionIndex = 0;
        let userScore = 0;
        let quizCompleted = false;

        // 10 PERGUNTAS SOBRE SISTEMAS DE INFORMAÇÃO
        const quizData = [
            {
                question: "1. Qual é a principal função de um profissional de Sistemas de Informação (SI)?",
                options: [
                    "Programar código fonte de jogos complexos.",
                    "Atuar como ponte estratégica entre a Tecnologia e a gestão do negócio.",
                    "Reparar hardware e instalar sistemas operacionais.",
                    "Criar designs gráficos e animações 3D."
                ],
                answer: "Atuar como ponte estratégica entre a Tecnologia e a gestão do negócio."
            },
            {
                question: "2. Qual linguagem de manipulação e consulta de dados é essencial para a área de SI?",
                options: [
                    "Assembly",
                    "SQL",
                    "HTML",
                    "R"
                ],
                answer: "SQL"
            },
            {
                question: "3. O que são *Soft Skills* no contexto de TI, e por que são cruciais para o profissional de SI?",
                options: [
                    "Habilidades técnicas para desenvolver sistemas.",
                    "Conhecimento em linguagens de programação de baixo nível.",
                    "Habilidades interpessoais, como comunicação e liderança, cruciais na interface com o negócio.",
                    "Capacidade de configurar redes e servidores."
                ],
                answer: "Habilidades interpessoais, como comunicação e liderança, cruciais na interface com o negócio."
            },
            {
                question: "4. Qual metodologia ágil é comumente usada para gerenciar projetos de software em SI?",
                options: [
                    "Waterfall",
                    "Scrum",
                    "Six Sigma",
                    "ITIL"
                ],
                answer: "Scrum"
            },
            {
                question: "5. Qual termo se refere à prática de utilizar sistemas computacionais para tomar decisões de negócio, baseadas na análise de dados?",
                options: [
                    "ERP (Enterprise Resource Planning)",
                    "Cloud Computing",
                    "Business Intelligence (BI)",
                    "DevOps"
                ],
                answer: "Business Intelligence (BI)"
            },
            {
                question: "6. Qual a diferença principal entre o foco de SI e o de Ciência da Computação?",
                options: [
                    "SI foca no hardware; CC foca no software.",
                    "SI foca na aplicação de TI para o negócio; CC foca na teoria e fundamentos da computação.",
                    "SI foca apenas em Front-end; CC foca apenas em Back-end.",
                    "Não há diferença significativa."
                ],
                answer: "SI foca na aplicação de TI para o negócio; CC foca na teoria e fundamentos da computação."
            },
            {
                question: "7. Qual das tecnologias abaixo permite que as empresas aluguem recursos de computação (servidores, armazenamento) pela internet?",
                options: [
                    "Mainframe",
                    "Blockchain",
                    "Cloud Computing",
                    "IoT (Internet das Coisas)"
                ],
                answer: "Cloud Computing"
            },
            {
                question: "8. O que é um sistema ERP (Enterprise Resource Planning)?",
                options: [
                    "Um sistema para gerenciar mídias sociais.",
                    "Um software que integra todos os dados e processos de uma organização em um único sistema.",
                    "Um banco de dados não relacional.",
                    "Um antivírus de alta performance."
                ],
                answer: "Um software que integra todos os dados e processos de uma organização em um único sistema."
            },
            {
                question: "9. Qual o principal objetivo da Cibersegurança em um contexto de Sistemas de Informação?",
                options: [
                    "Aumentar a velocidade da internet.",
                    "Garantir a Confidencialidade, Integridade e Disponibilidade (CID) dos dados e sistemas.",
                    "Desenvolver novos softwares de IA.",
                    "Apenas gerenciar backups de arquivos."
                ],
                answer: "Garantir a Confidencialidade, Integridade e Disponibilidade (CID) dos dados e sistemas."
            },
            {
                question: "10. Qual cargo de SI é responsável por traduzir as necessidades do cliente/usuário em requisitos técnicos para a equipe de desenvolvimento?",
                options: [
                    "DBA (Administrador de Banco de Dados)",
                    "Analista de Negócios (Business Analyst)",
                    "Técnico de Suporte",
                    "Desenvolvedor Front-end"
                ],
                answer: "Analista de Negócios (Business Analyst)"
            }
        ];

        const quizContainer = document.getElementById('quiz-container');
        const nextButton = document.getElementById('next-question');
        const submitButton = document.getElementById('submit-quiz');
        const resultsContainer = document.getElementById('results');
        const progressContainer = document.getElementById('progress');
        const feedbackContainer = document.getElementById('feedback');

        // Função para construir o quiz (todas as perguntas)
        function buildQuiz() {
            quizData.forEach((currentQuestion, questionNumber) => {
                const answers = [];
                currentQuestion.options.forEach(option => {
                    // MUDANÇA: O texto da opção agora está dentro de um <span>
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${option}" data-qindex="${questionNumber}">
                            <span>${option}</span>
                        </label>`
                    );
                });

                const questionBox = document.createElement('div');
                questionBox.className = `question-box ${questionNumber === 0 ? 'active' : ''}`;
                questionBox.innerHTML = `
                    <h3 class="title">${currentQuestion.question}</h3>
                    <div class="answers">${answers.join('')}</div>
                `;
                quizContainer.appendChild(questionBox);
            });
            updateProgress();
        }
        
        // Função para atualizar o indicador de progresso
        function updateProgress() {
            if (!quizCompleted) {
                progressContainer.textContent = `Progresso: Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
                
                if (currentQuestionIndex === quizData.length - 1) {
                    nextButton.style.display = 'none';
                    submitButton.style.display = 'block';
                } else {
                    nextButton.style.display = 'block';
                    submitButton.style.display = 'none';
                }
            } else {
                progressContainer.textContent = `Quiz Finalizado!`;
            }
        }
        
        // Função para avançar para a próxima pergunta
        function nextQuestion() {
            const currentQuestionBox = quizContainer.querySelector('.question-box.active');
            const selectedAnswer = currentQuestionBox.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
            
            // 1. Checa se a pergunta foi respondida
            if (!selectedAnswer) {
                feedbackContainer.innerHTML = '<span style="color: red;">Selecione uma resposta antes de continuar!</span>';
                return;
            }
            
            feedbackContainer.innerHTML = '';
            
            // 2. Registra a resposta e calcula a pontuação
            const userAnswer = selectedAnswer.value;
            if (userAnswer === quizData[currentQuestionIndex].answer) {
                userScore++;
            }

            // 3. Adiciona um feedback visual na pergunta respondida (OPCIONAL: desabilitado para não poluir a transição)
            /*
            const isCorrect = (userAnswer === quizData[currentQuestionIndex].answer);
            currentQuestionBox.classList.add(isCorrect ? 'correct-answer-box' : 'incorrect-answer-box');
            */

            // 4. Move para a próxima questão
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionBox.classList.remove('active');
                currentQuestionIndex++;
                const nextQuestionBox = quizContainer.querySelectorAll('.question-box')[currentQuestionIndex];
                nextQuestionBox.classList.add('active');
                updateProgress();
            } else {
                // Última pergunta respondida
                showResults();
            }
        }
        
        // Função para exibir os resultados finais
        function showResults() {
            quizCompleted = true;
            
            // Oculta tudo, exceto o título e resultados
            quizContainer.style.display = 'none';
            nextButton.style.display = 'none';
            submitButton.style.display = 'none';
            feedbackContainer.style.display = 'none';

            resultsContainer.innerHTML = `
                <span style="color: #00BFFF;">Parabéns! Quiz Finalizado.</span><br><br>
                Você acertou <span style="font-size: 1.5em; color: #8A2BE2;">${userScore}</span> de ${quizData.length} questões!
            `;
            updateProgress();
        }

        // Inicializa o quiz
        buildQuiz();
        
        // Adiciona os eventos
        nextButton.addEventListener('click', nextQuestion);
        submitButton.addEventListener('click', showResults);
    }
});