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
            //$respuesta->datos = "El usuario existe";
            
            //Obtenemos los datos del funcionario

            $funcionario = new Funcionario;

            $sentencia = $bdd->prepare($consultaDatosFuncionario);
            $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
            $resultado = $sentencia->execute();
            //var_dump($resultado->fetchArray());

            while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
                $funcionario->ci = $datos_r["ci"];
                $funcionario->nombre = $datos_r["nombre"];
                $funcionario->apellido = $datos_r["apellido"];
            };

            //Preparación de la firma nueva
            $firmaAnt = new Firma;
            $firmaAnt->id = 0;

            $firmaNueva = new Firma;
            $firmaNueva->id = 0;
            $firmaNueva->tipo = "entrada";
            $firmaNueva->fechahora = date("Y-m-d h:i:s");

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
                $sentencia = $bdd->prepare("$consultaUltFirmaFunc");
                $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
                $resultado = $sentencia->execute();
                
                while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
                    //var_dump($datos_r);
                    $firmaAnt->tipo = $datos_r["tipo"];
                    $firmaAnt->id = $datos_r["id"];
                };
                /* echo($firmaAnt->tipo);
                echo("----");
                var_dump(strstr("entrada",$firmaAnt->tipo)); */
                if (strstr("entrada",$firmaAnt->tipo)) {
                    $firmaNueva->tipo = "salida";
                    $firmaNueva->id_ant = $firmaAnt->id;
                } 
                

                //Si el tipo de la firma anterior es 'entrada'....
                /*if (strcmp("$firmaAnt->tipo","entrada")) {
                    $firmaNueva->tipo = "salida";
                    $firmaNueva->id_ant = $firmaAnt->id;
                }
                else{
                    echo("No detecto el tipo de firma");
                }*/ 

                
            }
            //Agregar firma
            $sentencia = $bdd->prepare($consultaInsertarFirma);
            $sentencia->bindValue(":tipo",$firmaNueva->tipo);
            $sentencia->bindValue(":fechahora",$firmaNueva->fechahora);
            $sentencia->bindValue(":id_anterior",$firmaNueva->id_ant);
            $sentencia->execute();

            $id_ultima_firma=0;
            //Se obtiene la ID de la firma agregada
            $resultado = $bdd->query($consultaIDUltimaFirma);
            while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
                $id_ultima_firma = $datos_r["ult_id"];
            };


            $firmaNueva->id = $id_ultima_firma;
            //var_dump($firmaNueva);
            //Vincular la firma al funcionario
            $sentencia = $bdd->prepare($consultaVincularFirma);
            $sentencia->bindValue(":funcionario_ci",$ci_funcionario);
            $sentencia->bindValue(":firma_id",$id_ultima_firma);
            $sentencia->execute();


            $respuesta->datos = new stdClass;
            $respuesta->datos->funcionario = $funcionario;
            $respuesta->datos->firma = $firmaNueva;
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