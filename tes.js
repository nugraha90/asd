const redis = require('redis');
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
  
          for await (const  { score, value } of publisher.zScanIterator('art',
          { 
            TYPE: 'string', 
            MATCH: key, COUNT: 1
          }
          )){ 
            console.log( await `[{art: ${score},"tricker":"${value}"}]`); 
          }
  
  publisher.quit()
})();
