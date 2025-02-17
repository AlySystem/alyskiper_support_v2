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
    uploadVehicleAppearance {
      id
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

export const OBTENER_COMERCIO = gql`
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
    date_birth
    civilStatus {
      id
      name
    }
    country{
      id
      name
    }
    city{
      id
      name
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
        create_at
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
    create_at
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

export const MONEDAS = gql`
query currency {
  currency {
    id
    name
    isCrypto
    idcountry
    iso
    url_img
  }
}
`

export const OBTENER_WALLET_DE_USUARIO = gql`
query getAllSkiperWalletsByUserId($iduser: Int!) {
  getAllSkiperWalletsByUserId(iduser: $iduser)
  {
    id
    
    currencyID{
        id
        name
    }
    countryID{
        id
        name
    }
  }
}
`

export const OBTENER_WALLETS_USUARIO = gql`
query GetUserWallets($id: Int!) {
  GetUserWallets(id:$id){
    skiperWallet{
        id
        amount
        amount_crypto
        countryID{
          id
          name
        }
        currencyID{
          id
          name
          isCrypto
        }
      }
      skiperWalletLocal{
        id
        amount
        countryID{
          id
          name
        }
        currencyID{
          id
          name
          isCrypto
        }
      }
  }
}
`

export const AGENTE_POR_USUARIO = gql`
query searchAgentByIdUser($iduser: Int!) {
  searchAgentByIdUser(iduser: $iduser){
    id,
    state,
    identity,
    categoryAgent {
      name
    }
  }
}
`

export const HORARIOS = gql`
query getAllSkiperDriverSchedule{
    getAllSkiperDriverSchedule{
      id
      start_time
      final_time
      turn
  }
}
`

export const OBTENER_IMGS_SOPORTE = gql`
query getUploadImgAgentByAgent($idagent: Int) {
  getUploadImgAgentByAgent(idagent: $idagent){
    id
    id_skiper_agent
    url_img_identity
    url_img_verify_identity
    url_img_letterone_recomendation
    url_img_lettertwo_recomendation
    url_img_driver_license
    url_img_police_record
    url_img_driving_record
  }
}
`

export const OBTENER_ULTIMOS_USUARIOS_REGISTRADOS = gql`
query getLastUsersByCategoryId($limit: Int, $categoryId: Int) {
  getLastUsersByCategoryId(limit:$limit,categoryId:$categoryId) {
    id
    firstname
    lastname
    email
    country {
      id
      name
    }
    skiperAgent {
      id
      identity
      categoryAgent{
        id
        name
      }
    }
    skiperWallet{
      id
      amount
    }
    phone
    create_at
  }
}
`

export const OBTENER_TODAS_IMAGENES_AGENTE = gql`
query getAllImages($idagent:Int)
{
   getAllImages(idagent:$idagent){
    identity
    iduser
    url_img_commerceinside_four
    url_img_commerceinside_one
    url_img_commerceinside_three
    url_img_commerceinside_two
    url_img_commerceoutside_one
    url_img_commerceoutside_two
    url_img_driver_license
    url_img_driving_record
    url_img_identity
    url_img_letterone_recomendation
    url_img_lettertwo_recomendation
    url_img_police_record
    url_img_verify_identity
    url_img_identification_ruc
    url_img_power_letter_four
    url_img_power_letter_one
    url_img_power_letter_three
    url_img_power_letter_two
    url_img_trade_registration
    idagent
    idvehicle
    url_img_vehicle_behind
    url_img_vehicle_front
    url_img_vehicle_inside_four
    url_img_vehicle_inside_one
    url_img_vehicle_inside_three
    url_img_vehicle_inside_two
    url_img_vehicle_side_left
    url_img_vehicle_side_right
    url_img_gas_emission
    url_img_insurance
    url_img_license_plate
    url_img_mechanical_inspection
    url_img_vehicle_circulation
  }
}
`

export const OBTENER_IMAGENES_VEHICULO = gql`
query getByIdUploadVehicleAppearance ($id: Int!) {
  getByIdUploadVehicleAppearance (id: $id) {
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
`;

export const OBTENER_TRAVELS_INFO = gql`
query {
  getAllTravels {
      id
      lat_initial
      lng_initial
      users {
        id
        firstname
        lastname
      }
      skiperagent {
        id
        state
        skiperVehicleAgent {
          id
          skiperVehicle {
            license_plate
            uploadVehicleAppearance {
              url_img_vehicle_side_right
            }
            vehicleTrademark {
              name
            }
            vehicleModel {
              name
            }
          }
        }
        user {
          id
          firstname
          lastname
          avatar
        }
      }
      skiperTravelsTracing {
        id
        travelstatus {
          id
          name
        }
        datetracing
      }
      distance
    }
  }
`;

export const OBTENER_ULTIMOS_USUARIOS_CREADOS = gql`
query getLastSkiperUsers($limit:Int){
 	getLastSkiperUsers(limit:$limit){
    id
    firstname
    lastname
    email
    phone
    create_at
    skiperAgent{
      id
      identity
    }
    country{
      id
      name
    }
    city{
      id
      name
    }
    skiperWallet{
      id
      amount
    }
  }
}
`;

export const OBTENER_TODAS_TASAS_CAMBIO = gql`
 query GetAllExchangeRate{
  GetAllExchangeRate{
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
    date_in
  }
}
`

export const OBTENER_AGENTES_CATEGORIA_PAIS = gql`
query getByCategoryAgentIdAndCountryId($id:Int!, $idcountry:Int!) {
  getByCategoryAgentIdAndCountryId(id:$id, idcountry:$idcountry){
    id
    name
    agents{
      id
      state
      identity
      create_at
      user{
          id
          firstname
          lastname
          email
          phone
          address
          create_at
      }
      categoryAgent{
        name
      }
      skiperVehicleAgent{
        skiperVehicle{
          license_plate
          
        }
      }
    }

  }
}
`


export const OBTENER_TIPO_CAMBIO_BY_ID = gql`
query GetByIdExchangeRate($id: Int!){
  GetByIdExchangeRate(id: $id){
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
    date_in
  }
}
`

export const OBTENER_VEHICULO_BY_ID = gql`
query getSkiperVehicleByVehicleId($id: Int!){
  getSkiperVehicleByVehicleId(id:$id){
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

export const OBTENER_TARIFAS_FILTRADO = gql`
query findTariffsWithFilters($filter: SkiperTariffsFilterInput!){
  findTariffsWithFilters(filter: $filter) {
    id
    price_base
    price_minute
    price_kilometer
    price_minimum
    symbol
    skiperCatTravel {
      id
      name
    }
    driverShedule {
      id
      start_time
      final_time
      turn
    }
    countrie {
      id
      name
    }
    cities {
      id
      name
    }

  }
}
`

export const OBTENER_TARIFAS_BY_ID = gql`
query getTariffsById($id: Int!){
  getTariffsById(id: $id){
    id
    price_base
    price_minute
    price_kilometer
    price_minimum
    symbol
    skiperCatTravel {
      id
      name
    }
    driverShedule {
      id
      start_time
      final_time
      turn
    }
    countrie {
      id
      name
    }
    cities {
      id
      name
    }
    
  }
}
`