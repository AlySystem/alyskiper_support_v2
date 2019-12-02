import React, { Component, Fragment } from 'react';

import { COUNTRIES, CITIES, PROPIETARIOS_QUERY } from '../../Queries/index';
//import { DESHABILITAR_PROPIETARIO } from '../../Mutatios';
import { Query } from 'react-apollo';
//import { Mutation } from 'react-apollo';
import {Link} from 'react-router-dom';
import Select from 'react-select';
//import Exito from '../Alertas/Exito';
//import { COUNTRIES, CITIES } from '../../Queries';
//import Select from 'react-select';
class Ejecutivos extends Component {
  state = {
    id_city: 0,
    alerta:{
        mostrar: false,
        mensaje: ''
    }
  }

  selecionarPais = (countries) => {
    this.setState({
        countries
    })
    //console.log(countries);
    const { id } = countries;
    //console.log(id);
    this.id_country = parseInt(id);
    //console.log(this.id_country);
}

selecionarCiudad = (getAllCitiesByCountryId) => {
    this.setState({
        getAllCitiesByCountryId
    })
    //console.log(getAllCitiesByCountryId);
    const { id } = getAllCitiesByCountryId;
    //console.log(id);
    this.setState({
        id_city: parseInt(id)
    })
    //this.state.id_city = parseInt(id);
    // console.log(`Algo paso con`, menus);
}

//   selecionarPais = (countries) => {
//         this.setState({
//             countries
//         })
//         console.log(countries);
//         const { id } = countries;
//         console.log(id);
//         this.id_country = parseInt(id);
//         console.log(this.id_country);
//     }
//     selecionarCiudad = (getAllCitiesByCountryId) => {
//         this.setState({
//             getAllCitiesByCountryId
//         })
//         console.log(getAllCitiesByCountryId);
//         const { id } = getAllCitiesByCountryId;
//         console.log(id);
//         this.id_city = parseInt(id);
//         console.log(`Algo paso con`, menus);
//     }


