-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2014 a las 21:33:50
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `coneiscbd`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `fazap_sp_menu`(IN `ve_opcion` VARCHAR(50), IN `ve_menId` SMALLINT(6), IN `ve_menPadreId` SMALLINT(6), IN `ve_menNombre` VARCHAR(50), IN `ve_menOrden` INT(11), IN `ve_menDescripcion` VARCHAR(500), IN `ve_menDraggable` CHAR(1), IN `ve_menHidden` CHAR(1), IN `ve_inicio` INT(11), IN `ve_final` INT(11))
BEGIN
	SET @START = ve_inicio; 
	SET @LIMIT = ve_final; 
	IF ve_opcion='opc_listar' THEN
		SELECT * 
		FROM menu;
	END IF;
	IF ve_opcion='opc_listar_por_orden' THEN
		SELECT * 
		FROM menu
		ORDER BY menPadreId,menNombre ASC;
	END IF;
	IF ve_opcion='opc_contador' THEN
		SELECT count(*) as total
		FROM menu;
	END IF;
	IF ve_opcion='opc_listar_por_Id' THEN
		PREPARE stmt FROM "
		SELECT * 
		FROM menu
		ORDER BY menPadreId,menNombre ASC
		LIMIT ?,?";
		EXECUTE stmt USING @START,@LIMIT;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion='opc_listar_padre' THEN
		SELECT * 
		FROM menu
		WHERE menPadreId=0
		ORDER BY menPadreId,menNombre ASC;
	END IF;
	IF ve_opcion='opc_contador_padre' THEN
		SELECT COUNT(*) as 'total'
		FROM menu
		WHERE menPadreId=0
		ORDER BY menPadreId,menNombre ASC;
	END IF;
	IF ve_opcion='opc_listar_por_nombre' THEN
		SELECT * 
		FROM menu
		ORDER BY menPadreId,menNombre ASC;
	END IF;
	IF ve_opcion='opc_grabar' THEN
		INSERT 
		INTO menu(menPadreId,menNombre,menDescripcion,menDraggable,menHidden)
		VALUES(ve_menPadreId,ve_menNombre,ve_menDescripcion,ve_menDraggable,ve_menHidden);
	END IF;
	IF ve_opcion='opc_obtener' THEN
		SELECT *
		FROM menu 
		WHERE menNombre=ve_menNombre;
	END IF;
	IF ve_opcion='opc_actualizar_padre_orden' THEN
		UPDATE menu
		SET menPadreId=ve_menPadreId,menOrden=ve_menOrden
		WHERE menId=ve_menId;
	END IF;
	IF ve_opcion='opc_actualizar_todo' THEN
		UPDATE menu
		SET menPadreId=ve_menPadreId,menNombre=ve_menNombre,menOrden=ve_menOrden,
			menDescripcion=ve_menDescripcion,menDraggable=ve_menDraggable,menHidden=ve_menHidden
		WHERE menId=ve_menId;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fazap_sp_perfil`(IN `ve_opcion` VARCHAR(50), IN `ve_perfId` SMALLINT(6), IN `ve_rolId` SMALLINT(6), IN `ve_usuId` CHAR(25))
BEGIN
	IF ve_opcion='opc_listar_por_usuario' THEN
		SELECT * 
		FROM perfil
		WHERE usuId=ve_usuId;
	END IF;
     IF ve_opcion='opc_grabar' THEN
        INSERT 
		INTO perfil(rolId,usuId)
		VALUES(ve_rolId,ve_usuId);
     END IF;
	IF ve_opcion='opc_eliminar' THEN
		DELETE 
		FROM perfil 
		WHERE 
			rolId=ve_rolId AND
			usuId=ve_usuId;
	END IF;
	IF ve_opcion='opc_elimina_actuales' THEN
		DELETE 
		FROM perfil 
		WHERE 
			usuId=ve_usuId;
	END IF;
	IF ve_opcion='opc_obtener'THEN
		SELECT * 
		FROM perfil
		WHERE perfId=ve_perfId;
	END IF;
	IF ve_opcion='opc_buscar'THEN
        SELECT * 
		FROM perfil 
		WHERE 
			usuId=ve_usuId AND 
			rolId=ve_rolId;
    END IF;
IF ve_opcion='opc_buscarcount'THEN
        SELECT count(*) as total 
		FROM perfil 
		WHERE 
			usuId=ve_usuId AND 
			rolId=ve_rolId;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fazap_sp_permiso`(
	ve_opcion VARCHAR(50),
	ve_permId INT(11),
	ve_menId SMALLINT(6),
	ve_rolId SMALLINT(6)
)
BEGIN
	IF ve_opcion='opc_listar_por_rol' THEN
		SELECT * 
		FROM permiso
		WHERE rolId=ve_rolId;
	END IF;
	IF ve_opcion='opc_grabar' THEN
		INSERT 
		INTO permiso(menId,rolId)
		VALUES(ve_menId,ve_rolId);
	END IF;
	IF ve_opcion='opc_obtener' THEN
		SELECT * 
		FROM permiso
		where permId=ve_permId;
	END IF;
	IF ve_opcion='opc_eliminar' THEN
		DELETE
		FROM permiso
		WHERE rolId=ve_rolId AND menId=ve_menId;
	END IF;
