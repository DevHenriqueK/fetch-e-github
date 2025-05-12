const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = 
                    `<div class="info"><img src="${user.avatarUrl} alt="Foto de perfil do usuário do GitHub"></img>
                         <div class="data">
                             <h1>${user.name ?? `Usuário do GitHub`}</h1>
                             <p>${user.bio ?? ''}</p>
                         </div>
                     </div>`

        let repositoriesItems = ''
        user.repositories.forEach(repository => repositoriesItems += `<li><a href="${repository.html_url}" target="_blank">${repository.name}</a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul> ${repositoriesItems} </ul>
                                           </div>` 
        }
    },

    renderNotFound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen }