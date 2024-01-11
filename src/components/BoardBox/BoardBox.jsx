import React from 'react';
import { Link } from 'react-router-dom';

const BoardBox = (props) => {
    console.log('beerBox/props: ', props);
    console.log('beerBox/props.title: ', props.title);
    return(
    <>
        <div className='container mx-auto'>
            <Link
                to = {"/detail"}
                state = {{
                    id: props.id,
                }}
            >
                <div>
                    <h1>{props.title}</h1>
                </div>
            </Link>
        </div>
    </>
    )
}
export default BoardBox;