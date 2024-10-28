import React from "react";
import ClockLoader from 'react-spinners/ClockLoader';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ClockLoader
                color="#D56F00"
                height={5}
                speedMultiplier={2}
                width={109}
            />
        </div>
    );
}

export default Loader;
