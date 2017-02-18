/*
 * This is the actual logic behind the messages
 */
import * as wiki from './wiki';
import responses from './responses';

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
          ]
}
},
greetingMessage: "Hello world!",
invalidMessage: "Sorry, didn't understand that!",
failure: "Sorry, something went wrong!",
hereYouGo: "Here's a cool article",
locationInstruction: {
text: 'Please share your location.',
quick_replies: [
                {
                "content_type":"location",
                }
                ]
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
                       resolve([responses.greetingMessage, responses.instructions]);
                       } else if(message.text === 'random') {
                       wiki.getRandomWikiArticleLink()
                       .then(link => {
                             resolve([responses.hereYouGo, link]);
                             }).catch(() => {
                                      resolve([responses.failure])
                                      })
                       } // ADD THIS STATEMENT
                       else if(responses.hasOwnProperty(message.text)) {
                       resolve([responses[message.text]]);
                       } else {
                       resolve([responses.invalidMessage]);
                       }
                       });
};

curl -X POST -H "Content-Type: application/json" -d '{
"setting_type":"greeting",
"greeting":{
    "text":"Hi {{user_first_name}}, welcome to this bot."
}
}' 

curl -X POST -H "Content-Type: application/json" -d '{
"setting_type":"call_to_actions",
"thread_state":"new_thread",
"call_to_actions":[
                   {
                   "payload":"USER_DEFINED_PAYLOAD"
                   }
                   ],
"result": "Successfully added new_thread's CTAs"
}'
