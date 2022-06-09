import React from 'react';
import { Link } from "react-router-dom";
import './individual.css';

export default function Individual(props){
    
    return(
        <div>
            <div className='ind1'>
                <h1>{props.name}</h1>
            </div>
            <Link to={`/detail/${props.id}`}>
                <img src={props.image} alt='food' className='imgIndividual'/>
            </Link>
            <div>
            <div>
                <p className='indLik'>{props.punctuation}</p>
            </div>
            <img src={'https://i.pinimg.com/originals/0c/34/1b/0c341b4c20ef78a5e68160979d884be3.png'} className='imgLikes'/>

            <div>


            
            <div className='ind3'>
                <div>{props.diets[0] && props.diets[0]}</div>
            </div>
            <div className='ind4'>
                <div>{props?.diets[1] && props.diets[1]}</div>
            </div>
            <div className='ind5'>
                <div>{props.diets[2] && props.diets[2]}</div>
            </div>
            <div className='ind6'>
                <div>{props?.diets[3] && props.diets[3]}</div>
            </div>
            <div className='ind6'>
                <div>{props?.diets[4] && props.diets[4]}</div>
            </div>
            <div className='ind6'>
                <div>{props?.diets[5] && props.diets[5]}</div>
            </div>
            <div className='ind6'>
                <div>{props?.diets[6] && props.diets[6]}</div>
            </div>
            <div className='ind6'>
                <div>{props?.diets[7] && props.diets[7]}</div>
            </div>

        
            </div>
            </div>
        </div>
    )
}