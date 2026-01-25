import { Request, Response, NextFunction } from 'express';
import { Model, PopulateOptions } from 'mongoose';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import ApiFeatures from '../utils/apiFeatuers';

type QueryString = {
  sort?: string;
  limit?: string;
  page?: string;
  fields?: string;
  [key: string]: string | undefined;
};

export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No Document Found With This ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No Document Found With This ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });

export const getOne = <T>(
  Model: Model<T>,
  popOptions?: PopulateOptions | PopulateOptions[],
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No Document Found With This ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if ((req.params as { tourId?: string }).tourId)
      filter = { tour: (req.params as { tourId: string }).tourId };
    const features = new ApiFeatures(
      Model.find(filter),
      req.query as QueryString,
    )
      .filter()
      .sort()
      .limitFields();

    const total = await Model.countDocuments(features.query.getFilter());

    features.paginate();

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      total,
      results: docs.length,
      data: docs,
    });
  });
