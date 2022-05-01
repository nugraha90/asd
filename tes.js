const redis = require('redis');
const RedisUrl='redis://localhost:6379';
const publisher = redis.createClient({
  url: RedisUrl
});

(async () => {

  const article = {
    id: '123456',
    name: 'hallo',
    blog: 'Logrocket Blog',
  };

  await publisher.connect();
  console.log(JSON.stringify(article));
  await publisher.publish('article', JSON.stringify(article));
})();
