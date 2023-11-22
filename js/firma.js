const formFirma = document.getElementById("form_firma")
const divReloj = document.getElementById("div_reloj")
const h2Fecha = document.getElementById("fecha")
const h2Hora = document.getElementById("hora")
const h4RelojSaludo = document.getElementById("relojSaludo")

const h3mensajeEstado = document.getElementById("mensajeEstado")
const h4mensajeTexto = document.getElementById("mensajeTexto")

const divImgEstado = document.getElementById("img_estado")

const urlFirma = "http://localhost:3000/api/firmar.php"

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

    enviarAlServidor(funcionario,urlFirma).
    then(res=>{
        console.log(res)
        if (res.respuesta.estado=="ERROR") {
          divImgEstado.classList.remove("firma_neutro")
          divImgEstado.classList.add("firma_error")
          h3mensajeEstado.innerText = res.respuesta.estado
          switch (res.respuesta.datos) {
            case "E1":
              h4mensajeTexto.innerText = "La CI ingresada ("+funcionario.ci+") no existe en el sistema"
              break;
          
            default:
              break;
          }
        }
        if (res.respuesta.estado=="OK") {
          divImgEstado.classList.remove("firma_neutro")
          divImgEstado.classList.add("firma_ok")
          const funcionario={}
          funcionario.nombre=res.respuesta.datos.funcionario.nombre
          funcionario.apellido=res.respuesta.datos.funcionario.apellido
          funcionario.tipoFirma = res.respuesta.datos.firma.tipo
          
          if (funcionario.tipoFirma == "entrada") {
            saludo = "Hola, "
          }
          else{
            saludo = "Hasta luego, "
          }

          h3mensajeEstado.innerText = saludo + funcionario.nombre + " " + funcionario.apellido
          h4mensajeTexto.innerText = "Hemos registrado tu "+funcionario.tipoFirma.toUpperCase()

        }
        //Limpiar mensajes y dejar el sistema pronto para una nueva firma
        setTimeout(()=>{
          divImgEstado.classList.remove("firma_error")
          divImgEstado.classList.remove("firma_ok")
          divImgEstado.classList.add("firma_neutro")
          h3mensajeEstado.innerText="Hola"
          h4mensajeTexto.innerText="Ingrese su CI sin puntos ni espacios"
        },4000)
    })
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

    if (h <= 12) {
      h4RelojSaludo.innerText = "Buenos Días"
    }
    else{
      if (h <= 19) {
      h4RelojSaludo.innerText = "Buenas Tardes"
      }
      else{
        h4RelojSaludo.innerText = "Buenas Noches"
      }
    }
    

    setTimeout(reloj, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }



  function recortarTextoInput(input,limite) {
    if (input.value.length>8) {
        input.value=input.value.slice(0,limite)
    }
  }

  function limitarInputCI() {
    recortarTextoInput(formFirma["ci"],8)
  }

  