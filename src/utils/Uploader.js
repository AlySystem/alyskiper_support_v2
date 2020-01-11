const UPLOAD_ENDPOINT = 'https://upload-files-alysystem.herokuapp.com/uploads/file'

const uploadFile = (file, name) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");

        var formdata = new FormData();
        formdata.append("image", file, file.name);

        var requestOptions = {
            method: 'POST',
            //headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        console.log(requestOptions)

        fetch(UPLOAD_ENDPOINT, requestOptions)
            .then(response => response.text())
            .then(result => { console.log(result); resolve(result); })
            .catch(error => { console.log('error', error); reject(error) });

    })

}

export default uploadFile