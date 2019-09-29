

export const signIn = (credentials) => dispatch => {
    let basic_header = 'c2RtcF9hbmRyb2lkOnNkbXBfYW5kcm9pZF9wYXNz';

    console.log(credentials);
        let details = {
            'username': credentials.email,
            'password': credentials.password,
            'grant_type': 'password'
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log(formBody);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://sdmp-jss.herokuapp.com/oauth/token";
        fetch(url, {
        // fetch('http://192.168.1.15:8080/oauth/token', {
            method: 'POST',
            headers: { 'Authorization': 'Basic ' + basic_header, 'Content-Type' : 'application/x-www-form-urlencoded'},
            body: formBody
        })
            .then(res => res.json())
            .then((data) => {

                dispatch({ type: 'LOGIN_SUCCESS', payload:data})
            })
            .catch((err) => {
                dispatch( {
                    type: 'LOGIN_ERROR',
                    err
                });
            })

}

export const reset = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase= getFirebase();

        return firebase.auth().sendPasswordResetEmail(email).then((res) => {
            dispatch({ type: 'RESET_PASSWORD'})
            return res;
        })
    }
}




export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase =getFirebase();
        firebase.auth().signOut().then(()=> {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}