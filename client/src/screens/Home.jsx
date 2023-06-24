import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BusinessList from '../components/BusinessList';

export default function Home () {
    const [businesses, setBusinesses] = useState([]);
    return (
        <div className="App">
            <SearchBar setBusinesses={setBusinesses} />
            <BusinessList businesses={businesses} />
        </div>
    );
}