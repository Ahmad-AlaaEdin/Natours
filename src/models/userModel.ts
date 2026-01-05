import mongoose, { Document, Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Define the User interface
interface IUser {
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm?: string;
  role: 'user' | 'guide' | 'lead-guide' | 'admin';
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: boolean;
}

// Define methods interface
interface IUserMethods {
  checkPassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

// Create a type that combines IUser and IUserMethods
type UserDocument = Document & IUser & IUserMethods;

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Please Provid Your Name!'],
  },
  email: {
    type: String,
    required: [true, 'Please Provid Your Email!'],
    validate: [validator.isEmail, 'Please Provide a valid Email!'],
    unique: true,
  },
  photo: { type: String, default: 'default.jpg' },
  password: {
    type: String,
    required: [true, 'Please Provid A Password!'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm Your Password!'],
    validate: {
      validator: function (this: UserDocument, e: string): boolean {
        return e === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now());
  next();
});

userSchema.methods.checkPassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.changedPasswordAfter = function (
  this: UserDocument,
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      String(this.passwordChangedAt.getTime() / 1000),
      10,
    );

    return changedTimestamp > JWTTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function (
  this: UserDocument,
): string {
  const resetToken = crypto.randomBytes(36).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  userSchema,
);

export default User;
