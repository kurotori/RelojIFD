<?php 
    include_once "clases.php";
    include_once "funciones.php";



    $modo=0;
    
    $datos = file_get_contents('php://input');
    $respuesta = new Respuesta();
    date_default_timezone_set('America/Montevideo');

    if ( ! empty($datos) ) {
        $datosJSON = json_decode($datos);
        $modo = $datosJSON->modo;
    } if ( ! empty($datos) ) {
        $datosJSON = json_decode($datos);
 ?>