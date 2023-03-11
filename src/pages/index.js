import React from 'react';
import { Redirect } from '@docusaurus/router';

const Docs = () => {
    // jsdoc.app -> jsdoc.app/about-getting-started
    return <Redirect to="/about-getting-started" />;
};

export default Docs;
