-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPersona`(
IN `ve_opcion` VARCHAR(50), 
IN `ve_inicio` INT(11), 
IN `ve_final` INT(11), 
IN `ve_consulta` VARCHAR(50), 
IN `ve_perId` INT(11), 
IN `ve_perNombre` VARCHAR(50), 
IN `ve_perApePaterno` VARCHAR(50), 
IN `ve_perApeMaterno` VARCHAR(50), 
IN `ve_perEdad` INT(11), 
IN `ve_perSexo` CHAR(1)
)
BEGIN
	SET @start = ve_inicio; 
	SET @limit = ve_final; 
	IF ve_opcion = 'listarpagina' THEN
		PREPARE stmt FROM "
		SELECT
			per.perId,
			per.perNombre,
			per.perApePaterno,
			per.perApeMaterno,
			per.perEdad,
			per.perSexo
		FROM persona per
		ORDER BY 
			per.perApePaterno ASC,
			per.perApeMaterno ASC,
			per.perNombre ASC
		LIMIT ?,?";
		EXECUTE stmt USING @start,@limit;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion = 'listartodo' THEN
		SELECT
			per.perId,
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) AS 'perNombreCompleto'
		FROM persona per
		ORDER BY 
			per.perApePaterno ASC,
			per.perApeMaterno ASC,
			per.perNombre ASC;
	END IF;
	IF ve_opcion = 'listarcontador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM persona per;
	END IF;
	IF ve_opcion = 'filtrarcontador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM persona per
		WHERE
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) LIKE CONCAT(ve_consulta,'%');
	END IF;
	IF ve_opcion = 'filtrartodomenosperidcontador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM persona per
		WHERE
			per.perId<>ve_perId AND
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) LIKE CONCAT(ve_consulta,'%');
	END IF;
	IF ve_opcion = 'filtrartodomenosperid' THEN
		SELECT
			per.perId,
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) AS 'perNombreCompleto'
		FROM persona per
		WHERE
			per.perId<>ve_perId AND
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) LIKE CONCAT(ve_consulta,'%')
		ORDER BY 
			per.perApePaterno ASC,
			per.perApeMaterno ASC,
			per.perNombre ASC;
	END IF;
	IF ve_opcion = 'filtrartodo' THEN
		SELECT
			per.perId,
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) AS 'perNombreCompleto'
		FROM persona per
		WHERE
			CONCAT(per.perApePaterno,' ',per.perApeMaterno,', ',per.perNombre) LIKE CONCAT(ve_consulta,'%')
		ORDER BY 
			per.perApePaterno ASC,
			per.perApeMaterno ASC,
			per.perNombre ASC;
	END IF;
END