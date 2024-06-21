<?php
// Iniciar sessão
session_start();

// Incluir arquivo de configuração
include('config.php');

// Verificar se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['password'];

    // Verificar credenciais do administrador
    if ($email === 'admin@gmail.com' && $senha === 'admin123') {
        // Login do administrador bem-sucedido
        $_SESSION['email'] = $email;
        $_SESSION['role'] = 'admin';
        header("Location: ../tela de estoque/tela de controle.html"); // Redirecionar para página de administrador
        exit();
    }

    // Prevenir injeção de SQL
    $email = mysqli_real_escape_string($conn, $email);
    $senha = mysqli_real_escape_string($conn, $senha);

    // Consultar tabela clientes
    $sql = "SELECT * FROM clientes WHERE email = '$email' AND senha = '$senha'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // Login bem-sucedido
        $_SESSION['email'] = $email;
        $_SESSION['role'] = 'user';
        header("Location: ../Agendamento/Agendamento.html"); // Redirecionar para página de boas-vindas
        exit();
    } else {
        // Falha no login
        $_SESSION['erro'] = "Email ou senha incorretos.";
        header("Location: login.html");
        exit();
    }
}
?>
