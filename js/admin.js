const divFuncPresentes = document.getElementById('func_presentes')
const divUltimasFirmas = document.getElementById('ultimas_firmas')
const divAdminFunc = document.getElementById('admin_func')
const ulListaFuncPresentes = document.getElementById("lista_func_presentes")
const ullistaUltimasFirmas = document.getElementById("lista_ultimas_firmas")
const spanNumFuncPresentes = document.getElementById('num_func_presentes')

const urlApiAdmin="http://localhost/RelojIFD/api/admin.php"

const firmas = {}

obtenerFirmasTodas()



/** Permite limpiar las listas de la página
 * 
 */
function limpiarListas() {
    ulListaFuncPresentes.innerHTML=""
    ullistaUltimasFirmas.innerHTML=""
}

function limpiarListaUltFirmas() {
    ullistaUltimasFirmas.innerHTML=""
}

function limpiarListaFuncPresentes() {
    ulListaFuncPresentes.innerHTML=""
    spanNumFuncPresentes.innerText=0
}



/**
 * Obtiene el listado de las últimas firmas registradas en el sistema
 */
function obtenerFirmasTodas() {
    const datosConsulta = {}
    datosConsulta.modo = 0;

    enviarAlServidor(datosConsulta,urlApiAdmin).
        then(res=>{
            //console.log(res)
            limpiarListaUltFirmas()

            firmas.lista = []

            res.respuesta.datos.forEach(firma => {
                //console.log(firma)
                firmas.lista.push(firma)

                const liFirma = document.createElement('li')
                if (firma.tipo == 'entrada') {
                    liFirma.classList.add('entrada')
                }
                else{
                    liFirma.classList.add('salida')
                }

                const pFuncionario = document.createElement('p')
                pFuncionario.classList.add('funcionario')
                pFuncionario.innerText = firma.nombre + ' ' +firma.apellido
                liFirma.appendChild(pFuncionario)

                const pDescripcion = document.createElement('p')
                pDescripcion.classList.add('descripcion')
                pDescripcion.innerHTML = 
                    "<span class='tipoFirma'>" + 
                    firma.tipo.toUpperCase() + 
                    "</span> a las <span class='horaEntrada'>" +
                    firma.fechahora.split(' ')[1] +
                    "</span>"
                liFirma.appendChild(pDescripcion)
                ullistaUltimasFirmas.appendChild(liFirma)
            });
            obtenerFuncionariosPresentes()
        })

    setTimeout(obtenerFirmasTodas,5000)
}


/**
 * Permite obtener las firmas aún no cerradas del registro enviado por el servidor 
 * @param {*} firmas 
 * @returns 
 */
function firmasAbiertas(firmas) {
    let firmas_ = []
    let firmasEntrada = firmas.lista.filter(function(firma){return (firma.tipo=='entrada')})
    //let firmasSalida = firmas.lista.filter(function(firma){return (firma.tipo=='salida')})
    
    firmasEntrada.forEach(firma => {
        ff = firmas.lista.filter(function(firmita){return (firmita.tipo=='salida' & firmita.id_anterior==firma.id)})
        if (ff.length == 0) {
            firmas_.push(firma)
        }
    });

    return firmas_
}

/**
 * 
 */
function obtenerFuncionariosPresentes() {
    ulListaFuncPresentes.innerHTML=""
    firmasAb = firmasAbiertas(firmas)

    spanNumFuncPresentes.innerText = firmasAb.length

    firmasAb.forEach(firma => {
        const liFuncionario = document.createElement('li')
        const pFuncionario = document.createElement('p')
        pFuncionario.classList.add('funcionario')
        pFuncionario.innerText = firma.nombre + ' ' +firma.apellido

        const pHorario = document.createElement('p')
        pHorario.classList.add('descripcion')
        pHorario.innerHTML = "Desde <span class='horaEntrada'>" + firma.fechahora.split(' ')[1].substring(0,5) + "</span>"

        liFuncionario.appendChild(pFuncionario)
        liFuncionario.appendChild(pHorario)
        ulListaFuncPresentes.appendChild(liFuncionario)

    });

}


function AbrirAdminFuncionarios() {
    divFuncPresentes.style.display="none"
    divUltimasFirmas.style.display="none"
    divAdminFunc.style.display="block"
}

function AbrirInicio() {
    divFuncPresentes.style.display="block"
    divUltimasFirmas.style.display="block"
    divAdminFunc.style.display="none"
}



