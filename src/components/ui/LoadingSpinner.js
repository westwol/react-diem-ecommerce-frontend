import React from 'react'

export const LoadingSpinner = () => {
    return (
        <div className="ab-center text-center">
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
