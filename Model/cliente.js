import ClienteDB from "../DB/clienteDB.js";
export default class Cliente{
    //definir atributos privados 
    #id
    #cpf
    #nome
    #endereco
    #bairro
    #cidade //objeto do tipo Cidade
    #telefone
    #email

    constructor(id, cpf, nome, endereco, bairro, cidade, telefone, email){
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#telefone = telefone;
        this.#email = email;
    }
    get id(){
        return this.#id;
    }
    get cpf(){
        return this.#cpf;
    }
    get nome(){
        return this.#nome;
    }
    get endereco(){
        return this.#endereco;
    }
    get bairro(){
        return this.#bairro;
    }
    get cidade(){
        return this.#cidade;
    }
   

    get telefone(){
        return this.#telefone;
    }
    get email(){
        return this.#email;
    }
    
    set id(novo_id){
        this.#id = novo_id;
    }

    set cpf(novo_cpf){
        this.#cpf = novo_cpf;
    }
    set nome(novo_nome){
        this.#nome = novo_nome;
    }
    set endereco(novo_endereco){
        this.#endereco = novo_endereco;
    }
    set bairro(novo_bairro){
        this.#bairro = novo_bairro;
    }
    set cidade(novo_cidade){
        this.#cidade = novo_cidade;
    }

    set telefone(novo_telefone){
        this.#telefone = novo_telefone;
    }
    set email(novo_email){
        this.#email = novo_email;
    }

    //sobrescrita do método (overhide)
    toString(){
        return `Cliente: ${this.#nome}
                CPF: ${this.#cpf}
                Cidade: ${this.#cidade}
            `;
    }

    async gravar(){
        //gravar no banco de dados
        const clienteDB = new ClienteDB();
        await clienteDB.gravar(this);
    }

    async editar(){
        //atualizar no banco de dados
        const clienteDB = new ClienteDB();
        await clienteDB.editar(this);
    }

    async excluir(){
        //excluir no banco de dados
        const clienteDB = new ClienteDB();
        await clienteDB.excluir(this);
    }

    async consultar(termo){
        //consultar no banco de dados
        const clienteDB = new ClienteDB();
        return await clienteDB.consultar(termo);
    }

    toJSON(){
        return {
            "id": this.#id,
            "cpf": this.#cpf,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "telefone": this.#telefone,
            "email": this.#email
        }
    }
}