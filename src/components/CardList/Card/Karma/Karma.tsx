import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type KarmaProps = {
    className?: string;
    score?: number;
};

const Karma: React.FC<KarmaProps> = ({ className, score }) => {
    const [karmaCount, setKarmaCount] = React.useState<number>(score);

    const handleKarmaUp = React.useCallback(() => setKarmaCount(prev => ++prev), []);
    const handleKarmaDown = React.useCallback(() => setKarmaCount(prev => (prev > 0 ? --prev : 0)), []);
    return (
        <div className={cn(styles.karma, { [className]: className })}>
            <button className={styles.karma__up} onClick={handleKarmaUp} />
            <span className={styles.karma__count}>{karmaCount}</span>
            <button className={styles.karma__down} onClick={handleKarmaDown} />
        </div>
    );
};

export default Karma;
