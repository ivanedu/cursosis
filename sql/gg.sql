SELECT
ins.idINSCRIPCION,
CONCAT(per.ape_paterno,' ',per.ape_materno,', ',per.nombre) AS 'perNombreCompleto',
ins.tipo,
CASE ins.tipo 
WHEN 1 THEN (CASE WHEN bol.fecha IS NULL THEN '' ELSE bol.fecha END)
WHEN 2 THEN (CASE WHEN vou.fecha IS NULL THEN '' ELSE vou.fecha END)
ELSE '' END AS 'fecha',
CASE ins.tipo 
WHEN 1 THEN (CASE WHEN bol.monto IS NULL THEN 0 ELSE bol.monto END)
WHEN 2 THEN (CASE WHEN vou.monto IS NULL THEN 0 ELSE vou.monto END)
ELSE 0 END AS 'monto',
CASE WHEN bol.numComprobante IS NULL THEN '' ELSE bol.numComprobante END AS 'numComprobante',
CASE WHEN vou.agente IS NULL THEN 1 ELSE vou.agente END AS 'agente',
CASE WHEN vou.nroOperacion IS NULL THEN 0 ELSE vou.nroOperacion END AS 'nroOperacion',
CASE WHEN vou.nombreBancario IS NULL THEN '' ELSE vou.nombreBancario END AS 'nombreBancario',
CASE WHEN vou.enFisico IS NULL THEN 1 ELSE vou.enFisico END AS 'enFisico',
CASE WHEN vou.imagen IS NULL THEN '' ELSE vou.imagen END AS 'imagen',
ins.presencial
FROM inscripcion ins 
JOIN persona per ON  ins.dni = per.dni
LEFT JOIN boleta bol ON ins.idINSCRIPCION = bol.IdINSCRIPCION
LEFT JOIN voucher vou ON ins.idINSCRIPCION = vou.idINSCRIPCION
WHERE ins.dni = veDni; 