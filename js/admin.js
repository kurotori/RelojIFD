const ulListaFuncPresentes = document.getElementById("lista_func_presentes")
const ullistaUltimasFirmas = document.getElementById("lista_ultimas_firmas")

const urlApiAdmin="http://localhost/RelojIFD/api/admin.php"

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
}



/**
 * 
 */
function obtenerFirmasTodas() {
    const datosConsulta = {}
    datosConsulta.modo = 0;

    enviarAlServidor(datosConsulta,urlApiAdmin).
        then(res=>{
            console.log(res)
            limpiarListaUltFirmas()

            res.respuesta.datos.forEach(firma => {
                console.log(firma)
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
        })

    setTimeout(obtenerFirmasTodas,5000)
}

