import React from 'react'
import { useParams } from 'react-router-dom'

export default function QrDetails() {
    const { id } = useParams
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}
