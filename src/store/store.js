let redux = require('redux');
let isAuthenticate = '';
let username  = '';
let token ='';
let user =localStorage.getItem('user');
if(user!=null){
    isAuthenticate = JSON.parse(user).isAuthenticate ? JSON.parse(user).isAuthenticate : '';
    username  = JSON.parse(user).isAuthenticate ? JSON.parse(user).username : '';
    token = JSON.parse(user).isAuthenticate ? JSON.parse(user).token : '';
}
let InitialState = { 
    showFormRegister : false,
    isAuthenticate ,
    username,
    token
}

const allReducer = (state=InitialState,action)=>{
    switch(action.type){
        case  "SHOW_FORM_REGISTER" :
            return {showFormRegister:!state.showFormRegister};
        case  "IS_AUTHENTICATE" :
            localStorage.setItem('user',JSON.stringify({isAuthenticate : true,token:action.token,username :action.username}))
            return {isAuthenticate:true,token:action.token,username:action.username};
        case "IS_LOGOUT" :
            localStorage.setItem('user',JSON.stringify({isAuthenticate : false,username : '',token :''}))    
            return {isAuthenticate:false,username : '',token : ''};
        default : 
            return {...state};

    }
}

let store = redux.createStore(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()));
})
export default store;