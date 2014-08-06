-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInscripcion`(
veOpcion varchar(50), 
veInicio int(11),
veFinal int(11),
veConsulta varchar (50),
veIdINSCRIPCION int (11),
vePresencial BINARY(1),
veCarnet BINARY(1),
veMateriales BINARY(1),
veFecha DATETIME,
veCertificado VARCHAR(45),
veDni VARCHAR(30),
veTipo INT(11),
veDni2 VARCHAR(30)
)
BEGIN
	SET @start = veInicio; 
	SET @limit = veFinal;
	if veOpcion='listarContador' then
		select count(*) as total
		from inscripcion;
	end if;
	if veOpcion='listarPagina' then
		PREPARE stmt FROM "
		select I.* from inscripcion as I
		order by I.dni
		LIMIT ?,?";
		EXECUTE stmt USING @start,@limit;
		DEALLOCATE PREPARE stmt;
	end if;
	IF veOpcion = 'registropago' THEN
		UPDATE inscripcion
		SET 
			presencial = vePresencial,
			tipo = veTipo
		WHERE
			idINSCRIPCION = veIdINSCRIPCION;
	END IF;
	if veOpcion='buscarPorDnicontador' then
		select count(*) as total
		from inscripcion as I
		where I.dni=veDni;
	end if;
	if veOpcion='buscarPorDni' then
		select I.presencial, P.nombre, P.ape_paterno,
		P.ape_materno, P.email, P.telefono, 
		P.codigoUni, P. direccion, P.idUNIVERSIDAD,
		U.idDEPARTAMENTO,
		P.tipo as perTipo from inscripcion as I
		JOIN persona P ON  I.dni = P.dni
		JOIN universidad U ON  U.idUNIVERSIDAD = P.idUNIVERSIDAD
		where I.dni=veDni;
	end if;
	IF veOpcion = 'registrarInscripcion' THEN
		set veFecha=Date(now());
		INSERT INTO
		inscripcion(presencial, carnet, materiales, fecha,
		certificado, dni, tipo)
		VALUES(0, 0, 0, veFecha,
		'ninguno', veDni2, 0);
	END IF;
	IF veOpcion = 'registrarvalidacion' THEN
		SET @existe = (
		SELECT
			COUNT(*)
		FROM inscripcion I
		WHERE 
			I.dni = veDni2
		);
		IF @existe = 0 THEN
			SELECT '' AS 'respuesta';
		ELSE
			SELECT 'ERROR : Ya existe Inscripcion' AS 'respuesta';
		END IF;
	END IF;
END