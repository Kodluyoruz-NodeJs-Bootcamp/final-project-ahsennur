import { Request } from 'express';
import express from 'express';

import session from 'express-session';
import User from '../entity/User';

//types defined
declare module 'express-session' {
  export interface SessionData {
    userId: string;
    user: User;
  }
}

declare global {
  namespace Express {
    export interface Request {
      flash: string; 
    }
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    user?: User | Express.User;
    flash: any;
  }
}
declare global {
  export interface Window {
    location: any;
  }
}

declare global {
  namespace NodeJS {
    export interface Global {
      userIN: User | undefined;
    }
  }
}
export default global;
