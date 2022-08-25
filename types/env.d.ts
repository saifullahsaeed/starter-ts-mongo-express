declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_DB_CONNECTION_STRING: string;
      MONGO_DB_NAME: string;
      SESSION_COOKIE_NAME: string;
      SESSION_SECRET: string;
    }
  }
}

export {}