IF ve_opcion='opc_eliminar_por_rol' THEN
		DELETE
		FROM permiso
		WHERE rolId=ve_rolId;
	END IF;
	IF ve_opcion = 'opc_buscar' THEN
		SELECT *
		FROM permiso
		WHERE rolId=ve_rolId AND menId=ve_menId;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fazap_sp_rol`(
	ve_opcion VARCHAR(50),
	ve_inicio INT(11), 
	ve_final INT(11), 
	ve_consulta VARCHAR(50),
	ve_rolId SMALLINT(6),
	ve_rolNombre VARCHAR(50),
	ve_rolActivo CHAR(1)
)
BEGIN
	SET @START = ve_inicio; 
	SET @LIMIT = ve_final; 
	SET @CONSULTA=ve_consulta;
	IF ve_opcion='opc_listar'THEN
		SELECT 
			rolId,
			rolNombre,
			rolActivo
		FROM rol
		ORDER BY rolId ASC;
	END IF;
	IF ve_opcion='opc_listar_por_partes' THEN
		PREPARE stmt FROM "
		SELECT 
			rolId,
			rolNombre,
			rolActivo
		FROM rol
		WHERE rolPrivado=0
		ORDER BY rolId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @START,@LIMIT;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion='opc_contador' THEN
        SELECT COUNT(*) AS total 
		FROM rol
		WHERE rolPrivado=0;
    END IF;
	IF ve_opcion='opc_listar_filtro' THEN
		PREPARE stmt FROM "
		SELECT 
			rolId,
			rolNombre,
			rolActivo
		FROM rol
		WHERE rolNombre LIKE CONCAT('%',?,'%') AND
			  rolPrivado=0
		ORDER BY rolId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @CONSULTA,@START,@LIMIT;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion='opc_contador_filtro' THEN
		SELECT 
			COUNT(*) AS total
		FROM rol
		WHERE rolNombre LIKE CONCAT('%',ve_consulta,'%')AND
			  rolPrivado=0
		ORDER BY rolNombre ASC;
	END IF;
    IF ve_opcion='opc_insertar' THEN
		INSERT 
		INTO rol(rolNombre,rolActivo,rolPrivado)
        VALUES(ve_rolNombre,ve_RolActivo,0);
	END IF;
    IF ve_opcion='opc_actualizar' THEN
        UPDATE rol 
		SET rolNombre=ve_rolNombre,rolActivo=ve_rolActivo
        WHERE rolId=ve_rolId;
	END IF;
	IF ve_opcion='opc_obtener' THEN
        SELECT 
			rolId,
			rolNombre,
			rolActivo
		FROM rol
		WHERE rolId=ve_rolId;
    END IF;
	IF ve_opcion='opc_buscar_por_nombre' THEN
		SELECT rolId,
			rolNombre,
			rolActivo
		FROM rol
		WHERE rolNombre=ve_rolNombre;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fazap_sp_usuario`(IN `ve_opcion` VARCHAR(50), IN `ve_inicio` INT(11), IN `ve_final` INT(11), IN `ve_consulta` VARCHAR(50), IN `ve_usuId` INT(11), IN `ve_usuUsuario` VARCHAR(20), IN `ve_usuClave` VARCHAR(20), IN `ve_usuEstado` BIT(1))
    DETERMINISTIC
