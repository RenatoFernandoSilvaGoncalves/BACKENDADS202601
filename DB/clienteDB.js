import obterConexao from "./conexao.js";
import Cliente from "../Model/cliente.js";
import Cidade from "../Model/cidade.js";
export default class ClienteDB{

    async gravar(cliente){
        if (cliente instanceof Cliente){
            const sql = `INSERT INTO cliente(cli_cpf, cli_nome, cli_endereco, cli_bairro, cid_id, cli_telefone, cli_email) 
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [cliente.cpf,
                                cliente.nome,
                                cliente.endereco,
                                cliente.bairro,
                                cliente.cidade.id,
                                cliente.telefone,
                                cliente.email
            ];
            
            const conexao = await obterConexao();
            const resultado = await conexao.execute(sql,parametros);
            cliente.id = resultado[0].insertId;
            conexao.release();
        }

    }

    async editar(cliente){
        if (cliente instanceof Cliente){
            const sql = `UPDATE cliente SET cli_cpf = ?, cli_nome = ?, cli_endereco = ?, cli_bairro =?, cid_id =?, cli_telefone=?, cli_email=? WHERE cli_id = ?`;
            const parametros = [cliente.cpf,
                                cliente.nome,
                                cliente.endereco,
                                cliente.bairro,
                                cliente.cidade.id,
                                cliente.telefone,
                                cliente.email,
                                cliente.id
            ];
            const conexao = await obterConexao();
            await conexao.execute(sql,parametros);
            conexao.release();
        }
    }

    async excluir(cliente){
        if(cliente instanceof Cliente){
            const sql = `DELETE FROM cliente WHERE cli_id = ?`;
            const parametros = [cliente.id];
            const conexao = await obterConexao();
            await conexao.execute(sql,parametros);
            conexao.release();
        }
    }

    async consultar(termo){
        //consulta verificará se termo é um número ou nome
        let sql = "";
        let parametros = [];
        if (!isNaN(Number(termo)) && Number(termo) > 0){
            //consulta por código
            sql = `SELECT * FROM cliente as cli
                         LEFT JOIN cidade cid ON cid.cid_id = cli.cid_id
                         WHERE cli.cli_id = ?`;
            parametros = [termo];
        }
        else{
            //consulta por nome
            sql = `SELECT * FROM cliente as cli
                         LEFT JOIN cidade cid ON cid.cid_id = cli.cid_id
                         WHERE cli.cli_nome LIKE ?`;
            parametros = [`%${termo}%`];
            
        }
        
        const conexao = await obterConexao();
        const resultados = await conexao.query(sql,parametros);
        conexao.release();
        let listaClientes = [];
        for (const resultado of resultados[0]){
            const cidade = new Cidade(resultado.cid_id,resultado.cid_nome,resultado.cid_uf);
            const cliente = new Cliente(resultado.cli_id,resultado.cli_cpf,resultado.cli_nome,resultado.cli_endereco,resultado.cli_bairro,cidade,resultado.cli_telefone,resultado.cli_email);
            listaClientes.push(cliente);
        }

        return listaClientes;
        
    }
}