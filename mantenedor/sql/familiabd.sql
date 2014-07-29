-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2014 a las 10:36:16
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `familiabd`
--

DELIMITER $$
--
-- Procedimientos
--
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
END$$

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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spTipoRelacion`(
IN `ve_opcion` VARCHAR(50), 
IN `ve_inicio` INT(11), 
IN `ve_final` INT(11), 
IN `ve_consulta` VARCHAR(50), 
IN `ve_tiprelId` INT(11), 
IN `ve_tiprelNombre` VARCHAR(50)
)
BEGIN
	SET @start = ve_inicio; 
	SET @limit = ve_final; 
	set @consulta = ve_consulta;
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
	IF ve_opcion = 'filtrarpagina' THEN
		PREPARE stmt FROM "
		SELECT
			tiprel.tiprelId,
			tiprel.tiprelNombre
		FROM tiporelacion tiprel
		WHERE tiprel.tiprelNombre LIKE CONCAT(?,'%')
		ORDER BY tiprel.tiprelId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @consulta,@start,@limit;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion = 'listartodo' THEN
		SELECT
			tiprel.tiprelId,
			tiprel.tiprelNombre
		FROM tiporelacion tiprel
		ORDER BY tiprel.tiprelId ASC;
	END IF;
	IF ve_opcion = 'listarcontador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM tiporelacion tiprel;
	END IF;
	IF ve_opcion = 'filtrartodo' THEN
		SELECT
			tiprel.tiprelId,
			tiprel.tiprelNombre
		FROM tiporelacion tiprel
		WHERE tiprel.tiprelNombre LIKE CONCAT(ve_consulta,'%')
		ORDER BY tiprel.tiprelId ASC;
	END IF;
	IF ve_opcion = 'filtrarcontador' THEN
		SELECT
			COUNT(*) AS 'total'
		FROM tiporelacion tiprel
		WHERE tiprel.tiprelNombre LIKE CONCAT(ve_consulta,'%');
	END IF;
	IF ve_opcion = 'registrar' THEN
		INSERT INTO
		tiporelacion(tiprelNombre)
		VALUES(ve_tiprelNombre);
	END IF;
	IF ve_opcion = 'registrarvalidacion' THEN
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
	IF ve_opcion = 'editarvalidacion' THEN
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
	IF ve_opcion = 'eliminarvalidacion' THEN
		SET @existedependencia = (
		SELECT
			COUNT(*)
		FROM relacion rel
		WHERE 
			rel.tiprelId = ve_tiprelId
		);
		IF @existedependencia = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Existe dependencias' AS 'respuesta';
		END IF;
	END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
  `perId` int(11) NOT NULL AUTO_INCREMENT,
  `perNombre` varchar(50) DEFAULT NULL,
  `perApePaterno` varchar(50) DEFAULT NULL,
  `perApeMaterno` varchar(50) DEFAULT NULL,
  `perEdad` int(11) DEFAULT NULL,
  `perSexo` char(1) DEFAULT NULL,
  PRIMARY KEY (`perId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`perId`, `perNombre`, `perApePaterno`, `perApeMaterno`, `perEdad`, `perSexo`) VALUES
(1, 'Giancarlo Juel', 'Solano', 'Quincho', 21, 'H'),
(2, 'Ivan Eduardo', 'Aguilar', 'Cieza', 20, 'H'),
(3, 'Alex Johel', 'Burgos', 'Dionicio', 22, 'H'),
(4, 'Gemma', 'Argomedo', 'Cueva', 21, 'M'),
(5, 'Erika', 'Salazar', 'Avila', 21, 'M'),
(6, 'Maricarmen', 'Aranguri', 'Castillo', 21, 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relacion`
--

CREATE TABLE IF NOT EXISTS `relacion` (
  `relId` int(11) NOT NULL,
  `perIdRelacionador` int(11) NOT NULL,
  `perIdRelacionado` int(11) NOT NULL,
  `tiprelId` int(11) NOT NULL,
  PRIMARY KEY (`perIdRelacionador`,`relId`),
  KEY `fk_relacion_persona1_idx` (`perIdRelacionado`),
  KEY `fk_relacion_tiporelacion1_idx` (`tiprelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `relacion`
--

INSERT INTO `relacion` (`relId`, `perIdRelacionador`, `perIdRelacionado`, `tiprelId`) VALUES
(2, 2, 3, 1),
(3, 2, 4, 3),
(4, 2, 5, 3),
(5, 2, 6, 3),
(6, 2, 1, 5),
(1, 3, 1, 2),
(1, 4, 6, 4),
(3, 4, 1, 2),
(1, 5, 2, 3),
(2, 5, 6, 1),
(1, 6, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiporelacion`
--

CREATE TABLE IF NOT EXISTS `tiporelacion` (
  `tiprelId` int(11) NOT NULL AUTO_INCREMENT,
  `tiprelNombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tiprelId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- Volcado de datos para la tabla `tiporelacion`
--

INSERT INTO `tiporelacion` (`tiprelId`, `tiprelNombre`) VALUES
(1, 'Hijo'),
(2, 'Tio'),
(3, 'Tia'),
(4, 'Hija'),
(5, 'Nieta'),
(6, 'Nieto'),
(7, 'Primo'),
(8, 'Prima'),
(9, 'Sobrino'),
(11, 'MamÃ¡'),
(12, 'PapÃ¡'),
(14, 'Abuela'),
(16, 'Tipo Relacion 01'),
(17, 'Tipo Relacion 02'),
(18, 'Tipo Relacion 03'),
(19, 'Tipo Relacion 04'),
(20, 'Tipo Relacion 05'),
(21, 'Tipo Relacion 06'),
(22, 'Tipo Relacion 07'),
(23, 'Tipo Relacion 08'),
(24, 'Tipo Relacion 09'),
(25, 'Tipo Relacion 10'),
(26, '...');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `relacion`
--
ALTER TABLE `relacion`
  ADD CONSTRAINT `fk_relacion_persona` FOREIGN KEY (`perIdRelacionador`) REFERENCES `persona` (`perId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_relacion_persona1` FOREIGN KEY (`perIdRelacionado`) REFERENCES `persona` (`perId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_relacion_tiporelacion1` FOREIGN KEY (`tiprelId`) REFERENCES `tiporelacion` (`tiprelId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
