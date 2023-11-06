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