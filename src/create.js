document.querySelector('form').addEventListener('submit', create);

async function create(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let name = formData.get('name').trim();
    let img = formData.get('img').trim();
    let ingredients = formData.get('ingredients').trim();
    let steps = formData.get('steps').trim();


    if (sessionStorage.getItem('accessToken') == null) {
        alert('Please login!');
        window.location = 'H:/DiplomnaRabota/SU/JS/JS Applications/cookbook/js-apps-workshop-master/lesson-03/base/login.html'
        return;
    }

    try {
        const response = await fetch('https://JS-Server.lunia6.repl.co/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                name,
                img,
                ingredients: ingredients.split('\n'),
                steps: steps.split('\n')
            })
        })

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        console.log(await response.json());

        window.location = 'H:/DiplomnaRabota/SU/JS/JS Applications/cookbook/js-apps-workshop-master/lesson-03/base/index.html'

    } catch (error) {
        alert(error.message)
    }
}