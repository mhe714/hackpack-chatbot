import request from 'request-promise';
import _ from 'lodash';

export const getPicture = (category, freq) => {
    return request({
        url: "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/"+category+"/"+freq+".json?api-key=7585392444dd47af824efa8ea383e9a5&q=trump",
        qs: {
            'api-key': "7585392444dd47af824efa8ea383e9a5",
            'q': "trump"
        }
    }).then(data => {
        if(data) {
            data = JSON.parse(data);
            return data;
        } else {
            throw new Error('failed to parse id from nyt response');
        }
    })
};
