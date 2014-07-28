<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of conexion
 *
 * @author USER1
 */
class conexion {
    //put your code here
    var $con;
    
    function conexion(){        
}
    
     function conectar($bd){
        $this->con=mysql_connect('localhost', 'root', '1234');
        mysql_select_db($bd,$this->con);
    }
    
     function consulta($sql){
        $res=mysql_query($sql);	
        return $res;
    }
    
     function close(){
        mysql_close();
    }
    
    
    
	
}

?>
