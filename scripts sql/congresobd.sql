SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `congresodb` DEFAULT CHARACTER SET utf8 ;
USE `congresodb` ;

-- -----------------------------------------------------
-- Table `congresodb`.`horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`horario` (
  `idHORARIO` INT(11) NOT NULL,
  `horaInicio` DATETIME NULL DEFAULT NULL,
  `horafin` DATETIME NULL DEFAULT NULL,
  `ponencia` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idHORARIO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`departamento` (
  `idDEPARTAMENTO` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `pais` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idDEPARTAMENTO`))
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`universidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`universidad` (
  `idUNIVERSIDAD` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NULL DEFAULT NULL,
  `abreviacion` VARCHAR(45) NULL DEFAULT NULL,
  `direccion` VARCHAR(100) NULL DEFAULT NULL,
  `idDEPARTAMENTO` INT(11) NOT NULL,
  PRIMARY KEY (`idUNIVERSIDAD`),
  INDEX `fk_UNIVERSIDAD_DEPARTAMENTO_idx` (`idDEPARTAMENTO` ASC),
  CONSTRAINT `fk_UNIVERSIDAD_DEPARTAMENTO`
    FOREIGN KEY (`idDEPARTAMENTO`)
    REFERENCES `congresodb`.`departamento` (`idDEPARTAMENTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`persona` (
  `dni` VARCHAR(30) NOT NULL,
  `nombre` VARCHAR(80) NULL DEFAULT NULL,
  `ape_paterno` VARCHAR(40) NULL DEFAULT NULL,
  `ape_materno` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `telefono` VARCHAR(45) NULL DEFAULT NULL,
  `codigoUni` VARCHAR(20) NULL DEFAULT NULL,
  `direccion` VARCHAR(200) NULL DEFAULT NULL,
  `idUNIVERSIDAD` INT(11) NOT NULL,
  `pass` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`dni`),
  INDEX `fk_PERSONA_UNIVERSIDAD1_idx` (`idUNIVERSIDAD` ASC),
  CONSTRAINT `fk_PERSONA_UNIVERSIDAD1`
    FOREIGN KEY (`idUNIVERSIDAD`)
    REFERENCES `congresodb`.`universidad` (`idUNIVERSIDAD`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`documentopago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`documentopago` (
  `idDOCUMENTOPAGO` VARCHAR(30) NOT NULL,
  `tipo` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idDOCUMENTOPAGO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`inscripcion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`inscripcion` (
  `idINSCRIPCION` INT(11) NOT NULL AUTO_INCREMENT,
  `confirmado` BINARY(1) NULL DEFAULT NULL,
  `presencial` BINARY(1) NULL DEFAULT NULL,
  `carnet` BINARY(1) NULL DEFAULT NULL,
  `materiales` BINARY(1) NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  `certificado` VARCHAR(45) NULL DEFAULT NULL,
  `dni` VARCHAR(30) NOT NULL,
  `idDOCUMENTOPAGO` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idINSCRIPCION`),
  INDEX `fk_INSCRIPCION_PERSONA1_idx` (`dni` ASC),
  INDEX `fk_INSCRIPCION_DOCUMENTOPAGO1_idx` (`idDOCUMENTOPAGO` ASC),
  CONSTRAINT `fk_INSCRIPCION_PERSONA1`
    FOREIGN KEY (`dni`)
    REFERENCES `congresodb`.`persona` (`dni`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_INSCRIPCION_DOCUMENTOPAGO1`
    FOREIGN KEY (`idDOCUMENTOPAGO`)
    REFERENCES `congresodb`.`documentopago` (`idDOCUMENTOPAGO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`asistencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`asistencia` (
  `estado` BINARY(1) NOT NULL,
  `idHORARIO` INT(11) NOT NULL,
  `idINSCRIPCION` INT(11) NOT NULL,
  PRIMARY KEY (`idHORARIO`, `idINSCRIPCION`),
  INDEX `fk_ASISTENCIA_INSCRIPCION1_idx` (`idINSCRIPCION` ASC),
  CONSTRAINT `fk_ASISTENCIA_HORARIO1`
    FOREIGN KEY (`idHORARIO`)
    REFERENCES `congresodb`.`horario` (`idHORARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ASISTENCIA_INSCRIPCION1`
    FOREIGN KEY (`idINSCRIPCION`)
    REFERENCES `congresodb`.`inscripcion` (`idINSCRIPCION`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`boleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`boleta` (
  `fecha` DATETIME NULL DEFAULT NULL,
  `monto` FLOAT NULL DEFAULT NULL,
  `numComprobante` VARCHAR(45) NULL DEFAULT NULL,
  `idDOCUMENTOPAGO` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idDOCUMENTOPAGO`),
  CONSTRAINT `fk_BOLETA_DOCUMENTOPAGO1`
    FOREIGN KEY (`idDOCUMENTOPAGO`)
    REFERENCES `congresodb`.`documentopago` (`idDOCUMENTOPAGO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`tiposubevento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`tiposubevento` (
  `idtipoSubEvento` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idtipoSubEvento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`subevento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`subevento` (
  `idSUBEVENTO` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  `horaInicio` DATETIME NULL DEFAULT NULL,
  `horaFin` DATETIME NULL DEFAULT NULL,
  `ubicacion` VARCHAR(100) NULL DEFAULT NULL,
  `precio` FLOAT NULL DEFAULT NULL,
  `aula` VARCHAR(100) NULL DEFAULT NULL,
  `ponente` VARCHAR(100) NULL DEFAULT NULL,
  `idtipoSubEvento` INT(11) NOT NULL,
  PRIMARY KEY (`idSUBEVENTO`),
  INDEX `fk_SUBEVENTO_TIPOSUBEVENTO1_idx` (`idtipoSubEvento` ASC),
  CONSTRAINT `fk_SUBEVENTO_TIPOSUBEVENTO1`
    FOREIGN KEY (`idtipoSubEvento`)
    REFERENCES `congresodb`.`tiposubevento` (`idtipoSubEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`detalleinscripcion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`detalleinscripcion` (
  `monto` FLOAT NULL DEFAULT NULL,
  `certificado` BINARY(1) NULL DEFAULT NULL,
  `asistencia` BINARY(1) NULL DEFAULT NULL,
  `estado` BINARY(1) NULL DEFAULT NULL,
  `idSUBEVENTO` INT(11) NOT NULL,
  `idINSCRIPCION` INT(11) NOT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idSUBEVENTO`, `idINSCRIPCION`),
  INDEX `fk_DETALLEINSCRIPCION_INSCRIPCION1_idx` (`idINSCRIPCION` ASC),
  CONSTRAINT `fk_DETALLEINSCRIPCION_SUBEVENTO1`
    FOREIGN KEY (`idSUBEVENTO`)
    REFERENCES `congresodb`.`subevento` (`idSUBEVENTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DETALLEINSCRIPCION_INSCRIPCION1`
    FOREIGN KEY (`idINSCRIPCION`)
    REFERENCES `congresodb`.`inscripcion` (`idINSCRIPCION`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `congresodb`.`voucher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`voucher` (
  `nroOperacion` INT(11) NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  `monto` FLOAT NULL DEFAULT NULL,
  `agente` BINARY(1) NULL DEFAULT NULL,
  `nombreAgente` VARCHAR(100) NULL DEFAULT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  `enFisico` BINARY(1) NULL DEFAULT NULL,
  `idDOCUMENTOPAGO` VARCHAR(30) NOT NULL,
  `multiple` BINARY(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idDOCUMENTOPAGO`),
  CONSTRAINT `fk_VOUCHER_DOCUMENTOPAGO1`
    FOREIGN KEY (`idDOCUMENTOPAGO`)
    REFERENCES `congresodb`.`documentopago` (`idDOCUMENTOPAGO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `congresodb` ;

-- -----------------------------------------------------
-- Table `bdfazap`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`menu` (
  `menId` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `menPadreId` SMALLINT(6) NULL DEFAULT NULL,
  `menNombre` VARCHAR(50) NULL DEFAULT NULL,
  `menOrden` INT(11) NULL DEFAULT NULL,
  `menDescripcion` VARCHAR(500) NULL DEFAULT NULL,
  `menDraggable` CHAR(1) NULL DEFAULT NULL,
  `menHidden` CHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`menId`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bdfazap`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`rol` (
  `rolId` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `rolNombre` VARCHAR(50) NULL DEFAULT NULL,
  `rolActivo` CHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`rolId`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bdfazap`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`usuario` (
  `usuId` INT(11) NOT NULL AUTO_INCREMENT,
  `usuNombre` VARCHAR(30) NULL DEFAULT NULL,
  `usuApePaterno` VARCHAR(20) NULL DEFAULT NULL,
  `usuApeMaterno` VARCHAR(20) NULL DEFAULT NULL,
  `usuUsuario` VARCHAR(10) NULL DEFAULT NULL,
  `usuClave` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`usuId`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bdfazap`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`perfil` (
  `perfId` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `rolId` SMALLINT(6) NOT NULL,
  `usuId` INT(11) NOT NULL,
  PRIMARY KEY (`perfId`),
  INDEX `fk_perfil_rol1_idx` (`rolId` ASC),
  INDEX `fk_perfil_usuario1_idx` (`usuId` ASC),
  CONSTRAINT `fk_perfil_rol1`
    FOREIGN KEY (`rolId`)
    REFERENCES `bdfazap`.`rol` (`rolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_perfil_usuario1`
    FOREIGN KEY (`usuId`)
    REFERENCES `bdfazap`.`usuario` (`usuId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bdfazap`.`permiso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `congresodb`.`permiso` (
  `permId` INT(11) NOT NULL AUTO_INCREMENT,
  `menId` SMALLINT(6) NULL DEFAULT NULL,
  `rolId` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`permId`),
  INDEX `fk_permiso_menu_idx` (`menId` ASC),
  INDEX `fk_permiso_rol1_idx` (`rolId` ASC),
  CONSTRAINT `fk_permiso_menu`
    FOREIGN KEY (`menId`)
    REFERENCES `bdfazap`.`menu` (`menId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permiso_rol1`
    FOREIGN KEY (`rolId`)
    REFERENCES `bdfazap`.`rol` (`rolId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;

USE `bdfazap` ;

-- -----------------------------------------------------
-- procedure fazap_sp_menu
-- -----------------------------------------------------

DELIMITER $$
USE `congresodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_menu`(IN `ve_opcion` VARCHAR(50), IN `ve_menId` SMALLINT(6), IN `ve_menPadreId` SMALLINT(6), IN `ve_menNombre` VARCHAR(50), IN `ve_menOrden` INT(11), IN `ve_menDescripcion` VARCHAR(500), IN `ve_menDraggable` CHAR(1), IN `ve_menHidden` CHAR(1))
BEGIN
	IF ve_opcion='opc_listar' THEN
		SELECT * 
		FROM menu;
	END IF;
	IF ve_opcion='opc_listar_por_orden' THEN
		SELECT * 
		FROM menu
		ORDER BY menOrden;
	END IF;
	IF ve_opcion='opc_listar_por_Id' THEN
		SELECT * 
		FROM menu
		ORDER BY menId;
	END IF;
	IF ve_opcion='opc_listar_por_nombre' THEN
		SELECT * 
		FROM menu
		ORDER BY menNombre;
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

DELIMITER ;

-- -----------------------------------------------------
-- procedure fazap_sp_perfil
-- -----------------------------------------------------

DELIMITER $$
USE `congresodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_perfil`(
	ve_opcion VARCHAR(50),
	ve_perfId SMALLINT(6),
	ve_rolId SMALLINT(6),
	ve_usuId INT(11)
)
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
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure fazap_sp_permiso
-- -----------------------------------------------------

DELIMITER $$
USE `congresodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_permiso`(
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

DELIMITER ;

-- -----------------------------------------------------
-- procedure fazap_sp_rol
-- -----------------------------------------------------

DELIMITER $$
USE `congresodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rol`(
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
		ORDER BY rolId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @START,@LIMIT;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion='opc_contador' THEN
        SELECT COUNT(*) AS rol_contador 
		FROM rol;
    END IF;
	IF ve_opcion='opc_listar_filtro' THEN
		PREPARE stmt FROM "
		SELECT 
			rolId,
			rolNombre,
			rolActivo
		FROM rol
		WHERE rolNombre LIKE CONCAT('%',?,'%')
		ORDER BY rolId ASC
		LIMIT ?,?";
		EXECUTE stmt USING @CONSULTA,@START,@LIMIT;
		DEALLOCATE PREPARE stmt;
	END IF;
	IF ve_opcion='opc_contador_filtro' THEN
		SELECT 
			COUNT(*) AS rolContadorFiltro
		FROM rol
		WHERE rolNombre LIKE CONCAT('%',ve_consulta,'%')
		ORDER BY rolNombre ASC;
	END IF;
    IF ve_opcion='opc_insertar' THEN
		INSERT 
		INTO rol(rolNombre,rolActivo)
        VALUES(ve_rolNombre,ve_RolActivo);
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

DELIMITER ;

-- -----------------------------------------------------
-- procedure fazap_sp_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `congresodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario`(IN `ve_opcion` VARCHAR(50),
 IN `ve_inicio` INT(11), IN `ve_final` INT(11), IN `ve_consulta` VARCHAR(50), IN `ve_usuId` INT(11), IN `ve_usuUsuario` VARCHAR(10), IN `ve_usuClave` VARCHAR(20), IN `ve_usuApePaterno` VARCHAR(20), IN `ve_usuApeMaterno` VARCHAR(20), IN `ve_usuNombre` VARCHAR(30))
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
			usuApePaterno,
			usuApeMaterno,
			usuNombre,
			CONCAT(usuNombre,' ',usuApePaterno,' ',usuApeMaterno) AS usuNombreCompleto
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
			usuApePaterno,
			usuApeMaterno,
			usuNombre,
			CONCAT(usuNombre,' ',usuApePaterno,' ',usuApeMaterno) as usuNombreCompleto
		FROM usuario 
		WHERE 
			usuNombre LIKE CONCAT('%',?,'%') OR
			CONCAT(usuApePaterno,' ',usuApeMaterno) LIKE CONCAT('%',?,'%') OR
            usuUsuario LIKE CONCAT('%',?,'%')
		ORDER BY usuUsuario,usuApePaterno,usuApeMaterno,usuNombre
		LIMIT ?,?";
		EXECUTE stmt USING @CONSULTA,@CONSULTA,@CONSULTA,@START,@LIMIT;
		DEALLOCATE PREPARE stmt;
     END IF; 
	IF ve_opcion='opc_contador' THEN
		SELECT 
			COUNT(*) AS usuContador 
		FROM usuario;
    END IF;
	IF ve_opcion='opc_contador_filtro' THEN
		SELECT COUNT(*) AS usuContadorFiltro
		FROM usuario 
		WHERE 
			usuNombre LIKE CONCAT('%',ve_consulta,'%') OR
			CONCAT(usuApePaterno,' ',usuApeMaterno) LIKE CONCAT('%',ve_consulta,'%') OR
            usuUsuario LIKE CONCAT('%',ve_consulta,'%');
     END IF;
	IF ve_opcion='opc_grabar' THEN
		INSERT 
		INTO usuario(usuUsuario,usuClave,usuApePaterno,usuApeMaterno,usuNombre)
		VALUES(ve_usuUsuario,ve_usuClave,ve_usuApePaterno,ve_usuApeMaterno,ve_usuNombre);
	END IF;
	IF ve_opcion='opc_actualizar' THEN
		UPDATE usuario
		SET 
			usuUsuario=ve_usuUsuario,
			usuClave=ve_usuClave,
			usuApePaterno=ve_usuApePaterno,
			usuApeMaterno=ve_usuApeMaterno,
			usuNombre=ve_usuNombre
		WHERE usuId=ve_usuId;
	END IF;
	IF ve_opcion='opc_obtener' THEN
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuApePaterno,
			usuApeMaterno,
			usuNombre,
			CONCAT(usuNombre,' ',usuApePaterno,' ',usuApeMaterno) AS usuNombreCompleto
		FROM usuario 
		WHERE usuId=ve_usuId;
	END IF;
	if ve_opcion='opc_buscar_por_usuario' THEN
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuApePaterno,
			usuApeMaterno,
			usuNombre,
			CONCAT(usuNombre,' ',usuApePaterno,' ',usuApeMaterno) as usuNombreCompleto
		FROM usuario 
		WHERE usuUsuario=ve_usuUsuario;
	END IF;
	IF ve_opcion='opc_buscar_por_usuario_clave' THEN
		SELECT 
			usuId,
			usuUsuario,
			usuClave,
			usuApePaterno,
			usuApeMaterno,
			usuNombre,
			CONCAT(usuNombre,' ',usuApePaterno,' ',usuApeMaterno) as usuNombreCompleto
		FROM usuario 
		WHERE 
			usuUsuario=ve_usuUsuario AND
			usuClave=ve_usuClave;
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
		JOIN rol
			ON rol.rolId=perf.rolId
		JOIN permiso perm
			ON perm.rolId=rol.rolId
		JOIN menu  men
			ON men.menId=perm.menId
		WHERE usu.usuId=ve_usuId
		ORDER BY men.menOrden;
	END IF;
    IF ve_opcion='opc_listar_menu_por_nombre' THEN
        SELECT * 
		FROM menu 
		ORDER BY menNombre;
    END IF;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
