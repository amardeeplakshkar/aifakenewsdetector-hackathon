'use client'

import React, { useEffect, useState } from 'react';
import BodyExtractor from 'extract-main-text';

const TextExtractor = ({ url }) => {
    const [title, setTitle] = useState('');
    const [mainText, setMainText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const extractor = new BodyExtractor({ url });

        extractor.analyze()
            .then(() => {
                setTitle(extractor.title);
                setMainText(extractor.mainText);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>{title}</h1>
            <p>{mainText}</p>
        </div>
    );
};

export default TextExtractor;