import React from 'react'
import FrmAgent from '../../components/FrmAgent/FrmAgent'
import FrmUsuario from '../../components/FrmUsuario/FrmUsuario'
import { useRef } from 'react'
import BackendUtil from '../../utils/BackendUtil'
import { CREAR_USUARIO, NUEVO_AGENTE } from '../../Mutations'

const NuevoEj = () => {
    const CAT_EJECTUVIO = 2
    const frmUsuarioId = 'frmUsuario'
    const frmAgentId = 'frmAgente'
    const frmUsuarioRef = useRef()
    const frmAgentRef = useRef()

    const ApiUserCreate = new BackendUtil(CREAR_USUARIO)
    const ApiAgentCreate = new BackendUtil(NUEVO_AGENTE)
    const reactFrmUsuarioRef = useRef()

    const apiutiltest = async () => {
        let userForm = reactFrmUsuarioRef.current.getFormValues();
        /*let userData = await ApiUserCreate.mutation({
            
        })
        let agent = */
        console.log(userForm)
    }

    const clickHandler = async (e) => {
        e.preventDefault()
        let label = document.getElementById("lblError")
        // e.stopPropagation()
        let errors = reactFrmUsuarioRef.current.submitUserForm()
        if (errors) {
            console.log(label)
            label.textContent = errors
        }        
        // frmAgentRef.current.submit()
    }
    const frmUsuarioCallback = (data, error) => {
        if (error) {
            let label = document.getElementById("lblError")
            label.textContent = error.message
            return
        }

    }

    return (
        <>
            <div>
                <FrmUsuario ref={reactFrmUsuarioRef} formId={frmUsuarioId} formRef={frmUsuarioRef} callback={frmUsuarioCallback} />
                <FrmAgent categoryId={CAT_EJECTUVIO} formId={frmAgentId} formRef={frmAgentRef} />
                <b><label id="lblError" className="errorText" ></label></b>
            </div>
            <button onClick={apiutiltest}>Agregar</button>
        </>
    )
}

export default NuevoEj