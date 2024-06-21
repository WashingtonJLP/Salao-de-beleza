<?php
    include("conexao.php");

    $email= $_POST['email'];
    $senha= $_POST['senha'];

    $sql= "INSERT INTO clientes(Email, Senha) VALUES('$email', '$senha')"; 

if(mysqli_query($conexao, $sql)){
    header('Location: ../Login/login.html');
    exit();
}
else{
    echo"Erro!".mysqli_connect_error($conexao);
}
    mysqli_close($conexao);
     
?>
