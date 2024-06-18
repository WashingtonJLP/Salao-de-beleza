<?php
$servidor = "localhost";
$usuario = "root";
$senha = ""; 
$dbname ="salão de beleza";

$conexao = mysqli_connect($servidor, $usuario, $senha, $dbname);

if(!$conexao){
  die("Conexão falhou: "  .mysqli_connect_error());
}
?>