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
    for(i = 0; i <= tarefas.length; i++){
        //cria um elemento li
        let li = document.createElement('li')

        //cria um button
        let btn = document.createElement('button')
        btn.innerHTML = '<i class="fa fa-times"  ></i>'
        btn.id = `tarefa${i}`
        btn.onclick = function(){
            let id = this.id.replace('tarefa','')
            bd.remover(id)
            window.location.reload()
            //console.log(id)
        }
        

        //atribui um id para a tarefa
        li.setAttribute('id', 'tarefa'+i)

        //mostra a tarefa dentro da li
        li.innerHTML = tarefas[i].tarefa

        //atribui a li á ul
        document.getElementById('lista-coisa').appendChild(li)

        //atribui um button a li
        document.getElementById('tarefa'+i).appendChild(btn)
        
    }
    
}