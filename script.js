// Menu de Navegação
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

document.querySelector('.menu-mobile').addEventListener('click', toggleMenu);

// Formulário de ouvidoria
document.querySelector('.ouvidoria-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeOuvidoria').value.trim();
    const email = document.getElementById('emailOuvidoria').value.trim();
    const telefone = document.getElementById('telefoneOuvidoria').value.trim();
    const assunto = document.getElementById('assuntoOuvidoria').value.trim();
    const mensagem = document.getElementById('mensagemOuvidoria').value.trim();
    const formMessage = document.getElementById('form-message');

    // Validação de dados
    if (!nome || !email || !telefone || !assunto || !mensagem) {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        formMessage.textContent = 'Por favor, insira um e-mail válido.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return;
    }

    // Se válido, exibe mensagem de sucesso
    formMessage.textContent = 'Mensagem enviada com sucesso!';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
    formMessage.style.display = 'block';
    this.reset();
});

// Validação do telefone
document.getElementById('telefoneOuvidoria').addEventListener('input', function (e) {
    let telefone = e.target.value.replace(/\D/g, '');

    if (telefone.length > 2) {
        telefone = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
    }
    if (telefone.length > 10) {
        telefone = `${telefone.substring(0, 10)}-${telefone.substring(10, 14)}`;
    }

    e.target.value = telefone;
});

// Sistema de Avaliação
const form = document.getElementById('avaliacaoForm');
const listaAvaliacoes = document.getElementById('listaAvaliacoes');
const notaInput = document.getElementById('notaAvaliacoes');
const estrelas = document.querySelectorAll('#estrelas i');

let notaSelecionada = 0;

estrelas.forEach(estrela => {
    estrela.addEventListener('mouseover', () => {
        const valor = parseInt(estrela.getAttribute('data-value'));
        atualizarEstrelas(valor);
    });

    estrela.addEventListener('mouseout', () => {
        atualizarEstrelas(notaSelecionada);
    });

    estrela.addEventListener('click', () => {
        notaSelecionada = parseInt(estrela.getAttribute('data-value'));
        notaInput.value = notaSelecionada;
        atualizarEstrelas(notaSelecionada);
    });
});

function atualizarEstrelas(valor) {
    estrelas.forEach(estrela => {
        const starValue = parseInt(estrela.getAttribute('data-value'));
        estrela.className = starValue <= valor ? "bi bi-star-fill" : "bi bi-star";
    });
}

if (!localStorage.getItem('avaliacoes')) {
    const exemplos = [
        { nome: "Carlos Eduardo Costa Neto", email: "carloseduardo123@hotmail.com", nota: 3, mensagem: "O tempo de espera é muito estressante não há nenhum acompanhamento nesse período é desrespeitoso para o doente e o acompanhe que não pode entrar fica de fora sem informação nenhuma da situação do paciente." },
        { nome: "Maria dos Santos Silva Costa", email: "mariasilvacosta@hotmail.com", nota: 5, mensagem: "O hospital está ótimo. Lá não é açougue, como o povo da língua grande fala. Ótimo atendimento. Um SALVE para a equipe do Dr. Danilo, parabéns a todos. Só Deus para lhes pagarem." },
        { nome: "Luís Guilherme Souza Alves", email: "guisouza@hotmail.com", nota: 5, mensagem: "Hospital foi recentemente ampliado para atendimento aos municípios. 20 novas UTIs, 240 leitos com novos equipamentos. Foram instalados em uma moderna estrutura." }
    ];
    localStorage.setItem('avaliacoes', JSON.stringify(exemplos));
    mostrarAvaliacoes();
}

function salvarAvaliacao(avaliacao) {
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    avaliacoes.push(avaliacao);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
}

function mostrarAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    listaAvaliacoes.innerHTML = '';

    avaliacoes.forEach(a => {
        const nomeFormatado = a.nome ? a.nome : 'Usuário';
        const nota = typeof a.nota === 'number' ? a.nota : 0;
        const mensagem = a.mensagem || '';

        const item = document.createElement('div');
        item.classList.add('border', 'rounded', 'p-3', 'mb-3', 'bg-light');
        item.innerHTML = `
            <strong>${nomeFormatado}</strong><br>
            <span class="text-warning">${'★'.repeat(nota)}${'☆'.repeat(5 - nota)}</span><br>
            <em>${mensagem}</em>
        `;
        listaAvaliacoes.prepend(item);
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let nome = document.getElementById('nomeAvaliacoes').value.trim();

    const preposicoes = ['de', 'da', 'do', 'das', 'dos'];
    nome = nome
        .toLowerCase()
        .split(' ')
        .map((palavra, index) => {
            return (preposicoes.includes(palavra) && index !== 0)
                ? palavra
                : palavra.charAt(0).toUpperCase() + palavra.slice(1);
        })
        .join(' ');

    const email = document.getElementById('emailAvaliacoes').value.trim();
    const nota = parseInt(notaInput.value);
    const mensagem = document.getElementById('mensagemAvaliacoes').value.trim();

    if (!nota) {
        alert('Por favor, selecione uma nota.');
        return;
    }

    const novaAvaliacao = { nome, email, nota, mensagem };
    salvarAvaliacao(novaAvaliacao);
    mostrarAvaliacoes();
    form.reset();
    notaSelecionada = 0;
    atualizarEstrelas(0);
});

mostrarAvaliacoes();

// Move o menu de navegação com a página
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
