import './db.mjs';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express'
import fetch from 'node-fetch';
import cors from 'cors';
import moment from 'moment';



const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const Restaurant = mongoose.model("Restaurant");
const Review = mongoose.model("Review");

async function addTimestampsToExistingDocuments() {
  try {
    // Get all the existing documents from the collection
    const restaurants = await Restaurant.find({});

    // Loop through each document and update the 'updatedAt' field with the current timestamp
    for (const restaurant of restaurants) {
      restaurant.updatedAt = moment().toDate(); // Set 'updatedAt' to the current date
      await restaurant.save(); // Save the updated document back to the database
    }

    console.log('Timestamps added to all documents successfully.');

  } catch (error) {
    console.error('Error adding timestamps:', error);
  }
}

// Call the function to start the process
await addTimestampsToExistingDocuments();

app.post('/display', async (req, res) => {
    const { term, location } = req.body;
    const ouryelp = process.env.YELP_API_KEY;
    fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=best_match&categories=restaurants,All`,
        { headers: { Authorization: `Bearer ${ouryelp}` } }
    )
        .then((resp) => resp.json())
        .then(async (respJson) => {
            let docarr = []
            console.log("respjson:", respJson);
            if (respJson.error) {
                res.json([])
            } else {
                if (respJson.businesses.length > 0) {
                    for (const business of respJson.businesses) {
                        try {
                            const isRestaurant = await Restaurant.findOne({ id: business.id });
                            if (!isRestaurant) {
                                const restaurant = new Restaurant({
                                    id: business.id,
                                    name: business.name,
                                    url: business.url,
                                    imageSrc: business.image_url,
                                    address: business.location.address1,
                                    city: business.location.city,
                                    state: business.location.state,
                                    zipCode: business.location.zipCode,
                                    category: business.categories[0].title,
                                    rating: business.rating,
                                    reviewCount: business.review_count
                                })
                                await restaurant.save();
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    res.json(await Restaurant.find({}).sort({ updatedAt: -1 }));
                } else {
                    res.json([]);
                }
            }
        })
})

app.post('/reviews/:slug', (req, res) => {
    const review = new Review({
        title: req.body.title,
        rating: req.body.rating,
        text: req.body.description
    });
    Restaurant.findOne({slug: req.params.slug}, (err, restaurant) => {
        if (restaurant) {
            review.restaurant = restaurant;
            review.save();
            restaurant.reviews.push(review);
            restaurant.save();
        }
    })
})


app.listen(process.env.PORT || 3001);