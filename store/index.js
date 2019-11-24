import { parseCookie } from '@/util/cookie';

export const actions = {
    // eslint-disable-next-line no-unused-vars
    nuxtServerInit({ commit, getters, dispatch }, { req, res }) {
        let cookie = req.headers.cookie;
        let cookies  = parseCookie(cookie);
        if (cookies) {
            // init data
            commit('user/setData', {
                key: 'user',
                value: {
                    jishou_uid: cookies.jishou_uid,
                    jishou_sid: cookies.jishou_sid,
                    jishou_mobile: cookies.jishou_mobile,
                    loginSign: cookies.loginSign,
                },
            });
        }
    },
};

export const state = () => ({
});