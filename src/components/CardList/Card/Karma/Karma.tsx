import React from 'react';

import styles from './styles.module.scss';

const Karma: React.FC = () => {
    const [karmaCount, setKarmaCount] = React.useState<number>(0);

    const handleKarmaUp = React.useCallback(() => setKarmaCount(prev => ++prev), []);
    const handleKarmaDown = React.useCallback(() => setKarmaCount(prev => (prev > 0 ? --prev : 0)), []);
    return (
        <div className={styles.karma}>
            <button className={styles.karma__up} onClick={handleKarmaUp} />
            <span className={styles.karma__count}>{karmaCount}</span>
            <button className={styles.karma__down} onClick={handleKarmaDown} />
        </div>
    );
};

export default Karma;
