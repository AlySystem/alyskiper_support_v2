import React from 'react'
import { useState } from 'react'
import noimage from '../../assets/img/noimage.png' 
const ImgSelector = (props) => {

    const [imgFile, setImgFile] = useState()

    const handleImageSet = (event) => {
        let input = event.target

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(input)
            reader.onload = function (e) {
                setImgFile(e.target.result)
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    return (
        <>
            <div style={{ margin: "20px" }} >
                <label>{props.label}</label>
                <br />
                <img width="100" height="100" src={imgFile?imgFile:noimage} alt='' style={{ marginTop: "10px" }} />
                <br />
                <label type="file" style={{ marginTop: "10px" }}>
                    Seleccionar
                <input type="file" style={{ display: "none" }} onChange={handleImageSet} />
                </label>
            </div>
        </>
    )
}

export default ImgSelector