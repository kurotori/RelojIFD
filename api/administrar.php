<?php 

    include_once "clases.php";
    include_once "funciones.php";
    include_once "consultas.php";
    include_once "funciones_bd.php";

    $f = new Funcionario;
    $f->apellido = "ahahaha";
    $f->nombre = "ehehehe";
    $f->ci = "87654321";
    var_dump(registrarFuncionario($f));


?>