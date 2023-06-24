import React, {useState} from 'react'
import '../assets/css/SearchBar.css';
import { fetchlink } from './MyRoutes';

export default function SearchBar({setBusinesses}) {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');

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

    const handleSearch = (e) => {
        e.preventDefault();
        const searchButton = document.querySelector('.SearchBar-submit');
        searchButton.innerText = "Searching...";
        searchButton.disabled = true;

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
                }
                else {
                    const termMatch = data.filter((biz) => biz.name.toLowerCase().includes(term.toLowerCase()));
                    setBusinesses(termMatch.length > 0 ? termMatch : "No businesses found");
                }
            })
            .catch((err) => {
                console.log("err from search:", err)
                alert("Error from search:", err, "please try again");
            })
            .finally(() => {
                searchButton.innerText = "Search";
                searchButton.disabled = false;
            })

    }

    return (
        <div className="flex-col mt-8">
            <form className="flex mb-7 flex-col items-center" onSubmit={handleSearch}>
                <input className="SearchBar-fields" type="text" placeholder='Search Restaurants' onChange={handleTermChange} />
                <input className="SearchBar-fields" type="text" placeholder='Where?' onChange={handleLocationChange} />
                <button className="SearchBar-submit" type="submit">Search</button>
            </form>
        </div>
    )
}