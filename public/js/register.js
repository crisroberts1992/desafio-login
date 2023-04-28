const formRegister = document.querySelector('#formRegister') //busco el #formRegister

if (formRegister instanceof HTMLFormElement) { //si lo encuentro
  formRegister.addEventListener('submit', async event => {
    event.preventDefault() //para que no recargue la pagina despues de enviar el formulario

    const input_first_name = document.querySelector('#input_first_name') //busco los datos del formulario
    const input_last_name = document.querySelector('#input_last_name')
    const input_email = document.querySelector('#input_email')
    const input_age = document.querySelector('#input_age')
    const input_password = document.querySelector('#input_password')

    if (
      input_first_name instanceof HTMLInputElement && //si estos datos son input
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = { //extraigo las respuestas
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        email: input_email.value,
        age: input_age.value,
        password: input_password.value,
      }

      const usuarioCreado = await fetch('/api/usuarios', { //fetch para hacer asincronico
        method: 'POST',                      //esta parte la busco por google
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      }).then(res => res.json()) //que me devuelva un json

      console.log(usuarioCreado)
    }
  })
}