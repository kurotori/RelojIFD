<?php 
    /**
     * 
     */
    function funcionarioExiste($ci_funcionario){
        $respuesta = false;

        $consultaFuncExiste = "SELECT count(*) as conteo from funcionario where ci=:ci;";

        $bdd = new SQLite3("../db/reloj.db");
        $sentencia = $bdd->prepare($consultaFuncExiste);
        $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
        $resultado = $sentencia->execute();

        while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
            $cantU = $datos_r["conteo"];

        };

        if ($cantU == 1) {
            $respuesta = true;
        }

        $bdd->close();
        return $respuesta;
        
    }

    /**
     * 
     */
    function registrarFuncionario(Funcionario $funcionario){
        $respuesta = false;

        $consultaNuevoFunc = "INSERT into funcionario(ci,nombre,apellido) values (:ci, :nombre, :apellido)";

        $bdd = new SQLite3("../db/reloj.db");
        $sentencia = $bdd->prepare($consultaNuevoFunc);
        $sentencia->bindValue(":ci",$funcionario->ci,SQLITE3_INTEGER);
        $sentencia->bindValue(":nombre",$funcionario->nombre,SQLITE3_TEXT);
        $sentencia->bindValue(":apellido",$funcionario->apellido,SQLITE3_TEXT);
        $sentencia->execute();

        if ($bdd->changes() > 0) {
            $respuesta = $bdd->lastErrorMsg();
        }

        $bdd->close();
        return $bdd->lastErrorMsg();//$respuesta;

    }
 ?>