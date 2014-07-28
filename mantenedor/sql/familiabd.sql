-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2014 a las 10:28:16
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
END$$

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiporelacion`
--

CREATE TABLE IF NOT EXISTS `tiporelacion` (
  `tiprelId` int(11) NOT NULL AUTO_INCREMENT,
  `tiprelNombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tiprelId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

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
(10, 'Sobrina'),
(11, 'MamÃ¡'),
(12, 'PapÃ¡'),
(13, 'Abuelo'),
(14, 'Abuela');

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
