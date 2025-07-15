// Promise - is an object that acts like a wrapper and stores the call or callback to server 
// gives a scope for our server call responses and wrap it up in another object to be used in promises response 


// function SignInFlow(user, authCallBack) {

//     let user_id = authCallBack(user) // making call to server to auth user and fetch user id

//     if (user_id == "valid" || user_id == "active") {
//         let sessionToken = authCallback(sessionId, NavigationToApplication) // fetch the user info so that we can decided
    
//         // sessionToken - is not getting any response due to server failure

//         if (sessionToken == "valid" || sessionToken.userRole == "matches") {
//             let navigationLink = NavigateToApplication(sessionToken.userRole);
//             sendApi(navigationLink)
//         }
//     } else {

//     }
// }

// let promiseObj = new Promise((resolve, reject) => {
//       let user_id = authCallBack(user, Authorization) // x seconds


//        if (user_id == "valid" || user_id == "active") {
//       resolve({
//         "status": "200",
//         "data": user_id,
//         "msg": "auth success"
//       })
//     } else {
//          reject({
//         "status": "400",
//         "data": null,
//         "msg": "auth failed"
//          })
//     }
// })
//     let authResult = Authpromis.then((data, err) =>{
//         //use - data
//     }).catch((err)=>{
//         // use - error
//     }
// )


console.log("Promise Start")//

let promiseObj = new Promise((resolve, reject) => {
    //  let user_id = authCallBack(user, Authorization) // x seconds


     //  if (user_id == "valid" || user_id == "active") {

     setTimeout(() => {
      resolve({
        "status": "200",
        "data": "user_id",
        "msg": "auth success"
      })
    },2000 );
  
setTimeout(() => {
    //   } else {
         reject({
        "status": "400",
        "data": null,
        "msg": "auth failed"
         })
    }, 3000)
})
    let authResult = Authpromis.then((data, err) =>{
        //use - data
        console.log("inside promise success", data);
        
    }).catch((err)=>{
        // use - error
                console.log("inside promise error", err);

    }
)