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

/**
 *
 * Return promise
 *
 * @param userId
 * @param onSuccess
 * @param onError
 * @returns {Promise<void>}
 */
function fetchProfile(userId, onSuccess, onError) {
    fetchData({ method: 'GET', url: `http://localhost:8080/app/profile/${userId}`}, onSuccess, onError)
}

async function fetchPaymentDetails(userId, onSuccess, onError) {
    fetchData({ method: 'GET', url: `http://localhost:8080/app/payments/${userId}`}, onSuccess, onError)
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

const fetchDetails = new Promise((resolve, reject) => {
    fetchData({ method: 'GET', url: `http://localhost:8080/app/payments/${userId}`},
        (response) => {
            resolve(response)
        }, (error) => {
            reject(error)
        })
})


fetchPromise.then((profile) => {
    userProfile = profile
}).then(() => {

    fetchPaymentDetails(userId, (payments) => {
        document.querySelector('#user-name').textContent = `User: ${userProfile.firstName} ${userProfile.lastName}`
        document.querySelector('#user-subscription').textContent = `Subscription: ${payments.subscriptionStatus}`
    }, () => {
        window.alert('Cannot fetch payment details!')
    })
})



