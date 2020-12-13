import React from 'react'

export const Cell: React.FC<Props> = (props: Props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.symbol}
        </button>
    )
}

interface Props {
    symbol: string
    onClick: () => void
}
