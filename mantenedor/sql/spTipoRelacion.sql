-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spTipoRelacion`(
IN `ve_opcion` VARCHAR(50), 
IN `ve_inicio` INT(11), 
IN `ve_final` INT(11), 
IN `ve_tiprelId` INT(11), 
IN `ve_tiprelNombre` VARCHAR(50)
)
BEGIN
	SET @start = ve_inicio; 
	SET @limit = ve_final; 
	IF ve_opcion = 'listarpagina' THEN
		PREPARE stmt FROM "
		SELECT
			tiprel.tiprelId,
			tiprel.tiprelNombre
		FROM tiporelacion tiprel
		ORDER BY tiprel.tiprelId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @start,@limit;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion = 'listartodo' THEN
		SELECT
			tiprel.tiprelId,
			tiprel.tiprelNombre
		FROM tiporelacion tiprel
		ORDER BY tiprel.tiprelId ASC;
	END IF;
	IF ve_opcion = 'listarContador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM tiporelacion tiprel;
	END IF;
	IF ve_opcion = 'registrar' THEN
		INSERT INTO
		tiporelacion(tiprelNombre)
		VALUES(ve_tiprelNombre);
	END IF;
	IF ve_opcion = 'registrarValidacion' THEN
		SET @existe = (
		SELECT
			COUNT(*)
		FROM tiporelacion tiprel
		WHERE tiprel.tiprelNombre = ve_tiprelNombre
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Nombre ya Existe' AS 'respuesta';
		END IF;
	END IF;
	IF ve_opcion = 'editar' THEN
		UPDATE  tiporelacion tiprel
		SET
			tiprel.tiprelNombre = ve_tiprelNombre
		WHERE
			tiprel.tiprelId = ve_tiprelId;
	END IF;
	IF ve_opcion = 'editarValidacion' THEN
		SET @vi_tiprelNombre = (
		SELECT 
			tiprel.tiprelNombre
		FROM tiporelacion tiprel
		WHERE tiprel.tiprelId = ve_tiprelId
		);
		SET @existe = (
		SELECT
			COUNT(*)
		FROM tiporelacion tiprel
		WHERE 
			tiprel.tiprelNombre = ve_tiprelNombre AND
			tiprel.tiprelNombre <> @vi_tiprelNombre
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Nombre ya Existe' AS 'respuesta';
		END IF;
	END IF;
	IF ve_opcion = 'eliminar' THEN
		DELETE FROM tiporelacion 
		WHERE tiprelId = ve_tiprelId;
	END IF;
	IF ve_opcion = 'eliminarValidacion' THEN
		SET @existedependencia = (
		SELECT
			COUNT(*)
		FROM relacion rel
		WHERE 
			tiprel.tiprelId = ve_tiprelId
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Existe dependencias' AS 'respuesta';
		END IF;
	END IF;
END