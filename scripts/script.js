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

  if (formData.password.value != formData.confirm.value) {
    const errMsg = "Passwords must match";
    formData.confirm.setCustomValidity(errMsg);
  }

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
