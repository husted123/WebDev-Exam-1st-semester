import { click } from '@testing-library/user-event/dist/click';
import React, { useEffect, useState } from 'react'
import { Nav } from '../../components'
import { IFilter } from '../../types';
import { Location, Filter } from './components'

export const Explore = () => {

    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(10);
    const [categories, setCategories] = useState<number[]>([]);

    useEffect(() => {
        const filter = {
            longtitude: longtitude,
            latutide: latitude,
            searchString: searchString,
            sortBy: sortBy,
            maxDistance: maxDistance,
            categories: categories
        }



    }, [longtitude, latitude, searchString, sortBy, maxDistance, categories])


    return (
        <>
            <Location 
            longtitude={longtitude}
            latitude={latitude}
            setLongtitude={setLongtitude}
            setLatitude={setLatitude}
            />
            <Filter 
                searchString={searchString}
                sortBy={sortBy}
                maxDistance={maxDistance}
                setSearchString={setSearchString}
                setMaxDistance={setMaxDistance}
                setSortBy={setSortBy}
            />

                
            <Nav />
        </>
    )
}
