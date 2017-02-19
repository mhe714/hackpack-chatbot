/*
 * This is the actual logic behind the messages
 */
import * as wiki from './wiki';
import responses from './responses';
import * as nyt from './nyt_search';

const defaultResponses = {
  // these are just some various responses you might want to send
  instructions: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: "Get a random article!",
      buttons: [
        {
          type: 'postback',
          title: 'Press me!',
          payload: 'random'
        },
        {
          type: 'postback',
          title: 'Show me a picure!',
          payload: 'picture'
        },
      ]
    }
  },
  greetingMessage: "Hello world!",
  invalidMessage: "Sorry, didn't understand that!",
  failure: "Sorry, something went wrong!",
  hereYouGo: "Here's a cool article! -> ",
  locationInstruction: {
    text: 'Please share your location.',
    quick_replies: [
      {
        "content_type":"location",
      }
    ]
  },
  pictures: {
    type:'image',
    payload: {
      url:"https://www.treehacks.com/resources/8b33313807172d5cdb9ccaef39fd3d6b.png"
    }
  }
}

export const handleMessage = ({message, userKey}) => {
  return getResponsesForMessage({message, userKey})
  .then(messages => {
    return generateMessagesFromArray(messages, userKey);
  })
};

const generateMessagesFromArray = (messages, key) => {
  let msgs = [];

  messages.forEach(message => {
    msgs = msgs.concat(buildMessage(message, key));
  });

  return msgs;
};

const buildMessage = (message, key) => {
  if(typeof message === 'string') {
    return {
      text: message,
      key
    }
  } else if(typeof message === 'object') {
    return {
      attachment: message,
      key
    }
  }
};

const getResponsesForMessage = ({message, userKey}) => {
  return new Promise((resolve, reject) => {
    if(message.text === 'hi') {
      resolve([defaultResponses.greetingMessage, defaultResponses.instructions]);
    } else if(message.text === 'random') {
      wiki.getRandomWikiArticleLink()
        .then(link => {
            resolve([defaultResponses.hereYouGo, link]);
        }).catch(() => {
            resolve([responses.failure])
        })
    } else if(message.text === 'picture') {
        var cat = "Opinion";
        var freq = 1;
                     
        nyt.getPicture(cat, freq)
        .then(result => {
              var title = result['results'][0]['title'];
              var abstract = result['results'][0]['abstract'];
              var pic = result.results[0].media[0]['media-metadata'][2].url;
              resolve([title, abstract, pic]);
        }).catch(() => {
            resolve([responses.failure])
        })
    } else if(responses.hasOwnProperty(message.text)) {
      resolve([responses[message.text]]);
    } else {
      resolve([defaultResponses.invalidMessage]);
    }
  });
};
