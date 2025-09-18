let seuVotoPara = document.querySelector ('.d-1-1 span')
let cargo = document.querySelector ('.d-1-2 span')
let descricao = document.querySelector ('.d-1-4')
let aviso = document.querySelector ('.d-2')
let lateral = document.querySelector ('.d-1-right')
let numeros = document.querySelector ('.d-1-3')

let etapaInicial = 0
let numero = ''
let votoBranco = false
let votos = []

function começarEtapas () {
    let etapa = etapas[etapaInicial]
    votoBranco = false
    let numerosHTML = ''
    numero = ''
    
    
    for (let i=0;i<etapa.numeros;i++) {
        if (i === 0) {
            numerosHTML += '<div class="numero pisca"></div>'
        } else {
            numerosHTML += '<div class="numero"></div>'
        }
    }
    
    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML =''
    numeros.innerHTML = numerosHTML
    
}


function clicou (n) {
    let elNumero = document.querySelector ('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove ('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add ('pisca')
        } else {
            AtualizarEtapas()
        }
    }

}

function AtualizarEtapas () {
    let etapa = etapas[etapaInicial]
    let candidato = etapa.candidatos.filter((item)=> {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = (`Nome: ${candidato.nome} <br/> Partido ${candidato.partido}`)


        let fotosHTML = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
            fotosHTML += `<div class="d-1-right"><div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
            fotosHTML += `<div class="d-1-right"><div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHTML

    } else {    
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = '<div class="aviso-grande">VOTO NULO</div>'

    }
}
function branco () {
    if (numero === '') {

        votoBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso-grande">VOTO EM BRANCO</div>'
    } else {
        alert ('para votar em branco, não pode ter digitado nenhum numero')
    }
}
function corrige () {
    começarEtapas ()
}
function confirma () {
    let etapa = etapas[etapaInicial]
    let votoConfirmado = false
    if (votoBranco === true) {
        votoConfirmado = true
        votos.push ({
            etapa: etapas[etapaInicial].titulo,
            voto: 'branco'
        })
    } else if (numero.leaght === etapa.numero) {
        votoConfirmado = true
         votos.push ({
            etapa: etapas[etapaInicial].titulo,
            voto: 'numero'
        })
    }



    if (votoConfirmado) {
        etapaInicial ++
        if (etapas[etapaInicial] !== undefined) {
            começarEtapas()
        } else {
            document.querySelector('.tela').innerHTML = ('<div class="aviso-gigante">FIM</div>')
            console.log (votos)
        }
    }
}

começarEtapas ()