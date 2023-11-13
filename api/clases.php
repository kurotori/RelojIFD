<?php 

class Funcionario
{
    public $ci;
    public $nombre;
    public $apellido;
}

class Firma
{
    public $id;
    public $fechahora;
    public $tipo;
    public $id_ant = 0;

}

class respuesta
{
    public $estado;
    public $datos;
}

?>