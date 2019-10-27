
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let addButtons = document.querySelectorAll("button[data-trainer-id]")
let deleteButtons = document.getElementsByClassName('release')
// debugger

document.addEventListener('DOMContentLoaded', (event) => {
    fetchTrainers();
  })



function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))
}

function renderTrainers(json) {
    let main = document.getElementsByTagName('main')[0]
    // debugger
    json.forEach(team => {
        // debugger
        let div = document.createElement('div')
        div.className = "card"
        div.setAttribute("data-id", `${team.id}`)
        let button = document.createElement('button')
        button.innerText = "Add Pokemon"
        button.setAttribute("data-trainer-id", `${team.id}`)
        let ul = document.createElement('ul')
        let p = document.createElement('p')
        p.innerText = team.name
        team.pokemons.forEach( pokemon => {
            // debugger
            let li = document.createElement('li')
            let btn = document.createElement('button')
            btn.innerText = "release"
            btn.className = "release"
            btn.setAttribute("data-pokemon-id", `${pokemon.id}`)
            // debugger
            li.innerText = `${pokemon.species} (${pokemon.nickname})`
            li.appendChild(btn)
            ul.appendChild(li)
            // debugger
        })
        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(ul)
        main.appendChild(div)
        // debugger
    })
    addButtons = document.querySelectorAll("button[data-trainer-id]")
    deleteButtons = document.getElementsByClassName('release')

    Array.prototype.forEach.call(addButtons, function(btn) {
        btn.addEventListener('click', function(){
            
            let data = {
                trainer_id: btn.getAttribute('data-trainer-id')
            }
    
            let options = {
                method: "POST",
                headers: {
                  'Content-Type': "application/json",
                //   Accept: "application/json"
                },
                body: JSON.stringify(data)
              }; 
            
            //   debugger
            fetch(POKEMONS_URL, options)
            .then(function(response){
                return response.json();
            })
            .then(function(data) {
             document.getElementsByTagName("main")[0].innerHTML = ""
             fetchTrainers();
            })
            // .then(json => console.log(json))
    })})

    Array.prototype.forEach.call(deleteButtons, function(butn) {
        // debugger
    butn.addEventListener('click', function(){ 
        
        let options = {
            method: "delete",
          }; 
    
        fetch(`http://localhost:3000/pokemons/${butn.getAttribute('data-pokemon-id')}`, options)
        .then(function(response){
            document.getElementsByTagName("main")[0].innerHTML = ""
            fetchTrainers();
        })

})})
    
    // debugger
}

    
   


