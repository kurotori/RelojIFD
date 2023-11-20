<?php 
// CONSULTAS
/**
 * Consulta: uĺtima firma realizada por el funcionario en el día de hoy
 * Parámetro: :ci
 */
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
AND
firma_id IN
(SELECT id from firma 
where date(fechahora) = date())
order by 3 DESC
LIMIT 1;";

/**
 * Consulta: Conteo de las últimas firmas del funcionario en el día
 */
$consultaConteoFirmasFunc = "SELECT
count(*) as conteo
FROM realiza
WHERE 
funcionario_ci = :ci
AND
firma_id IN
(SELECT id from firma 
where date(fechahora) = date()
);";

/**
 * Consulta: Datos del funcionario
 */

 $consultaDatosFuncionario="SELECT ci,nombre,apellido from funcionario where ci=:ci;";

/**
 * Consulta: Obtiene la ID de la SIGUIENTE firma en el sistema
 */
$consultaUltFirmaSis = "SELECT 
id+1 from firma
order by id DESC
LIMIT 1;";

/**
 * Consulta: Busca al funcionario en el sistema
 */
$consultaFuncExiste = "SELECT count(*) as conteo from funcionario
where ci=:ci;";

/**
 * Consulta: Firmas del día de hoy en el sistema
 */
$consultaFirmasDeHoy = "SELECT id from firma 
where date(fechahora) = date();";



/**
 * Consulta: Ingresar firma al sistema
 */
$consultaInsertarFirma = "INSERT into firma(tipo,fechahora,id_anterior)
values (:tipo, :fechahora, :id_anterior)
";


/**
 * Consulta: ID de la última firma registrada
 */
$consultaIDUltimaFirma = "SELECT count(*) as 'ult_id' from firma;";


/**
 * Consulta: Vincular firma a funcionario
 */
$consultaVincularFirma = "INSERT INTO realiza(funcionario_ci, firma_id)
values(:funcionario_ci, :firma_id);";

// --- --- --- --- --- --- --- --- --- --- --- --- --- 
 ?>