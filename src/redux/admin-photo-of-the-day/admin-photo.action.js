import axios from 'axios'

export async function addPhotoOfTheDaySection(photoData) {
    console.log("not siuuuuuu", photoData)
    let result = false
    await axios
        .post('http://localhost:8080/api/v1/photoOfTheDay', photoData,
            { headers: { authorization: getJWTtoken() } }
        )
        .then((data) => {
            result = true
        })
        .catch((errorObject) => {
            console.log(errorObject)
            result = false
        })
    return result
}

export async function addPhotoOfTheDay(photoData) {
    console.log("not photo", photoData)
    let result = false
    const formData = new FormData();
    formData.append("image", photoData);
    console.log("not form", formData)
    await axios
        .post('http://localhost:8080/api/v1/image?photoOfTheDay=true', formData,
            { headers: {'Content-Type': 'multipart/form-data'} }
        )
        .then((data) => {
            result = true
        })
        .catch((errorObject) => {
            console.log(errorObject)
            result = false
        })
    return result
}

function getJWTtoken() {
    const localUser = localStorage.getItem('user')
    if (localUser) {
        return (JSON.parse(localUser)).jwt
    }
    return ""
}