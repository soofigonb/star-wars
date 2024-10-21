document.addEventListener('DOMContentLoaded', () => {
    const cardUno = document.getElementById('card-uno');
    const cardDos = document.getElementById('card-dos');
    const cardOtros = document.getElementById('card-otros'); 
    const arribaCards = document.getElementById('arriba-cards');
    const abajoCards = document.getElementById('abajo-cards');
    const arribaSecondaryCards = document.getElementById('arriba-secondary-cards');
    const abajoSecondaryCards = document.getElementById('abajo-secondary-cards');
    const arribaOtherCards = document.getElementById('arriba-other-cards'); 
    const abajoOtherCards = document.getElementById('abajo-other-cards'); 

    // Función para obtener los datos de los personajes desde la API
    async function fetchCharacter(id) {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const character = await response.json();
        return character;
    }

    // Definir la función generadora para las tarjetas
    function* cardGenerator(startId, totalCards) {
        for (let i = startId; i < startId + totalCards; i++) {
            yield fetchCharacter(i); 
        }
    }

    // Crear generadores para los personajes del 1 al 5, del 6 al 11, y del 12 al 16
    const generateMainCards = cardGenerator(1, 5);
    const generateSecondaryCards = cardGenerator(6, 6);
    const generateOtherCards = cardGenerator(12, 5);
    // Evento de click para `card-uno` (personajes del 1 al 5)
    cardUno.addEventListener('click', async () => {
        const result = generateMainCards.next();
        if (!result.done) { 
            const character = await result.value; 

            // Crear una nueva tarjeta
            const newCard = document.createElement('div');
            newCard.classList.add('card');

            // Asignar el contenido con los datos del personajes principales
            newCard.innerHTML = `
                <div class="card-body">
                    <div class="circle-red-1"></div>
                    <h5>${character.name}</h5>
                    <p>Estatura: ${character.height} cm,
                    Peso: ${character.mass} kg</p>
                </div>
            `;

            // Determinar en qué contenedor agregar la tarjeta
            if (arribaCards.children.length < 2) {
                
                arribaCards.appendChild(newCard);
            } else {
                
                abajoCards.appendChild(newCard);
            }
        }
    });

    // Evento de click para `card-dos` (personajes del 6 al 11)
    cardDos.addEventListener('click', async () => {
        const result = generateSecondaryCards.next(); 

        if (!result.done) { 
            const character = await result.value; 

            // Crear una nueva tarjeta
            const newCard = document.createElement('div');
            newCard.classList.add('card');

            // Asignar el contenido con los datos del personajes secundarios
            newCard.innerHTML = `
                <div class="card-body-secundarios">
                    <div class="circle-green-2"></div>
                    <h5>${character.name}</h5>
                    <p>Estatura: ${character.height} cm,
                    Peso: ${character.mass} kg</p>
                </div>
            `;

            // Determinar en qué contenedor agregar la tarjeta
            if (arribaSecondaryCards.children.length < 2) {
               
                arribaSecondaryCards.appendChild(newCard);
            } else {
                
                abajoSecondaryCards.appendChild(newCard);
            }
        }
    });

    // Evento de click para `card-otros` (personajes del 12 al 16)
    cardOtros.addEventListener('click', async () => {
        const result = generateOtherCards.next(); 

        if (!result.done) { 
            const character = await result.value; 

            // Crear una nueva tarjeta
            const newCard = document.createElement('div');
            newCard.classList.add('card');

            // Asignar el contenido con los datos del personajes otros
            newCard.innerHTML = `
                <div class="card-body-otros">
                    <div class="circle-blue-3"></div>
                    <h5>${character.name}</h5>
                    <p>Estatura: ${character.height} cm,
                    Peso: ${character.mass} kg</p>
                </div>
            `;

            // Determinar en qué contenedor agregar la tarjeta
            if (arribaOtherCards.children.length < 2) {
                
                arribaOtherCards.appendChild(newCard);
            } else {
                
                abajoOtherCards.appendChild(newCard);
            }
        }
    });
});



