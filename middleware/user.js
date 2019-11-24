// 判断是否登录
export default ({
    store,
    redirect
}) => {
    const { jishou_uid } = store.state.user;
    if (!jishou_uid) {
        redirect('/login');
    }
};