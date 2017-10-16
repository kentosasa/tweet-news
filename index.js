require('dotenv').config();
var twitter = require('twitter');
var twc = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});
var client = require('cheerio-httpcli');

const getHomeTimeline = () => {
  twc.get('statuses/home_timeline', {count: 200}, function(error, tweets, response) {
    if (error) {
      throw new Error('something has happend in home_timeline')
      return
    }

    tweets.forEach(tweet => {
      if(tweet.entities.urls.length > 0) {
        const url = tweet.entities.urls[0].expanded_url
        if(url.includes('https://twitter.com')) return
        client.fetch(url, {}, function (err, $, res) {
          if(err) {
            return
          }
          // ScrapBox用に出力
          console.log('[' + $('title').text() + ' ' + url + ']')
        })
      }
    })
  });
}

const getLists = () => {
  twc.get('lists/list.json', {screen_name: 'sasa_sfc', count: 5}, function(error, list, response) {
    if (error) {
      throw new Error('something has happend in show lists')
      return
    }
    console.log(response)
    console.log(list)
  })
}

// masuilab 6598839

const getListTimeline = (listId) => {
  twc.get('lists/statuses.json', {list_id: listId, count: 200}, function(error, tweets, response) {
    if (error) {
      throw new Error('something has happend in home_timeline')
      return
    }

    tweets.forEach(tweet => {
      if(tweet.entities.urls.length > 0) {
        const url = tweet.entities.urls[0].expanded_url
        if(url.includes('https://twitter.com')) return
        client.fetch(url, {}, function (err, $, res) {
          if(err) {
            return
          }
          // ScrapBox用に出力
          console.log('[' + $('title').text() + ' ' + url + ']')
        })
      }
    })
  })
}

const masuilabId = '6598839'
// getListTimeline(masuilabId)

getHomeTimeline()