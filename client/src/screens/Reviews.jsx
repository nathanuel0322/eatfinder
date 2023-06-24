import '../assets/css/Reviews.css'
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchlink } from '../components/MyRoutes';

export default function Reviews() {
    const [reviewfinished, setReviewFinished] = useState(false);
    const { slug } = useParams();
    const businessName = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState("");

    return (
        <div>
            {reviewfinished ? 
                <div id='thanksdiv' className='flex flex-col items-center justify-center' style={{ marginTop: '23vh'}}>
                    <h2 className='text-center'>Thank you for your review!</h2> 
                    <Link to="/" className='flex mt-4'>
                        <button className='rounded-2xl' id='backtohome' style={{padding: '0.25rem 1rem', fontWeight: 400}}>Back to Home</button>
                    </Link>
                </div>
            : 
                <div>
                    <h2 className='text-center mt-4 text-xl font-semibold' style={{color: 'darkorange'}} >Leave a Review for {businessName}</h2>
                    <form 
                        onSubmit={() => {
                            fetch(`${fetchlink}/reviews/${slug}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    title: title,
                                    rating: rating,
                                    description: description
                                })
                            })
                            setReviewFinished(true);
                        }}
                        className='flex flex-col gap-y-4 items-center mt-4'
                    >
                        <label for="title" style={{color: 'turquoise'}}>Title of Review</label>
                        <input id="title" className='p-2 w-64 rounded-lg' name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label for="rating">How many stars? (1-5)</label>
                        <input className='rounded-lg' type="number" id="rating" name="rating" max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
                        <label for="description">Description</label>
                        <textarea id="description" className='text-black h-60 p-2 mx-4 rounded-xl w-3/5 sm:w-2/5 lg:w-4/12' name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <button type="submit" className='submit mb-4'>Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}