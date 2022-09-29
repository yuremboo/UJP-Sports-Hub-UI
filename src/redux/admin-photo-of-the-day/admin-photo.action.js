import axios from 'axios'

export async function addPhotoOfTheDaySection(photoData) {
    console.log("not siuuuuuu", photoData)
    let result = false
    await axios
        .post('https://ujp-sports-hub.herokuapp.com/api/v1/photoOfTheDay', photoData,
            {headers: {authorization: getJWTtoken()}}
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

export async function addPhotoOfTheDay(photoData, isPhotoOfTheDay = "true") {
    let result = false
    const formData = new FormData();
    formData.append("image", photoData);
    await axios
        .post(`https://ujp-sports-hub.herokuapp.com/api/v1/image?photoOfTheDay=${isPhotoOfTheDay}`, formData,
            {headers: {'Content-Type': 'multipart/form-data', authorization: getJWTtoken()}}
        )
        .then((response) => {
            console.log(response.data)
            result = response.data
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