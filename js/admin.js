const ulListaFuncPresentes = document.getElementById("lista_func_presentes")
const ullistaUltimasFirmas = document.getElementById("lista_ultimas_firmas")

const urlApiAdmin="http://localhost/RelojIFD/api/"





/** Permite limpiar las listas de la página
 * 
 */
function limpiarListas() {
    ulListaFuncPresentes.innerHTML=""
    ullistaUltimasFirmas.innerHTML=""
}

