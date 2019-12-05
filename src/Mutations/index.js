import gql from 'graphql-tag';

// export const NUEVO_USUARIO = gql`
// mutation createUser($input: UserInput!) {
//   createUser(input: $input) {
//     id
//     firstname
//     lastname
//     email
//     user
//     idcountry
//     phone
//   }
// }

// `;
export const LOGOUT = gql`
mutation logout ($id: Int!) {
  logout (id: $id)
}
`;

export const NUEVO_COMERCIO = gql`
mutation registerCommerce ($input: CommerceInput)  {
  registerCommerce (input: $input) {
    id
    namecommerce
    identification_ruc
    phone
    address
    manager
    lat
    lon
    url_art
    url_logo
    
  }
}
`;

export const ACTUALIZAR_COMERCIO = gql`
mutation updateCommerce($input: CommerceInput!) {
  updateCommerce(input: $input) {
    data {
      id
      name_owner
      identity
      url_doc_identity
    }
  }
}
`;


export const ACTUALIZAR_PROPIETARIO = gql`
mutation updateUser($input: UserInput!) {
  updateUser(input: $input) {
    firstname
    lastname
    email
    user
    phone
    address
    create_at
  }
}
`;

export const DESHABILITAR_COMERCIO = gql`
mutation deshabilitarCommerce($id: ID!) {
  deshabilitarCommerce(id: $id) 
  }
`;


export const DESHABILITAR_PROPIETARIO = gql`
mutation deshabilitarPropietario($id: ID!) {
  deshabilitarPropietario(id: $id) 
  }
`;

// ESTO ESTA BIEN
export const NUEVO_USUARIO = gql`
mutation createUser ($input: UserInput!) {
  createUser (input: $input) {
    id
  }
}
`;

// ESTO ESTA BUENO 
export const NUEVO_MODELO = gql`
mutation registerVehicleModel ($input: VehicleModelsInput) {
  registerVehicleModel (input: $input) {
    id
    name
  }
}
`;

// ESTO ESTA BUENO 
export const NUEVA_MARCA = gql`
mutation registerVehicleTrademark ($input: VehicleTrademarkInput) {
  registerVehicleTrademark (input: $input) {
    id
    name
  }
} 
`;

export const NUEVO_AGENTE = gql`
mutation registerAgent ($input: AgentInput!) {
  registerAgent (input: $input) {
    id
  }
}
`;

// ESTO ESTA BUENO
export const REGISTRAR_SKIPER_VEHICLE_AGENT = gql`
mutation registerSkiperVehicleAgent ($input: SkiperVehicleAgentInput!) {
  registerSkiperVehicleAgent (input: $input) {
    id
    skiperAgent{
      user{
        firstname
        email
        lastname
      }
    }
  }
}
`;

// ESTO ESTA BIEN
export const CAMBIAR_CONTRASEÑA = gql`
mutation updatePassword($input: UserUpdatePassword!){
  updatePassword(input: $input) {
    id
  }
}
`;

// ESTO ESTA BIEN
export const REGISTRAR_SKIPER_VEHICLE = gql`
mutation registerSkiperVehicle ($input: SkiperVehicleInput!) {
  registerSkiperVehicle (input: $input) {
    id
    license_plate
    lat
    lon
  }
}
`;

//  ESTO ESTA BIEN
export const AUTENTICAR_USUARIO = gql`
mutation signin($input: signInDto!) {
  signin (input: $input) {
    data {
      token
    },
    error {
      message
    }
  }
}
`;

export const CREAR_USUARIO = gql`
mutation signup($input: UserInput!) {
  signup(input: $input) {
    data {
      token
    }
    error
    {
      status
      message
    }    
  }
}
  
`;