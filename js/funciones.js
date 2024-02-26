async function enviarAlServidor(datos,url) {
    resultado = await fetch(url, { //'http://localhost:3000/login/login.php', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(datos)
    })
    .then(res => res.json())
    return await resultado
}

/**
 * Permite obtnener el mensaje de errorvinculado a un código
 */
function analizarError(codError) {
    let respuesta=""
    switch (codError) {
        case "E1":
          respuesta = "La CI ingresada ( :funcionario_ci ) no existe en el sistema"
          break;
        case "E2":
            respuesta = "La CI ingresada ( :funcionario_ci ) ya existe en el sistema"
        default:
          break;
      }
    return respuesta
}

/**
 * Permite chequear que los campos requeridos de un formulario estén todos completos
 */
function chequearFormulario(formulario) {
    listaCampos = Array.from(formulario.getElementsByTagName("input"))
    
    resultado = true
    cuentaError = 0

    listaCampos.forEach(campo => {
        campo.classList.remove("campoError")
        if (campo.classList.contains("requerido")) {
            console.log(campo)
            if (campo.value.length < 1) {
                campo.classList.add("campoError")
                cuentaError += 1
            }
        }
    });

    if (cuentaError>0) {
        resultado = false
    }
    return resultado
}