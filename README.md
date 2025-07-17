# Aplicação simples com implementação de CRUD de produtos e vendedores usando React, React-dom, Fastify, TypeScript e MySQL.

## Este repositório é apenas para o Front-end
## Acesse '' para obter Back-end

## Estrutura do projeto
```
📁 projeto
├── 📁 public
├── 📁 src
│   ├── 📁 assets
│   ├── 📄 Cadastro.css
│   ├── 📄 CadastroVendedor.tsx
│   ├── 📄 main.tsx
│   ├── 📄 PerfilVendedor.css
│   ├── 📄 PerfilVendedor.tsx
│   ├── 📄 Produtos.css
│   ├── 📄 Produtos.tsx
│   ├── 📄 main.tsx
│   ├── 📄 vite-env.d.ts
├── 📄 .gitignore
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 index.ts
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
├── 📄 sql.txt
├── 📄 tsconfig.app.json
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📄 vite.config.ts
```

## Como executar o projeto

### 1 - Faça download do arquivo
Faça o download do arquivo ‘.zip’ tanto do Front-end quanto do Back-end, descompacte e abra-los no Visual Studio Code.


### 2 - Instale as dependências
Digite no terminal:
npm install   ou   npm i

### 3 - Crie o Banco de Dados
Crie o Banco de dados e suas tabelas com o seguinte SQL:
```sql
CREATE database gerenciamento_produtos;
use gerenciamento_produtos;

-- Tabela: categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela: produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INT NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Tabela: vendedores
CREATE TABLE vendedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255),
    genero ENUM('M', 'F', 'Outro') DEFAULT 'Outro'
);

-- Inserção de dados de exemplo na tabela vendedores
INSERT INTO vendedores (nome, cpf, email, genero) VALUES
('Mariana Costa', '321.654.987-00', 'mariana.costa@empresa.com', 'F'),
('João Ferreira', '456.789.123-11', 'joao.ferreira@empresa.com', 'M'),
('Lucas Silva', '789.123.456-22', 'lucas.silva@empresa.com', 'M'),
('Beatriz Mendes', '159.753.486-33', 'beatriz.mendes@empresa.com', 'F');

INSERT INTO categorias (nome) VALUES
('Hortifrúti'),
('Carnes'),
('Aves'),
('Peixes e Frutos do Mar'),
('Frios e Embutidos'),
('Padaria'),
('Laticínios'),
('Bebidas Alcoólicas'),
('Bebidas Não Alcoólicas'),
('Grãos e Cereais'),
('Massas e Macarrão'),
('Molhos e Condimentos'),
('Enlatados'),
('Produtos de Limpeza'),
('Higiene Pessoal'),
('Petiscos e Snacks'),
('Doces e Sobremesas'),
('Congelados'),
('Produtos Naturais'),
('Biscoitos e Bolachas');

-- Inserção de dados de exemplo na tabela produtos
INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, id_categoria) VALUES
('Smartphone X', 'Última geração de smartphones com câmera de alta resolução.', 1200.00, 50, 1),
('Camiseta Algodão', 'Camiseta 100% algodão, confortável e durável.', 45.90, 200, 2),
('Arroz Integral 1kg', 'Arroz integral orgânico, pacote de 1kg.', 12.50, 300, 3),
('O Guia do Mochileiro das Galáxias', 'Livro clássico de ficção científica.', 35.00, 100, 4),
('Notebook Gamer', 'Notebook de alta performance para jogos.', 3500.00, 20, 1),
('Calça Jeans Slim Fit', 'Calça jeans masculina com corte slim fit.', 99.90, 150, 2),
('Feijão Carioca 1kg', 'Feijão carioca selecionado, pacote de 1kg.', 8.75, 250, 3),
('1984', 'Distopia clássica de George Orwell.', 28.00, 120, 4);

```
Caso necessite excluir o Banco de Dados
```sql
drop database gerenciamento_produtos;
```

### 4 - Inicie o Servidor
Utilize:
```
npm run dev
```

## Rotas (URLs) para utilizar
https:localhost:8000/
https:localhost:8000/perfilvendedor
https:localhost:8000/PaginaVendedor
https:localhost:8000/produtos

## Licença

Projeto feito por guilhermeOMG e PauloCN01. Livre para uso educacional.
