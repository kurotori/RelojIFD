
const divHerramientas = document.getElementById('herramientas')
const divFuncPresentes = document.getElementById('func_presentes')
const divUltimasFirmas = document.getElementById('ultimas_firmas')
const divAdminFunc = document.getElementById('admin_func')
const divAdminFuncResultados = document.getElementById('admin_func_resultados')
const ulListaFuncPresentes = document.getElementById("lista_func_presentes")
const ullistaUltimasFirmas = document.getElementById("lista_ultimas_firmas")
const ullistaFuncResultados = document.getElementById("lista_func_resultados")
const spanNumFuncPresentes = document.getElementById('num_func_presentes')
const divMenuFuncionario = document.getElementById('menu_funcionario')
const divMenu_registro = document.getElementById('menu_registro')
const claseSubMenu= Array.from(document.getElementsByClassName('submenu'))
const divRegistroFuncionario = document.getElementById('registro_funcionario')
const formRegistroFuncionario = document.getElementById('form_reg_funcionario')
const formRegistroMasivo = document.getElementById('form_reg_masivo')
const pMensajeDeErrorForm = document.getElementById("errorFormRegistroFuncionario")
const inptArchivoReg = document.getElementById('archivo_reg')


const urlApiAdmin="http://localhost/RelojIFD/api/admin.php"

divMenuFuncionario.style.height='0px'
divRegistroFuncionario.style.height='0px'

const firmas = {}

let modoReg = 0

//const arrHerramientas = Array.from(document.getElementsByClassName('herramienta'))
//arrHerramientas.forEach(herramienta => {
   // herramienta.addEventListener("click",cerrarHerHerramientas)
//});

obtenerFirmasTodas()



/** Permite limpiar las listas de la página
 * 
 */
function limpiarLista(lista) {
    lista.innerHTML=""
}

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

    if (divFuncPresentes.offsetParent != null) {
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
        }
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

function cerrarHerHerramientas() {
    divHerramientas.style.left = "-200px"
    console.log("cerrar")
}




function AbrirAdminFuncionarios() {
    divFuncPresentes.style.display="none"
    divUltimasFirmas.style.display="none"
    divAdminFunc.style.display="block"
    divAdminFuncResultados.style.display="block"
    limpiarLista(ullistaFuncResultados)
    //setTimeout(cerrarHerHerramientas,500)
}

function AbrirInicio() {
    divFuncPresentes.style.display="block"
    divUltimasFirmas.style.display="block"
    divAdminFunc.style.display="none"
    divAdminFuncResultados.style.display="none"
    //setTimeout(cerrarHerHerramientas,500)
}

function abrirMenuFuncionarios(modo) {
    if (divMenuFuncionario.style.height=="0px") {
        divMenuFuncionario.style.height="60px"
        switch (modo) {
            case "registro":
                claseSubMenu.filter(function (sm) { return(sm.id=='menu_registro')})[0].style.display='block'
                break;
        
            default:
                break;
        }
    } else {
        divMenuFuncionario.style.height="0px"
        claseSubMenu.forEach(submenu => {
            submenu.style.display='none'
        });
    }
}


function abrirFormularioRegistro(modo) {
    pMensajeDeErrorForm.innerText = ""
    if (divRegistroFuncionario.style.height=='0px') {
        divRegistroFuncionario.style.height='220px'
        switch (modo) {
            case 'uno':
                formRegistroFuncionario.style.display='block'
                formRegistroMasivo.style.display='none'
                modoReg = 1
                break;
            case 'archivo':
                formRegistroFuncionario.style.display='none'
                formRegistroMasivo.style.display='block'
                modoReg = 2
                break;
            default:
                break;
        }
    } else {
        divRegistroFuncionario.style.height='0px'
        formRegistroFuncionario.style.display='none'
    }
}


