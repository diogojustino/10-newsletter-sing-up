const formElement = document.getElementById("sign-form");
 const successCard = document.getElementById("success-card");
 const signCard = document.getElementById("sign-card");

if (formElement) {
  formElement.addEventListener("submit", handleSubmit);
}


const dimissBtn = document.getElementById("btn-dismiss");
if (dimissBtn) { 
  dimissBtn.addEventListener('click', () => { 
      successCard.classList.add("card--hidden");
      signCard.classList.remove("card--hidden");
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  clearPreviewErrors();
  const errors = validadeForm(data);
  if (errors) {
    handleShowErrors(errors);
  } else { 
    handleSuccessSubmit(data)
  }
}

function handleSuccessSubmit(data) { 
 
  // successCard?.style.display = 'flex'
formElement.reset()
  if (signCard) {
    signCard.classList.add('card--hidden')
  }
  if (successCard) {
    successCard.classList.remove("card--hidden");
    const emailUserElement = successCard.querySelector("[id='user-email']");
    if (emailUserElement){
      emailUserElement.innerText = data.email;
    }

  }


  
  
}

function handleShowErrors(errors) {
  Object.keys(errors).forEach((key) => {
    const hasErrors = errors[key].length > 0;
    if (hasErrors) {
      handleShowElementError(key, errors[key]);
    }
  });
}

function handleShowElementError(name, errors) {
  
  const errorElement = formElement.querySelector(`#${name}-error`);

  if (errorElement) {

    errorElement.innerText = errors.reduce(
      (previousValue, currentValue, index) => {
        if (index > 0) {
          return `${previousValue}, ${currentValue}`;
        }
        return currentValue;
      }
    );
  }
}

function clearPreviewErrors() { 
  const errors = formElement.querySelectorAll("[id$='-error']")
  errors.forEach((errorElement) => { 
    errorElement.innerText=''
  })
}

function validadeForm(data) {
  const errors = {};

  const errorEmail = validadeEmail(data.email);

  if (errorEmail.length > 0) {
    errors.email = errorEmail;
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  return null;
}

function validadeEmail(email) {
  const errors = [];
  if (!email) {
    errors.push("This field is required");
  } else {
    const hasValidEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?.+$/;
    console.log(!hasValidEmail.test(email));
    console.log(email);
      if (!hasValidEmail.test(email)) {
        errors.push("Valid email required");
      }
  }
  return errors;
}
