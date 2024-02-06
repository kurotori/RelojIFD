<?php 
    /**
     * 
     */
    function funcionarioExiste($ci_funcionario){
        $resultado = false;

        $consultaFuncExiste = "SELECT count(*) as conteo from funcionario where ci=:ci;";

        $bdd = new SQLite3("../db/reloj.db");
        $sentencia = $bdd->prepare($consultaFuncExiste);
        $sentencia->bindValue(":ci",$ci_funcionario,SQLITE3_INTEGER);
        $resultado = $sentencia->execute();

        while ($datos_r = $resultado->fetchArray(SQLITE3_ASSOC)) {
            $cantU = $datos_r["conteo"];

        };

        if ($cantU == 1) {
            $resultado = true;
        }

        return $resultado;
        
    }
 ?>