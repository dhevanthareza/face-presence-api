import { Router } from 'express';
import { PresenceRouter } from './presence/presence.router';
import { UserRouter } from './user/user.router';

const RootRouter = Router();
RootRouter.use('/user', UserRouter);
RootRouter.use('/presence', PresenceRouter);

export { RootRouter };

