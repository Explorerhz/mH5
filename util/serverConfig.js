
function pageCacheTime(){
    let time = 0;
    if(process){
        // eslint-disable-next-line no-undef
        if(process.env.NODE_ENV == 'development'){
            time = 0;
        }else if(process.env.NODE_ENV == 'test'){
            time = 0;
        }else{
            time = 60;
        }
    }
    return time;
}

module.exports = {
  PORT: 8082,
  HOST: "0.0.0.0",
  CACHE_MAX: 1000,
  CACHE_MAX_AGE: 1000 * 60 * 60,
  PAGE_CACHE_TIME: pageCacheTime() * 1000
};