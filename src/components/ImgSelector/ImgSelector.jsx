import React from 'react'
import { useState } from 'react'
import noimage from '../../assets/img/noimage.png'
import { useEffect } from 'react'
const ImgSelector = (props) => {

    const [imgFile, setImgFile] = useState()

    useEffect(() => {
        if (props.imgFile) {
            setImgFile(props.imgFile)
        } else {
            setImgFile(noimage)
        }
    }, [props.imgFile])

    const handleImageSet = (event) => {
        let input = event.target

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(input)
            reader.onload = function (e) {
                setImgFile(e.target.result)

            }

            reader.readAsDataURL(input.files[0]);
            if (props.callback)
                props.callback(input.files[0])
        }
    }

    return (
        <>
            <div style={{ margin: "20px" }} >
                <label>{props.label}</label>
                <br />
                <img width="70%" height="70%" src={imgFile ? imgFile : noimage} alt='' style={{ marginTop: "10px", imageOrientation: "from-image" }} />
                <br />
                <label type="file" style={{ marginTop: "10px" }}>
                    Seleccionar
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageSet} />
                </label>
            </div>
        </>
    )
}

export default ImgSelector