const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '0c1b93f23502cd33448229b06ba9d10b';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;

function carregaFilmes () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function pesquisaFilmes () {
    xhr = new XMLHttpRequest ();

    query = document.getElementById('pesquisa').value;

    xhr.open ('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY + '&query=' + query, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}


function exibeFilmes () {
    
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG_PREFIX + data.results[i].poster_path;

        textoHTML += `<div class="card col-md-4 alinhamento-cards">
            <img src="${imagem}" class="imagens-destaque" alt="...">
            <div class="card-body scroll-sinopse altura-card">
                <h5 class="card-title texto-sinopse">${nomeFilme}</h5>
                <p class="card-text texto-sinopse">${sinopse}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML = textoHTML;
}