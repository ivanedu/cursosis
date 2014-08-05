--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`idDEPARTAMENTO`, `nombre`, `pais`) VALUES
(1, 'Amazonas', 'Perú'),
(2, 'Ancash', 'Perú'),
(3, 'Apurimac', 'Perú'),
(4, 'Arequipa', 'Perú'),
(5, 'Ayacucho', 'Perú'),
(6, 'Cajamarca', 'Perú'),
(7, 'Callao', 'Perú'),
(8, 'Cusco', 'Perú'),
(9, 'Huancavelica', 'Perú'),
(10, 'Huanuco', 'Perú'),
(11, 'Ica', 'Perú'),
(12, 'Junin', 'Perú'),
(13, 'La Libertad', 'Perú'),
(14, 'Lambayeque', 'Perú'),
(15, 'Lima', 'Perú'),
(16, 'Loreto', 'Perú'),
(17, 'Madre De Dios', 'Perú'),
(18, 'Moquegua', 'Perú'),
(19, 'Pasco', 'Perú'),
(20, 'Piura', 'Perú'),
(21, 'Puno', 'Perú'),
(22, 'San Martin', 'Perú'),
(23, 'Tacna', 'Perú'),
(24, 'Tumbes', 'Perú'),
(25, 'Ucayali', 'Perú');

-- --------------------------------------------------------

-- Volcado de datos para la tabla `universidad`
--

INSERT INTO `universidad` (`idUNIVERSIDAD`, `nombre`, `abreviacion`, `direccion`, `idDEPARTAMENTO`) VALUES
(1, 'Cesar Vallejo', 'UCV', 'jkl', 3),
(2, 'Privada del Norte', 'UPN', 'jldas', 6),
(3, 'Angeles de Chimbote', 'ULADECH', 'jldas', 6),
(4, 'corazon', 'jkldas', 'jldas', 6),
(5, 'corazon', 'jkldas', 'jldas', 6),
(6, 'corazon', 'djaskl', 'jkl', 4),
(7, 'jdsa', 'djaskl', 'jkl', 4),
(8, 'jdsa', 'ghj', 'fhj', 2),
(9, 'jdsa', 'ghj', 'fhj', 2),
(10, 'jdsa', 'ghj', 'fhj', 2),
(11, 'jdsa', 'dask', 'jkda', 2),
(12, 'jldksa', 'dask', 'jkda', 2),
(13, 'jdsa', 'jkl', 'jkl', 3),
(14, 'tÃƒÂ©', 'fdsf', 'fddf', 5),
(15, 'gfhfgh', 'hgfhf', 'hfghf', 2),
(16, 'fdsfds', 'fdffsd', 'fdsfdsf', 11),
(17, 'fsaff', 'dsadas', 'dsada', 12),
(18, 'fdsfsdf', 'fdsf', 'fdsfsd', 5),
(19, 'ytu', 'fdsf', 'fdsfsd', 5),
(20, 'cabezÃƒÂ³n', 'fdsf', 'fdsfsd', 5),
(21, 'Universidad Nacional de Trujillo - Trujillo', 'UNT-Trujillo', 'Av. Juan Pablo II S/N Ciudad universitaria - ', 13),
(22, 'Universidad CorazÃƒÂ³n de Trujillo - Trujillo', 'UNT-Trujillo', 'Av. Juan Pablo II S/N Ciudad universitaria - ', 13),
(23, 'almacén', 'jasldkf', 'jlkdas', 4);

-- --------------------------------------------------------

INSERT INTO `persona` (`dni`, `nombre`, `ape_paterno`, `ape_materno`, `email`, `telefono`, `codigoUni`, `direccion`, `idUNIVERSIDAD`, `tipo`) VALUES
('72892690', 'Miluska', 'Burgos', 'Gonzales','miluskagbg@gmail.com','993249187', '1023300411','',21,0),
('72892688', 'Giancarlo', 'Solano', 'Quincho','gsolanoq.tj@gmail.com','940220566', '1023300401','',21,0),
('72892600', 'MAriano', 'Burgos', 'Gonzales','marianog@gmail.com','993249187', '','UPN-dep 4',2,1),
('72892601', 'Miluska', 'Burgos', 'Gonzales','miluskagbg@gmail.com','993249187', '1023300411','',21,0),
('72892602', 'Giancarlo', 'Solano', 'Quincho','gsolanoq.tj@gmail.com','940220566', '1023300401','',21,0),
('72892603', 'MAriano', 'Burgos', 'Gonzales','marianog@gmail.com','993249187', '','UPN-dep 4',2,1),
('72892604', 'Miluska', 'Burgos', 'Gonzales','miluskagbg@gmail.com','993249187', '1023300411','',21,0),
('72892605', 'Giancarlo', 'Solano', 'Quincho','gsolanoq.tj@gmail.com','940220566', '1023300401','',21,0),
('72892606', 'MAriano', 'Burgos', 'Gonzales','marianog@gmail.com','993249187', '','UPN-dep 4',2,1),
('72892607', 'Miluska', 'Burgos', 'Gonzales','miluskagbg@gmail.com','993249187', '1023300411','',21,0),
('72892608', 'Giancarlo', 'Solano', 'Quincho','gsolanoq.tj@gmail.com','940220566', '1023300401','',21,0),
('72892609', 'MAriano', 'Burgos', 'Gonzales','marianog@gmail.com','993249187', '','UPN-dep 4',2,1)
;
INSERT INTO `inscripcion` (`idINSCRIPCION`, `presencial`, `carnet`, `materiales`, `fecha`, `certificado`, `dni`, `tipo`) VALUES
-- ('00000000001', 0, 0, 0,'05-08-14 11:35', 'si', '72892690', 0),
('00000000002', 0, 0, 0,'05-08-14 11:35', 'si', '72892688', 0),
('00000000003', 0, 0, 0,'05-08-14 11:35', 'si', '72892600', 0);