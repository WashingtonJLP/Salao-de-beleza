document.addEventListener('DOMContentLoaded', function() {
    var entradaCheckbox = document.getElementById('entrada');
    var saidaCheckbox = document.getElementById('saida');
    var quantidadeInput = document.getElementById('quantidade');
    var estoqueAtualInput = document.getElementById('estoque_atual');
    var materialInput = document.getElementById('material');
    var codigoInput = document.getElementById('codigo');
    const baseURL = 'https://produtos-json1.vercel.app';

    // Função para atualizar o estoque atual
    function atualizarEstoque() {
        var quantidade = parseInt(quantidadeInput.value, 10) || 0; // Convertendo para número inteiro

        // Fetch para obter os produtos do servidor
        fetch(`${baseURL}/produtos`)
            .then(response => response.json())
            .then(data => {
                var estoqueAtual = 0;

                // Calcula o estoque total
                data.forEach(produto => {
                    estoqueAtual += produto.quantidade;
                });

                // Ajusta o estoque baseado na entrada ou saída
                if (entradaCheckbox.checked) {
                    estoqueAtual += quantidade;
                } else if (saidaCheckbox.checked) {
                    estoqueAtual -= quantidade;
                    if (estoqueAtual < 0) {
                        estoqueAtual = 0;
                    }
                }

                // Atualiza o campo de estoque atual
                estoqueAtualInput.value = estoqueAtual.toString();
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    // Event listener para a checkbox de entrada
    entradaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            saidaCheckbox.checked = false;
        }
        atualizarEstoque();
    });

    // Event listener para a checkbox de saída
    saidaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            entradaCheckbox.checked = false;
        }
        atualizarEstoque();
    });

    // Event listener para o campo de quantidade
    quantidadeInput.addEventListener('input', function() {
        if (entradaCheckbox.checked || saidaCheckbox.checked) {
            atualizarEstoque();
        }
    });

    // Função para carregar produtos no dropdown
    function carregarProdutos(selectedProduto) {
        fetch(`${baseURL}/produtos`)
            .then(response => response.json())
            .then(data => {
                var options = "<option value=''>Selecione o produto</option>"; // Opção padrão
                data.forEach(produto => {
                    var selected = selectedProduto === produto.tipo ? "selected" : "";
                    options += `<option value="${produto.tipo}" data-codigo="${produto.codigo}" ${selected}>${produto.tipo}</option>`;
                });
                materialInput.innerHTML = options;

                // Preenche o campo de código se um produto estiver selecionado
                if (selectedProduto) {
                    var selectedOption = materialInput.querySelector(`option[value="${selectedProduto}"]`);
                    if (selectedOption) {
                        codigoInput.value = selectedOption.getAttribute('data-codigo');
                    }
                }
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    // Event listener para quando o campo de material é clicado
    materialInput.addEventListener('click', function() {
        carregarProdutos(materialInput.value);
    });

    // Event listener para quando a seleção do campo de material é alterada
    materialInput.addEventListener('change', function() {
        var selectedOption = materialInput.options[materialInput.selectedIndex];
        codigoInput.value = selectedOption.getAttribute('data-codigo');
    });

    // Função para gravar as alterações no estoque
    function gravar() {
        var selectedProduct = materialInput.value;
        var quantidade = parseInt(quantidadeInput.value, 10) || 0;

        if (!selectedProduct) {
            alert("Por favor, selecione um produto.");
            return;
        }

        // Fetch para obter o produto selecionado
        fetch(`${baseURL}/produtos?tipo=${selectedProduct}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    var produto = data[0];
                    if (entradaCheckbox.checked) {
                        produto.quantidade += quantidade;
                    } else if (saidaCheckbox.checked) {
                        produto.quantidade -= quantidade;
                        if (produto.quantidade < 0) {
                            produto.quantidade = 0;
                        }
                    }

                    // Fetch para atualizar o produto no servidor
                    return fetch(`${baseURL}/produtos/${produto.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(produto)
                    });
                } else {
                    alert('Produto não encontrado.');
                }
            })
            .then(response => {
                    alert('Dados gravados com sucesso!');
                }
            )
            .catch(error => console.error('Erro ao buscar ou gravar produto:', error));
    }

    // Event listener para o botão de gravar
    var btnGravar = document.querySelector(".gravar");
    btnGravar.addEventListener("click", gravar);

    // Carrega os produtos ao iniciar a página
    carregarProdutos(); 
});
