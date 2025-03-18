import DateFNS from 'date-fns';
import Mongoose from 'mongoose';

/* TYPES */
import { ISubscriptionDocument } from '../types/subscription';

const SubscriptionSchema = new Mongoose.Schema<ISubscriptionDocument>(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Price must be greater than 0'],
    },
    currency: {
      type: String,
      enum: ['IDR', 'SGD', 'USD'],
      default: 'IDR',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      default: 'monthly',
    },
    category: {
      type: String,
      enum: [
        'sports',
        'news',
        'entertainment',
        'lifestyle',
        'technology',
        'finance',
        'politics',
        'other',
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value: NativeDate) => value <= new Date(),
        message: 'Start date must be in the past',
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value: NativeDate) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after the start date',
      },
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Auto-calculate renewal date if missing.
SubscriptionSchema.pre('save', function (this: ISubscriptionDocument, next) {
  if (!this.renewalDate) {
    const start = new Date(this.startDate);
    this.renewalDate =
      this.frequency === 'daily'
        ? DateFNS.addDays(start, 1)
        : this.frequency === 'weekly'
          ? DateFNS.addWeeks(start, 1)
          : this.frequency === 'monthly'
            ? DateFNS.addMonths(start, 1)
            : DateFNS.addYears(start, 1);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});

export default Mongoose.model('Subscription', SubscriptionSchema);