  render () {

    return(
        
            <Fragment>
                <h1 className="font-weight-bold text-center mb-5 caja-texto-color-blanco font">Ejecutivos</h1>
                
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Query query={COUNTRIES}>
                        { ({ loading, error, data }) => {
                            if (loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            )
                            if (error) return `Error ${error.message}`;
                            //console.log(data);
                            const countries = data.countries;
                            //console.log(countries);
                            return (
                                <Fragment>
                                    <label className="font-weight-bold text-left mb-2 caja-texto-color-blanco fonts">Pais</label>
                                <div className='shain'>
                                <Select
                                        onChange={this.selecionarPais}
                                        options={countries}
                                        isMulti={false}
                                        //components={Animated()}
                                        placeholder={'Seleccionar'}
                                        getOptionValue={(options) => options.id}
                                        getOptionLabel={(options) => options.name}
                                    />
                                </div>
                                </Fragment>
                            )
                        }}
                        </Query>
                    </div>
                    
                    <div className="form-group col-md-6">
                        {(this.id_country === undefined ?
                        (
                        <Query query={CITIES} variables={{id: parseInt(1)}}>
                        { ({ loading, error, data }) => {
                            //console.log(id_country);
                            if (loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            )
                            if (error) return `Error ${error.message}`;
                            //console.log(data);
                            const getAllCitiesByCountryId = data.getAllCitiesByCountryId[0].cities;
                            //console.log(getAllCitiesByCountryId);
                            return (
                                <Fragment>
                                    <label className="font-weight-bold text-center mb-2 caja-texto-color-blanco fonts">Ciudad</label>
                                    <div className='shain'>
                                    <Select
                                        onChange={this.selecionarCiudad}
                                        options={getAllCitiesByCountryId}
                                        isMulti={false}
                                        //components={Animated()}
                                        placeholder={'Seleccionar'}
                                        getOptionValue={(options) => options.id}
                                        getOptionLabel={(options) => options.name}
                                    />
                                    </div>
                                </Fragment>
                            )
                        }}
                        </Query>
                        )
                            
                        : (

                        <Query query={CITIES} variables={{id: parseInt(this.id_country)}}>
                        { ({ loading, error, data }) => {
                            //console.log(id_country);
                            if (loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            )
                            if (error) return `Error ${error.message}`;
                            //console.log(data);
                            const getAllCitiesByCountryId = data.getAllCitiesByCountryId[0].cities;
                            //console.log(getAllCitiesByCountryId);
                            return (
                                <Fragment>
                                    <label className="font-weight-bold text-center mb-2 caja-texto-color-blanco fonts">Ciudad</label>
                                    <div className='shain'>
                                    <Select
                                        onChange={this.selecionarCiudad}
                                        options={getAllCitiesByCountryId}
                                        isMulti={false}
                                        //components={Animated()}
                                        placeholder={'Seleccionar'}
                                        getOptionValue={(options) => options.id}
                                        getOptionLabel={(options) => options.name}
                                    />
                                    </div>
                                </Fragment>
                            )
                        }}
                        </Query>

                        ) )}
                        
                    </div>
                </div>


                <Query query={PROPIETARIOS_QUERY} variables={{id: 2, idcity: parseInt(this.state.id_city) }} pollInterval={5000}>
                {/* startPolling, stopPolling */}
                {({ loading, error, data}) =>{
                    
                        if(loading) return "Cargando...";
                        if(error) return `Error: ${error.message}`;
                        //console.log(this.id_city);
                        console.log(data);
                        //console.log(data.getByCategoryAgentIdAndCityId[0].agents);
                    // console.log(data.getByCategoryAgentIdAndCityId[0].agents.map());
                    //console.log(data.getByCategoryAgentIdAndCityId.length);
                    if (data.getByCategoryAgentIdAndCityId.length === 0) {
                        return (
                            <table className="table cabeza">
                                    <thead className='shain1 cabeza'>
                                        <tr className="table-primary">
                                            <th className="font-in" scope="col">Nombre</th>
                                            <th className="font-in" scope="col">Apellido</th>
                                            <th className="font-in" scope="col">Correo</th>
                                            <th className="font-in" scope="col">Usuario</th>
                                            <th className="font-in" scope="col">Celular</th>
                                            <th className="font-in" scope="col">Estado</th>
                                            <th className="font-in" scope="col">Agente</th>
                                            <th className="font-in" scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="caja-texto-color-blanco">
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                        )
                    }
                    else{
                        return (
                            <table className="table cabeza">
                                <thead className='shain1 cabeza'>

                                    <tr className="table-primary cabeza shain1">
                                        <th className="font-in" scope="col">Nombre</th>
                                        <th className="font-in" scope="col">Apellido</th>
                                        <th className="font-in" scope="col">Correo</th>
                                        <th className="font-in" scope="col">Usuario</th>
                                        <th className="font-in" scope="col">Celular</th>
                                        <th className="font-in" scope="col">Estado</th>
                                        <th className="font-in" scope="col">Agente</th>
                                        <th className="font-in" scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody className="caja-texto-color-blanco">
                                    
                                    {data.getByCategoryAgentIdAndCityId[0].agents.map(item => {
                                        // console.log(data.getByCategoryAgentIdAndCityId[0]);
                                        // console.log();
                                        // firstname, lastname, email, user, phone
                                        //console.log(item);
                                        const { id } = item;

                                        return (

                                            <tr key={id} className='shain1'>
                                                <td className='fonts'>{item.user.firstname}</td>
                                                <td className='fonts'>{item.user.lastname}</td>
                                                <td className='fonts'>{item.user.email}</td>
                                                {/* <td>{item.[0].user}</td> */}
                                                <td className='fonts'>{item.user.user}</td>
                                                <td className='fonts'>{item.user.phone}</td>
                                                
                                                { item.state ? (
                                                    <td className='fonts'>
                                                    Habilitado
                                                    </td>
                                                ) : (
                                                    <td className='fonts'>
                                                    Deshabilitado
                                                    </td>
                                                )}
                                                
                                                <td className='fonts'>
                                                    {data.getByCategoryAgentIdAndCityId[0].name}
                                                </td>
                                                <td>
                                                    <Link to={`/ejecutivos/editar/${parseFloat(id)}`} 
                                                    className="btn btn-info" >
                                                    Editar Ejecutivo
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )
                    }
                        
                }}
                </Query>
            </Fragment>
    )
  }
}

// const Propietarios = () => (
//     <Query query={PROPIETARIOS_QUERY} pollInterval={1000}>
//         {({ loading, error, data, startPolling, stopPolling})=> {
//             if (loading) return "Cargando...";
//             if (error) return `Error: ${error.message}`;
//             console.log(data.users);

//             return (
//               <Fragment>
//                 <h2 className="text-center">Lista de Usuarios</h2>
//                 <br />
//                 <ul className="list-group lista-object">
//                   {data.users.map(item => (
//                     <li key={item.id} className="list-group-item">
//                       <div className="row justify content-between align-item-center color-menu letra borde">
//                         <div className="col-md-8 d-flex justify content-between align-item-center">
//                           {item.firstname} {item.lastname} - {item.email} - {item.user} -  {item.phone}
//                         </div>
//                         <div className="col-md-4 d-flex justify-content-end">
//                           <Link to={`/usuario/editar/${item.id}`} className="btn btn-info d-block d-md-inline-block boton-edit">
//                             Editar Propietario
//                           </Link> 
//                         </div>
//                       </div>
//                     </li>
//                   ))}

//                 </ul>
//               </Fragment>
                
//             )
//         }}
//     </Query>
// )

export default Ejecutivos