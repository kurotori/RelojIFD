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