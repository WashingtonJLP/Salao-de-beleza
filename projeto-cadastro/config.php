<?php
 include('conexao.php');

 $email=$_POST ['email'];
 $senha=$_POST ['senha'];

 $sql= "INSERT INTO clientes(Email, Senha)  VALUES('$email', '$senha')";

mysqli_close($conexao);
?>
