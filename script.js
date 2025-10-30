document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Sistema de Informação carregado com o novo fundo e chatbot.');

    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotCloseButton = document.querySelector('.chatbot-close-button');
    const chatbotBody = document.getElementById('chatbot-body');
    
    let isChatbotOpen = false;

    // Lista completa de perguntas/respostas
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
            question: "Devo focar em Soft Skills ou Hard Skills?",
            answer: "Ambos são cruciais! Hard Skills (técnicas) abrem a porta, mas Soft Skills (comunicação, liderança, adaptabilidade) garantem o crescimento de carreira em um campo que exige muita interação com o lado de negócios."
        },
        {
            question: "Como o curso de SI me prepara para o futuro do trabalho?",
            answer: "Ele foca em raciocínio lógico e aprendizado contínuo, preparando você para se adaptar rapidamente a novas tecnologias como IA, IoT e Blockchain, que estão transformando o mercado."
        }
    ];

    let currentQaPairs = [...fullQaPairs]; // Copia a lista completa para a sessão atual

    // Função para exibir as perguntas como botões
    function displayQuestions(areaElement) {
        areaElement.innerHTML = ''; // Limpa a área
        currentQaPairs.forEach((qa, index) => {
            const button = document.createElement('button');
            button.className = 'question-button';
            button.textContent = qa.question;
            
            // Adiciona um listener para a resposta
            button.addEventListener('click', () => handleQuestionClick(index));
            areaElement.appendChild(button);
        });

        // Se não houver perguntas, exibe a mensagem final
        if (currentQaPairs.length === 0) {
            const finalMessage = document.createElement('p');
            finalMessage.className = 'chatbot-message bot';
            finalMessage.innerHTML = "Essas eram as perguntas frequentes! Se precisar de algo mais, entre em contato.";
            chatbotBody.appendChild(finalMessage);
        }
    }

    // Função que lida com o clique na pergunta
    function handleQuestionClick(index) {
        const selectedQa = currentQaPairs[index];

        // 1. Adiciona a pergunta do usuário (como se ele tivesse digitado)
        const userMessage = document.createElement('p');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = selectedQa.question;
        chatbotBody.appendChild(userMessage);

        // 2. Adiciona a resposta do bot
        const botMessage = document.createElement('p');
        botMessage.className = 'chatbot-message bot';
        botMessage.textContent = selectedQa.answer;
        chatbotBody.appendChild(botMessage);

        // Rola para o final
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // 3. Remove a pergunta respondida da lista atual
        currentQaPairs.splice(index, 1);

        // 4. Remove a área de perguntas anterior
        const oldQuestionArea = document.getElementById('question-area');
        if (oldQuestionArea) {
            oldQuestionArea.remove();
        }

        // 5. Cria uma nova área de perguntas
        const newQuestionArea = document.createElement('div');
        newQuestionArea.id = 'question-area';
        newQuestionArea.className = 'question-area';
        chatbotBody.appendChild(newQuestionArea);
        
        // 6. Re-exibe a lista (agora menor) ou a mensagem final
        displayQuestions(newQuestionArea); 
    }

    // Lógica para abrir/fechar o chatbot
    chatbotButton.addEventListener('click', () => {
        isChatbotOpen = !isChatbotOpen;
        if (isChatbotOpen) {
            chatbotContainer.classList.add('open');
            
            // CORREÇÃO: Reconstroi a estrutura inicial do chat (saudação + área de perguntas)
            chatbotBody.innerHTML = '<p class="chatbot-message bot">Olá! Eu sou seu assistente virtual. Em que posso ajudar hoje?</p><div id="question-area" class="question-area"></div>';

            // Busca o elemento recém-criado
            const initialQuestionArea = document.getElementById('question-area');
            
            // RESET: Copia todas as perguntas para a sessão atual
            currentQaPairs = [...fullQaPairs]; 
            
            // Exibe as perguntas usando o novo elemento
            displayQuestions(initialQuestionArea); 
        } else {
            chatbotContainer.classList.remove('open');
        }
    });

    chatbotCloseButton.addEventListener('click', () => {
        isChatbotOpen = false;
        chatbotContainer.classList.remove('open');
    });

    // Inicia a lista com a saudação quando a página carrega, mas só exibe ao abrir
    // O JS vai reconstruir o body ao abrir, então esta inicialização não é mais necessária aqui.

});