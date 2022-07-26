document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('rePass');

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!')
        }
        if (password != repass) {
            throw new Error('Passwords don\'t match!')
        }

        const response = await fetch('https://JS-Server.lunia6.repl.co/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (response.ok == false) {
            const error = await response.json();
            throw Error(error.message);
        }

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);

        window.location = 'H:/DiplomnaRabota/SU/JS/JS Applications/cookbook/js-apps-workshop-master/lesson-03/base/index.html'

    } catch (error) {
        alert(error.message)
    }
}