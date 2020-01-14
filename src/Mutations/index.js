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

export const NUEVO_ANIO = gql`
mutation registerVehicleYear ($input: VehicleYearsInput){
  registerVehicleYear(input: $input){
    id
    year
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

export const REGISTRAR_TRANSACCION_WALLET = gql`
mutation registerDepositWallet(
  $idwallet: Int!,
  $idtransaction: Int!,
  $idpayment_method: Int!,
  $deposit: Float!,
  $description: String!
) {
    registerDepositWallet(
      idwallet: $idwallet,
      idtransaction: $idtransaction,
      idpayment_method: $idpayment_method,
      deposit: $deposit,
      description: $description
    ){
      id
      amount
      date_in
      minimun
      bretirar
    }
  }
`

export const CAMBIAR_CONTRASENA_EMAIL = gql`
mutation changePasswordByEmail ($input: ChangePasswordEmailInput) {
  changePasswordByEmail(
    input:$input
  )
}
`

export const ACTUALIZAR_ESTADO_AGENTE = gql`
mutation updateState($idagent: Int){
  updateState(idagent: $idagent){
    id
    state
  }
}
`

export const ACTUALIZAR_CATEGORIA_VEHICULO = gql`
mutation updateSkiperVehicleCatTravel($idVehicle: Int, $idCatTravel: Int){
  updateSkiperVehicleCatTravel(idVehicle: $idVehicle,idCatTravel: $idCatTravel){
    id
    license_plate
    skiperCatTravel{
      id
      name
    }
    vehicleCatalog{
      id
      name
    }
    vehicleTrademark {
      id
      name
    }
    vehicleModel{
      id
      name
    }
    vehicleYear{
      year
    }
  }
}
`
export const ACTUALIZAR_VEHICULO = gql`
mutation updateSkiperVehicle($input: SkiperVehicleInput!){
  updateSkiperVehicle(input:$input){
    id
    license_plate
    skiperCatTravel{
      id
      name
    }
    vehicleCatalog{
      id
      name
    }
    vehicleTrademark{
      id
      name
    }
    vehicleModel{
      id
      name
    }
    vehicleYear{
      id
      year
    }
  }
}
`

export const CREAR_REGISTRO_FOTOS_VEHICULO = gql`
mutation createUploadVehicleAppearance($input: UploadVehicleAppearanceInput!){
  createUploadVehicleAppearance(input: $input){
    id
    url_img_vehicle_front
    url_img_vehicle_behind
    url_img_vehicle_side_right
    url_img_vehicle_side_left
    url_img_vehicle_inside_one
    url_img_vehicle_inside_two
    url_img_vehicle_inside_three
    url_img_vehicle_inside_four
  }
}
`

export const ACTUALIZA_REGISTRO_FOTOS_VEHICULO = gql`
mutation updateUploadVehicleAppearance($input: UploadVehicleAppearanceInput!){
  updateUploadVehicleAppearance(input: $input){
    id
    url_img_vehicle_front
    url_img_vehicle_behind
    url_img_vehicle_side_right
    url_img_vehicle_side_left
    url_img_vehicle_inside_one
    url_img_vehicle_inside_two
    url_img_vehicle_inside_three
    url_img_vehicle_inside_four
  }
}
`
export const NUEVA_WALLET_LOCAL = gql`
mutation registerSkiperLocalWallet($input: SkiperWalletInput!){
  registerSkiperLocalWallet(input:$input){
    id
    amount
    date_in
    minimun
    bretirar   
  }
}`

export const NUEVA_WALLET_CRYPTO = gql`
mutation registerSkiperCryptoWallet($input: SkiperWalletInput!){
  registerSkiperCryptoWallet(input:$input){
    id
    amount
    date_in
    minimun
    bretirar   
  }
}`

export const REGISTRAR_TIPO_CAMBIO = gql`
mutation registerExchangeRate($input: ExchangeRateInput) {
  registerExchangeRate(input: $input){
    id
    value
    currency{
      id
      name
    }
    country{
      id
      name
    }
  }
}
`

export const ACTUALIZAR_TIPO_CAMBIO = gql`
mutation updateExchangeRate($input: ExchangeRateInput) {
  updateExchangeRate(input: $input){
    id
    value
    currency{
      id
      name
    }
    country{
      id
      name
    }
  }
}
`