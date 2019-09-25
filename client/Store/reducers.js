
//REDUCERS
var profileState = {
    
    //initialValue:'HASHSTACK.IO'
};
var dataState = [];


/*
*
*           PROFILE ACTIONS
*
*/


var ProfileReducer = (state = profileState, data) => {

    switch (data.type) {
        case 'INJECT_PROFILE':
            data.payload.forEach(elem => {
                state[elem.key] = elem.value;
            })
            console.log('see the two both of dem sha', data.payload, state);
            return state;


        default:
            return state;

    }
};

/*
*
*           ARTICLE ACTIONS
*
*/



var ArticleReducer = (state = dataState, action) => {
    switch (action.type) {


        case 'OVERWRITE_ARTICLE':
            state = action.payload;
            return state;

        case 'UPDATE_ARTICLE':
            for (var x in state) {
                if (x._id === payload._id) {
                    Object.assign(x, payload);
                }
            }

            return state;

        case 'DELETE':

            var state = state.filter((e) => e._id !== action.payload._id);

            return state;

        case 'INSERT_ARTICLE':

            state.push(action.payload);


            return state;



        default:
            return state;

    }
};

module.exports = { ProfileReducer, ArticleReducer };
