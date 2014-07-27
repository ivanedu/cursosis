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
    public $con;
    
    function __construct(){        
}
    
    public function conectar($bd){
        $this->con=mysql_connect('localhost', 'root', '');
        mysql_select_db($bd,$this->con);
    }
    
    public function consulta($sql){
        $res=mysql_query($sql);	
        return $res;
    }
    
    public function close(){
        mysql_close();
    }
    
    
    
	
}

?>
