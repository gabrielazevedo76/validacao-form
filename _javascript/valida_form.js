const forms = {
    "nome":document.querySelector("#nome"),
}


document.querySelector("#validar").addEventListener("click", (e) => {
    e.preventDefault()

    validar_texto()


})

//validar Nome
function validar_texto() {
    
    console.log(forms.nome.value)

    let re = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
    if (!re.test(forms.nome.value)) {
      // campo inválido, retorna false para o formulário não ser submetido
      forms.nome.style.border = "1px solid red"
      return false;
    }
    return true;
}

//validar CPF
function validar_cpf() {
    let value = document.getElementById("cpf").value;
    let re = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    if (!re.test(value)) {
      // campo inválido, retorna false para o formulário não ser submetido
      alert('Conteúdo de CPF Inválido');
      document.form.cpf.focus();
      return false;
    }
    return true;
}

//função para totalizar valor de assinatura mensal
function totaliza()
{
    total = 0.00;
    //plano mensal
    if(document.form.planos[0].checked)
        total = total + 85.00;
    //plano quadrimestral
    if(document.form.planos[1].checked)
        total = total + 300.00 / 4;
    //plano anual
    if(document.form.planos[2].checked)
        total = total + 600.00 / 12;
    //Premiere econômico
    if(document.form.premiere[0].checked)
        total = total + 60.00;
    //Premiere controle
    if(document.form.premiere[1].checked)
        total = total + 80.00;
    document.form.total.value = total.toFixed(2);
}

