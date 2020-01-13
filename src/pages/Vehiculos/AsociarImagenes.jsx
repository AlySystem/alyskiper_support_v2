import React, { useRef, useState } from 'react'
import { OBTENER_IMAGENES_VEHICULO, VEHICULO_USUARIO } from '../../Queries/index'
import { CREAR_REGISTRO_FOTOS_VEHICULO, ACTUALIZA_REGISTRO_FOTOS_VEHICULO } from '../../Mutations/index'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'
import ImgSelector from '../../components/ImgSelector/ImgSelector'
import uploadFile from '../../utils/Uploader'

const AsociarImagenes = (props) => {

    const [imgMap, setImgMap] = useState(new Map())
    const [imgsrc, setImgsrc] = useState()
    const select = useRef()

    const [loadImgData, { data: vehicleImgData }] = useLazyQuery(OBTENER_IMAGENES_VEHICULO, {
        pollInterval:3000,
        onCompleted: (data) => {
            setearMapa(data.getByIdUploadVehicleAppearance)
            onChangeHandler()
            //console.log(data)
        },
        onError: (err) => { console.log(err) }
    })

    const [createImageRow, { data: createImageRowData }] = useMutation(CREAR_REGISTRO_FOTOS_VEHICULO, {
        onCompleted: data => { alert('Se guardo las imagenes correctamente');console.log("Se creo el registro exitosamente"); console.log(data); if(props.callback) props.callback()},
        onError: (err) => { console.log("error"); console.log(err) }
    })

    const [updateImageRow, { data: updateImageRowData }] = useMutation(ACTUALIZA_REGISTRO_FOTOS_VEHICULO, {
        onCompleted: data => { alert('Se guardo las imagenes correctamente');console.log("Se actualizo el registro exitosamente"); console.log(data);if(props.callback) props.callback() },
        onError: (err) => { console.log("error"); console.log(err) }
    })

    const { data: vehicleData } = useQuery(VEHICULO_USUARIO, {
        variables: { id: props.userId },
        onCompleted: (data) => {
            if (data.getVehicleByUserId) {
                if (data.getVehicleByUserId.uploadVehicleAppearance) {
                    //console.log("EL ID ",data.getVehicleByUserId.uploadVehicleAppearance.id)
                    loadImgData({
                        variables: {
                            id: parseInt(data.getVehicleByUserId.uploadVehicleAppearance.id)
                        }
                    })
                } else {
                    console.log("no hay registro de imagenes")
                }
            } else {
                alert("El usuario no tiene vehiculo asignado")
                if (props.callback) {
                    props.callback()
                }
            }
            console.log(data)
        },
        onError: (err) => { console.log(err) }
    })

    const onChangeHandler = _ => {
        let campo = getSelectedValue()

        console.log("el campo " + campo)
        let image = imgMap.get(campo)

        if (image == null) {
            setImgsrc(null)
            return
        }

        console.log(image)
        console.log(typeof (image.img))
        if (typeof (image.img) == 'string') {
            setImgsrc(image.img)
        } else {
            let reader = new FileReader()
            reader.onload = function (e) {
                setImgsrc(e.target.result)
            }

            reader.readAsDataURL(image.img);
        }
    }

    const cbSelector = (img) => {
        setImgsrc(img)
        console.log("tipo de imagen regresada")
        console.log(typeof (img))
        console.log(img)

        if (typeof (img) == 'object') {
            let mapa = imgMap
            mapa.set(getSelectedValue(), valueFromImage(img, true))
            setImgMap(mapa)
        }
    }

    const subirImagenes = async _ => {

        let objImg = {}
        console.log(imgMap)
        for (let key of imgMap.keys()) {
            let item = imgMap.get(key)
            console.log(item, key)

            if (item) {
                if (item.edited) {
                    let imageFile = imgMap.get(key).img
                    let url = await uploadFile(imageFile, imageFile.name)
                    objImg[key] = url;
                }
            }
        }
        console.log(objImg)
        /*+++++++++++++++++++CALL MUTATION HERE+++++++++++++++++*/
        
        if (!vehicleImgData) {
            await createImageRow({
                variables: {
                    input: {
                        url_img_vehicle_front: objImg.url_img_vehicle_front,
                        url_img_vehicle_behind: objImg.url_img_vehicle_behind,
                        url_img_vehicle_side_right: objImg.url_img_vehicle_side_right,
                        url_img_vehicle_side_left: objImg.url_img_vehicle_side_left,
                        url_img_vehicle_inside_one: objImg.url_img_vehicle_inside_one,
                        url_img_vehicle_inside_two: objImg.url_img_vehicle_inside_two,
                        url_img_vehicle_inside_three: objImg.url_img_vehicle_inside_three,
                        url_img_vehicle_inside_four: objImg.url_img_vehicle_inside_four,
                        idvehicle: vehicleData.getVehicleByUserId.id,
                    }
                }
            })
        } else {
            await updateImageRow({
                variables: {
                    input: {
                        id: vehicleImgData.getByIdUploadVehicleAppearance.id,
                        url_img_vehicle_front: objImg.url_img_vehicle_front,
                        url_img_vehicle_behind: objImg.url_img_vehicle_behind,
                        url_img_vehicle_side_right: objImg.url_img_vehicle_side_right,
                        url_img_vehicle_side_left: objImg.url_img_vehicle_side_left,
                        url_img_vehicle_inside_one: objImg.url_img_vehicle_inside_one,
                        url_img_vehicle_inside_two: objImg.url_img_vehicle_inside_two,
                        url_img_vehicle_inside_three: objImg.url_img_vehicle_inside_three,
                        url_img_vehicle_inside_four: objImg.url_img_vehicle_inside_four,
                        idvehicle: vehicleData.getVehicleByUserId.id,
                    }
                }
            })
            console.log({
                input: {
                    id: vehicleImgData.getByIdUploadVehicleAppearance.id,
                    url_img_vehicle_front: objImg.url_img_vehicle_front,
                    url_img_vehicle_behind: objImg.url_img_vehicle_behind,
                    url_img_vehicle_side_right: objImg.url_img_vehicle_side_right,
                    url_img_vehicle_side_left: objImg.url_img_vehicle_side_left,
                    url_img_vehicle_inside_one: objImg.url_img_vehicle_inside_one,
                    url_img_vehicle_inside_two: objImg.url_img_vehicle_inside_two,
                    url_img_vehicle_inside_three: objImg.url_img_vehicle_inside_three,
                    url_img_vehicle_inside_four: objImg.url_img_vehicle_inside_four,
                    idvehicle: vehicleData.getVehicleByUserId.id,
                }
            })
        }

        console.log("termino de llamar a las mutations")
    }

    const valueFromImage = (value, edited) => {
        if (value) {
            return {
                img: value,
                edited: edited
            }
        } else {
            return null;
        }
    }

    const setearMapa = (vehicleImg) => {
        let mapa = imgMap
        console.log("el vehicleimg")
        console.log(vehicleImg)
        mapa.set("url_img_vehicle_front", valueFromImage(vehicleImg.url_img_vehicle_front, false))
        mapa.set("url_img_vehicle_behind", valueFromImage(vehicleImg.url_img_vehicle_behind, false))
        mapa.set("url_img_vehicle_side_right", valueFromImage(vehicleImg.url_img_vehicle_side_right, false))
        mapa.set("url_img_vehicle_side_left", valueFromImage(vehicleImg.url_img_vehicle_side_left, false))
        mapa.set("url_img_vehicle_inside_one", valueFromImage(vehicleImg.url_img_vehicle_inside_one, false))
        mapa.set("url_img_vehicle_inside_two", valueFromImage(vehicleImg.url_img_vehicle_inside_two, false))
        mapa.set("url_img_vehicle_inside_three", valueFromImage(vehicleImg.url_img_vehicle_inside_three, false))
        mapa.set("url_img_vehicle_inside_four", valueFromImage(vehicleImg.url_img_vehicle_inside_four, false))

        setImgMap(mapa)
    }

    const getSelectedValue = _ => {
        let selected = select.current.selectedOptions
        if (selected)
            return selected[0].value

        return null
    }

    return (<>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <span>
                <select onChange={onChangeHandler} ref={select}>
                    <option value="url_img_vehicle_front">Vehiculo Frente</option>
                    <option value="url_img_vehicle_behind">Vehiculo Atras</option>
                    <option value="url_img_vehicle_side_right">Vehiculo lado Derecho</option>
                    <option value="url_img_vehicle_side_left">Vehiculo lado Izquierdo</option>
                    <option value="url_img_vehicle_inside_one">Vehiculo Interior 1</option>
                    <option value="url_img_vehicle_inside_two">Vehiculo Interior 2</option>
                    <option value="url_img_vehicle_inside_three">Vehiculo Interior 3</option>
                    <option value="url_img_vehicle_inside_four">Vehiculo Interior 4</option>
                </select>
            </span>
            <div>
                <button onClick={subirImagenes}>Guardar</button>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>

            {/* <img height="30%" width="30%" style={{ imageOrientation: "from-image" }} src={imgsrc} /> */}
            <ImgSelector imgFile={imgsrc} callback={cbSelector} />
        </div>

    </>)
}

export default AsociarImagenes