//Esta funcion la usamos para cargar cada página de forma individual y usamos el sistema de promesas https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

function load_page(page) {
  return new Promise((resolve, error) => {
    $('#app').load('views/' + page + '.html', () => {
      resolve('views/' + page + '.html')
    })
  })
}

//Esto es un clon de la funcion, pero para cargar articulos

function load_article(page) {
  return new Promise((resolve, error) => {
    $('#app').load('articulos/' + page + '.html', () => {
      resolve('articulos/' + page + '.html')
    })
  })
}

//En caso de hacer click en el boton con el id "menu-btn" alternamos la barra lateral

$('#menu-btn').on('click', () => {
  toggle_sidebar()
})

//Cuando hagamos click a un boton del menu lateral, cargamos la página

$('.sidebar .menu .page').on('click', (boton) => {
  let pagina = $(boton.currentTarget).attr('data-page')
  load_page(pagina).then((r) => {
    close_sidebar()
  })
})

//Con esta funcion abrimos/cerramos/taggleamos el sidebar

function open_sidebar() {
  $('.sidebar').show()
  $('.sidebar').addClass('expanded')
}

function close_sidebar(timeout = 500) {
  $('.sidebar').removeClass('expanded')
  setTimeout(() => {
    $('.sidebar').hide()
  }, timeout)
}

function toggle_sidebar() {
  if ($('.sidebar').css('display') == 'none') {
    open_sidebar()
  } else {
    close_sidebar()
  }
}

//Esta funcion se encarga de leer el json y cargar los articulos

function load_articles(holder) {
  $.getJSON('articulos.json', function (data) {
    data.forEach((article) => {
      $(holder).append(`
            <div class="article" onclick="load_article('${article.html}')">
                <img src="${article.imagen}" alt="">
                <h3>${article.titulo}</h3>
            </div>
          `)
    })
  })
}

//Por defecto, cargamos la página de inicio

load_page('inicio')

//Detectamos el scroll en la página y lo ponemos a un progressbar

$('#app').scroll(function () {
  var current_scroll_top = $('#app').scrollTop()
  $('#scroll').attr('max', $('#app').height() - 300)
  $('#scroll').attr('value', current_scroll_top)
})
