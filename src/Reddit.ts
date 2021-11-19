import Snoowrap from 'snoowrap';
import snoowConf from './utils/snow';

class Reddit {
    private snoo: Snoowrap | null = null;

    initAppOnly(accessToken: string, refreshToken: string): void {
        this.snoo = snoowConf(accessToken, refreshToken);
        this.snoo.config({
            proxies: false,
        });
    }
}
