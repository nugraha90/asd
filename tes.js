const redis = require('redis');
//g
const RedisUrl='redis://localhost:6379';
const publisher = redis.createClient({
  url: RedisUrl
});

(async () => {

  const article = { value: 'abc',score: 2 };

  await publisher.connect();
 // console.log(JSON.stringify(article));
  //await publisher.publish('article', JSON.stringify(article));
  await publisher.zAdd('art', [article] );
  
    async function addToSortedSet(key,db) {
        var LotOrAvg = db ==  'avgporto'  ? "avg" : "lot";
        for await (const  { score, value } of publisher.zScanIterator(db,
          { 
            TYPE: 'string', 
            MATCH: key, COUNT: 1
          }
          )){ 
            return await `[{"${LotOrAvg}":${score},"tricker":"${value}"}]`; 
          }
      }
  
  console.log(await addToSortedSet('abc','art'))
  
  publisher.quit()
})();
