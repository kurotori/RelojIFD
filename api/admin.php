<?php 
    include_once "clases.php";
    include_once "funciones.php";
    include_once "consultas.php";
    include_once "funciones_bd.php";

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
         * 0: Últimas firmas registradas y Funcionarios presentes
         * 1: Registro de funcionario (uno)
         * 2: Registro de funcionarios (por archivo)
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
            case '1':
                //Registrar funcionario (uno)
                $funcionario = new Funcionario();
                //print_r($datosJSON);
                $funcionario->ci = $datosJSON->ci;
                $respuesta->tarea = "Registro de un funcionario";
                //$datos = $datosJSON->modo;

                if ( ! funcionarioExiste($funcionario->ci)) {
                    $funcionario->nombre = $datosJSON->nombre;
                    $funcionario->apellido = $datosJSON->apellido;
                    
                    $registro = registrarFuncionario($funcionario);
                    
                    if($registro){
                        $respuesta->estado = "OK";
                        $respuesta->datos = "El funcionario $funcionario->ci fue registrado con éxito";
                    }
                    else{
                        $respuesta->estado = "ERROR";
                        $respuesta->datos = "No fue posible registrar al usuario: ".$bdd->lastErrorMsg();
                    }
                }
                else{
                    $respuesta->estado = "ERROR";
                    $respuesta->datos = "E2";
                }
                


                break;
            case '2':
                //print_r($datosJSON->datos);
                //Preparamos la respuesta para almacenar un detalle de los errores
                $respuesta->tarea = "Registro masivo de funcionarios";
                $respuesta->datos= new stdClass;
                $respuesta->estado = "OK";
                $respuesta->datos->errores=0;
                $respuesta->datos->ci_errores=array();
                $respuesta->datos->registros=0;


                foreach ($datosJSON->datos as $dFuncionario) {
                    $funcionario = new Funcionario();

                    $funcionario->ci = $dFuncionario->ci;

                    if ( ! funcionarioExiste($funcionario->ci)) {
                        $funcionario->nombre = $dFuncionario->nombre;
                        $funcionario->apellido = $dFuncionario->apellido;
                        
                        $registro = registrarFuncionario($funcionario);
                    
                        if($registro){
                            $respuesta->datos->registros += 1;
                        }
                        else{
                            $error = new stdClass;
                            $respuesta->estado = "ERROR";
                            $respuesta->datos->errores+=1;
                            $error->ci = $funcionario->ci;
                            $error->causa = "Falla del sistema: $bdd->lastErrorMsg()";

                            array_push($respuesta->datos->ci_errores,$error);
                        }

                    }
                    else{
                        $error = new stdClass;
                        $respuesta->datos->errores+=1;
                        $error->ci = $funcionario->ci;
                        $error->causa = "El funcionario ya esta registrado";
                        array_push($respuesta->datos->ci_errores,$error);
                    }

                    
                    //print_r($funcionario);
                }
                break;
            default:
                # code...
                break;
        }

        respuestaJSON($respuesta);

        $bdd->close();
    }


 ?>