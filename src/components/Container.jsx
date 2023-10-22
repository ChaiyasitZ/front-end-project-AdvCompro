import React from 'react';

/**
 * @param {{ 
 *  children: React.ReactNode 
 * }} props 
 * @returns 
 */
const Container = (props) => {
    return (
        <div className="p-4 md:mx-auto md:px-[20vw]">
            { props.children }
        </div>
    );
};

export default Container;
