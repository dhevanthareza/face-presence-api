import express from 'express';
import 'reflect-metadata';
import { asyncHandler } from './modules/core/helpers/asyncHandler';
import { RootRouter } from './router/router';

const RouteLoader = (app: express.Application) => {
  app.use(asyncHandler(RootRouter))
};

export = RouteLoader;
