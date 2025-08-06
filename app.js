let amigos = [];
let sorteioMap = {};

function adicionarAmigo() {
    let campoNome = document.querySelector('input');
    if (campoNome.value === '') {
        alert("Por favor, digite um nome!");
        return;
    }
    amigos.push(campoNome.value);
    exibirNomesAmigos();
    campoNome.value = '';
}

function exibirNomesAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((nome, i) => {
        const li = document.createElement('li');
        li.innerHTML = nome;

        const btnExcluir = document.createElement('button');
        btnExcluir.innerText = 'X';
        btnExcluir.classList.add('botao-excluir');
        btnExcluir.onclick = () => {
            amigos.splice(i, 1);
            exibirNomesAmigos();
        };

        //botão para permitir edição de nomes
        const btnEditar = document.createElement('button');
        btnEditar.innerText = '✎';
        btnEditar.classList.add('botao-editar');
        btnEditar.onclick = () => {
            const novoNome = prompt("Digite o novo nome:");
            if (novoNome) amigos[i] = novoNome;
            exibirNomesAmigos();
        };

        li.appendChild(btnExcluir);
        li.appendChild(btnEditar);
        lista.appendChild(li);
    });
}

function sortearAmigos() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois nomes para sortear.");
        return;
    }

    //embaralha de modo que não seja permitido uma pessoa tirar ela mesma
    let valido = false;
    let embaralhado = [];
    while (!valido) {
        embaralhado = [...amigos].sort(() => Math.random() - 0.5);
        valido = amigos.every((nome, i) => nome !== embaralhado[i]);
    }

    sorteioMap = {};
    amigos.forEach((nome, i) => {
        sorteioMap[nome] = embaralhado[i];
    });

    popularSelect();
    document.getElementById('resultado').innerHTML = '';
}

function popularSelect() {
    const select = document.getElementById('selecaoPessoa');
    select.innerHTML = '<option value="">Ver sorteio</option>';
    amigos.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    });
}
//mostra quem a pessoa tirou ao selecionar um nome da lista
function mostrarResultado() {
    const select = document.getElementById('selecaoPessoa');
    const nomeSelecionado = select.value;
    const resultado = document.getElementById('resultado');

    if (nomeSelecionado && sorteioMap[nomeSelecionado]) {
        resultado.innerHTML = `<p>${nomeSelecionado}, você tirou <strong>${sorteioMap[nomeSelecionado]}</strong>!</p>`;

        setTimeout(() => {
            resultado.innerHTML = '';
            select.value = '';
        }, 10000);
    }
}