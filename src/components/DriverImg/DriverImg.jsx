import React from 'react'
import ImgSelector from '../ImgSelector/ImgSelector'

const DriverImg = () => {


    return (
        <>
            <form>
            <button type="submit" onClick={()=>{alert("Aqui deberia estar el evento de guardado")}}>Guardar</button>
                <div align="center">
                    <h2><p>Chofer</p></h2>
                    <div className="hero">
                        <div>
                            <ImgSelector label="Licencia Derecho" />
                        </div>
                        <div>
                            <ImgSelector label="Licencia Revez" />
                        </div>
                        <div>
                            <ImgSelector label="Antecedentes Penales" />
                        </div>
                        <div>
                            <ImgSelector label="Selfie con Licencia en pecho" />
                        </div>
                    </div>
                    <h2><p>Vehiculo</p></h2>
                    <div className="hero">
                        <div>
                            <ImgSelector label="Circulacion derecho" />
                        </div>
                        <div>
                            <ImgSelector label="Circulacion revez" />
                        </div>
                        <div>
                            <ImgSelector label="Vehiculo Externo 1" />
                        </div>
                        <div>
                            <ImgSelector label="Vehiculo Externo 2" />
                        </div>
                        <div>
                            <ImgSelector label="Vehiculo Interno 1" />
                        </div>
                        <div>
                            <ImgSelector label="Vehiculo Interno 2" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DriverImg