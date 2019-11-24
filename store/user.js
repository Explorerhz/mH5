export const mutations = {
    setData(state, payload) {
        state[payload.key] = payload.value;
    },
};

export const getters = {
    user: state=>{
        return state['user'];
    }
};

export const state = () => ({
    user: {}
});