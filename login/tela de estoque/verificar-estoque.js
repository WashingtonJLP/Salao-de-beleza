document.addEventListener('DOMContentLoaded', function() {
    const baseURL = 'https://produtos-json1.vercel.app';

    function fetchProdutos() {
        fetch(`${baseURL}/produtos`)
            .then(response => response.json())
            .then(data => {
                const tabela = document.getElementById('produtos-tabela');
                tabela.innerHTML = '';
                data.forEach(produto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${produto.tipo}</td>
                        <td>${produto.codigo}</td>
                        <td>${produto.quantidade}</td>
                    `;
                    tabela.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    fetchProdutos();
});
