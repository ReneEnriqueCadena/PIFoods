import React, { useState } from "react";
import { Link } from "react-router-dom"
import { validateN, validateP, validateD, validateS, blockButton } from "../../controllers/functions"
import './cardPost.css'
import axios from 'axios'
import { reload } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Post() {
    const [errD, setErrD] = useState(null);
    const [isCreateActive, setIsCreateActive] = useState("flase")
    var arrDiets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low fodmap', 'whole30']
    const dispatch = useDispatch();

    const [recip, setRecip] = useState({
        name: "",
        dishsummary: "",
        punctuation: "",
        stepbystep: null,
        healthyfoodlevel: "1",
        diet: [],

    });

    const [errors, setErrors] = useState({
        name: true,
        dishsummary: true,
        punctuation: true,
        stepbystep: true,
        diet: true

    });

    const handleName = (ev) => {
        setRecip({ ...recip, name: ev.target.value })
        setErrors({ ...errors, name: validateN(ev.target.value) })
    }

    const handleDishsummary = (ev) => {
        setRecip({ ...recip, dishsummary: ev.target.value })
        setErrors({ ...errors, dishsummary: validateD(ev.target.value) })

    }

    const handlePunctuation = (ev) => {
        setRecip({ ...recip, punctuation: ev.target.value })
        setErrors({ ...errors, punctuation: validateP(ev.target.value) })

    }

    const handleStepbystep = (ev) => {
        setRecip({ ...recip, stepbystep: ev.target.value })
        setErrors({ ...errors, stepbystep: validateS(ev.target.value) })

    }

    const handleHealthyfoodlevel = (ev) => {
        setRecip({ ...recip, healthyfoodlevel: ev.target.value })

    }

    const handleDiet = (d) => {
        var previewDiets = recip.diet;
        var hasError = false;
        if (previewDiets.length) {
            previewDiets.forEach((de) => {
                if (de === d) {
                    hasError = true
                }
            })
            if (hasError) {
                setRecip({ ...recip, diet: recip.diet.filter(e => e !== d) })
                setErrD('Diet remove successfully')
            } else {
                previewDiets.push(d)
                setRecip({ ...recip, diet: previewDiets })
                setErrors({ ...errors, diet: false })
                setErrD(null)
            }

        } else {
            previewDiets.push(d)
            setRecip({ ...recip, diet: previewDiets })
            setErrors({ ...errors, diet: false })
            setErrD(null)
        }
    }

    const handleForm = (ev) => {
        ev.preventDefault();
    }
    
    const handleCreate = async (ev) => {
        ev.preventDefault();
        setIsCreateActive()
        await axios.post('http://localhost:3001/recipe', recip)
        .then(function (response) {
            dispatch(reload())
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const handleCreateNew = (ev) => {
        ev.preventDefault();
        setIsCreateActive("false")
        setRecip({})
        setRecip({diet:[]})
        setErrors({
            name: true,
            dishsummary: true,
            punctuation: true,
            stepbystep: true,
            diet: true
        })
    }



    return (


        <div className="first2">
            {
                isCreateActive ?
                    <div>
                        <h1 className="cp9">Create new Recipe</h1>
                        <form
                            onSubmit={handleForm}
                        >
                            <label></label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Introduce Name"
                                value={recip.name}
                                onChange={handleName}
                                className='cp1'
                            ></input>
                            <p className="err1">{errors.name ? errors.name : null}</p>

                            <label></label>
                            <input
                                className="cp2"
                                type="text"
                                name="dishsummary"
                                placeholder="Introduce dishsummary"
                                value={recip.dishsummary}
                                onChange={handleDishsummary}
                            ></input>
                            <p className="err2">{errors.dishsummary ? errors.dishsummary : null}</p>

                            <label></label>
                            <input
                                className="cp3"
                                type="text"
                                name="punctuation"
                                placeholder="Introduce punctuation"
                                value={recip.punctuation}
                                onChange={handlePunctuation}
                            ></input>
                            <p className="err3">{errors.punctuation ? errors.punctuation : null}</p>

                            <label></label>
                            
                            <input
                                className="cp4"
                                type="text"
                                name="stepbystep"
                                placeholder="Introduce stepbystep"
                                value={recip.stepbystep}
                                onChange={handleStepbystep}
                            ></input>
                            <p className="err4">{errors.stepbystep ? errors.stepbystep : null}</p>

                            <label></label>
                            <select
                                className="cp5"
                                type="number"
                                name="healthyfoodlevel"
                                value={recip.healthyfoodlevel}
                                onChange={handleHealthyfoodlevel}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                            <p className="hpp1">Healty food</p>
                            <label></label>
                            <br></br>
                            <br></br>

                            <select
                                className="cp6"
                                type="text"
                                name="die"
                                value={recip.diet}
                                onClick={ev => handleDiet(ev.target.value)}
                                multiple={true}
                            >

                                {
                                    arrDiets.length ? arrDiets.map(e => (
                                        <option value={e}>{e}</option>
                                    )) : null
                                }

                            </select>
                            <p className="err10cp">{errD ? errD : null}</p>

                            <button
                                className="cp7"
                                type="submit"
                                disabled={blockButton(errors)}
                                value={recip}
                                onClick={ev => handleCreate(ev)}
                            >Create</button>
                        </form>


                        <Link to="/home" className="cp8">Cancel</Link>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    :
                    <div>
                        <h1 className="pc2">Recipe created successfully</h1>
                        <img src='https://static.vecteezy.com/system/resources/previews/001/200/261/non_2x/check-png.png' className="pc1"/>
                        <br></br>
                        <br></br>
                        <br></br>
                        

                        <Link to="/home" className="pc4">
                            <button>Homepage</button>
                        </Link>

                        <br></br>
                        <button
                            type="submit"
                            onClick={ev => handleCreateNew(ev)}
                            className='pc3'
                        >Create another recipe</button>
                        
                    </div>

            }

        </div>
    )
}


