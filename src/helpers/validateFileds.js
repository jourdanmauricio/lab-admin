function validateFields(formData) {
  let fields = [];
  const errors = {};

  for (let field of formData) {
    const [key, value] = field;
    let values = formData.getAll(key);
    if (!fields.find((value) => value.key === key)) {
      const obj = { key, value: values[0], func: values[1] };
      fields.push(obj);
      switch (values[1]) {
        case "isPassword":
          if (obj.value.trim().length < 8) errors[key] = "Mínimo 8 caracteres";
          break;
        case "isConfirmPassword":
          const password = fields.find((value) => value.key === "newPassword");
          if (password) {
            if (password.value !== obj.value)
              errors[key] = "La confirmación debe ser igual a la contraseña";
          }
          break;
        case "isEmail":
          if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(obj.value))
            errors[key] = "Email inválido";
          break;
        case "isName":
          if (!/^[a-zA-Z\s]{2,254}$/.test(obj.value))
            errors[key] = "Ingresa como mínimo 2 letras";
          break;
        case "isPhone":
          if (!/^[0-9]{10}$/.test(obj.value))
            errors[key] = "Ingresa 10 nros (Cod area sin 0 + nro)";
          break;
        case "isDocument":
          if (!/^[0-9,.]*$/.test(obj.value))
            errors[key] = "Ingresa solo números";
          break;
        case "isRequired":
          if (value === null && value.trim() === "")
            errors[key] = "Campo requerido";
      }
    }
  }
  return errors;
}

export { validateFields };
