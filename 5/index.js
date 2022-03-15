function fetchData(params, onSuccess, onError) {
    const req = new XMLHttpRequest();
    req.open(params.method, params.url, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState === 4) {
            if(req.status === 200) {
                onSuccess(JSON.parse(req.responseText))
            } else {
                onError()
            }
        }
    };
    req.send(null);
}

let userProfile = null
const userId = 4

const fetchPromise = new Promise((resolve, reject) => {
    fetchData({ method: 'GET', url: `http://localhost:8080/app/profile/${userId}`},
        (response) => {
            resolve(response)
        }, (error) => {
            reject(error)
        })
})

const fetchDetails = function (userId, userProfile) {
    return new Promise((resolve, reject) => {
        fetchData({ method: 'GET', url: `http://localhost:8080/app/payments/${userId}`},
            (payments) => {
                document.querySelector('#user-name').textContent = `User: ${userProfile.firstName} ${userProfile.lastName}`
                document.querySelector('#user-subscription').textContent = `Subscription: ${payments.subscriptionStatus}`
                resolve(payments)
            }, (error) => {
                window.alert('Cannot fetch payment details!')
                reject()
            })
    })
}


fetchPromise.then((profile) => {
    userProfile = profile
    return userProfile
}).then((userProfile) => {
    fetchDetails(userId, userProfile)
})
