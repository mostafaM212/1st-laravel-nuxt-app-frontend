

export const state =()=> ({
  errors : {}
})

//getters

export const getters = {
  errors(state){

    return state.errors ;
  }
}

//mutations
/**
 * here we setup validation errors
 * @type {{}}
 */
export const mutations= {
  SET_VALIDATION_ERRORS(state,errors){
      state.errors =errors ;
  }
}

/**
 * we will create two actions 1st take to set the errors and other to clear the errors
 * actions
 */

export const actions = {

  setErrors({commit},errors){
    commit('SET_VALIDATION_ERRORS',errors)
  },

  clearErrors({commit}){
      commit('SET_VALIDATION_ERRORS',{})
  }

}


