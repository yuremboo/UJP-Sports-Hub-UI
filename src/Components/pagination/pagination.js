import React from 'react';
import paginationBack from '../../icons/paginationBack.svg';
import './pagination.css';

const Pagination = (props) => {
    function click(e){
        e.preventDefault();
        console.log('pagination back');
    }

    return (
        <div className='pagination__component'>
            <div className='pagination__back_button'>
                <button onClick={click}/>
            </div>

        </div>
    );
};

export default Pagination;