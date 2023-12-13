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

        /**
         * Modos:
         * 0: Últimas firmas registradas
         * 1: Funcionarios presentes
         */
        switch ($modo) {
            case '0':
                //Obtener últimas firmas registradas en el sistema
                $sentencia = $bdd->prepare($consultaFirmasDeHoyFull);
                $resultado = $sentencia->execute();
                
                $respuesta->estado = "OK";
                $respuesta->datos = array();

                while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
                    $firma = new Firma;

                    $firma->id = $datos_r["id"];
                    $firma->fechahora = $datos_r["fechahora"];
                    $firma->tipo = $datos_r["tipo"];
                    $firma->id_anterior = $datos_r["id_anterior"];
                    $firma->ci = $datos_r["ci"];
                    $firma->nombre = $datos_r["nombre"];
                    $firma->apellido = $datos_r["apellido"];
                    
                    array_push($respuesta->datos,$firma);
                };
                break;
            
            default:
                # code...
                break;
        }

        respuestaJSON($respuesta);

        $bdd->close();
    }
 ?>