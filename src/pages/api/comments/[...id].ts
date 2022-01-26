import axios from 'axios';
import fetch from 'node-fetch';

export default ({ query }, res) => {
    const newT = query.id.join('/');

    const xer = fetch(`https://api.reddit.com/${newT}/`)
        .then(r => r.json())
        .then(re => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(re));
        });
    // .catch(console.log);
    return xer;
};
