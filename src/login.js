document.querySelector('form').addEventListener('submit', onLogin)

async function onLogin(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    let data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        if (data.email == '' || data.password == '') {
            throw new Error('All fields are required!');
        }

        const response = await fetch('https://JS-Server.lunia6.repl.co/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        const result = await response.json();

        sessionStorage.setItem('accessToken', result.accessToken);

        window.location = 'H:/DiplomnaRabota/SU/JS/JS Applications/cookbook/js-apps-workshop-master/lesson-03/base/index.html'
    } catch (error) {
        alert(error.message)
    }

    
}