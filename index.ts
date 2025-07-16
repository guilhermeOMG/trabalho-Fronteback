// backend.ts
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import mysql from 'mysql2/promise';
import cors from '@fastify/cors';
import path from 'path';
import fastifyStatic from '@fastify/static';

const app = fastify();
app.register(cors, {
  origin: "*",
});
// app.register(fastifyStatic, {
//   root: path.join(__dirname, 'public'),
//   prefix: '/',
// });

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gerenciamento_produtos',
  port: 3306,
};

// ========== TRATAMENTO DE ERROS ==========
function handleError(erro: any, reply: FastifyReply) {
  const erros: { [key: string]: string } = {
    ECONNREFUSED: "ERRO: LIGUE O SERVIDOR DO BANCO (ex: Laragon ou XAMPP)",
    ER_BAD_DB_ERROR: "ERRO: Banco de dados não encontrado",
    ER_ACCESS_DENIED_ERROR: "ERRO: Acesso ao banco de dados negado",
    ER_NO_SUCH_TABLE: "ERRO: Tabela não encontrada",
    ER_PARSE_ERROR: "ERRO: Erro de sintaxe na query",
    ER_DUP_ENTRY: "ERRO: Entrada duplicada, verifique os dados",
  };

  if (erros[erro.code]) {
    reply.status(400).send({ mensagem: erros[erro.code] });
  } else {
    console.error(erro);
    reply.status(500).send({ mensagem: "ERRO: Não identificado" });
  }
}

// ========== ROTAS ==========
app.get('/', async (_req, reply) => {
  reply.send("Backend unificado de Produtos, Categorias e Vendedores ativo");
});

// ========== CATEGORIAS ==========
app.get('/categorias', async (_req, reply) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [dados] = await conn.query("SELECT * FROM categorias");
    reply.status(200).send(dados);
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

// ========== PRODUTOS ==========
app.get('/produtos', async (req, reply) => {
  const { nome } = req.query as any;
  const filtro = nome ? `%${nome}%` : '%';

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [dados] = await conn.query(
      "SELECT * FROM produtos WHERE nome LIKE ?",
      [filtro]
    );
    reply.status(200).send(dados);
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

app.post('/produtos', async (req: FastifyRequest, reply: FastifyReply) => {
  const { nome, descricao, preco, estoque, id_categoria } = req.body as any;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result]: any = await conn.query(
      `INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, id_categoria)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao, preco, estoque, id_categoria]
    );
    reply.status(200).send({ id: result.insertId, nome, descricao, preco, estoque, id_categoria });
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

app.put('/produtos/:id', async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;
  const { nome, descricao, preco, estoque, id_categoria } = req.body as any;

  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.query(
      `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, id_categoria = ?
       WHERE id = ?`,
      [nome, descricao, preco, estoque, id_categoria, id]
    );
    reply.status(200).send({ mensagem: "Produto atualizado com sucesso" });
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

app.delete('/produtos/:id', async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as any;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [resultado]: any = await conn.query("DELETE FROM produtos WHERE id = ?", [id]);

    if (resultado.affectedRows === 0) {
      reply.status(404).send({ mensagem: 'Produto não encontrado' });
    } else {
      reply.status(200).send({ mensagem: 'Produto deletado com sucesso' });
    }
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

// ========== VENDEDORES ==========
app.get('/vendedor', async (_req: FastifyRequest, reply: FastifyReply) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [dados] = await conn.query("SELECT * FROM vendedores");
    reply.status(200).send(dados);
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

app.post('/vendedor', async (request: FastifyRequest, reply: FastifyReply) => {
  const { nome, cpf, email, genero } = request.body as any;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result]: any = await conn.query(
      "INSERT INTO vendedores (nome, cpf, email, genero) VALUES (?, ?, ?, ?)",
      [nome, cpf, email, genero]
    );

    reply.status(200).send({ id: result.insertId, nome, cpf, email, genero });
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

app.get('/vendedor/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [resultado]: any = await conn.query("SELECT * FROM vendedores WHERE id = ?", [id]);

    if (resultado.length === 0) {
      reply.status(404).send({ mensagem: 'Vendedor não encontrado' });
    } else {
      reply.status(200).send(resultado[0]);
    }
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

app.delete('/vendedor/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [resultado]: any = await conn.query("DELETE FROM vendedores WHERE id = ?", [id]);

    if (resultado.affectedRows === 0) {
      reply.status(404).send({ mensagem: 'Vendedor não encontrado' });
    } else {
      reply.status(200).send({ mensagem: 'Vendedor deletado com sucesso' });
    }
  } catch (erro: any) {
    handleError(erro, reply);
  }
});

// ========== INICIAR SERVIDOR ==========
app.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em: ${address}`);
});