☕ Café Especial — Sistema de Pedidos
Sistema web para pedidos de café com envio automático via WhatsApp, desenvolvido como Atividade Avaliativa 1 da disciplina de Qualidade de Software.
[🔗 Acesse a aplicação aqui](https://rafaelfelicidade.github.io/Trabalho-Qualidade-de-SoftWare-)
________________________________________
📋 Descrição da Aplicação
Uma loja virtual de café onde o cliente pode:
•	Visualizar os 6 tipos de embalagens disponíveis com preços
•	Escolher a quantidade de cada produto
•	Adicionar produtos ao carrinho
•	Preencher seus dados (nome e telefone)
•	Enviar o pedido diretamente pelo WhatsApp com um clique
________________________________________
🏗️ Justificativa da Abordagem
Optamos pela abordagem frontend estático (HTML + CSS + JavaScript puro), pois:
•	É suficiente para demonstrar todos os requisitos da atividade (testes, CI/CD e deploy)
•	Compatível nativamente com o GitHub Pages, sem necessidade de servidor
•	Facilita a escrita de testes unitários com Jest, pois a lógica de negócio foi isolada do DOM
•	Menor complexidade de configuração, adequado ao prazo disponível
________________________________________
🗂️ Estrutura do Projeto
Trabalho-Qualidade-de-SoftWare-/
├── index.html                  # Página principal da loja
├── style.css                   # Estilos visuais
├── src/
│   ├── loja.js                 # Lógica de negócio (funções puras e testáveis)
│   └── app.js                  # Manipulação do DOM / interface
├── tests/
│   └── loja.test.js            # Testes unitários (Jest)
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de CI/CD (GitHub Actions)
├── package.json
└── README.md
________________________________________
⚙️ Decisões Técnicas
| Decisão | Motivo |
| :--- | :--- |
| JavaScript puro (sem frameworks) | Simplicidade e compatibilidade com GitHub Pages sem build step |
| Separação entre loja.js e app.js | Permite testar a lógica sem depender do navegador/DOM |
| Jest para testes | Framework de testes mais popular para JavaScript, fácil configuração |
| GitHub Actions para CI/CD | Integrado ao GitHub, gratuito para repositórios públicos |
| peaceiris/actions-gh-pages para deploy | Solução consolidada para publicar no GitHub Pages via Actions |
| Gemini Code Assist para revisão | Ferramenta gratuita integrada ao GitHub para análise automática de código |
________________________________________
🚀 Como Executar Localmente
Pré-requisitos
•	Node.js (versão 18 ou superior)
•	Git
Passos
# 1. Clone o repositório
git clone https://github.com/RafaelFelicidade/Trabalho-Qualidade-de-SoftWare-.git
cd Trabalho-Qualidade-de-SoftWare-

# 2. Instale as dependências
npm install

# 3. Rode os testes
npm test

# 4. Abra a aplicação
# Abra o arquivo index.html no navegador
________________________________________
🧪 Testes Automatizados
Os testes estão em tests/loja.test.js e cobrem as seguintes funções:
| Função | O que é testado |
| :--- | :--- |
| getProdutos | Retorna 6 produtos, todos com id, nome e preço válidos |
| calcularTotal | Cálculo correto do total, erros para produto inexistente e quantidade inválida |
| calcularQuantidadeTotal | Soma correta das quantidades do carrinho |
| validarCliente | Validação de nome, telefone, erros para dados inválidos |
| formatarMensagemWhatsApp | Mensagem contém nome, produto e total, erros para carrinho vazio |
| gerarLinkWhatsApp | Gera link válido com número correto e mensagem codificada |
Para rodar os testes:
npm test
________________________________________
🔄 Pipeline CI/CD
O arquivo .github/workflows/ci.yml define dois jobs:
Job 1 — Executar Testes (em todo push e Pull Request)
1.	Faz checkout do código
2.	Configura Node.js 20
3.	Instala dependências (npm install)
4.	Roda os testes com cobertura (npm test)
5.	Publica o relatório de cobertura como artefato
Job 2 — Deploy GitHub Pages (apenas na branch main)
1.	Só executa se os testes passarem com sucesso
2.	Publica automaticamente a aplicação no GitHub Pages
________________________________________
🔒 Proteção de Branch
O repositório está configurado para:
•	Exigir Pull Request para qualquer merge na branch main
•	Exigir que o CI passe antes de permitir o merge
•	Revisão automatizada via Gemini Code Assist
________________________________________
🤖 Revisão Automática de Código
Utilizamos o Gemini Code Assist integrado ao repositório. A cada Pull Request aberto, a ferramenta analisa automaticamente o código e gera comentários com sugestões de melhoria. A dupla analisou os apontamentos e realizou os ajustes necessários.
________________________________________
🌐 Aplicação Publicada
🔗 https://rafaelfelicidade.github.io/Trabalho-Qualidade-de-SoftWare-
________________________________________
👥 Integrantes
•	Luiza de Paulo Araújo
•	Rafael Da Felicidade Barbosa
