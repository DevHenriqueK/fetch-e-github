const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =
            `<div class="info">
                        <img src="${user.avatarUrl} alt="Foto de perfil do usuário do GitHub"></img>
                         <div class="data">
                             <h1>${user.name ?? `Usuário do GitHub`}</h1>
                             <p>${user.bio ?? ''}</p> <br>
                             <span>Seguidores: ${user.followers}</span> <br>
                             <span>Seguindo: ${user.following}</span> <br>
                         </div>
                     </div>`

        let repositoriesItems = ``
        user.repositories.forEach(repository => {
            repositoriesItems += `<li>
                                    <a href="${repository.html_url}" target="_blank">${repository.name}</a>
                                    <span>Forks: ${repository.forks}</span> <br>
                                    <span>Linguagem: ${repository.language ?? `Indefinida`}</span> <br>
                                    <span>Stars: ${repository.stargazers_count}</span> <br>
                                    <span>Watchers: ${repository.watchers_count}</span>
                                </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul> ${repositoriesItems} </ul>
                                           </div>`
        }
        

        let eventsItems = ''
        user.events.forEach(oneEvent => {
            if(oneEvent.type === 'PushEvent')eventsItems += `<li>${oneEvent.repo.name} - ${oneEvent.payload.commits[0].message}</li> <br>`
            
            
            else if(oneEvent.type === 'CreateEvent'){
                eventsItems += `<li>${oneEvent.repo.name} - Sem mensagem de commit</li> <br>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos do Usuário</h2> <br> <br>
                                            <ul> ${eventsItems} </ul>
                                           </div>`

        }

    },

    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen }