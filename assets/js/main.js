class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".form");
    this.eventos();
  }

  //metodo de eventos
  eventos() {
    //usando função arrow pois ela não permite alterar o THIS
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
      const isValid = this.isValid();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Formulario não enviado");
  }

  isValid() {
    let valid = true;
    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    //catando o valor dos formularios com o FOR
    for (let input of this.formulario.querySelectorAll(".validar")) {
      const labelAnterior = input.previousElementSibling.innerHTML;
      if (!input.value) {
        this.criaErro(input, `"${labelAnterior}" não pode estar vazio`);
        valid = false;
        
      }

      if (input.classList.contains("cpf")) {
        if (!this.validaCPF(input)) valid = false;
      }

      if(input.classList.contains("name")) {
        if(!this.validaUsuario(input)) valid = false
      }

    }
  }

  validaUsuario(input) {
    let valid = true
    let tamanhoInput = input.value.length;
    if( tamanhoInput < 3 || tamanhoInput > 12) {
        this.criaErro(input, `Nome deve ter entre 3 a 12 caracteres`);
        valid = false
    }
    return valid
  }

  validaCPF(input) {
    const cpf = new ValidaCPF(input.value);

    if (!cpf.valida()) {
      this.criaErro(input, "CPF INVALIDO");
      return false;
    }
    return true;
  }



  criaErro(campo, mensagem) {
    const div = document.createElement("div");
    div.innerHTML = mensagem;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();
