// Promise class has two methods Promise.all and Promise.allSettled - to help making concurrent execution of all the promises supplied in them
// depending upon the need of task any one or both the methods can be used

// we will need to show the more features, products and other sales options to the signed in user
// all these calls are not having dependency on each other they just needed a successful sigin/signup

// getUserHistory(userid)
// getProductList(userid)
// getFutureSalesList(userid)


//Promise1
let getUserHistory = new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve({
                status : "Success",
                msg : "Fetched user history of navigations",
                code : 200
            })
        }, 3000)

        setTimeout(() => {
            reject({
                status : "Failed",
                msg : "Failed to fetch user history of navigations",
                code : 400
            })
        }, 2000)
})

//Promise2
let getProductList = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve({
            status : "Success",
            msg : "Fetched user history of products",
            code : 200
        })
    }, 3000)

    setTimeout(() => {
        reject({
            status : "Failed",
            msg : "Failed to fetch user history of products",
            code : 400
        })
    }, 3000)
})

//Promise3
let getFutureSalesList = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve({
            status : "Success",
            msg : "Fetched user history of Future Sales",
            code : 200
        })
    }, 3000)

    setTimeout(() => {
        reject({
            status : "Failed",
            msg : "Failed to fetch user history of Future sales",
            code : 400
        })
    }, 3000)
})


//concurrent execution can be done for each promise
//all of them will be async
// getUserHistory.then(()=>{ output }).catch(()=>{ failed })
// getProductList.then(()=>{ output })
// getFutureSalesList.then(()=>{ output })

//1. All the promises needs to be completed either resolved or reject then only we should make it work
Promise.allSettled([
    getUserHistory,
    getProductList,
    getFutureSalesList
]).then((data)=>{
    console.log(data)
})


//2. if anyone of the above fails we should not do any next job or show next page

Promise.all([
    getUserHistory,
    getProductList,
    getFutureSalesList
]).then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})

// create promise of four concurrent sessions of a day and try to resolve and reject them


let getMernStack = new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve({
                status : "Success",
                msg : "Fetched Mern Stack",
                code : 200
            })
        }, 5000)

        setTimeout(() => {
            reject({
                status : "Failed",
                msg : "Failed to fetch Mern Stack",
                code : 400
            })
        }, 5000)
})

//Promise2
let getDataAndAlgs = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve({
            status : "Success",
            msg : "Fetched user Data & Algorithms",
            code : 200
        })
    }, 5000)

    setTimeout(() => {
        reject({
            status : "Failed",
            msg : "Failed to fetch Data & Algorithms",
            code : 400
        })
    }, 5000)
})

//Promise3
let getSpring = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve({
            status : "Success",
            msg : "Fetched user Spring Boot",
            code : 200
        })
    }, 5000)

    setTimeout(() => {
        reject({
            status : "Failed",
            msg : "Failed to fetch Spring Boot",
            code : 400
        })
    }, 5000)
})


Promise.allSettled([
    getMernStack,
    getDataAndAlgs,
    getSpring
]).then((data)=>{
    console.log(data)
})


//2. if anyone of the above fails we should not do any next job or show next page

Promise.all([
    getMernStack,
    getDataAndAlgs,
    getSpring
]).then((data)=>{
    console.log(data)
}).catch((error)=>{
    console.log(error)
})



//1. All the promises needs to be completed either resolved or reject then only we should make it work

