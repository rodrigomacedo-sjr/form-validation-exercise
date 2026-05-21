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

  checkPassword(formData);

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
  let errMsg = "";

  const pattern = /^[A-Z]+[A-Za-z\s]+$/;

  if (!pattern.test(formData.country.value)) {
    errMsg =
      "Country must begin with a capital letter and be of length at least two";
  }

  if (formData.country.value.length > 50) {
    errMsg = "Country can't be over 50 characters";
  }

  formData.country.setCustomValidity(errMsg);
}

function checkPostalCode(formData) {
  let errMsg = "";
  const code = formData.postalCode.value;

  const patternA = /^\d{5}$/;
  const patternB = /^\d{5}-\d{4}$/;

  if (patternA.test(code) || patternB.test(code)) {
    return;
  }

  errMsg = "Postal Code must be of the format [12345] or [12345-1234]";
  formData.postalCode.setCustomValidity(errMsg);
}

function checkPassword(formData) {
  let errMsg = "";
  const password = formData.password.value;

  const patterns = [/[A-Z]/, /[a-z]/, /\d/, /[^A-Za-z0-9\s]/];

  if (password.length > 50) {
    errMsg = "Password can't be over 50 characters";
  } else if (password.length < 4) {
    errMsg = "Password must be of length at least 4";
  } else if (!patterns[0].test(password)) {
    errMsg = "Password must contain at least one uppercase char";
  } else if (!patterns[1].test(password)) {
    errMsg = "Password must contain at least one lowercase char";
  } else if (!patterns[2].test(password)) {
    errMsg = "Password must contain at least one numeric char";
  } else if (!patterns[3].test(password)) {
    errMsg = "Password must contain at least one special char";
  }

  formData.password.setCustomValidity(errMsg);
}

function checkPasswordConfirmation(formData) {
  formData.confirm.setCustomValidity("");

  if (formData.password.value != formData.confirm.value) {
    const errMsg = "Passwords must match";
    formData.confirm.setCustomValidity(errMsg);
  }
}
