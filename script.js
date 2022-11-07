window.onload = function () {
    createHud();
}

function createHud() {
    const hud = document.createElement("div");
    hud.id = "hud";
    hud.className = "hud";
    const tutorial = createTutorial();
    hud.appendChild(tutorial);
    document.body.appendChild(hud);
}

function createTutorial() {
    const tutorial = document.createElement("div");
    tutorial.id = "tutorial";
    tutorial.className = "tutorial";
    tutorial.innerHTML = "Bem vindo ao Othello.\nClique no botão abaixo para começar um novo jogo."
    return tutorial;
}