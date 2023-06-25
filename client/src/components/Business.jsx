import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/business.css';

export default function Business({business}) {
  return (
    <div className="flex flex-col justify-center w-64 mt-0 mx-2 mb-9">
      <a href={business.url} target="_blank" rel="noreferrer" className='relative businesslink'>
        <img
          className='max-w-full max-h-full rounded-lg'
          src={business.imageSrc ? business.imageSrc : "https://th.bing.com/th/id/R.e5cb296b866f6594cd02ffae9b4c5fde?rik=buYJcX5y%2fBpZvw&riu=http%3a%2f%2fwww.spottedbylocals.com%2fwp-content%2fuploads%2fiStock_72490647_MEDIUM.jpg&ehk=Erd8WH0xHBXWAGawsoJF4q3QPPTtBgp1IiW2Gu8XAp0%3d&risl=&pid=ImgRaw&r=0"} 
          alt={business.name}
        />
      </a>
      <h2 className='self-center text-3xl my-2'>{business.name}</h2>
      <div className="Business-information flex justify-between">
        <div>
          <p>{business.address}</p>
          <p>{business.city}</p>
          <p>{business.state} {business.zipCode}</p>
        </div>
        <div className="flex flex-col text-right">
          <h3 className='font-semibold' style={{color: '#CCA353'}}>{business.category}</h3>
          <img 
            src={business.rating % 1 === 0 ?
              require(`../assets/images/regular_${business.rating}.png`) 
            : 
              require(`../assets/images/regular_${Math.floor(business.rating)}_half.png`)
            }
            className='my-1 self-end'
            alt='rating' 
          />
          <p>{business.reviewCount} reviews</p>
        </div>
      </div>
      <Link to={`/${business.slug}`} className="reviewbutton text-center rounded-lg w-3/5 text-white">Leave a Review</Link>
      {business.reviews.length !== 0 && 
        <div className='flex flex-col items-center gap-y-1'>
          <p style={{backgroundColor: 'darkorange'}} className='w-40 p-1 text-center rounded-lg'>EatFinder Reviews</p>
          {business.reviews.map((review, index) => {
            return (
              <div className="flex flex-col items-center">
                <p className='underline'>Review {index+1}</p>
                <h3>{review[0].title}</h3>
                <img 
                  src={review[0].rating % 1 === 0 ?
                    require(`../assets/images/regular_${review[0].rating}.png`) 
                  : 
                    require(`../assets/images/regular_${Math.floor(review[0].rating)}_half.png`)
                  }
                  className='my-1'
                  alt='rating' 
                />
                <p>{review[0].text}</p>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}