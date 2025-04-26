// src/services/api.js
import { ofetch } from 'ofetch';

import { api, createAuthenticatedApi } from './api';
import { createUserService } from './userService';

export {
    api,
    createAuthenticatedApi,
    createUserService,
};
