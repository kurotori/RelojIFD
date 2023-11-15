<?php 
    include_once "clases.php";
    include_once "funciones.php";
    include_once "consultas.php";

    

    $datos = file_get_contents('php://input');
    $respuesta = new Respuesta();
    
    //Recibir CI
    if ( ! empty($datos) ) {
        $datosJSON = json_decode($datos);

        $ci_funcionario = $datosJSON->ci;
        //var_dump($ci_funcionario);

        //Inicializar BDD
        $bdd = new SQLite3("../db/reloj.db");

        //Buscar la CI del funcionario
        $sentencia = $bdd->prepare($consultaFuncExiste);
        $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
        $resultado = $sentencia->execute();
        //var_dump($resultado->fetchArray());

        while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
            $cantU = $datos_r["conteo"];

        };

        //Si el funcionario existe...
        if ($cantU == 1) {

            $respuesta->estado = "OK";
            $respuesta->datos = "El usuario existe";
            
            //Preparación de la firma nueva
            $firmaAnt = new Firma;
            $firmaAnt->id = 0;

            $firmaNueva = new Firma;
            $firmaNueva->tipo = "entrada";

            //Se buscan las últimas firmas del usuario en el día
            $sentencia = $bdd->prepare($consultaConteoFirmasFunc);
            $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
            $resultado = $sentencia->execute();

            $cantF=0;
            while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
                $cantF = $datos_r["conteo"];
            };

            //Si el usuario ya ha realizado firmas en el día, chequeamos el tipo de la última
            if ($cantF > 0) {
                $sentencia = $bdd->prepare($consultaUltFirmaFunc);
                $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
                $resultado = $sentencia->execute();
            }
            

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