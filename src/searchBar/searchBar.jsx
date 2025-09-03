import { useEffect, useRef, useState } from 'react';
import './searchBar.css';

function SearchBarMain() {
    const searchBarRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (searchBarRef.current) {
            observer.observe(searchBarRef.current);
        }
        return () => {
            if (searchBarRef.current) {
                observer.unobserve(searchBarRef.current);
            }
        };
    }, []);
    /*
    if (!isInView){
        console.log(1);
        return(
            
        );
    }
    */

    return (
        <>
        <div className="search-bar-container" ref={searchBarRef}>
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
            />
            <button className="search-button">Search</button>
        </div>
    </>
    );
}

export default SearchBarMain;