import { useEffect, useState } from "react";
import './Cadastro.css';
import { Link } from "react-router-dom";

interface VendedorState {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    genero: "M" | "F" | "Outro";
}

function CadastroVendedor() {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [genero, setGenero] = useState<"M" | "F" | "Outro">("Outro");
    const [mensagem, setMensagem] = useState("");
    const [vendedores, setVendedores] = useState<VendedorState[]>([]);

    useEffect(() => {
        const buscarVendedores = async () => {
            try {
                const resposta = await fetch("http://localhost:8000/vendedores");
                if (resposta.status === 200) {
                    const dados = await resposta.json();
                    setVendedores(dados);
                } else if (resposta.status === 400) {
                    const erro = await resposta.json();
                    setMensagem(erro.mensagem);
                }
            } catch (erro) {
                setMensagem("Erro ao buscar vendedores.");
            }
        };

        buscarVendedores();
    }, []);

    async function tratarCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const novoVendedor: VendedorState = {
            id: parseInt(id),
            nome,
            cpf,
            email,
            genero
        };

        try {
            const resposta = await fetch("http://localhost:8000/vendedores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoVendedor)
            });

            if (resposta.status === 200) {
                const dados = await resposta.json();
                setVendedores([...vendedores, dados]);
                setMensagem("Vendedor cadastrado com sucesso!");
            } else if (resposta.status === 400) {
                const erro = await resposta.json();
                setMensagem(erro.mensagem);
            }
        } catch (erro) {
            setMensagem("Erro ao cadastrar vendedor.");
        }
    }

    return (
        <>
            <header>
                <div>Logo</div>
                <nav>
                    <ul>
                         <li><Link to="/">Home</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/PaginaVendedor">Vendedores</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {mensagem && (
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                )}

                <div className="container-listagem">
                    {vendedores.map((vendedor) => (
                        <div className="produto-container" key={vendedor.id}>
                            <div className="produto-nome">Nome: {vendedor.nome}</div>
                            <div className="produto-preco">CPF: {vendedor.cpf}</div>
                            <div className="produto-categoria">Email: {vendedor.email}</div>
                            <div className="produto-categoria">Gênero: {vendedor.genero}</div>
                        </div>
                    ))}
                </div>

                <div className="container-cadastro">
                    <form onSubmit={tratarCadastro}>
                        <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <select value={genero} onChange={(e) => setGenero(e.target.value as "M" | "F" | "Outro")}>
                            <option value="Outro">Outro</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </select>
                        <input type="submit" value="Cadastrar Vendedor" />
                    </form>
                </div>
            </main>

            <footer></footer>
        </>
    );
}

export default CadastroVendedor;