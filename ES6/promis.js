// Promise - Is an object which acts like wrapper and stores the call or callback functions to the server
// gives a scope for our server call responses and wrap it up in another object to be used in promises response


// We have below functions to achieve certain flow of the process

function Authentication(user, authorizationCallBack) {
    //makes a call to server auth api for proper sign/signup process returns information
}

function Authorization(user_id, sessionToken, navigationCallBack) {
    //makes a call to server to fetch the user role 
}

function NavigateToApplication(user_id) {
    // out of all available pages sends back list of pages he should be redirected to and the page he last visited
}

// A situation where we have multiple dependent callbacks done one after another and as we couldn't modularize it 
// or we miss a situation where we are not able to control the response behaviour, this lands our set of calls
// into an indefinite loop and is termed as call back hell situation

// we can optmize it by using proper modularization

// function SignInFlow(user, authCallback) {
    
//     let user_id = authCallback(user, Authorization) //making call to server to authenticate user and fetch user_id

//     if (user_id == "valid" || user_id == "active") {
//         let sessionToken = authCallback(sessionId, NavigateToApplication) //fetch the user info so that we can decide where to navigate

//         // sessionToken - is not getting any response due to server failure

//         if (sessionToken == "valid" || sessionToken.userRole == "matches") {
//             let navigationLink = NavigateToApplication(sessionToken.userRole);
//             sendApi(navigationLink)
//         }else{
//             //call SignInFlow - again
//         }

//     } else {
//         //call SignInFlow - again
//     }
// }


// let Authpromise = new Promise((resolve, reject)=>{
//     let user_id = authCallback(user, Authorization) //2 seconds

//     if (user_id == "valid" || user_id == "active") {

//         resolve({
//             "status": "200",
//             "data" : user_id,
//             "msg" : "auth success"
//         })
//     } else {
//         reject({
//             "status": "404",
//             "data" : null,
//             "msg" : "auth failed"
//         })
//     }
// })

// let authResult = Authpromise.then((data,err)=>{
//                         //use - data
//                 }).catch((err)=>{
//                         //use - error
//                 })



console.log("Promise Start")

let Authpromise = new Promise((resolve, reject)=>{

    //let user_id = authCallback(user, Authorization) //2 seconds

    // if (user_id == "valid" || user_id == "active") {
    setTimeout(() => {
        resolve({
            "status": "200",
            "data" : "user_id",
            "msg" : "auth success"
        })
    }, 2000);
        
    //} else {
    setTimeout(() => {
        reject({
            "status": "404",
            "data" : "null",
            "msg" : "auth failed"
        })
    },1000)
    //}
})

console.log(Authpromise)

let authResult = Authpromise.then((data,err)=>{
                       console.log("Inside promise success ", data)
                }).catch((err)=>{
                    console.log("Inside promise error ", err)
                        //use - error
                })

console.log("Promise complete", Authpromise)


//Create a student call with timeout and use promise to demonstrate resolve and reject behaviour