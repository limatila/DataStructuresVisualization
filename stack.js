displayAnteriores = document.getElementById("PreviousPagesDisplay")
displayProximos = document.getElementById("ForwardPagesDisplay")
inputPaginaAtual = document.getElementById("CurrentPageInput")

console.log("Historico Importado.")

//Uma pilha só pode sofrer alterações no último elemento
//Pode ser checado qual o tamanho da pilha
class Stack{ 
    constructor(descricao = null, maxPilha){
        console.log("Pilha Criada.")

        this.armazenamento = [null]
        this.maxPilha = maxPilha || 5 //pode ser especificado
        this.descricao = descricao
    }

    set setMaxPilha(novoMax){
        this.maxPilha = novoMax
    }

    set setDescricao(novaDesc){
        this.descricao = novaDesc.toString()
    }

    cheia(){
        return this.armazenamento.length == this.maxPilha
    }

    remover(){
        return this.armazenamento.pop()
    }

    adicionar(novoLink){
        this.armazenamento.push(novoLink)
    }
}

const Pilha_Anteriores = new Stack();
const Pilha_Proximos = new Stack();

class historyManagement{
    constructor(){
        console.log("Manejador de histórico Criado.")
    }

    atualizarDisplayPilha(){
        displayAnteriores.textContent = Pilha_Anteriores.armazenamento
        displayProximos.textContent = Pilha_Proximos.armazenamento
    }

    checarInputVazio(){
        if(inputPaginaAtual.length == 0){
            alert("insira um link")
            throw console.error("Input sem valor")
        }
    }

    prosseguir(){
        this.checarInputVazio()
        if(Pilha_Anteriores.cheia() === true){
            alert("pilha dos anteriores cheia!")
            throw console.error("Pilha cheia, ignorando...")
        }

        //puxa do input para a pilha1
        Pilha_Anteriores.adicionar(inputPaginaAtual.value)

        this.atualizarDisplayPilha()

        //deixa input com o próximo
        inputPaginaAtual.value = Pilha_Proximos.remover()
    }

    voltar(){
        this.checarInputVazio()
        if(Pilha_Proximos.cheia() === true){
            alert("pilha dos proximos cheia!")
            throw console.error("Pilha cheia, ignorando...")
        }

        //puxa do input pros proximos
        Pilha_Proximos.adicionar(inputPaginaAtual.value)
        
        //puxa do anterior pro input
        inputPaginaAtual.value = Pilha_Anteriores.remover()
    }


}

historico = new historyManagement()