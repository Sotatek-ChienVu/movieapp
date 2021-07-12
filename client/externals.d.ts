declare module '*.scss' {
    const resource: {[key: string]: string};
    export = resource;
  }
  declare module 'react-image-zoom';
  declare module 'react-router-dom';
  declare module 'react-router';
  declare module 'react-messenger-customer-chat';
  declare module 'socket.io-client';
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly URL: string;
    }
  }
