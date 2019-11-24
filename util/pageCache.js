const LRU = require("lru-cache");
// const zlib = require("zlib");
const config = require("./serverConfig");
const charset = "utf-8";

let cacheStore = new LRU({
  max: config.CACHE_MAX,
  maxAge: config.CACHE_MAX_AGE
});

let cachePage = [
  //'/',
  //'/ue',
  // '/fastsellercar'
];

module.exports.cacheSeconds = function() {
  return function(req, res, next) {
    const path = req.path;
    // console.log("是否缓存=",cachePage.includes(path));
    if (cachePage.includes(path) && config.PAGE_CACHE_TIME) {
      const key = req.originalUrl;
      const value = cacheStore.get(key);
      if (value) {
        // console.log("缓存命中，key=",key,config.PAGE_CACHE_TIME);
        // res.setHeader('Content-Encoding', "gzip");
        return res.end(value, charset);
      }

      res.original_end = res.end;
      res.end = function(data) {
        if (res.statusCode === 200 && config.PAGE_CACHE_TIME > 0) {
          //const data_ = zlib.gzipSync(data);
          cacheStore.set(key, data, config.PAGE_CACHE_TIME);
        }
        res.original_end(data, charset);
      };
    }
    next();
  };
};
