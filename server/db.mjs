// import dotenv from 'dotenv-vault-core';
// dotenv.config();
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
const CONNECTION_STRING = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URL : "mongodb://127.0.0.1:27017/eatfinder";
mongoose.connect(CONNECTION_STRING);

// a restuarant list
// * every restaurant list has various essential information in reference to the restaurant
const RestaurantSchema = new mongoose.Schema({
  url: {type: String},
  id: {type: String},
  imageSrc: {type: String},
  name: {type: String},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  category: {type: String},
  rating: {type: Number},
  reviewCount: {type: Number},
  reviews: [{ type: mongoose.Schema.Types.Array, ref: 'Review' }],
}, { timestamps: true });

// one -- many

// a review schema
// * every review has various essential information in reference to the review
const ReviewSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  title: {type: String, required: true},
  rating: {type: Number, required: true},
  text: {type: String, required: true},
}, { timestamps: true });

// slugs leave behind trails, mcdonalds, mcdonalds-2, /restaurant/mcdonalds-2 
RestaurantSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

mongoose.model('Review', ReviewSchema);
mongoose.model('Restaurant', RestaurantSchema);