//Nossa API oferece um endpoint "/cliente" permitindo que usuários possam
//criar, consultar, editar       e excluir clientes. 
//POST , GET,       PUT ou PATCH e DELETE.
import Cidade from "../Model/cidade.js";
import Cliente from "../Model/cliente.js";
export default class ClienteCtrl{

    gravar(requisicao, resposta){                  //mimetype
        if(requisicao.method === "POST" && requisicao.is("application/json")){

            const cpf = requisicao.body.cpf;
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const bairro = requisicao.body.bairro;
            //cidade é um atributo objeto aninhado ao objeto cliente
            const cidade = requisicao.body.cidade;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;

            if (cpf && nome && endereco && bairro && cidade && telefone && email){
                const cidadeObj = new Cidade(cidade.id);
                const cliente = new Cliente(0, cpf,nome,endereco,bairro,cidadeObj,telefone,email);
                //não bloquear a execução enquanto o banco de dados não responde....
                cliente.gravar()
                .then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Cliente gravado com sucesso.",
                        "id": cliente.id
                    })
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar o cliente: " + erro.message
                    });

                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os dados do cliente são obrigatórios. Consulte a documentação da API."
                });
            }

        }
        else 
        {
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }

    }

    editar(requisicao, resposta){
        //PUT deveria ser utilizado para substituir completamente um recurso no servidor
        //PATCH deveria ser utilizado para atualizar parte de um recurso no servidor
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")){
            const id = requisicao.params.id; //o id está na url da requisição
            const cpf = requisicao.body.cpf;
            const nome = requisicao.body.nome;
            const endereco = requisicao.body.endereco;
            const bairro = requisicao.body.bairro;
            const cidade = requisicao.body.cidade;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;

            if (id > 0 && cpf && nome && endereco && bairro && cidade && telefone && email){
                const cidadeObj = new Cidade(cidade.id);
                const cliente = new Cliente(id, cpf, nome, endereco, bairro, cidadeObj, telefone, email);
                cliente.editar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente atualizado com sucesso."
                    })
                })
                .catch((erro) => {
                    
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o cliente: " + erro.message
                    });

                });
                
            }
            else
            {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os dados do cliente são obrigatórios. Consulte a documentação da API."
                });
            }

        }
        else{
             resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }

    }

    excluir(requisicao, resposta){
        if (requisicao.method === "DELETE"){
            const id = requisicao.params.id;
            if (id > 0){
                const cliente  =  new Cliente(id);

                cliente.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluido com sucesso."
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um id válido. Consulte a documentação da API."
                });
            }


        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta){
        if (requisicao.method === "GET"){
            //a identificação da existência de um id na url provocará a consulta por id
            // sem id a consulta será 
            const id = requisicao.params.id;
            let termo;

            if (!isNaN(id)){ //id é um número
                termo = id;
            }
            else{
                termo ='';
            }

            const cliente = new Cliente();
            cliente.consultar(termo)
            .then((listaClientes)=>{
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Consulta realizada com sucesso.",
                    "clientes":listaClientes
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o cliente: " + erro.message
                });
            });

        }
        else
        {
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });

        }

    }


}
