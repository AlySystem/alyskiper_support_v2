import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PROPIETARIO } from '../../Queries';
import FormularioEditarPropietario from './FormularioEditarEjecutivo';

class EditarEjecutivo extends Component {
    state = { }
    render() {

        // tomar el id para editar
        const { id } = this.props.match.params;

        //console.log(id);

        return (
            <Fragment>
                <h1 className="text-center caja-texto-color-blanco titless">Editar Ejecutivo</h1>
                <div className="row justify-content-center caja-texto-color-blanco">
                    <Query query={OBTENER_PROPIETARIO} variables={{id: parseFloat(id) }}>
                        {({loading, error, data, refetch}) =>{
                            if(loading) return "Cargando...";
                            if(error) return `Error ${error.message}`;
                            console.log(data);
                            return (
                                <FormularioEditarPropietario
                                propietario={data}
                                id={id}
                                refetch={refetch}>
                                </FormularioEditarPropietario> 
                            )
                            
                        }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}

export default EditarEjecutivo