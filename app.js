async function getUser(name){

    
const result= await fetch(`https://api.github.com/users/${name}`)
      .then((response)=> {
        return response.json();
      })
      .then((json)=> {
        console.log(json);
      });
    };
    
    
    getUser('yourUsernameHere');




