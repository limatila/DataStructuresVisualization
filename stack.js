displayAnteriores = document.getElementById("PreviousPagesDisplay")
displayProximos = document.getElementById("ForwardPagesDisplay")
inputPaginaAtual = document.getElementById("CurrentPageInput")

console.log("Historico Importado.")

//Uma pilha só pode sofrer alterações no último elemento
//Depois das transferências o historico deve ser alterado visualmente
class Stack{ //! Estabelecer melhor encapsulamento. Vars privadas, Metodos privados, atualizarDisplayPilha(), transferir toda a carga da pilha APENAS para ela mesma, e retornar para o histórico.
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
        let divInserida = document.getElementById(novaDiv.toString())
        if(divInserida === null){
            throw console.error("Elemento não existe, operação cancelada.")
        } else { this.divAfiliada = divInserida }

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
        this.armazenamento.push(novoLink.toString())
    }
}

Pilha_Anteriores = new Stack();
Pilha_Anteriores.novoMax = 10
Pilha_Anteriores.novaDiv = "PreviousDivDisplay"
Pilha_Anteriores.novaDesc = "Pilha dos sites visitados anteriormente"

Pilha_Proximos = new Stack();
Pilha_Proximos.novaDiv = "ForwardDivDisplay"
Pilha_Proximos.novaDesc = "Pilha de sites que foram exibidos antes de usar o botão de retorno"

Pilha_Anteriores.adicionar("https://youtube.com"); Pilha_Anteriores.adicionar("https://github.com/limatila/")
Pilha_Proximos.adicionar("https://www.google.com/search?q=pokemon+591") //*hihi

//Manejador de histórico, responsável por chamar métodos das pilhas e atualizar o display
class historyManagement{
    constructor(arrayHistoricosInserido){
        console.log("Manejador de histórico Criado.")
        this.arrayHistoricos = [...arrayHistoricosInserido]
    }

    atualizarDisplayPilha(){ //? ainda não foi possível construir para atualizar todas as pilhas disponíveis no momento da execução
        let divParaAdd_one = document.getElementById("ForwardDivDisplay")
        let divParaAdd_two = document.getElementById("PreviousDivDisplay")
        //apagando
        divParaAdd_one.innerHTML = "" 
        divParaAdd_two.innerHTML = ""
        
        let i = (this.arrayHistoricos[0].armazenamento.length) - 1

        while(i >= 0){
            let linkElement = document.createElement("a")
            linkElement.href = this.arrayHistoricos[0].armazenamento[i]
            linkElement.innerText = linkElement.href + "\n"
            
            divParaAdd_one.appendChild(linkElement)

            i--
        }

        
        i = (this.arrayHistoricos[1].armazenamento.length) - 1
        while(i >= 0){
            let linkElement = document.createElement("a")
            linkElement.href = this.arrayHistoricos[0].armazenamento[i]
            linkElement.innerText = linkElement.href + "\n"
            
            divParaAdd_two.appendChild(linkElement)

            i--
        }
    }

    checarInputVazio(){ //! não funcionando
        if(inputPaginaAtual.length === 0 || inputPaginaAtual === null || undefined){
            alert("insira um link")
            throw console.error("Input sem valor")
        }
    }

    //! prosseguir e voltar funcionam no back, mas não atualizam o front
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
        inputPaginaAtual.value = null
        
        this.atualizarDisplayPilha()
    }
}

historico = new historyManagement( [Pilha_Anteriores, Pilha_Proximos] )
historico.atualizarDisplayPilha()