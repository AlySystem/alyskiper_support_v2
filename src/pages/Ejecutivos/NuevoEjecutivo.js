import React, { Component, Fragment } from 'react'

import { NUEVO_USUARIO } from '../../Mutatios';
import { Query, Mutation } from 'react-apollo';
import { COUNTRIES, CITIES, CIVIL  } from '../../Queries';
import Select from 'react-select';
import Swal from 'sweetalert2';
import RegisterAgent from './RegisterAgent';
import { Input, Tooltip } from 'antd';
//var jwtDecode = require('jwt-decode');

// const civils = [
//     { id: '1', value: 'Soltero(a)', label: 'Soltero(a)' },
//     { id: '2', value: 'Casado(a)', label: 'Casado(a)' },
//     { id: '3', value: 'Viudo(a)', label: 'Viudo(a)' }
//   ]
const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    user: '',
    password: '',
    repetirPassword: '',
    address: '',
    phone: '',
    create_at: Date.now(),
    country_id: 1,
    city_id: 1
}

// const initialStateAgent = {
//     iduser: 0,
//     state: true,
//     identity: '',
//     idcategory_agent: 0,
//     create_at: Date.now()
// }


class NuevoEjecutivo extends Component {

    constructor(props) {
        super(props);
        //this.estado = false;
        this.state = {
            estado: true,
            iduser: 0
        };
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        this.setState(state => ({
            estado: !state.estado
          }));
      }
    
    state = {
        ...initialState
    }

    // state = {
    //     ...initialStateAgent
    // }

    selecionarCivil = (getCivilStatus) => {
        this.setState({
            getCivilStatus
        })
        //console.log(countries);
        const { id } = getCivilStatus;
        //console.log(id);
        this.id_civil = parseInt(id);
        //console.log(this.id_civil);
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
        this.id_city = parseInt(id);
        // console.log(`Algo paso con`, menus);
    }

    limpiarState = () => {
        this.setState({...initialState});
    }

    actualizarState = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    validarForm = () => {
        const { firstname, lastname, email, user, password, repetirPassword, address, phone } = this.state;
        const novalido = !firstname || !lastname || !email || !user || !password || !repetirPassword || !address || !phone || password !== repetirPassword;
        return novalido;
    }

    validarFormAgent = () => {
        const { identity } = this.state;
        const novalidoAgent = !identity;
        return novalidoAgent;
    }
    
    crearPropietarioForm = (e, createUser) => {
        e.preventDefault();

        //insertamos en la base de datos
        createUser().then(data => {

            if (data != null){
                console.log(data);
                this.setState({ iduser: data.data.createUser.id });
                Swal.fire({
                    type: 'info',
                    title: 'Sistema AlySkiper',
                    text: 'Usuario Ejecutivo registrado exitosamente.',
                })
            }
            //console.log(data);
            //console.log(data);
            //this.limpiarState();
            
            //console.log(this.id_user);
            // direccionar
            //this.props.history.push('/drivers')
        })
    }

