insert into funcionario
(ci,nombre,apellido)
VALUES
(12345678,"fulano","de tal");

SELECT count(*) 
from realiza
WHERE
funcionario_ci="1234578";

insert into firma
(id)
VALUES
(
	(SELECT count(*)+1 from firma)
);

insert into realiza
(funcionario_ci,firma_id)
VALUES
(1234578,1);

SELECT
(SELECT firma.tipo from firma
where firma.id = firma_id) as tipo,
(SELECT firma.fechahora from firma
where firma.id = firma_id) as "Tiempo"
FROM realiza
WHERE 
funcionario_ci = 1234578
order by 2 DESC
LIMIT 1
;

SELECT count(id) as firmas from firma 
where date(fechahora) = date();