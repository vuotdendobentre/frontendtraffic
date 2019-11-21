let redux = require('redux');
let isAuthenticate = '';
let username  = '';
let role  = '';
let plate = [];
let user =localStorage.getItem('userTraffic');
if(user!=null){
    isAuthenticate = JSON.parse(user).isAuthenticate ? JSON.parse(user).isAuthenticate : '';
    username  = JSON.parse(user).isAuthenticate ? JSON.parse(user).username : '';
    role  = JSON.parse(user).isAuthenticate ? JSON.parse(user).role : '';
    plate =JSON.parse(user).isAuthenticate ? JSON.parse(user).plate :  [];
}
let InitialState = { 
  
    isAuthenticate ,
    username,
    role,
    plate
  
}

const allReducer = (state=InitialState,action)=>{
    switch(action.type){
        case  "IS_AUTHENTICATE" :
            localStorage.setItem('userTraffic',JSON.stringify({isAuthenticate:true,username :action.username,role:action.role,plate:action.plate}))
            return {isAuthenticate:true,username :action.username,role:action.role,plate:action.plate};
        case "IS_LOGOUT" :
            localStorage.setItem('userTraffic',JSON.stringify({isAuthenticate : false,username : '',role:'',plate:[]}))    
            return {isAuthenticate : false,username : '',role:'',plate:[]};
        default : 
            return {...state};

    }
}

let store = redux.createStore(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()));
})
export default store;