function registrarFuncionario(modo) {
    
    console.log(modo)
    const datosConsulta = {}
    switch (modo) {
        case 1:
            
            if ( chequearFormulario(formRegistroFuncionario) ) {
                //console.log("form bien")
                datosConsulta.modo = 1;
                datosConsulta.ci = formRegistroFuncionario.getElementsByTagName("input").ci_funcionario.value
                datosConsulta.nombre = formRegistroFuncionario.getElementsByTagName("input").nombre_funcionario.value
                datosConsulta.apellido = formRegistroFuncionario.getElementsByTagName("input").apellido_funcionario.value
                
                enviarAlServidor(datosConsulta,urlApiAdmin).
                    then(res=>{

                        if (res.respuesta.estado=="ERROR") {
                            textoError = analizarError(res.respuesta.datos)
                            textoError = textoError.replace(":funcionario_ci",datosConsulta.ci)
                            console.log(textoError)
                            pMensajeDeErrorForm.innerText = "ERROR: "+textoError
                        }
                        else{
                            alert(res.respuesta.datos)
                            pMensajeDeErrorForm.innerText = ""
                        }
                    })
            }
            else {
                pMensajeDeErrorForm.innerText = "ERROR: Deben completarse todos los campos"
            }

            break;

        case 2:
            //console.log("probando")
            const archivo = inptArchivoReg.files[0]
            let erroresArch = 0
            //console.log(archivo)
            let funcionarios = []

            const r = Papa.parse(archivo, {
                complete: function(results) {
                    //Procesando y preparando registros para enviarse
                    results.data.shift()
                    results.data.forEach(registro => {
                        if (registro.length == 3) {
                            const funcionario = {}

                            funcionario.nombre = registro[0]
                            funcionario.apellido = registro[1]
                            funcionario.ci = registro[2]
                            funcionarios.push(funcionario)
                            /* if (typeof funcionario.nombre === "string") {
                                if (typeof funcionario.apellido === "string") {
                                    if (typeof funcionario.ci === "bigint") {
                                        funcionarios.push(funcionario)
                                    }
                                    else{
                                        erroresArch++
                                        console.log("error en ci")
                                        console.log(typeof funcionario.ci)
                                    }
                                }
                                else{
                                    erroresArch++
                                    console.log("error en apellido")
                                }
                            }
                            else{
                                erroresArch++
                                console.log("error en nombre")
                            }
                            //console.log(funcionario) */
                            
                        } else {
                            //console.log("registro mal formado")
                        }
                        
                    });

                    //console.log(funcionarios)
                    if (erroresArch < 1 ) {
                        datosConsulta.modo = 2
                        datosConsulta.datos = funcionarios

                        enviarAlServidor(datosConsulta,urlApiAdmin).
                        then(res=>{

                            console.log(res)

                            const liTarea = document.createElement('li')
                            const pTarea = document.createElement('p')
                            pTarea.classList.add('resultado')
                            pTarea.innerText = res.respuesta.tarea
                            liTarea.append(pTarea)
                            
                            const pRegistros = document.createElement('p')
                            pRegistros.classList.add('descripcion')
                            pRegistros.innerText = "Registros Correctos: " + res.respuesta.datos.registros
                            liTarea.append(pRegistros)
                            
                            if (res.respuesta.datos.errores > 0) {
                                const pErrores = document.createElement('p')
                                pErrores.classList.add('descripcion')
                                pErrores.innerText = "Errores de Registro: " + res.respuesta.datos.errores
                                liTarea.append(pErrores)
                                const pListaErrores = document.createElement('p')
                                pListaErrores.classList.add('descripcion')
                                pListaErrores.innerText = "No fue posible registrar los funcionarios con las siguientes CI:"
                                liTarea.append(pListaErrores)
                                res.respuesta.datos.ci_errores.forEach(ci => {
                                    const pCi = document.createElement('p')
                                    pCi.classList.add('descripcion')
                                    pCi.innerHTML = "&nbsp;&nbsp; - &nbsp;" + ci.ci + ": &nbsp;" + ci.causa
                                    liTarea.append(pCi)
                                });
                            }
                            ullistaFuncResultados.append(liTarea)

                        })
                    }
                    else{
                        const liTarea = document.createElement('li')
                        const pTarea = document.createElement('p')
                        pTarea.classList.add('resultado')
                        pTarea.innerText = "Registro Masivo de Funcionarios"
                        liTarea.append(pTarea)
                        
                        const pE1 = document.createElement('p')
                        pE1.classList.add('descripcion')
                        pE1.innerText = "Error: El archivo esta formateado de forma incorrecta."
                        const pE2 = document.createElement('p')
                        pE2.classList.add('descripcion')
                        pE2.innerText = "Verifique que el contenido del mismo se ajusta al del archivo de ejemplo."
                        liTarea.append(pE1)
                        liTarea.append(pE2)
                        ullistaFuncResultados.append(liTarea)
                    }
                    


                }
            });
            
            break;
        default:
            break;
    }
    


}

