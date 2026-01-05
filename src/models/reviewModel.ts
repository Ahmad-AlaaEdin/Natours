import mongoose, { Document, Schema, Model } from 'mongoose';
import Tour from './tourModel';

interface IReview {
  review: string;
  rating: number;
  createdAt: Date;
  user: mongoose.Types.ObjectId;
  tour: mongoose.Types.ObjectId;
}

interface IReviewMethods {
  // Instance methods can be added here if needed
}

interface IReviewStatics extends Model<ReviewDocument> {
  calcAverageRatings(tourId: mongoose.Types.ObjectId): Promise<void>;
}

type ReviewDocument = Document & IReview & IReviewMethods;

const reviewSchema = new Schema<ReviewDocument, IReviewStatics>(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.statics.calcAverageRatings = async function (
  tourId: mongoose.Types.ObjectId,
): Promise<void> {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};

reviewSchema.post('save', async function () {
  await (this.constructor as IReviewStatics).calcAverageRatings(this.tour);
});

reviewSchema.post(/^findOneAnd/, async function (doc: ReviewDocument) {
  if (doc) {
    await (doc.constructor as IReviewStatics).calcAverageRatings(doc.tour);
  }
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Review: IReviewStatics = mongoose.model<ReviewDocument, IReviewStatics>(
  'Review',
  reviewSchema,
);

export default Review;
