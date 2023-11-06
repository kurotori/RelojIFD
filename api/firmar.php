<?php 
    include_once "clases.php";
    include_once "funciones.php";

    

    $datos = file_get_contents('php://input');

    //2 - Si los datos recibidos NO son vacíos, procedemos a validarlos
    if ( ! empty($datos) ) {
        $datos = json_decode($datos);
    }
    else {
        $datos = new stdClass;
        $datos->cosa="algo";
    }

    $bdd = new SQLite3("../db/reloj.db");

    respuestaJSON($datos);

 ?>