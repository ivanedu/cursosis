-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPersona`(
IN `opcion` VARCHAR(50), 
IN `inicio` INT(11), 
IN `final` INT(11), 
IN `perId` INT(11), 
IN `perNombre` VARCHAR(50), 
IN `perApePaterno` VARCHAR(50), 
IN `perApeMaterno` VARCHAR(50), 
IN `perEdad` INT(11), 
IN `perSexo` CHAR(1)
)
BEGIN
	IF opcion = 'listar' THEN
		SELECT
			per.perId,
			per.perNombre,
			per.perApePaterno,
			per.perApeMaterno,
			per.perEdad,
			per.perSexo
		FROM persona per;
	END IF;
	IF opcion = 'listarContador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM persona per;
	END IF;
END