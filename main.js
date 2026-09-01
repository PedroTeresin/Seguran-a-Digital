const campoSenha = document.querySelector('#campo-senha');
const botaoGerar = document.querySelector('#botao-gerar');
const botaoCopiar = document.querySelector('#botao-copiar');
const diminuir = document.querySelector('#diminuir');
const aumentar = document.querySelector('#aumentar');
const tamanhoSenha = document.querySelector('#tamanho-senha');
const barraForca = document.querySelector('#barra-forca');
const textoForca = document.querySelector('#texto-forca');
const checkboxMaiusculo = document.querySelector('#maiusculo');
const checkboxMinusculo = document.querySelector('#minusculo');
const checkboxNumero = document.querySelector('#numero');
const checkboxSimbolo = document.querySelector('#simbolo');

const sets = {
  maiusculo: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  minusculo: 'abcdefghijklmnopqrstuvwxyz',
  numero: '0123456789',
  simbolo: '!@#$%^&*()_+[]{}|;:,.<>?/'
};

const minLength = 4;
const maxLength = 32;
let tamanho = 12;

function atualizarTamanho() {
  tamanhoSenha.textContent = String(tamanho);
  atualizarIndicadorDeForca();
}

function obterOpcoesSelecionadas() {
  return [
    checkboxMaiusculo,
    checkboxMinusculo,
    checkboxNumero,
    checkboxSimbolo
  ].filter(input => input.checked).map(input => input.id);
}

function criarSenha() {
  const opcoes = obterOpcoesSelecionadas();

  if (opcoes.length === 0) {
    alert('Selecione ao menos uma característica para gerar a senha.');
    return '';
  }

  let charset = opcoes.map(chave => sets[chave]).join('');
  let senha = '';

  for (let i = 0; i < tamanho; i += 1) {
    const indice = Math.floor(Math.random() * charset.length);
    senha += charset[indice];
  }

  return senha;
}

function definirForca(senha) {
  const opcoes = obterOpcoesSelecionadas().length;
  const comprimento = senha.length;
  let nivel = 'fraca';
  let largura = '30%';
  let cor = '#E71B32';

  if (comprimento >= 12 && opcoes >= 3) {
    nivel = 'forte';
    largura = '100%';
    cor = '#00FF85';
  } else if (comprimento >= 8 && opcoes >= 2) {
    nivel = 'media';
    largura = '65%';
    cor = '#FAF408';
  }

  barraForca.style.width = largura;
  barraForca.style.backgroundColor = cor;
  textoForca.textContent = nivel === 'fraca' ? 'Fraca' : nivel === 'media' ? 'Média' : 'Forte';
}

function atualizarIndicadorDeForca() {
  const senhaAtual = campoSenha.value;

  if (senhaAtual) {
    definirForca(senhaAtual);
    return;
  }

  const opcoes = obterOpcoesSelecionadas().length;
  let nivel = 'fraca';
  let largura = '30%';
  let cor = '#E71B32';

  if (tamanho >= 12 && opcoes >= 3) {
    nivel = 'forte';
    largura = '100%';
    cor = '#00FF85';
  } else if (tamanho >= 8 && opcoes >= 2) {
    nivel = 'media';
    largura = '65%';
    cor = '#FAF408';
  }

  barraForca.style.width = largura;
  barraForca.style.backgroundColor = cor;
  textoForca.textContent = nivel === 'fraca' ? 'Fraca' : nivel === 'media' ? 'Média' : 'Forte';
}

botaoGerar.addEventListener('click', () => {
  const senha = criarSenha();

  if (senha) {
    campoSenha.value = senha;
    definirForca(senha);
  }
});

botaoCopiar.addEventListener('click', async () => {
  if (!campoSenha.value) {
    alert('Gere uma senha antes de copiar.');
    return;
  }

  try {
    await navigator.clipboard.writeText(campoSenha.value);
    botaoCopiar.textContent = 'Copiado!';
    setTimeout(() => {
      botaoCopiar.textContent = 'Copiar';
    }, 1200);
  } catch (error) {
    alert('Não foi possível copiar a senha.');
  }
});

diminuir.addEventListener('click', () => {
  if (tamanho > minLength) {
    tamanho -= 1;
    atualizarTamanho();
  }
});

aumentar.addEventListener('click', () => {
  if (tamanho < maxLength) {
    tamanho += 1;
    atualizarTamanho();
  }
});

[checkboxMaiusculo, checkboxMinusculo, checkboxNumero, checkboxSimbolo].forEach(input => {
  input.addEventListener('change', atualizarIndicadorDeForca);
});

atualizarTamanho();
