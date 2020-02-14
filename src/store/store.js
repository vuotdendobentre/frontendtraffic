let redux = require('redux');
let isAuthenticate = '';
let username  = '';
let role  = '';
let plate = [];
let pageLogin=0;
let pageAction =0;
let user =localStorage.getItem('userTraffic');

if(user!=null){
    isAuthenticate = JSON.parse(user).isAuthenticate ? JSON.parse(user).isAuthenticate : '';
    username  = JSON.parse(user).isAuthenticate ? JSON.parse(user).username : '';
    role  = JSON.parse(user).isAuthenticate ? JSON.parse(user).role : '';
    plate =JSON.parse(user).isAuthenticate ? JSON.parse(user).plate :  [];
    pageLogin =JSON.parse(user).isAuthenticate ? JSON.parse(user).pageLogin :  0;
    pageAction =JSON.parse(user).isAuthenticate ? JSON.parse(user).pageAction :  0;
}

let InitialState = { 
    pageLogin ,
    pageAction ,
    isAuthenticate,
    username,
    role,
    plate
  
}

const allReducer = (state=InitialState,action)=>{
    switch(action.type){
        case  "IS_AUTHENTICATE" :
            localStorage.setItem('userTraffic',JSON.stringify({isAuthenticate:true,username :action.username,role:action.role,plate:action.plate}))
            return {...state,pageLogin:0,isAuthenticate:true,username :action.username,role:action.role,plate:action.plate};
        case "IS_LOGOUT" :
            localStorage.setItem('userTraffic',JSON.stringify({isAuthenticate : false,username : '',role:'',plate:[]}))    
            return {pageLogin : 0,pageAction : 0,isAuthenticate : '',username : '',role:'',plate:[]};
        case "PAGE_ACTION":
            localStorage.setItem('userTraffic',JSON.stringify({...state,pageAction:action.pageAction,pageLogin:((state.isAuthenticate===undefined || state.isAuthenticate ==='')&&action.pageAction!==0) ? 1 : 0}))
            return {...state,pageAction:action.pageAction,pageLogin:((state.isAuthenticate===undefined || state.isAuthenticate ==='')&&action.pageAction!==0) ? 1 : 0} 
        case "PAGE_LOGIN":
            localStorage.setItem('userTraffic',JSON.stringify({...state,pageLogin:action.pageLogin}))
            return {...state,pageLogin:action.pageLogin}
        default : 
            return {...state};

    }
}

let store = redux.createStore(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()));
})
export default store;