displayAnteriores = document.getElementById("PreviousPagesDisplay")
displayProximos = document.getElementById("ForwardPagesDisplay")
inputPaginaAtual = document.getElementById("CurrentPageInput")

console.log("Historico Importado.")

//Uma pilha só pode sofrer alterações no último elemento
//Pode ser checado qual o tamanho da pilha
class Stack{ 
    constructor(descricao = "", maxPilha = 5){
        console.log("Pilha Criada.")

        this.armazenamento = []
        this.maxPilha = maxPilha //pode ser especificado
        this.descricao = descricao
        this.divAfiliada = ""
    }

    set novoMax(novoMax){
        this.maxPilha = novoMax
    }

    set novaDesc(novaDesc){
        this.descricao = novaDesc.toString()
    }

    //use somente IDs de DIVs
    set novaDiv(novaDiv){
        this.divAfiliada = document.getElementById(novaDiv.toString())
    }

    cheia(){
        return this.armazenamento.length == this.maxPilha
    }

    remover(){
        return this.armazenamento.pop()
    }
    
    esvaziarPilha(){
        this.armazenamento = []
        console.warn("Pilha vazia!")
    }

    adicionar(novoLink){
        this.armazenamento.push(novoLink)
    }
    
    fechar(){ //! não funcionando
        console.warn("Pilha Deletada!")
        delete this
    }
}

const Pilha_Anteriores = new Stack();
Pilha_Anteriores.novoMax = 10
Pilha_Anteriores.novaDiv = "PreviousDiv"
Pilha_Anteriores.novaDesc = "Pilha dos sites visitados anteriormente"

const Pilha_Proximos = new Stack();
Pilha_Anteriores.novaDiv = "ForwardDiv"
Pilha_Proximos.novaDesc = "Pilha de sites que foram exibidos antes de usar o botão de retorno"

class historyManagement{
    constructor(){
        console.log("Manejador de histórico Criado.")
    }

    atualizarDisplayPilha(){
        arrayPilhas = [Pilha_Anteriores, Pilha_Proximos]
        arrayPilhas.forEach( (pilha) => {
            i = pilha.armazenamento.length
            while(i <= 0){
                linkEl = document.createElement("a")
                linkEl.href = pilha.armazenamento[0]
                linkEl.textContent = linkEl.href
                
                //adicionando ao display
                pilha.divAfiliada.appendChild(linkEl)
            } 
        }) 
    }

    checarInputVazio(){ //! não funcionando
        if(inputPaginaAtual.length === 0 || inputPaginaAtual === null || undefined){
            alert("insira um link")
            throw console.error("Input sem valor")
        }
    }

    //* prosseguir e voltar funcionam no back, mas não atualizam o front
    prosseguir(){
        this.checarInputVazio() //!
        if(Pilha_Anteriores.cheia() === true){
            alert("pilha dos anteriores cheia!")
            throw console.error("Pilha cheia, ignorando...")
        }

        //input -> anteriores
        Pilha_Anteriores.adicionar(inputPaginaAtual.value)

        //proximos -> input
        inputPaginaAtual.value = Pilha_Proximos.remover()
        
        //mostra display
        this.atualizarDisplayPilha()
    }

    voltar(){
        this.checarInputVazio() //!
        if(Pilha_Proximos.cheia() === true){
            alert("pilha dos proximos cheia!")
            throw console.error("Pilha cheia, ignorando...")
        }
        
        
        //input -> proximos
        Pilha_Proximos.adicionar(inputPaginaAtual.value)
        
        //anteriores -> input
        inputPaginaAtual.value = Pilha_Anteriores.remover()
        
        this.atualizarDisplayPilha()
    }

    esvaziarDisplay(){
        Pilha_Anteriores.esvaziarPilha()
        Pilha_Proximos.esvaziarPilha()
        this.atualizarDisplayPilha()
    }

    fechar(){ //! não funcionando
            console.warn("Pilha Deletada!")
            Pilha_Anteriores.fechar() //!
            Pilha_Proximos.fechar() //!
            delete this
    }

}

historico = new historyManagement()