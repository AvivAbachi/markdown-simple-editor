import 'rsuite/dist/styles/rsuite-default.min.css';
import '../styles/globals.css';
import '../styles/app.scss';
import React from 'react';
import type {AppProps} from 'next/app';

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => <Component {...pageProps} />;

export default MyApp;
