import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import './detail.css';
import axios from 'axios';

export default function Details() {

    const { id } = useParams();
    const [detail, setDetail] = useState();
    const [loading, setLoading] = useState(true);
   


    const handleBut = () => {
        setLoading(true)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/recipes/' + id).then((res) => {
            const detailData = res.data[0]
            if (detailData) {
                setDetail(detailData)
                setLoading(false)
                if (detailData.dishsummary) {
                    document.getElementById('TEST').innerHTML = detailData.dishsummary
                }
            }
        })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div>
            <img src='https://img.freepik.com/free-photo/healthy-vegetables-dryfruits-oil-raw-fish-wooden-table_23-2148026882.jpg?w=2000' className='dt1' />
            {

                loading ?

                    <div>
                        <h1 className='rp1'>Loading Recipe</h1>
                        <img className='rp2' src='https://anmdecolombia.org.co/wp-content/plugins/interactive-3d-flipbook-powered-physics-engine/assets/images/dark-loader.gif' />
                    </div>

                    :

                    <div>

                        <Link to="/home" className='dt2'>
                            <button onClick={() => handleBut}>Home</button>
                        </Link>

                        <h1 className='dt3'>{detail?.name}</h1>
                        <br></br>

                        <div >
                            <img className='dt4' src={detail?.image} />
                        </div>

                        <p className='dt7'>{detail?.punctuation}</p>
                        <p className='dt8'>{detail?.healthyfoodlevel}</p>
                        <img className='dt13' src='https://i.pinimg.com/originals/0c/34/1b/0c341b4c20ef78a5e68160979d884be3.png' />

                        <img className='dt14' src='https://www.onlygfx.com/wp-content/uploads/2019/03/10-red-grunge-brush-stroke-heart-6.png' />

                        <div className='dt5'>
                            <p className='dt55'>{detail?.dishTypes[0]}</p>
                            <p className='dt55'>{detail?.dishTypes[1]}</p>
                            <p className='dt55'>{detail?.dishTypes[2]}</p>
                        </div>


                        <div className='ind33'>
                            <div>{detail.diets[0]}</div>
                            <div>{detail.diets[1]}</div>
                            <div>{detail.diets[2]}</div>
                            <div>{detail.diets[3]}</div>
                            <div>{detail.diets[4]}</div>
                            <div>{detail.diets[5]}</div>
                            <div>{detail.diets[6]}</div>
                            <div>{detail.diets[7]}</div>

                        </div>

                        <div id='TEST' className='dt10'></div>

                        <div className='dt11'>
                            <p className='dtt1' >Step by Step</p>
                            {
                                detail.stepbystep.map(e =>
                                    <div>
                                        <p className='dtt2'>{e?.number}</p>
                                        <p className='dtt2'>{e.step}</p>
                                    </div>
                                )

                            }

                        </div>


                    </div>


            }


        </div>

    )
}