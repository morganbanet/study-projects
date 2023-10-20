import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    contactNumber: {
      type: String,
      maxLength: [20, 'Phone number cannot exceed 20 characters'],
      required: [true, 'Please add a phone number'],
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: [true, 'Please add a valid address'] },
      city: { type: String, required: [true, 'Please add a city'] },
      postCode: { type: String, required: [true, 'Please add a post code'] },
      country: { type: String, required: [true, 'Please add a country'] },
    },
    paymentMethod: {
      type: String,
      enum: ['PayPal', 'Cash On Delivery'],
      required: [true, 'Please add a payment method'],
    },
    paymentResult: {
      // PayPal
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    vatPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    grandTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model('Order', orderSchema);
export default Order;
