class Tarefa{
    constructor(tarefa){
        this.tarefa = tarefa
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')//GET srrve pra recuperar um dado dentro de localstorage
        
        if (id === null){
            localStorage.setItem('id', 0)//setando uma chave imicial
        }
    }
    
    //funcao que lida com a ceriação dos indices dinamoco
    //primeiro ela verifca se há alhum indice em loclastorage
    getProximoId(){
        let proximoId = localStorage.getItem('id')//GET srrve pra recuperar um dado dentro de localstorage
        return parseInt(proximoId) + 1
    }

    gravar(d){
        //console.log(d)
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        //array de tarefas
        let tarefas = Array()
        //console.log('estamos aqui')
        let id = localStorage.getItem('id')
        //recuperar todoa tarefas
        for (let i = 1; i <= id; i++){
            let tarefa = JSON.parse(localStorage.getItem(i))

            //verificar existe possibilidade de indice null
            if(tarefa === null){
                continue
            }
            tarefas.push(tarefa)

        }
        return tarefas
    }
    remover(id){
		localStorage.removeItem(id)
        console.log(id)
	}

}

let bd = new Bd()

function adicionar(){
    let descricao = document.getElementById('tarefa')

    let tarefa = new Tarefa(descricao.value)
    
    bd.gravar(tarefa)

    document.getElementById('tarefa').value = ''
}

function carregaListaTarefas(){
    let tarefas = Array()

    tarefas = bd.recuperarTodosRegistros()

    //percorrer array tarefas
    tarefas.forEach(function(d){

		//Criando a linha (tr)
		var linha = lista_coisa.insertRow();

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = d.tarefa
		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.innerHTML = '<i class="far fa-trash-alt"></i>'
		btn.id = `tarefa_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('tarefa_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(1).append(btn)
		console.log(d.id)
	})
    
}