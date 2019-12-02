import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PROPIETARIO } from '../../Mutatios';
import { withRouter } from 'react-router-dom';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    user: '',
    password: '',
    repetirPassword: '',
    sponsor_id: '',
    address: '',
    phone: '',
    create_at: '',
    country_id: '',
    city_id: ''
}

class FormularioEditarPropietario extends  Component {
    state = {
        ...this.props.propietario.searchUser
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
        //este state viene con todos los datos

        const { firstname, lastname, email, user, address, phone } = this.state;
        const novalido = !firstname || !lastname || !email || !user || !address || !phone;
        //console.log(novalido);
        return novalido;
    }

    editarPropietarioForm = (e, updateUser) =>{
        e.preventDefault();
        updateUser().then(data => {
            //Limpiamos el formulario luego de que se 
            // actualizaron los datos

            //console.log(data);
            this.setState({
                ...initialState
            })
        })
    }

    render() {
        const { firstname, lastname, email, user, address, phone } = this.state;
        let country_id  = this.state.city_id;
        let city_id  = this.state.countrie_id;
        //console.log(country_id);
        //console.log(city_id);
        //console.log(this.state.user.id);
        //const { userId } = this.state.userId;
        const { id } = this.props;
        const input = {
            id: parseFloat(id),
            firstname,
            lastname,
            email,
            user,
            address,
            phone,
            country_id: parseFloat(country_id),
            city_id: parseFloat(city_id)
        };
        
        console.log(input);
        return (
            <Mutation
                mutation={ACTUALIZAR_PROPIETARIO}
                variables={{input}}
                key={id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/propietarios')
                })}
            >
                {( updateUser, {loading, error, data}) =>{
                    return (
                        <form 
                            className="col-md-8"
                            onSubmit={ e => this.editarPropietarioForm(e, updateUser)}
                        >
                            <div className="form-group">
                                <label className='fonts'>Nombre del propietario</label>
                                <input 
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="firstname"
                                    className="form-control shain"
                                    placeholder="Nombre"
                                    value={firstname}
                                />
                            </div>
                            <div className="form-group">
                                <label className='fonts'>Apellido</label>
                                <input 
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="lastname"
                                    className="form-control shain"
                                    placeholder="Apellido"
                                    value={lastname}
                                />
                            </div>
                            <div className="form-group">
                                <label className='fonts'>Correo electronico</label>
                                <input 
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="email"
                                    className="form-control shain"
                                    placeholder="correo electronico"
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label className='fonts'>Nombre de usuario</label>
                                <input 
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="user"
                                    className="form-control shain"
                                    placeholder="Nombre de usuario"
                                    value={user}
                                />
                            </div>
                            <div className="form-group">
                                <label className='fonts'>Teléfono / Celular</label>
                                <input 
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="phone"
                                    className="form-control shain"
                                    placeholder="Nombre de usuario"
                                    value={phone}
                                />
                            </div>
                            <button
                                disabled= {this.validarForm()}
                                type="submit"
                                className="btn btn-success float-right fonts shain">
                                Guardar Cambios
                            </button>

                        </form>
                    )
                }}
            </Mutation>
        )
    }
}
export default withRouter(FormularioEditarPropietario);