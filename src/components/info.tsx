import React from 'react';

interface infoProps {
    label: string,
    value: string | undefined
}

const Info: React.FC<infoProps> = ({label, value}) => {
    return (
        <div className="info">
            <span className="info-label">{label}</span>
            <span className="info-value">{value ? value : "n/a"}</span>
        </div>
    )
}

export default Info;