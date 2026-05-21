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

  checkCountry(formData);

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

function checkCountry(formData) {
  const pattern = /^[A-Z]+[A-Za-z\s]+$/;

  if (pattern.test(formData.country.value)) {
    formData.country.setCustomValidity("");
    return;
  }

  const errMsg =
    "Country must begin with a capital letter and be of length at least two";
  formData.country.setCustomValidity(errMsg);
}

function checkPostalCode(formData) {
  const code = formData.postalCode.value;

  const patternA = /^\d{5}$/;
  const patternB = /^\d{5}-\d{4}$/;

  if (patternA.test(code) || patternB.test(code)) {
    formData.postalCode.setCustomValidity("");
    return;
  }

  const errMsg = "Postal Code must be of the format [12345] or [12345-1234]";
  formData.postalCode.setCustomValidity(errMsg);
}

function checkPasswordConfirmation(formData) {
  formData.confirm.setCustomValidity("");

  if (formData.password.value != formData.confirm.value) {
    const errMsg = "Passwords must match";
    formData.confirm.setCustomValidity(errMsg);
  }
}
