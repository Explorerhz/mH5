// 判断是否登录
export default ({
    store,
    redirect
}) => {
    const {jishou_uid} = store.state.user.user;
    //console.log("jishou_uid",jishou_uid);
    if (jishou_uid) {
        redirect('/my');
    }
};