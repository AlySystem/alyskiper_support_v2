import React from 'react'
import useForm from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import {navigate} from '@reach/router'
import CatTravelSelect from '../../components/VehicleSelects/CatTravelSelect'
import ModelSelect from '../../components/VehicleSelects/ModelSelect'
import TrademarkSelect from '../../components/VehicleSelects/TrademarkSelect'
import YearSelect from '../../components/VehicleSelects/YearSelect'
import VehicleCatalogSelect from '../../components/VehicleSelects/VehicleCatalogSelect'
import * as yup from 'yup'
import {REGISTRAR_SKIPER_VEHICLE} from '../../Mutations/index'

const NuevoVehiculo = () => {
    const schema = yup.object().shape({
        license_plate: yup.string().min(1).required(),
        IdCatTravel: yup.number().required(),
        IdVehiclecatalog: yup.number().required(),
        IdTrademark: yup.number().required(),
        IdModel: yup.number().required(),
        IdYear: yup.number().required()
    });

    const { register, handleSubmit, errors } = useForm({ validationSchema: schema })
    const [addVehicle, { data }] = useMutation(REGISTRAR_SKIPER_VEHICLE, {
        onCompleted: (data) => onSuccess(data),
        onError: (error) => onError(error)
    })
    const onError = (error) => {
        console.log("Error al ingresar el vehiculo")
        console.error(error)
    }
    const onSuccess = (data) => {
        console.log("Vehiculo Agregado Correctamente")
        console.log(data)
    }

    const formSubmitHandler = (values) => {
        console.log(values)
        addVehicle({
            variables: { input: values }
        })
        alert("vehiculo ingresado correctamente")
        navigate('/vehiculos')
    }

    return (
        <>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <h2><p>Registrar Nuevo Vehiculo</p></h2>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "vertical" }} >
                    <div className="separador">
                        <label htmlFor="license_plate">Placa</label>
                        <input ref={register} name="license_plate" placeholder="Placa" />
                        {errors.license_plate && <h4 className="errorText">"Valor no valido"</h4>}
                    </div>
                    <div className="separador">
                        <label htmlFor="IdCatTravel">Categoria Skiper Travel</label>
                        <CatTravelSelect register={register} name="IdCatTravel" />
                        {errors.IdCatTravel && <h4 className="errorText">"Valor no valido"</h4>}
                    </div>
                    <div className="separador">
                        <label htmlFor="IdVehiclecatalog">Tipo de vehiculo</label>
                        <VehicleCatalogSelect register={register} name="IdVehiclecatalog" />
                        {errors.IdVehiclecatalog && <h4 className="errorText">"Valor no valido"</h4>}
                    </div>
                    <div className="separador">
                        <label htmlFor="IdTrademark">Marca</label>
                        <TrademarkSelect register={register} name="IdTrademark" />
                        {errors.IdTrademark && <h4 className="errorText">"Valor no valido"</h4>}
                    </div>
                    <div className="separador">
                        <label htmlFor="IdModel">Modelo</label>
                        <ModelSelect register={register} name="IdModel" />
                        {errors.IdModel && <h4 className="errorText">"Valor no valido"</h4>}
                    </div>
                    <div className="separador">
                        <label htmlFor="IdYear">Año</label>
                        <YearSelect register={register} name="IdYear" />
                        {errors.IdYear && <h4 className="errorText">"Valor no valido"</h4>}
                    </div>
                </div>
                <div>
                    <button type="submit">Agregar</button>
                </div>
            </form>
        </>
    )
}

export default NuevoVehiculo