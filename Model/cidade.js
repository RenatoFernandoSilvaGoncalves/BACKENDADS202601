export default class Cidade{
    #id
    #nome
    #uf
    constructor(id, nome, uf){
        this.#id = id;
        this.#nome = nome;
        this.#uf = uf;
    }

    get id(){
        return this.#id;
    }

    get nome(){
        return this.#nome;
    }

    get uf(){
        return this.#uf;
    }

    set id(novo_id){
        this.#id = novo_id;
    }

    set nome(novo_nome){
        this.#nome = novo_nome;
    }

    set uf(novo_uf){
        this.#uf = novo_uf;
    }

    toString(){
        return `${this.#nome}/${this.#uf}`;
    }

    async gravar(){
        //gravar no banco de dados
    }

    async atualizar(){
        //atualizar no banco de dados
    }

    async excluir(){
        //excluir no banco de dados
    }

    async consultar(){
        //consultar no banco de dados
        return "";
    }

    //override no método toJSON()
    toJSON(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "uf": this.#uf
        }
    }
}