BEGIN
	SET @START = ve_inicio; 
	SET @LIMIT = ve_final; 
	SET @CONSULTA=ve_consulta;
	IF ve_opcion='opc_listar' THEN
		PREPARE stmt FROM "
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuEstado
		FROM usuario 
		ORDER BY usuId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @START,@LIMIT;
		DEALLOCATE PREPARE stmt;
	END IF;
    IF ve_opcion='opc_listar_filtro' THEN
		PREPARE stmt FROM "
        SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuEstado
		FROM usuario 
		WHERE 
			usuUsuario LIKE CONCAT('%',?,'%')
		ORDER BY usuUsuario
		LIMIT ?,?";
		EXECUTE stmt USING @CONSULTA,@START,@LIMIT;
		DEALLOCATE PREPARE stmt;
     END IF; 
	IF ve_opcion='opc_contador' THEN
		SELECT 
			COUNT(*) AS total 
		FROM usuario;
    END IF;
	IF ve_opcion='opc_contador_filtro' THEN
		SELECT COUNT(*) AS total
		FROM usuario 
		WHERE 
			usuUsuario LIKE CONCAT('%',ve_consulta,'%');
     END IF;
	IF ve_opcion='opc_grabar' THEN
		INSERT 
		INTO usuario(usuUsuario,usuClave,usuEstado)
		VALUES(ve_usuUsuario,ve_usuClave,'1');
	END IF;
	IF ve_opcion='opc_actualizar' THEN
		UPDATE usuario
		SET 
			usuUsuario=ve_usuUsuario,
			usuClave=ve_usuClave,
			usuEstado = ve_usuEstado
		WHERE usuId=ve_usuId;
	END IF;
	IF ve_opcion='opc_obtener' THEN
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuEstado
		FROM usuario 
		WHERE usuId=ve_usuId;
	END IF;
	if ve_opcion='opc_buscar_por_usuario' THEN
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuEstado
		FROM usuario 
		WHERE usuUsuario=ve_usuUsuario;
	END IF;
	IF ve_opcion='opc_buscar_por_usuario_clave' THEN
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuEstado
		FROM usuario 
		WHERE 
			usuUsuario=ve_usuUsuario AND
			usuClave=ve_usuClave AND
			usuEstado=1;
	END IF;
	IF ve_opcion='opc_listar_menu' THEN
		SELECT DISTINCT 
			men.menId,
			men.menPadreId,
			men.menNombre,
			men.menOrden,
			men.menDescripcion,
			men.menDraggable,
			men.menHidden
		FROM usuario usu
		JOIN perfil perf
			ON usu.usuId=perf.usuId
		JOIN rol rol
			ON rol.rolId=perf.rolId
		JOIN permiso perm
			ON perm.rolId=rol.rolId
		JOIN menu  men
			ON men.menId=perm.menId
		WHERE usu.usuId=ve_usuId AND
				rol.rolActivo=1
		ORDER BY men.menPadreId,men.menNombre ASC;
	END IF;
    IF ve_opcion='opc_listar_menu_por_nombre' THEN
        SELECT * 
		FROM menu 
		ORDER BY menNombre;
    END IF;
	IF ve_opcion='opc_login_respuesta' THEN
		SET @RESTRINGIDO = (SELECT COUNT(*) FROM usuario usu 
			WHERE 
				usu.usuUsuario = ve_usuUsuario AND
				usu.usuEstado=0);
		IF @RESTRINGIDO>0 THEN
			SELECT 'Usuario Restringido' AS 'respuesta';
		ELSE
			SET @CORRECTO = (SELECT COUNT(*) 
			FROM  usuario usu 
			WHERE 
				usu.usuUsuario = ve_usuUsuario AND
				usu.usuClave = ve_usuClave AND
				usu.usuEstado=1);
			IF @CORRECTO>0 THEN
				SELECT '1' AS 'respuesta';
			ELSE
				SELECT 'Usuario y/o clave incorrectos' AS 'respuesta';
			END IF;
		END IF;
	END IF;
	IF ve_opcion='opc_login_listar' THEN
			SELECT 
				usu.usuUsuario AS usuUsuario,
				usu.usuId AS usuId
			FROM usuario usu
			WHERE 
				usu.usuUsuario = ve_usuUsuario AND
				usu.usuClave = ve_usuClave AND
				usu.usuEstado=1;
	END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE IF NOT EXISTS `asistencia` (
  `estado` binary(1) NOT NULL,
  `idHORARIO` int(11) NOT NULL,
  `idINSCRIPCION` int(11) NOT NULL,
  PRIMARY KEY (`idHORARIO`,`idINSCRIPCION`),
  KEY `fk_ASISTENCIA_INSCRIPCION1_idx` (`idINSCRIPCION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleta`
--

CREATE TABLE IF NOT EXISTS `boleta` (
  `fecha` datetime DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `numComprobante` varchar(45) DEFAULT NULL,
  `IdINSCRIPCION` int(11) NOT NULL,
  PRIMARY KEY (`IdINSCRIPCION`),
  KEY `fk_boleta_inscripcion1_idx` (`IdINSCRIPCION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE IF NOT EXISTS `departamento` (
  `idDEPARTAMENTO` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDEPARTAMENTO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleinscripcion`
--

CREATE TABLE IF NOT EXISTS `detalleinscripcion` (
  `monto` float DEFAULT NULL,
  `certificado` binary(1) DEFAULT NULL,
  `asistencia` binary(1) DEFAULT NULL,
  `estado` binary(1) DEFAULT NULL,
  `idSUBEVENTO` int(11) NOT NULL,
  `idINSCRIPCION` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`idSUBEVENTO`,`idINSCRIPCION`),
  KEY `fk_DETALLEINSCRIPCION_INSCRIPCION1_idx` (`idINSCRIPCION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE IF NOT EXISTS `horario` (
  `idHORARIO` int(11) NOT NULL,
  `horaInicio` datetime DEFAULT NULL,
  `horafin` datetime DEFAULT NULL,
  `ponencia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idHORARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE IF NOT EXISTS `inscripcion` (
  `idINSCRIPCION` int(11) NOT NULL AUTO_INCREMENT,
  `presencial` binary(1) DEFAULT NULL,
  `carnet` binary(1) DEFAULT NULL,
  `materiales` binary(1) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `certificado` varchar(45) DEFAULT NULL,
  `dni` varchar(30) NOT NULL,
  `tipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idINSCRIPCION`,`dni`),
  KEY `fk_INSCRIPCION_PERSONA1_idx` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `menId` int(11) NOT NULL AUTO_INCREMENT,
  `menPadreId` int(11) DEFAULT NULL,
  `menNombre` varchar(50) DEFAULT NULL,
  `menOrden` int(11) DEFAULT NULL,
  `menDescripcion` varchar(500) DEFAULT NULL,
  `menDraggable` char(1) DEFAULT NULL,
  `menHidden` char(1) DEFAULT NULL,
  PRIMARY KEY (`menId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`menId`, `menPadreId`, `menNombre`, `menOrden`, `menDescripcion`, `menDraggable`, `menHidden`) VALUES
(1, 0, 'Control de Usuario', NULL, NULL, '0', '0'),
(2, 1, 'Menu', NULL, NULL, '0', '0'),
(3, 1, 'Rol', NULL, NULL, '0', '0'),
(4, 1, 'Usuario', NULL, NULL, '0', '0'),
(5, 0, 'Mantenedores', NULL, '', '0', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE IF NOT EXISTS `perfil` (
  `perfId` int(11) NOT NULL AUTO_INCREMENT,
  `rolId` int(11) DEFAULT NULL,
  `usuId` int(11) DEFAULT NULL,
  PRIMARY KEY (`perfId`),
  KEY `fk_perfil_rol2_idx` (`rolId`),
  KEY `fk_perfil_usuario2_idx` (`usuId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`perfId`, `rolId`, `usuId`) VALUES
(1, 1, 1),
(3, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE IF NOT EXISTS `permiso` (
  `permId` int(11) NOT NULL AUTO_INCREMENT,
  `menId` int(11) DEFAULT NULL,
  `rolId` int(11) DEFAULT NULL,
  PRIMARY KEY (`permId`),
  KEY `fk_permiso_menu1_idx` (`menId`),
  KEY `fk_permiso_rol1_idx` (`rolId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`permId`, `menId`, `rolId`) VALUES
(7, 5, 0),
(8, 1, 1),
(9, 2, 1),
(10, 3, 1),
(11, 4, 1),
(12, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
  `dni` varchar(30) NOT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `ape_paterno` varchar(40) DEFAULT NULL,
  `ape_materno` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `codigoUni` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `idUNIVERSIDAD` int(11) DEFAULT NULL,
  `tipo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`dni`),
  KEY `fk_PERSONA_UNIVERSIDAD1_idx` (`idUNIVERSIDAD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
  `rolId` int(11) NOT NULL,
  `rolNombre` varchar(50) DEFAULT NULL,
  `rolActivo` char(1) DEFAULT NULL,
  `rolPrivado` bit(1) DEFAULT NULL,
  PRIMARY KEY (`rolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rolId`, `rolNombre`, `rolActivo`, `rolPrivado`) VALUES
(0, 'Llenador de Datos', '1', b'0'),
(1, 'Administrador', '1', b'0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subevento`
--

CREATE TABLE IF NOT EXISTS `subevento` (
  `idSUBEVENTO` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `horaInicio` datetime DEFAULT NULL,
  `horaFin` datetime DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `aula` varchar(100) DEFAULT NULL,
  `ponente` varchar(100) DEFAULT NULL,
  `idtipoSubEvento` int(11) NOT NULL,
  PRIMARY KEY (`idSUBEVENTO`),
  KEY `fk_SUBEVENTO_TIPOSUBEVENTO1_idx` (`idtipoSubEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposubevento`
--

CREATE TABLE IF NOT EXISTS `tiposubevento` (
  `idtipoSubEvento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idtipoSubEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `universidad`
--

CREATE TABLE IF NOT EXISTS `universidad` (
  `idUNIVERSIDAD` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `abreviacion` varchar(45) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `idDEPARTAMENTO` int(11) NOT NULL,
  PRIMARY KEY (`idUNIVERSIDAD`),
  KEY `fk_UNIVERSIDAD_DEPARTAMENTO_idx` (`idDEPARTAMENTO`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `usuId` int(11) NOT NULL AUTO_INCREMENT,
  `usuUsuario` varchar(20) DEFAULT NULL,
  `usuClave` varchar(60) DEFAULT NULL,
  `usuEstado` bit(1) DEFAULT NULL,
  PRIMARY KEY (`usuId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuId`, `usuUsuario`, `usuClave`, `usuEstado`) VALUES
(1, 'admin', '827ccb0eea8a706c4c34', b'1'),
(2, 'gsolanoq', 'd08599401e6b51586848', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voucher`
--

CREATE TABLE IF NOT EXISTS `voucher` (
  `nroOperacion` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `agente` binary(1) DEFAULT NULL,
  `nombreBancario` varchar(100) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `enFisico` bit(1) DEFAULT NULL,
  `idINSCRIPCION` int(11) NOT NULL,
  PRIMARY KEY (`idINSCRIPCION`),
  KEY `fk_voucher_inscripcion1_idx` (`idINSCRIPCION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `fk_ASISTENCIA_HORARIO1` FOREIGN KEY (`idHORARIO`) REFERENCES `horario` (`idHORARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ASISTENCIA_INSCRIPCION1` FOREIGN KEY (`idINSCRIPCION`) REFERENCES `inscripcion` (`idINSCRIPCION`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `boleta`
--
ALTER TABLE `boleta`
  ADD CONSTRAINT `fk_boleta_inscripcion1` FOREIGN KEY (`IdINSCRIPCION`) REFERENCES `inscripcion` (`idINSCRIPCION`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalleinscripcion`
--
ALTER TABLE `detalleinscripcion`
  ADD CONSTRAINT `fk_DETALLEINSCRIPCION_SUBEVENTO1` FOREIGN KEY (`idSUBEVENTO`) REFERENCES `subevento` (`idSUBEVENTO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DETALLEINSCRIPCION_INSCRIPCION1` FOREIGN KEY (`idINSCRIPCION`) REFERENCES `inscripcion` (`idINSCRIPCION`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `fk_INSCRIPCION_PERSONA1` FOREIGN KEY (`dni`) REFERENCES `persona` (`dni`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `fk_perfil_rol2` FOREIGN KEY (`rolId`) REFERENCES `rol` (`rolId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_perfil_usuario2` FOREIGN KEY (`usuId`) REFERENCES `usuario` (`usuId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `fk_permiso_menu1` FOREIGN KEY (`menId`) REFERENCES `menu` (`menId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permiso_rol1` FOREIGN KEY (`rolId`) REFERENCES `rol` (`rolId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fk_PERSONA_UNIVERSIDAD1` FOREIGN KEY (`idUNIVERSIDAD`) REFERENCES `universidad` (`idUNIVERSIDAD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `subevento`
--
ALTER TABLE `subevento`
  ADD CONSTRAINT `fk_SUBEVENTO_TIPOSUBEVENTO1` FOREIGN KEY (`idtipoSubEvento`) REFERENCES `tiposubevento` (`idtipoSubEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `universidad`
--
ALTER TABLE `universidad`
  ADD CONSTRAINT `fk_UNIVERSIDAD_DEPARTAMENTO` FOREIGN KEY (`idDEPARTAMENTO`) REFERENCES `departamento` (`idDEPARTAMENTO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `voucher`
--
ALTER TABLE `voucher`
  ADD CONSTRAINT `fk_voucher_inscripcion1` FOREIGN KEY (`idINSCRIPCION`) REFERENCES `inscripcion` (`idINSCRIPCION`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
