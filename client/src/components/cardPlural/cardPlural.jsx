import React, { useEffect, useState } from 'react';
import Individual from '../cardIndividual/cardIndividual';
import { useDispatch, useSelector } from 'react-redux';
import { obtener, filter, reloadserch } from '../../redux/actions';
import { Link } from "react-router-dom"
import { sortByNameAz, sortByNameZa, sortByHigh, sortByLow } from '../../controllers/functionsOrder';
import './card.css'

export default function Cards() {

    const dispatch = useDispatch();
    const foodRenderizar = useSelector((state) => state.foods);
    const foodSearchs = useSelector((state) => state.filtrados);
    const [currentPage, setCurrentPage] = useState(0);
    const [buttonBlok, setButtonBlok] = useState(false);
    const [numberPage, setNumberPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSorting, setIsSorting] = useState(false);
    const [pageUpdate, setPageUpdate] = useState([]);
    const [updating, setUpdating] = useState(null);
    const [updating2, setUpdating2] = useState(null);


    var arrDiets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low fodmap', 'whole30']

    const filteredFood = () => {
        return foodRenderizar.slice(currentPage, currentPage + 9);
    }

    const filteredFoodSearch = () => {
        return foodSearchs.slice(currentPage, currentPage + 9);
    }

    const sortFilteredFodd = () => {
        return pageUpdate.slice(currentPage, currentPage + 9)
    }

    useEffect(() => {
        if (!foodRenderizar.length) {
            dispatch(obtener());

        }
        else {
            setLoading(false)
        }
    }, [foodRenderizar, currentPage])

    const nexPage = () => {
        if (isSearchActive) {
            /* console.log(foodSearchs.length) */
            setButtonBlok(false)
            if (foodSearchs.length / 9 > numberPage) {
                setCurrentPage(currentPage + 9);
                setNumberPage(numberPage + 1)
                setButtonBlok(false)
            } else {
                setButtonBlok(true)
            }
        }
        if (isSorting) {
            setButtonBlok(false)
            if (pageUpdate.length / 9 > numberPage) {
                setCurrentPage(currentPage + 9);
                setNumberPage(numberPage + 1)
                setButtonBlok(false)
            } else {
                setButtonBlok(true)
            }
        }
        if (!isSorting && !isSearchActive) {
            setButtonBlok(false)
            if (foodRenderizar.length / 9 > numberPage) {
                setCurrentPage(currentPage + 9);
                setNumberPage(numberPage + 1)
                setButtonBlok(false)
            } else {
                setButtonBlok(true)
            }
        }

    }

    const prevPage = () => {
        if (numberPage !== 1) {
            setNumberPage(numberPage - 1)
            setCurrentPage(currentPage - 9);
            setButtonBlok(false);
        }
    }


    const onSearchChange = (event) => {
        event.preventDefault();
        if (!filteredFoodSearch.length) {
            setLoading(true)
        }
        setIsSearchActive(true)
        setCurrentPage(0);
        setNumberPage(1)
        dispatch(filter(search));
        setButtonBlok(false)
        setSearch('');

    }

    useEffect(() => {
        if (foodSearchs.length) {
            setLoading(false)
        }
    }, [foodSearchs])

    const handleInputChage = (event) => {
        setSearch(event.target.value);
        setLoading(true)
        dispatch(reloadserch());
    }

    const handleSort = (ev) => {
        setLoading(true);
        setIsSorting(true);
        setUpdating(ev)
        setPageUpdate(['ready'])
    }

    const handleRemove = () => {

        setIsSearchActive(false);
        setIsSorting(false);
        setCurrentPage(0);
        setNumberPage(1)
        setButtonBlok(false);
        setUpdating2(null);
        setUpdating(null)

    }

    useEffect(() => {
        if (pageUpdate[0] === 'ready') {
            if (updating === 'Z-A') {
                setPageUpdate(sortByNameZa(foodRenderizar, updating2))
                setLoading(false);
                setCurrentPage(0)
                setNumberPage(1)
            }
            if (updating === 'Highest score') {
                setPageUpdate(sortByHigh(foodRenderizar, updating2))
                setLoading(false);
                setCurrentPage(0)
                setNumberPage(1)
            }
            if (updating === 'Lowest score') {
                setPageUpdate(sortByLow(foodRenderizar, updating2))
                setLoading(false);
                setCurrentPage(0)
                setNumberPage(1)
            }
            if (updating === 'A-Z') {
                setPageUpdate(sortByNameAz(foodRenderizar, updating2))
                /* console.log(updating, updating2) */
                setLoading(false);
                setCurrentPage(0)
                setNumberPage(1)

            }
        }
    }, [updating, updating2], pageUpdate)

    const handleDiet = (ev) => {
        setButtonBlok(false)
        setPageUpdate(['ready'])
        setLoading(true);
        setIsSorting(true);
        setUpdating2(ev)
    }


    return (
        <div className='first3'>
            <Link to="/recipe" className='buttonNewR'>Create new Recipe</Link>
            <form
                className='h1'
            >

                <input
                    className='input1'
                    type='text'
                    placeholder='  Introduce Food'
                    value={search}
                    onChange={handleInputChage}
                />

                <button
                    className='search12'
                    type='submit'
                    onClick={e => onSearchChange(e)}
                >Search
                </button>

            </form>

            {isSearchActive ?

                <div className='h1search'>
                    <p>{search} search results</p>

                </div>

                :

                <div>


                    <p className='h2cop'>Sort by Diet</p>
                    <select
                        className='h2'
                        type="text"
                        name="diet"
                        onChange={ev => handleDiet(ev.target.value)}
                    >
                        <option>All foods</option>
                        {
                            arrDiets.length ? arrDiets.map(e => (
                                <option>{e}</option>
                            )) : null
                        }
                    </select>

                    <br></br>

                    <p className='h3cop'>Sort by</p>
                    <select
                        className='h3'
                        type="text"
                        name="die"
                        onChange={ev => handleSort(ev.target.value)}
                    >
                        <option disabled={true}>Choice an option</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                        <option>Highest score</option>
                        <option>Lowest score</option>

                    </select>

                </div>

            }
            <br></br>
            <br></br>

            <button disabled={numberPage === 1 ? true : false} className='h4' onClick={prevPage}>⋘</button>

            <button className='h6'>{numberPage}</button>

            <button disabled={buttonBlok} className='h5' onClick={nexPage}>⋙</button>

            <button className='h100' onClick={handleRemove}>Remove Filter</button>

            {
                loading ?
                    <div>
                        <h1>Loading Recipes</h1>
                        <img src='https://anmdecolombia.org.co/wp-content/plugins/interactive-3d-flipbook-powered-physics-engine/assets/images/dark-loader.gif' />
                    </div>
                    :
                    isSearchActive ?
                        filteredFoodSearch().length && filteredFoodSearch().map((f, posicion) =>

                            <Individual
                                key={posicion}
                                name={f.name}
                                image={f.image}
                                diets={f.diets}
                                punctuation={f.punctuation}
                                id={f.id} />

                        )
                        :
                        isSorting ?

                            sortFilteredFodd().length && sortFilteredFodd().map((f, posicion) =>

                                <Individual
                                    key={posicion}
                                    name={f.name}
                                    image={f.image}
                                    diets={f.diets}
                                    punctuation={f.punctuation}
                                    id={f.id} />
                            )

                            :

                            filteredFood().length && filteredFood().map((f, posicion) =>

                                <Individual
                                    key={posicion}
                                    name={f.name}
                                    image={f.image}
                                    diets={f.diets}
                                    punctuation={f.punctuation}
                                    id={f.id} />
                            )
            }




        </div>
    )
}