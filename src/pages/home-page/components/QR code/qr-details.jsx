import React from 'react'
import { useParams } from 'react-router-dom'

export default function QrDetails() {
    const { link } = useParams
    return (
        <div>
            <p>{link}</p>
        </div>
    )
}
