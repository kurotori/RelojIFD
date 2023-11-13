<?php 
    include_once "clases.php";
    include_once "funciones.php";

    // CONSULTAS
    $consultaUltFirmaFunc = "SELECT
    (SELECT firma.tipo from firma
    where firma.id = firma_id) as 'tipo',
    (SELECT firma.id from firma
    where firma.id = firma_id) as 'id',
    (SELECT firma.fechahora from firma
    where firma.id = firma_id) as 'fechahora'
    FROM realiza
    WHERE 
    funcionario_ci = :ci
    order by 3 DESC
    LIMIT 1;";

    $consultaUltFirmaSis = "SELECT 
    id+1 from firma
    order by id DESC
    LIMIT 1;";

    $consultaFuncExiste = "SELECT count(*) as conteo from funcionario
    where ci=:ci;";

    $consultaFirmasDeHoy = "SELECT id from firma 
    where date(fechahora) = date();";
    // --- --- --- --- --- --- --- --- --- --- --- --- --- 

    $datos = file_get_contents('php://input');
    $respuesta = new Respuesta();
    
    if ( ! empty($datos) ) {
        $datosJSON = json_decode($datos);

        $ci_funcionario = $datosJSON->ci;
        //var_dump($ci_funcionario);

        $bdd = new SQLite3("../db/reloj.db");

        $sentencia = $bdd->prepare($consultaFuncExiste);
        $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
        $resultado = $sentencia->execute();
        //var_dump($resultado->fetchArray());

        while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
            $cantU = $datos_r["conteo"];

        };

            if ($cantU == 1) {

                $respuesta->estado = "OK";
                $respuesta->datos = "El usuario existe";
                
                $sentencia = $bdd->prepare($consultaUltFirmaFunc);
                $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
                $resultado = $sentencia->execute();
                
                $firmaAnt = new Firma;
                $firmaAnt->id = 0;

                $firmaNueva = new Firma;
                $firmaNueva->tipo = "entrada";

                while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
                    $firmaAnt->tipo = $datos_r["tipo"];
                    $firmaAnt->id = $datos_r["id"];
                };

                if (strcmp($firmaAnt->tipo,"entrada")) {
                    # code...
                } else {
                    # code...
                }
                

            } else {
                $respuesta->estado = "ERROR";
                $respuesta->datos = "E1";
            }
 /**
  * ERRORES:
  *  E1: Cédula no registrada
  */

        
        //print_r($datosJSON);
        respuestaJSON($respuesta);

        $bdd->close();


    }
    else {
        $datos = new stdClass;
        $datos->cosa="algo";
    }

    

    



    

 ?>