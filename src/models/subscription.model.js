import mongoose, {Schema} from 'mongoose';

const subscriptionSchema = new Schema({
    subscriber : {
      type: Schema.Types.ObjectId, //one who is subscribing
      ref: 'User',
      required: true
    },
    channel: {
      type: Schema.Types.ObjectId, //the channel being subscribed to
      ref: 'User',
      required: true
    }
}, {
  timestamps: true
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);