import React from 'react'
import { Hero } from '../components/Hero'
import { Link } from 'react-router-dom'

export const Error = () => {
    return (
        <Hero>
            <Link to="/" className="btn-primary">
                return home
                </Link>
        </Hero>
    )
}
