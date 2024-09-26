document.addEventListener('DOMContentLoaded', function () {
  checkAccountType();
  timestampConverter();
  createUrl();
  setupFormLogin5();
  setupFormLogin10();
});


function checkAccountType() {
  document.querySelector('#accountTypeForm').addEventListener('submit', e => {
    e.preventDefault();
    let value = document.querySelector('#accountType').value;

    // Splitting the string and initializing the result
    let parts = value.split("-");
    let result = [];

    // Check the first part
    if (parts[0] === "xx") {
      result.push("SP");
    }
    // Check the second part
    if (parts[1] === "2") {
      result.push("JPN");
    }
    // Check if the last part is even
    if (parseInt(parts[2], 10) % 2 === 0) {
      result.push("leftRegion");
    }
    // Check if the last part is odd
    if (parseInt(parts[2], 10) % 2 !== 0) {
      result.push("rightRegion");
    }

    let accountType = result[0] || '';
    let accountRegion = result[1] || '';
    let azureAccount = result[2] || '';

    document.querySelector('#displayDataAccountType').innerHTML =
      '<strong>Account Type:</strong> ' + accountType +
      '<br><strong>Account Region:</strong> ' + accountRegion +
      '<br><strong>Azure Account:</strong> ' + azureAccount;
  });
}

function timestampConverter() {
  document.querySelector('#timestampConverterForm').addEventListener('submit', e => {
    e.preventDefault();
    let timestamp = document.querySelector('#timeConverter').value;

    // Convertendo para milissegundos e criando o objeto Date
    let data = new Date(timestamp * 1000);

    // Formatando para GMT e fuso horário local
    let gmtFormat = data.toUTCString();
    let localFormat = data.toLocaleString();

    // Calculando o tempo relativo
    let relativeFormat = timeSince(data);


    document.querySelector('#displayDataTimestampConverter').innerHTML =
      '    <strong>GMT: </strong>' + gmtFormat +
      '<br><strong>Your time zone: </strong>' + localFormat +
      '<br><strong>Relative: </strong>' + relativeFormat;

  });

}

function createUrl() {
  document.querySelector('#createUrlForm').addEventListener('submit', function (e) {
    // Prevenindo a submissão padrão do formulário
    e.preventDefault();

    // Obtendo os valores dos campos de entrada
    let account = document.querySelector('#accountURL').value;
    let user = document.querySelector('#uId').value;

    // Concatenando conta e usuário no formato desejado
    let url = `www.${account}.${user}`;

    // Criando um link
    let linkHtml = `<a href="http://${url}" target="_blank">${url}</a>`;

    // Exibindo o link no elemento com id 'display-data4'
    document.querySelector('#display-data4').innerHTML = '<em> Seu link é: </em>' + linkHtml;
  });

}


function setupFormLogin5() {
  document.querySelector('#form-login5').addEventListener('submit', function (e) {
    e.preventDefault();

    let ambiente = document.querySelector('#ambiente-select').value;
    let lado = document.querySelector('#lado-select').value;
    let setorEscolhido = document.querySelector('#setor-select').value;

    let urlsSetorA = [
      // Adicione mais URLs aqui conforme necessário
      { url: `www.${ambiente}.lambdaA.${lado}`, nome: '(AuthVIDA)_Lambda Teste A' },
      { url: `www.${ambiente}.lambdaEEEEEEEEEEEEEEEEEEEEE.${lado}`, nome: '(AuthVIDA)_Lambda Teste A' },
      { url: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.${ambiente}.lambdaA.${lado}`, nome: 'Lambda' },
      { url: `www.${ambiente}.databaseA.${lado}`, nome: 'Banco A' },
      { url: `www.${ambiente}.databaseA.${lado}`, nome: 'Aleatorio' }
    ];

    let urlsSetorB = [
      // Adicione mais URLs aqui conforme necessário
      { url: `www.${ambiente}.lambdaB.${lado}`, nome: 'Lambda Teste B' },
      { url: `www.${ambiente}.databaseB.${lado}`, nome: 'Banco B' }
    ];

    let htmlOutput = '';
    if (setorEscolhido === 'A' || setorEscolhido === 'Ambos') {
      htmlOutput += '<strong class="titulo-setor">URLs Setor A:</strong><br>' + criarHiperlinks(urlsSetorA) + '<br><br>';
    }
    if (setorEscolhido === 'B' || setorEscolhido === 'Ambos') {
      htmlOutput += '<strong class="titulo-setor">URLs Setor B:</strong><br>' + criarHiperlinks(urlsSetorB);
    }

    document.querySelector('#display-data5').innerHTML = htmlOutput;
  });
}

function setupFormLogin10() {
  document.querySelector('#form-login10').addEventListener('submit', function (e) {
    e.preventDefault();
    let filterText = document.querySelector('#filter-text').value;
    let asc = document.querySelector('#test2sss').value;
    let logType = document.querySelector('#log-type').value;
    let logType2 = document.querySelector('#log-type2').value;
    let logType3 = document.querySelector('#log-type3').value;
    let keyword = document.querySelector("#keyword").value;

    let query = generateQuery(asc, logType, logType2, logType3, filterText, keyword);

    // Exibe a consulta na tela
    document.querySelector('#query-results10').innerHTML = '<em><strong>Query: </em></strong> <br>' + query;

  });

}



function criarHiperlinks(urls) {
  let categorias = {};
  urls.forEach(item => {
    let categoria = item.nome.split(' ')[0];
    if (!categorias[categoria]) {
      categorias[categoria] = [];
    }
    categorias[categoria].push(item);
  });

  let outputHtml = '';
  let categoriaCounter = 1;

  Object.keys(categorias).forEach(categoria => {
    outputHtml += `<div class="titulo-categoria">${categoriaCounter}. ${categoria}:</div>`;
    let linkCounter = 1;
    categorias[categoria].forEach(item => {
      outputHtml += `<a href="http://${item.url}" target="_blank" class="nome-link">${linkCounter}. ${item.nome}</a>`;
      linkCounter++;
    });
    categoriaCounter++;


  });

  return outputHtml;
}

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000; // Anos
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }

  interval = seconds / 2592000; // Meses
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }

  interval = seconds / 86400; // Dias
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }

  interval = seconds / 3600; // Horas
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }

  interval = seconds / 60; // Minutos
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }

  return Math.floor(seconds) + " seconds ago";

}


function generateQuery(asc, logType, logType2, logType3, filterText, keyword) {
  let baseQuery = `
    fields @timestamp, @message <br>
    | sort @timestamp ${asc}  <br>
`;

  let filterQuery = "";

  if (logType != "--") {
    filterQuery = `| filter level_name like "${logType}"`;
    if (logType2 != "--") {
      filterQuery += ` ${logType2} level_name like "${logType3} "`;
    }
    filterQuery += `<br>`;
  }

  if (filterText) {
    filterQuery += `| filter account like "*${filterText}*"<br>`;
  }

  if (keyword.trim() !== "") {
    filterQuery += ` | filter @message like "*${keyword}*"<br>`;
  }

  let limitQuery = `| limit 10000 <br>`;

  return baseQuery + filterQuery + limitQuery;
}

