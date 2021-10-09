import React from 'react';

export const declOfNum = (number: number, titles: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

function getWindowDimensions() {
    if (typeof window !== 'undefined') {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const add = (a: any) => (b: any) => a + b;

export function pickFromSyntheticEvent<T extends HTMLElement>() {
    return <K extends keyof T>(key: K) => <E extends (t: T[K]) => void>(fn: E) => (e: React.SyntheticEvent<T>) =>
        fn(e.currentTarget[key]);
}

function compose<U>(...fn: { (prevValue: any): void }[]) {
    return (initialValue: any): U => fn.reduceRight((prevValue, fn) => fn(prevValue), initialValue);
}

function pick<K extends string>(prop: K) {
    return <O extends Record<K, any>>(obj: O) => obj[prop];
}

function pipe<U>(...fns: { (a: any): void }[]) {
    return <E>(initValue: any): U => fns.reduce((prevValue, fn) => fn(prevValue), initValue);
}
export function formatUnixDate(dateUnix) {
    const date = new Date(dateUnix * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
