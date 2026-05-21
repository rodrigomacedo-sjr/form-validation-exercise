const form = document.querySelector("#my-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    email: form.querySelector("#email"),
    country: form.querySelector("#country"),
    postalCode: form.querySelector("#postal-code"),
    password: form.querySelector("#password"),
    confirm: form.querySelector("#confirm"),
  };

  checkPostalCode(formData);

  checkPasswordConfirmation(formData);

  console.log(form.checkValidity());
  if (form.checkValidity()) {
    console.log("Form is valid!");
    return;
  }

  console.log("Form is invalid");

  for (const input in formData) {
    if (formData[input].validity.valid) {
      continue;
    }
    console.log(`Error (${input}): ${formData[input].validationMessage}`);
  }
  return;
});

function checkPostalCode(formData) {
  const code = formData.postalCode.value;

  const patternA = new RegExp("\\d{5}$");
  const patternB = new RegExp("\\d{5}-\\d{4}$");

  if (patternA.test(code) || patternB.test(code)) {
    return;
  }

  const errMsg = "Postal Code must be of the format [12345] or [12345-1234]";
  formData.postalCode.setCustomValidity(errMsg);
}

function checkPasswordConfirmation(formData) {
  if (formData.password.value != formData.confirm.value) {
    const errMsg = "Passwords must match";
    formData.confirm.setCustomValidity(errMsg);
  }
}
