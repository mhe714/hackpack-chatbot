/*
 * This is the actual logic behind the messages
 */
import * as wiki from './wiki';
import responses from './responses';
import * as nyt from './nyt_search';
/*
 {setting_type : 'domain_whitelisting',
 whitelisted_domains : ["https://nytimes.com/","https://nyt.com","https://treehacks.com"],
 domain_action_type: 'add'};
*/
const defaultResponses = {
  instructions: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: "Choose or type in one of the following keywords: U.S., World, The Upshot, Sports, Opinion, Fashion & Style, Magazine, Arts, Travel, Your Money, Food, Books",
      buttons: [
        {
          type: 'postback',
          title: 'U.S.',
          payload: 'U.S.'
        },
        {
          type: 'postback',
          title: 'World',
          payload: 'World'
        },
        {
          type: 'postback',
          title: 'All Sections',
          payload: 'all-sections'
        },
      ]
    }
  },
greetingMessage:"Greetings from the unofficial New York Times Mesenger Bot! You can read the top NYT articles across different sections right here.",
    
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
  },
  newsMessage:{
    type: 'template',
    payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'Breaking News: Record Thunderstorms',
            subtitle: 'The local area is due for record thunderstorms over the weekend.',
            image_url: "https://www.treehacks.com/resources/8b33313807172d5cdb9ccaef39fd3d6b.png",
            default_action: {
              type: 'web_url',
              url: "https://www.nytimes.com",
              messenger_extensions: false,
              webview_height_ratio: 'tall',
              fallback_url: "https://www.nytimes.com"
            },
            buttons:[
              {
                type: 'element_share'
              }              
            ]
          }
        ]
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
    if(message.text === 'Get Started') {
      resolve([defaultResponses.greetingMessage, defaultResponses.instructions]);
    } else if(message.text === 'random') {
      wiki.getRandomWikiArticleLink()
        .then(link => {
            resolve([defaultResponses.hereYouGo, link]);
        }).catch(() => {
            resolve([responses.failure])
        })
    } else if(message.text === 'U.S.' || message.text === 'World' || message.text === 'Education' || message.text === 'The Upshot'
              || message.text === 'Technology' || message.text === 'all-sections' || message.text === 'Sports'
              || message.text === 'Opinion' || message.text === 'Movies' || message.text === 'Fashion & Style' || message.text === 'Health'
              || message.text === 'Magazine' || message.text === 'Multimedia' || message.text === 'Arts' || message.text === 'Sunday Review'
              || message.text === 'Travel' || message.text === 'Your Money' || message.text === 'Food' || message.text === 'Books' ) {
        
        var cat = message.text;
        var freq = 1;
                     
        nyt.getArticle(cat, freq)
        .then(result => {
              var msg = {newsMessage:{
              type: 'template',
              payload: {
              template_type: 'generic',
              //top_element_style: 'large',
              elements: [
                    {
                         title: result['results'][0]['title'],
                         subtitle: result['results'][0]['abstract'],
                         image_url: result.results[0].media[0]['media-metadata'][2].url,
                         default_action: {
                         type: 'web_url',
                         url: result.results[0].url,
                         messenger_extensions: false,
                         webview_height_ratio: 'tall',
                         //fallback_url: "https://www.nytimes.com"
                         },
                         buttons:[
                                  {
                                  type: 'element_share'
                                  }              
                        ]
                    },
                    {
                         title: result['results'][1]['title'],
                         subtitle: result['results'][1]['abstract'],
                         image_url: result.results[1].media[0]['media-metadata'][2].url,
                         default_action: {
                         type: 'web_url',
                         url: result.results[1].url,
                         messenger_extensions: false,
                         webview_height_ratio: 'tall',
                         //fallback_url: "https://www.nytimes.com"
                         },
                         buttons:[
                                  {
                                  type: 'element_share'
                                  }              
                        ]
                    },
                    {
                         title: result['results'][2]['title'],
                         subtitle: result['results'][2]['abstract'],
                         image_url: result.results[2].media[0]['media-metadata'][2].url,
                         default_action: {
                         type: 'web_url',
                         url: result.results[2].url,
                         messenger_extensions: false,
                         webview_height_ratio: 'tall',
                         //fallback_url: "https://www.nytimes.com"
                         },
                         buttons:[
                                  {
                                  type: 'element_share'
                                  }              
                        ]
                    },
                    {
                         title: result['results'][3]['title'],
                         subtitle: result['results'][3]['abstract'],
                         image_url: result.results[3].media[0]['media-metadata'][2].url,
                         default_action: {
                         type: 'web_url',
                         url: result.results[3].url,
                         messenger_extensions: false,
                         webview_height_ratio: 'tall',
                         //fallback_url: "https://www.nytimes.com"
                         },
                         buttons:[
                                  {
                                  type: 'element_share'
                                  }              
                        ]
                    },
                    {
                         title: result['results'][4]['title'],
                         subtitle: result['results'][4]['abstract'],
                         image_url: result.results[4].media[0]['media-metadata'][2].url,
                         default_action: {
                         type: 'web_url',
                         url: result.results[4].url,
                         messenger_extensions: false,
                         webview_height_ratio: 'tall',
                         //fallback_url: "https://www.nytimes.com"
                         },
                         buttons:[
                                  {
                                  type: 'element_share'
                                  }              
                        ]
                    }
                ]
              }}}
              resolve([msg.newsMessage]);
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
