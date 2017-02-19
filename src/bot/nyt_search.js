import request from 'request-promise';
import _ from 'lodash';

export const getArticle = (category, query) => {
    return request({
        url: "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/"+category+"/1.json?api-key=7585392444dd47af824efa8ea383e9a5&q="+query,
        qs: {
            'api-key': "7585392444dd47af824efa8ea383e9a5",
            'q': query
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
