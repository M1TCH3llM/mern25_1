//Assessment #2 - NodeJS and ReactJs - 29th August 2025

//NodeAPI
//1. Explain your knowledge of - statelessness, http, REST, spa and classical applications

    // Statelessness:
        // Server that does not remember per-client state between requests 
        // each request must contain all needed info            

    // HTTP:
        // http is a request and response protocol
        // it has methods such as GET / POST / PUT / DELETE 
    
    // REST 
        // A way for client and server to communicate with out changing echoers states
        // Mapping in the format of the HTTP methods GET / POST / PUT / DELETE 

    //SPA
        // single page application,
        // Loads entire application bundle so navigation can happen on client side with fewer page reloads
    
    // Classical
        // navigation hits server to render new pages
        // full page reloads 



//2. Create an express setup, with a capability to expose end points for restful api

        // IN Express Q2 Folder

//3. Create an API with name CreateUser as get verb and pass user info such as name, session, address and age as query param

    // =========== TEST CASE =========

    // http://localhost:3001/CreateUser?name=Mitchell&session=MERN25A&address=123%20Main%20St%2C%20Denver&age=30

   //      Returns 
            //    {
            // "data": {
            // "name": "Mitchell",
            // "session": "MERN25A",
            // "address": "123 Main St, Denver",
            // "age": 30
            // },
            // "message": "CreateUser received"
            // }


//4. Save the information passed in #3 to a json file name userInfo in local

 // =========== TEST CASE =========

    // http://localhost:3001/CreateUser?name=Mitchell&session=MERN25A&address=123%20Main%20St%2C%20Denver&age=30
    // http://localhost:3001/CreateUser?name=Jeff&session=MERN25A&address=123%20Main%20St%2C%20Denver&age=30

    // Saves to userInfo.Json

        //     [
        //   {
        //     "name": "Mitchell",
        //     "session": "MERN25A",
        //     "address": "123 Main St, Denver",
        //     "age": 30,
        //     "createdAt": "2025-08-29T16:03:33.808Z"
        //   },
        //   {
        //     "name": "Jeff",
        //     "session": "MERN25A",
        //     "address": "123 Main St, Denver",
        //     "age": 30,
        //     "createdAt": "2025-08-29T16:04:06.054Z"
        //   }
        // ]




//React
//5. create a webpack setup, index html and one css file to show css in next questions (can use app.css from our project)

//6. how react renders dom in conservative manner - explain, also explain 
//7. create a class component named - Success and show some quotes (messages) in it with h1,h2,h3 components
//8. create a functional component SuccessChild, make it child of Success and pass Name and Address to it from Success
//9. create SuccessStory as another component, pass this as props in SuccessChild from Success component
//10. explain how virtual dom works and how it is coupled with state updates and state update API's

        // React keeps a lightweight copy of the page in memory called the Virtual DOM.
        // When your state changes, it builds a new copy and compares it to the old one to see exactly what changed.
        // Then it updates only those real DOM parts (not the whole page) and batches multiple changes into one fast update.
        // For lists, giving items stable keys lets React match them correctly so it updates in place without resetting their state.