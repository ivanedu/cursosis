-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spUniversidad`(
veOpcion varchar(50), 
veInicio int(11),
veFinal int(11),
veConsulta varchar (50),
veIdUNIVERSIDAD int (11),
veNombre varchar (50),
veAbreviacion varchar (50),
veDireccion varchar (50),
veIdDEPARTAMENTO int (11)
)
BEGIN
	SET @start = veInicio; 
	SET @limit = veFinal;
	if veOpcion='listarContador' then
		select count(*) as total
		from universidad;
	end if;
	if veOpcion='listarTodo' then
		select U.idUNIVERSIDAD, U.nombre from universidad as U
		order by U.nombre;
	end if;
	if veOpcion='filtrarTodoContador' then
		select count(*) as total
		from universidad as U
		where U.nombre like concat(veConsulta,'%');
	end if;
	if veOpcion='filtrarTodo' then
		select U.idUNIVERSIDAD, U.nombre from universidad as U
		where U.nombre like concat(veConsulta,'%')
		order by U.nombre;
	end if;



END