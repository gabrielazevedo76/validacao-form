const forms = {
  nome: document.querySelector("#nome"),
  cel: document.querySelector("#cel"),
  cpf: document.querySelector("#cpf"),
  email: document.querySelector("#email"),
  salario: document.querySelector("#salario"),
  nascimento: document.querySelector("#nascimento"),
  times: document.querySelectorAll("[name='times']"),
  planos: document.querySelectorAll("#tabela_planos > input"),
  premiere: document.querySelectorAll("#tabela_premiere > input"),
  login: document.querySelector("#login"),
  senha: document.querySelector("#senha"),
  submit: document.querySelector("#butassin")
};

document.querySelector("#validar").addEventListener("click", (e) => {
  e.preventDefault();

  validar_times();
  validar_email();
  validar_texto();
  validar_cpf();
  validar_salario();
  validar_cel();
  validar_nascimento();
  validar_planos();
  validar_premiere();
  totaliza();
  validar_senha();
  validar_tudo();
});

//validar Nome
function validar_texto() {
  let re =
    /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
  if (!re.test(forms.nome.value)) {
    // campo inválido, retorna false para o formulário não ser submetido
    forms.nome.style.border = "1px solid red";
    // forms.nome.focus();
    return false;
  }
  forms.nome.style.border = "";
  return true;
}



//validar CPF
function validar_cpf() {
  let value = document.getElementById("cpf").value;
  let re = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
  if (!re.test(value)) {
    // campo inválido, retorna false para o formulário não ser submetido
    document.form.cpf.style.border = "1px solid red";
    // document.form.cpf.focus();
    return false;
  }
  document.form.cpf.style.border = "";
  return true;
}

//Validar E-mail
function validar_email() {
    emailValue = forms.email.value
    if (emailValue.includes("@") && emailValue.includes(".com")) {
        forms.email.style.border = ""
        return true
    }else {
        forms.email.style.border = "1px solid red"
        return false
    }
}

//Validar salario

function validar_salario() {
    if(!forms.salario.value){
        forms.salario.style.border = "1px solid red"
        return false 
    }else {
        forms.salario.style.border = ""
        return true
    }
}

//Validar telefone

function validar_cel() {
    if(!forms.cel.value){
        forms.cel.style.border = "1px solid red"
        return false
    }else {
        forms.cel.style.border = ""
        return true
    }
}

//Validar data de nascimento
function validar_nascimento() {
    if(!forms.nascimento.value){
        forms.nascimento.style.border = "1px solid red"
        return false
    }else {
        forms.nascimento.style.border = ""
        return true
    }
}

//Validar times
function validar_times() {
    if(forms.times[0].value == ""){
        
        forms.times[0].style.border = "1px solid red"
        return false
    }
    else {
        forms.times[0].style.border = ""
        return true
    }
}

//validar planos
let validar = false

function validar_planos() {

    forms.planos.forEach(plano => {
        if(plano.checked){
            validar = true
        }
    
        if(!validar){
            document.querySelector("#tabela_planos").style.border = "1px solid red"
        }else {
            document.querySelector("#tabela_planos").style.border = ""
        }

        return validar
    })
}

// validar premiere
let validarPremiere = false

function validar_premiere() {

    forms.premiere.forEach(premieres => {
        if(premieres.checked){
            validarPremiere = true
        }
    
        if(!validar_premiere){
            document.querySelector("#tabela_premiere").style.border = "1px solid red"
        }else {
            document.querySelector("#tabela_premiere").style.border = ""
        }
    })
}

//Verificar login e senha
let loginJson = {
    "login":"Usuario",
    "senha":"Abc$123"
}

function validar_senha() {

    if (forms.login.value == loginJson.login && forms.senha.value == loginJson.senha) {
        forms.login.style.border = ""
        forms.senha.style.border = ""
    }else {
        forms.login.style.border = "1px solid red"
        forms.senha.style.border = "1px solid red"
    }
}

//Validar tudo

function validar_tudo(){
    if (validar_times && validar_email && validar_texto && validar_cpf &&
    validar_salario && validar_cel && validar_nascimento && validar_senha && validarPremiere && validar) {
        forms.submit.removeAttribute("disabled")
    }else {
        alert("Preencha todos os campos!")
    }


}


//MASCARAS PARA OS FORMULARIOS
function inputHandler(masks, max, event) {
  var c = event.target;
  var v = c.value.replace(/\D/g, "");
  var m = c.value.length > max ? 1 : 0;
  VMasker(c).unMask();
  VMasker(c).maskPattern(masks[m]);
  c.value = VMasker.toPattern(v, masks[m]);
}

var telMask = ["(99) 99999-9999"];
VMasker(forms.cel).maskPattern(telMask[0]);
forms.cel.addEventListener(
  "input",
  inputHandler.bind(undefined, telMask, 15),
  false
);

let cpfMask = ["999.999.999-99"]
VMasker(forms.cpf).maskPattern(cpfMask[0])
forms.cpf.addEventListener("input", inputHandler.bind(undefined, cpfMask, 14), false)

//função para totalizar valor de assinatura mensal
function totaliza() {
  total = 0.0;
  //plano mensal
  if (document.form.planos[0].checked) total = total + 85.0;
  //plano quadrimestral
  if (document.form.planos[1].checked) total = total + 300.0 / 4;
  //plano anual
  if (document.form.planos[2].checked) total = total + 600.0 / 12;
  //Premiere econômico
  if (document.form.premiere[0].checked) total = total + 60.0;
  //Premiere controle
  if (document.form.premiere[1].checked) total = total + 80.0;
  document.form.total.value = total.toFixed(2);
}
