-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDepartamento`(
veOpcion varchar(50), 
veInicio int(11),
veFinal int(11),
veConsulta varchar (50),
veIdDEPARTAMENTO int (11),
veNombre varchar (50),
vePais varchar (50)
)
BEGIN
	SET @start = veInicio; 
	SET @limit = veFinal;
	if veOpcion='listarContador' then
		select count(*) as total
		from departamento;
	end if;
	if veOpcion='listarTodo' then
		select D.idDEPARTAMENTO, D.nombre from departamento as D
		order by D.nombre;
	end if;
	if veOpcion='filtrarTodoContador' then
		select count(*) as total
		from departamento as D
		where D.nombre like concat(veConsulta,'%');
	end if;
	if veOpcion='filtrarTodo' then
		select D.idDEPARTAMENTO, D.nombre from departamento as D
		where D.nombre like concat(veConsulta,'%')
		order by D.nombre;
	end if;

END