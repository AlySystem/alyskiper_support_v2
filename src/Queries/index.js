import { gql } from 'apollo-boost';

// ESTO ESTA BUENO
export const CATEGORIA_PRODUCTOS = gql`
query categoriesProduct {
  categoriesProduct {
    id
    name
  }
}
`;

// ESTO ESTA BUENO
export const PRODUCTOS_COMERCIO = gql`
query productsByCommerceId ($id: Int!) {
  productsByCommerceId(id: $id) {
    id
    name
    description
    url_img_product
    price
    isSize
    isAddon
    state
    discount
    time
    
  }
}
`;

//ESTO ESTA BUENO
export const DATOS_COMERCIO = gql`
query commerceById ($id: Int!) {
  commerceById(id: $id) {
    id
    namecommerce
    identification_ruc
    phone
    state
    address
    manager
    lat
    lon
    url_art
    url_logo
    country {
      name
    }
    skiperAgent {
      id
      state
      user {
        id
        firstname
      }
      categoryAgent {
        id
        name
      }
    }
    catCommerce {
      id
      name
    }
  }
}
`;

// ESTO ESTA BUENO
export const SKIPER_CATEGORIA = gql`
query skipercattravels {
  skipercattravels {
    id
    name
    url_img_category
    btaxy
    bdelivery
    btransporte
    percentageagent
  }
}
`;
// ESTO ESTA BUENO
export const CATEGORIAAGENTE_QUERY = gql`
query categoryAgent {
  categoriesAgents {
    id
    name
  }
}
`;
// ESTO ESTA BUENO
export const ANNO = gql`
query vehicleyears {
  vehicleyears {
    id
    year
  }
}
`;

// ESTO ESTA BUENO
export const MODELO = gql`
query vehiclemodels {
  vehiclemodels {
    id
    name
  }
}
`;

// ESTO ESTA BIEN
export const CATALOGO = gql`
query getAllVehicleCatalog {
  getAllVehicleCatalog{
    id
    name
  }
}
`;

// ESTO ESTA BUENO
export const MARCA = gql`
query getAllVehicleTrademark {
  getAllVehicleTrademark {
      id
      name
  }
}
`;

// // ESTO ESTA BUENO
export const COMERCIOS_QUERY = gql`
query getCommercesBySponsorId ($id_user: Int!) {
  getCommercesBySponsorId (id_user: $id_user) {
    id
    manager
    identification_ruc
    namecommerce
    phone
    address
    url_logo
    skiperAgent{
      state
    }
    catCommerce {
      name
    }
    country {
      name
    }
    city {
      id
      name
    }
  }
}
`;

// ESTO ESTA BUENO
export const CIVIL = gql`
query getCivilStatus {
  getCivilStatus {
    id
    name
  }
}
`;

// ESTO ESTA BUENO
export const CATEGORIA_COMERCIO = gql`
query categoriesCommerce {
  categoriesCommerce {
    id
    name
  }
}
`;

// ESTO ESTA BUENO
export const COUNTRIES = gql`
query countries {
  countries {
     id
    name
  }
}
`;

// ESTO ESTA BUENO
export const CITIES = gql`
query getAllCitiesByCountryId  ($id: Int!) {
  getAllCitiesByCountryId(id: $id)
  {
    cities{
      id
      name
    }
  }
}
`;

// BUSCAR VEHICULO POR ID DEL USUARIO
export const VEHICULO_USUARIO = gql`
query getVehicleByUserId ($id: Int!) {
  getVehicleByUserId (id: $id){
		id
    license_plate
    skiperCatTravel{
      name
    }
    vehicleCatalog{
      name
    }
    vehicleTrademark{
      name
    }
    vehicleModel {
      name
    }
    vehicleYear {
      year
    }
  }
}
`;
// ESTO ESTA BUENO
export const SKIPER_AGENT_SIN_COMERCIO = gql`
query getUserWithoutCommerce {
  getUserWithoutCommerce {
     firstname
     lastname
     skiperAgent {
      id
    }
  }
}
`;

// ESTO ESTA BUENO
export const LISTA_VEHICULOS = gql`
query getVehicleBySponsorIdAndCategoryTravelId ($id_sponsor: Int!) {
  getVehicleBySponsorIdAndCategoryTravelId (id_sponsor: $id_sponsor) {
    
    id
    license_plate
    skiperCatTravel{
      name
    }
    vehicleCatalog{
      name
    }
    vehicleTrademark{
      name
    }
    vehicleModel {
      name
    }
    vehicleYear {
      year
    }
  }
}
`;

