import cookie from './cookie';

const wrapper = handler => {
    return (req, res, next) => {
        res.cookieArray = [];

        res.cookie = (name, value, options) => {
            cookie(res, name, value, options);
        };

        res.sendCookies = () => {
            res.setHeader('set-cookie', res.cookieArray);
        };

        return handler(req, res, next);
    };
};

export default wrapper;