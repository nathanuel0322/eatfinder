import React from 'react'
import Business from './Business'

export default function BusinessList({businesses}) {
    return(
        <div className="flex justify-around flex-wrap mx-20 my-16">
            {Array.isArray(businesses) ? 
                businesses.map((business) => {
                    return <Business key={business.id} business={business} />
                })
                :
                <div className="no-results" style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>
                    <h3>No results found</h3>
                    <p>Try searching for something else</p>
                </div>
            }
        </div>
    )
}