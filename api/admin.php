<?php 
    include_once "clases.php";
    include_once "funciones.php";
    include_once "consultas.php";


    $modo=0;
    
    $datos = file_get_contents('php://input');
    
    date_default_timezone_set('America/Montevideo');

    if ( ! empty($datos) ) {
        $respuesta = new Respuesta();
        $datosJSON = json_decode($datos);
        $modo = $datosJSON->modo;
        
        $bdd = new SQLite3("../db/reloj.db");

        switch ($modo) {
            case '0':
                
                break;
            
            default:
                # code...
                break;
        }
    }
 ?>