    render() {
        // const token = localStorage.getItem('token');
        // const id = token ? `Bearer ${token}` : '';
        // var y = jwtDecode(id);
        const { firstname, lastname, email, user, password, address, phone } = this.state;
        const input = {
            firstname,
            lastname,
            email,
            user,
            password,
            sponsor_id: 1,
            address,
            phone,
            create_at: new Date(), 
            country_id: parseInt(this.id_country),
            city_id: parseInt (this.id_city),
            idcivil_status: parseInt (this.id_civil)
        };
        //console.log(input);
        return (
            <Fragment>
                
                <h1 className="font-weight-bold text-center caja-texto-color-blanco titless">Nuevo Ejecutivo</h1>
                {this.state.iduser === 0 ? (
                    <div className="row justify-content-center">
                        <Mutation 
                        mutation={NUEVO_USUARIO}
                        variables={{input}}>
                        {(createUser, {loading,error,data}) => {
                        return (
                            <form autoComplete="off"
                            onSubmit={e => this.crearPropietarioForm(e, createUser)} 
                                className="col-md-8 m-3 color-menu letra">
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
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <Query query={CIVIL}>
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
                                                const getCivilStatus = data.getCivilStatus;
                                                    
                                                //console.log(countries);
                                                return (
                                                    <Fragment>
                                                        <label className="font-weight-bold text-left mb-2 caja-texto-color-blanco fonts">Estado Civil</label>
                                                        {/* <Select options={civils} /> */}
                                                        <div className='shain'>
                                                        <Select
                                                            onChange={this.selecionarCivil}
                                                            options={getCivilStatus}
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
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Nombre</label>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Primer y segundo nombre"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input
                                                    type="text"
                                                    name="firstname"
                                                    autoComplete="off"
                                                    className="form-control shain"
                                                    placeholder="Nombre"
                                                    onChange={this.actualizarState}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Apellido</label>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Primer y segundo apellido"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input
                                                    type="text"
                                                    name="lastname"
                                                    autoComplete="off"
                                                    className="form-control shain"
                                                    placeholder="Apellido"
                                                    onChange={this.actualizarState}
                                                />
                                            </Tooltip>
                                            
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Correo electronico</label>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="El correo tiene que tener @"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    className="form-control shain"
                                                    placeholder="Correo electronico"
                                                    onChange={this.actualizarState}
                                                    maxLength={50}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Nombre de usuario</label>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Primer apellido, luego la primera letra del primer nombre"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input
                                                    name="user"
                                                    autoComplete="off"
                                                    className="form-control shain"
                                                    placeholder="Nombre de usuario"
                                                    onChange={this.actualizarState}
                                                    maxLength={30}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Contraseña</label>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="La contraseña debe tener un minimo de 8 caracteres"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input.Password
                                                    name="password"
                                                    className="form-control shain"
                                                    placeholder="Contraseña"
                                                    onChange={this.actualizarState}
                                                    maxLength={15}
                                                />
                                            </Tooltip>
                                            
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Confirmar Contraseña</label>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Las contraseñas tienen que coincidir"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input.Password
                                                    name="repetirPassword"
                                                    className="form-control shain"
                                                    placeholder="Confirmar Contraseña"
                                                    onChange={this.actualizarState}
                                                    maxLength={15}
                                                />
                                            </Tooltip>
                                            
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="font-weight-bold caja-texto-color-blanco fonts">Teléfono / Celular</label>
                                            
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Ingrese el código del pais , espacio , número  Ej: +505 85452455"
                                                
                                                placement="topLeft"
                                                overlayClassName="numeric-inpu"
                                            >
                                                <Input
                                                    type="number"
                                                    name="phone"
                                                    className="form-control shain"
                                                    placeholder="Teléfono"
                                                    onChange={this.actualizarState}
                                                    maxLength={30}
                                                />
                                            </Tooltip>
                                            
                                        </div>
                                    </div>
                                    <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label className="font-weight-bold caja-texto-color-blanco fonts">Dirección</label>
                                        <Tooltip
                                            trigger={['focus']}
                                            title="No ingresar caracteres especiales EJ: @,()$5#*-+'"
                                            
                                            placement="topLeft"
                                            overlayClassName="numeric-inpu"
                                        >
                                            <Input
                                                type="text"
                                                name="address"
                                                autoComplete="off"
                                                className="form-control shain"
                                                placeholder="Dirección de domicilio"
                                                onChange={this.actualizarState}
                                            />
                                        </Tooltip>
                                            
                                        </div>
                                    </div>
                                    
                                    <button 
                                        disabled = {this.validarForm() || loading}
                                        type="submit" 
                                        className="btn btn-success float-right fonts"
                                    >
                                        Agregar usuario
                                    </button>
                                </form>
                                )
                            }}
                        </Mutation>
                    </div>
                ): 
                    <div className="row justify-content-center">
                        <RegisterAgent 
                        iduser = { this.state.iduser }
                        history = { this.props.history }/>
                    </div>
                }
            </Fragment>
        );
    }
}
export default NuevoEjecutivo;