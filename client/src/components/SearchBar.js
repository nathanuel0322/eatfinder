import React, {useEffect, useState} from 'react'
import '../assets/css/SearchBar.css';
import { fetchlink } from './MyRoutes';
import toast from 'react-hot-toast';

export default function SearchBar({setBusinesses}) {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [searchclicked, setSearchClicked] = useState(false);

    const handleTermChange = (e) => {
        // if there is an 's' at the end of the word, remove it
        if (e.target.value[e.target.value.length - 1] === 's') {
            // if there is also an 'e' before the 's', remove it
            if (e.target.value[e.target.value.length - 2] === 'e') {
                setTerm(e.target.value.slice(0, -2).replace(/the /g, '').trim());
            } else {
                setTerm(e.target.value.slice(0, -1).replace(/the /g, '').trim());
            }
        } else {
            setTerm(e.target.value.trim());
        }
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    useEffect(() => {
        if (searchclicked) {
            toast.promise(
                fetch(`${fetchlink}/display`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ term, location })
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log("data from search:", data);
                        if (data.length === 0) {
                            setBusinesses('No businesses found');
                        } else {
                            const termMatch = data.filter((biz) => biz.name.toLowerCase().includes(term.toLowerCase()));
                            setBusinesses(termMatch.length > 0 ? termMatch : "No businesses found");
                        }

                        return true;
                    })
                    .catch((err) => {
                        console.error("err from search:", err)
                        throw err;
                    })
                    .finally(() => {
                        setSearchClicked(false)
                    }),
                {
                    loading: 'Searching',
                    success: 'Done!',
                    error: (err) => `Something went wrong: ${err.toString()}`,
                },
                {
                    position: 'top-center',
                    style: {
                        background: '#61d345',
                        color: '#fff',
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#61d345',
                    },
                }
            );
        }
    }, [searchclicked])

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex-col mt-8">
            <form className="flex mb-7 flex-col items-center" onSubmit={handleSearch}>
                <input className="SearchBar-fields" type="text" placeholder='Search Restaurants' onChange={handleTermChange} />
                <input className="SearchBar-fields" type="text" placeholder='Where?' onChange={handleLocationChange} />
                <button className="SearchBar-submit" type="submit" onClick={() => setSearchClicked(!searchclicked)}
                    disabled={searchclicked}
                >
                    Search
                </button>
            </form>
        </div>
    )
}