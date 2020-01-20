import React from 'react'

const FileButton = (props) => {
    return (<>
        <label type="file" style={{ marginTop: "10px" }}>
            {props.text}
                <input type="file"
                accept={props.accept}
                style={{ display: "none" }}
                onChange={props.onChange} />
        </label>
    </>)
}
//"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
export default FileButton