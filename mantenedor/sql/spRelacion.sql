-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spRelacion`(
IN `ve_opcion` VARCHAR(50), 
IN `ve_inicio` INT(11), 
IN `ve_final` INT(11), 
IN `ve_consulta` VARCHAR(50), 
IN `ve_relId` INT(11), 
IN `ve_perIdRelacionador` INT(11),
IN `ve_perIdRelacionado` INT(11),
IN `ve_tiprelId` INT(11)
)
BEGIN
	SET @start = ve_inicio; 
	SET @limit = ve_final; 
	IF ve_opcion = 'listarpagina' THEN
		PREPARE stmt FROM "
		SELECT
			rel.relId,
			rel.perIdRelacionador,
			rel.perIdRelacionado,
			rel.tiprelId
		FROM relacion rel
		JOIN persona perRelacionador ON rel.perIdRelacionador = perRelacionador.perId
		JOIN persona perRelacionado ON rel.perIdRelacionado = perRelacionado.perId
		ORDER BY 
			perRelacionador.perApePaterno ASC,
			perRelacionador.perApeMaterno ASC,
			perRelacionador.perNombre ASC,
			perRelacionado.perApePaterno ASC,
			perRelacionado.perApeMaterno ASC,
			perRelacionado.perNombre ASC
		LIMIT ?,?";
		EXECUTE stmt USING @start,@limit;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion = 'listartodo' THEN
		SELECT
			rel.relId,
			rel.perIdRelacionador,
			rel.perIdRelacionado,
			rel.tiprelId
		FROM relacion rel
		JOIN persona perRelacionador ON rel.perIdRelacionador = perRelacionador.perId
		JOIN persona perRelacionado ON rel.perIdRelacionado = perRelacionado.perId
		ORDER BY 
			perRelacionador.perApePaterno ASC,
			perRelacionador.perApeMaterno ASC,
			perRelacionador.perNombre ASC,
			perRelacionado.perApePaterno ASC,
			perRelacionado.perApeMaterno ASC,
			perRelacionado.perNombre ASC;
	END IF;
	IF ve_opcion = 'listarcontador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM relacion rel;
	END IF;
	IF ve_opcion = 'registrar' THEN
		SET @vi_relId =(
		SELECT
			relId
		FROM relacion rel
		WHERE rel.perIdRelacionador = ve_perIdRelacionador
		ORDER BY rel.relId DESC
		LIMIT 1
		);
		SET @vi_relId = (
		CASE
		WHEN @vi_relId IS NULL THEN 1
		ELSE @vi_relId+1
		END
		);
		INSERT INTO
		relacion(relId,perIdRelacionador,perIdRelacionado,tiprelId)
		VALUES(@vi_relId,ve_perIdRelacionador,ve_perIdRelacionado,ve_tiprelId);
	END IF;
	IF ve_opcion = 'registrarvalidacion' THEN
		SET @existe = (
		SELECT
			COUNT(*)
		FROM relacion rel
		WHERE 
			rel.perIdRelacionador = ve_perIdRelacionador AND
			rel.perIdRelacionado = ve_perIdRelacionado
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Ya existe relacion' AS 'respuesta';
		END IF;
	END IF;
	IF ve_opcion = 'editar' THEN
		UPDATE relacion rel
		SET
			rel.perIdRelacionado = ve_perIdRelacionado,
			rel.tiprelId = ve_tiprelId
		WHERE
			rel.relId = ve_relId AND
			rel.perIdRelacionador = ve_perIdRelacionador;
	END IF;
	IF ve_opcion = 'editarvalidacion' THEN
		SET @vi_perIdRelacionado = (
		SELECT 
			rel.perIdRelacionado
		FROM relacion rel
		WHERE 
			rel.relId = ve_relId AND
			rel.perIdRelacionador = ve_perIdRelacionador
		);
		SET @existe = (
		SELECT
			COUNT(*)
		FROM relacion rel
		WHERE 
			rel.perIdRelacionador = ve_perIdRelacionador AND
			rel.perIdRelacionado = ve_perIdRelacionado AND
			rel.perIdRelacionado <> @vi_perIdRelacionado
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Ya existe relacion' AS 'respuesta';
		END IF;
	END IF;
	IF ve_opcion = 'eliminar' THEN
		DELETE FROM relacion 
		WHERE 
			perIdRelacionador = ve_perIdRelacionador AND
			relId = ve_relId;
	END IF;
END