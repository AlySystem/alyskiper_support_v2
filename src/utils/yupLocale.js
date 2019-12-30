const yupLocale = {
    mixed: {
        defaul: "Campo Invalido"
    },
    number: {
        min: 'El numero debe ser mayor que ${min}',
        max: 'El numero debe ser menor que ${max}'
    },
    date: {
        min: 'La fecha debe ser mayor que ${min}',
        max: 'La fecha debe ser menor que ${max}'
    },
    string:{
        email: 'Email invalido',
        min: 'La longitud debe ser mayor que ${min}',
        max: 'La longitud debe ser menor que ${max}' 
    }
}

export default yupLocale