// 
export const PROPIETARIOS = gql`
query agents {
  agents {
    id
    state
    identity
    create_at
    categoryAgent {
      id
      name
    }
    user {
      id
      firstname
      lastname
    }
  }
}
`;

// // OBTENER SKIPER
// export const OBTENER_SKIPER = gql`

// `;

// BUSCAR UN COMERCIO

export const  OBTENER_COMERCIO = gql`
query commerceById($id : Int!) {
  commerceById(id: $id) {
    namecommerce
    id
    state
    address
    phone
    manager
    country {
      name
      iso3
      nicename 
    }
    city{
      id
      name
    }
  }
}
`;
  
export const OBTENER_PROPIETARIO = gql`
query searchUser ($id: ID!){
  searchUser(id: $id) {
    id
    firstname
    lastname
    email
    user
    sponsor_id
  	phone
    address
    country{
      id
    }
    city{
      id
    }
  }
}
`;

// ESTO ESTA BUENO
export const AGENTES_BY_EJECUTIVO = gql`
query getByCategoryAgentIdAndSponsorId ($id: Int!, $id_sponsor: Int!){
  getByCategoryAgentIdAndSponsorId (id: $id, id_sponsor: $id_sponsor) {

    id
    name
    agents {
      id
      state
      identity
      user
      {
        id
        firstname
        lastname
        email
        user
        phone
      }
    }
  }
}
`;

// ESTO ESTA BUENO
export const AGENTES_BY_DRIVE = gql`
query getByCategoryAgentIdAndSponsorId ($id: Int!, $id_sponsor: Int!){
  getByCategoryAgentIdAndSponsorId (id: $id, id_sponsor: $id_sponsor) {
    id
    name
    agents {
      id
      state
      identity
      user {
        id
        firstname
        lastname
        email
        user
        phone
      }
    }
  }
}
`;

// LISTAR TODOS LOS USUARIOS (PROPIETARIOS) PARA OTRA COSA SE USARA
export const PROPIETARIOS_QUERY = gql`
query getByCategoryAgentIdAndCityId ($id: Int!, $idcity: Int!) {
  getByCategoryAgentIdAndCityId (id:$id, idcity: $idcity) {
    id
    name
    agents {
      id
      state
      identity
      user
      {
        id
        firstname
        lastname
        email
        user
        phone
        address
      }
    }
  }
}
`;

// export const AGENTES_ADD_BY_USER = gql`
// `;

// ESTO ESTA BUENO
export const USUARIO_ACTUAL = gql`
query searchUser ($id: ID!){
  searchUser(id: $id) {
    id
    firstname
    lastname
    email
    user
    sponsor_id
  	phone
    address
    country{
      id
    }
    city{
      id
    }
    skiperAgent{
      id
      categoryAgent{
         name
      }
    }
    
  }
}
`;

export const USUARIO_LOGIN = gql`
query users {
  users {
    id
    firstname
    lastname
    address
  }
}
`;

export const EJEUTIVO_BY_REF = gql`
 query searchAgentsByUserId($idsponsor: Int!) {  
    searchAgentsByUserId(idsponsor: $idsponsor) {
    id
    firstname
    lastname
    email
    user
    phone
    country {
      nicename
    }
    city {
      name
    }
    skiperAgent {
      id
      state
        categoryAgent {
          id
          name
        }
      }
    }
  }
`;

export const NUEVO_COMERCIO = gql`
mutation Newcommerce($user: UserInput , $agent: AgentInput, $commerce: CommerceInput){
  registerCommerceTransaction(user: $user, agent: $agent, commerce: $commerce){
    message
    status
    ok
  }
}
`;

export const USUARIO_POR_EMAIL = gql`
query searchUserByEmail($email: String!){
  searchUserByEmail(email: $email){
    id
    firstname
    lastname
    email
    user
    sponsor_id
    phone
    address
    country {
      name
    }
    city{
      name
    }
    skiperWallet{
      currencyID {
        name
      }
    }

  }
}`

export const VEHICULO_POR_PLACA = gql`
query getVehicleByNumberPlate($numberplate: String!){
  getVehicleByNumberPlate(numberplate:$numberplate){
    id
    skiperCatTravel{
      name
    }
    vehicleTrademark{
      name
    }
    vehicleYear{
      year
    }
    vehicleCatalog{
      name
    }
    vehicleModel{
      name
    }
  }
}
`