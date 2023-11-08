<?php 
    include_once "clases.php";
    include_once "funciones.php";

    // CONSULTAS
    $consultaUltFirma = "SELECT
    (SELECT firma.tipo from firma
    where firma.id = firma_id) as tipo,
    (SELECT firma.fechahora from firma
    where firma.id = firma_id) as 'Tiempo'
    FROM realiza
    WHERE 
    funcionario_ci = 1234578
    order by 2 DESC
    LIMIT 1
    ;";

    $consultaFuncExiste = "SELECT count(*) as conteo from funcionario
    where ci=:ci;";
    // --- --- --- --- --- --- --- --- --- --- --- --- --- 

    $datos = file_get_contents('php://input');
    $respuesta = new Respuesta();
    //2 - Si los datos recibidos NO son vacíos, procedemos a validarlos
    if ( ! empty($datos) ) {
        $datosJSON = json_decode($datos);

        $ci_funcionario = $datosJSON->ci;

        $bdd = new SQLite3("../db/reloj.db");
        
        
        //print_r($datosJSON);
        respuestaJSON($respuesta);



    }
    else {
        $datos = new stdClass;
        $datos->cosa="algo";
    }

    

    



    

 ?>