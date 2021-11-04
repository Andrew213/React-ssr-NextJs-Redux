import React from 'react';

export const highlightMatches = (text: string, highlight: string): React.ReactNode => {
    highlight = highlight.trim();

    if (!text || !highlight || /^[+*?]$/.test(highlight)) {
        return text;
    }

    const isFormattedNumber = /^[+][\d]\s[\d\s-]*[\d]$/.test(text) && text.length === 16;
    // const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(text);

    if (isFormattedNumber) {
        return formattedNumberHighlightMatches(text, highlight);
    }

    // if (isIpAddress) {
    //     return ipHighlightMatches(text, highlight);
    // }

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <mark key={index} className="cm-highlight">
                        {part}
                    </mark>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );
};
const formattedNumberHighlightMatches = (text: string, highlight: string): React.ReactNode => {
    const filterRegexpPattern = highlight.length > 1 ? highlight.split('').join('\\s?-?') + '\\s?-?' : highlight;
    const filterRegexp = new RegExp(`(${filterRegexpPattern})`, 'gi');
    const parts = text.split(filterRegexp);
    return (
        <span>
            {parts.map((part, index) =>
                filterRegexp.test(part.toLowerCase()) ? (
                    <mark key={index} className="cm-highlight">
                        {part}
                    </mark>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );
};
