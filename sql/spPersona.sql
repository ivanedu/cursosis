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
vePass varchar (11)
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


END