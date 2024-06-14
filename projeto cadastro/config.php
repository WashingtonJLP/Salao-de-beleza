<?php

if(isset($_POST['cadastrar'])){
$Email = $_POST['email'];
$Senha = $_POST['password'];
$reg_confirm_password = $_POST['reg-confirm-password'];
}
 if($Senha != $reg_confirm_password){
    die("As senhas não correspondem.");
 }
 $host = "localhost";
 $user = "root";
 $senha_user = ""; 
 $banco ="salão de beleza";

 $con = mysqli_connect($host, $user, $senha_user, $banco);

 if(!$con){
    die("Conexão falhou."  . mysqli_connect_error());
 }
 $sql = "INSERT INTO clientes(Email, Senha) VALUES('$Email', '$Senha')";

 $rs = mysqli_query($con, $sql);

 if($rs){
    echo "Cadastrado com sucesso";
 }
?>
