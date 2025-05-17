import { Application, Router } from 'express';

import { PingController } from './controllers/Ping.controller';
import { LoginController } from './controllers/Login.controller';
import { RegisterController } from './controllers/Register.controller';
import { AssetController } from './controllers/Asset.controller';
import { WarrantyController } from './controllers/Warranty.controller';
import { AuthController } from './controllers/Auth.controller';

const endpoints: [string, Router][] = [
    ['/api/v1/ping', PingController],
    ['/api/v1/login', LoginController],
    ['/api/v1/register', RegisterController],
    ['/api/v1/assets', AssetController],
    ['/api/v1/warranty', WarrantyController],
    ['/api/v1/auth', AuthController]
];
export const routes = (app: Application): void => {
    endpoints.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
