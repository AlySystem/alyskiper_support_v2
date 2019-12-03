export default function validate(values) {
  let errors = {}

  if (!/\S+@\+\.\S+/.test(values.email)) {
    errors.email = 'Correo invalido'
  }
  if (!values.password) {
    errors.password = 'Contraseña requerida'
  }

  return errors
}
