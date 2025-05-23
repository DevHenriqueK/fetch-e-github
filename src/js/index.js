import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    if(validateEmptyInput(userName)) return

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', event => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed){ 
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }    
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo para encontrar o usuário')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    
    
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }    

    const repositoriesResponse = await getRepositories(userName)
    console.log(...repositoriesResponse);

    const eventsResponse = await getEvents(userName)
    
    
    
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    screen.renderUser(user)
}