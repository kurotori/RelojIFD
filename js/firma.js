const formFirma = document.getElementById("form_firma")
const divReloj = document.getElementById("div_reloj")
const h2Fecha = document.getElementById("fecha")
const h2Hora = document.getElementById("hora")


reloj(divReloj)

const funcionario = {}

formFirma.addEventListener("keydown",(ev)=>{
//    console.log(ev.key)
    if (ev.key == "Enter") {
        prueba()     
    }
})

function prueba() {
    funcionario.ci = formFirma["ci"].value
    console.log(funcionario)
    formFirma["ci"].value = ""
}

function reloj() {
    const hoy = new Date();
    let dia = hoy.getDay();
    let mes = hoy.getMonth();
    let anio = hoy.getFullYear()
    let h = hoy.getHours();
    let m = hoy.getMinutes();
    let s = hoy.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    dia = checkTime(dia);
    mes = checkTime(mes);
    
    h2Hora.innerHTML =  h + ":" + m + ":" + s;
    h2Fecha.innerHTML =  dia + "-" + mes + "-" + anio;
    setTimeout(reloj, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }