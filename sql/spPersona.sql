-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPersona`(
veOpcion varchar(50), 
veInicio int(11),
veFinal int(11),
veConsulta varchar (50),
veDni varchar (50),
veNombre varchar (50),
veApe_paterno varchar (50),
veApe_materno varchar (50),
veEmail varchar (50),
veTelefono varchar (50),
veCodigoUni varchar (50),
veDireccion varchar (50),
veIdUNIVERSIDAD int (11),
veTipo bit (1)
)
BEGIN
	SET @start = veInicio; 
	SET @limit = veFinal;
	if veOpcion='listarContador' then
		select count(*) as total
		from persona;
	end if;
	if veOpcion='listarPagina' then
		PREPARE stmt FROM "
		select P.*, U.nombre as uniNombre from persona as P
		inner join universidad as U on U.idUNIVERSIDAD=P.idUNIVERSIDAD
		order by P.dni
		LIMIT ?,?";
		EXECUTE stmt USING @start,@limit;
		DEALLOCATE PREPARE stmt;
	end if;
	if veOpcion='listarContadorIns' then
		select count(*) as total
		from persona
		Join inscripcion I on I.dni=persona.dni;
	end if;
	if veOpcion='listarPaginaIns' then
		PREPARE stmt FROM "
		select P.*, U.nombre as uniNombre from persona as P
		inner join universidad as U on U.idUNIVERSIDAD=P.idUNIVERSIDAD
		Join inscripcion I on I.dni=P.dni		
		order by P.dni
		LIMIT ?,?";
		EXECUTE stmt USING @start,@limit;
		DEALLOCATE PREPARE stmt;
	end if;
	if veOpcion='filtrarTodoContadorIns' then
		select count(*) as total
		from persona as P
		Join inscripcion I on I.dni=P.dni
		where (P.nombre LIKE CONCAT(veNombre, '%') or veNombre='') and 
		(P.ape_paterno LIKE CONCAT(veApe_paterno, '%') or veApe_paterno='') and 
		(P.ape_materno LIKE CONCAT(veApe_materno, '%') or veApe_materno='');	
	end if;
	if veOpcion='filtrarTodoIns' then
		PREPARE stmt FROM "
		select P.*, U.nombre as uniNombre from persona as P
		inner join universidad as U on U.idUNIVERSIDAD=P.idUNIVERSIDAD
		Join inscripcion I on I.dni=P.dni
		where (P.nombre LIKE CONCAT(?, '%') or ?='') and 
		(P.ape_paterno LIKE CONCAT(?, '%') or ?='') and 
		(P.ape_materno LIKE CONCAT(?, '%') or ?='')	
		order by P.dni
		LIMIT ?,?";
		set @veNombre=veNombre;
		set @veApe_paterno=veApe_paterno;
		set @veApe_materno=veApe_materno;
		EXECUTE stmt USING @veNombre, @veNombre, 
		@veApe_paterno, @veApe_paterno,
		@veApe_materno, @veApe_materno,
		@start,@limit;
		DEALLOCATE PREPARE stmt;
	end if;
	IF veOpcion = 'registrarPersona' THEN
		INSERT INTO
		persona(dni, nombre, ape_paterno, ape_materno, email,
		telefono, codigoUni, direccion, idUNIVERSIDAD, tipo)
		VALUES(veDni, veNombre, veApe_paterno, veApe_materno,
		veEmail, veTelefono, veCodigoUni, veDireccion,
		veIdUNIVERSIDAD, veTipo);
	END IF;
	IF veOpcion = 'registrarvalidacion' THEN
		SET @existe = (
		SELECT
			COUNT(*)
		FROM persona P
		WHERE 
			P.dni = veDni
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Ya existe persona' AS 'respuesta';
		END IF;
	END IF;

END