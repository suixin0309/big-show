import React from 'react'

export const Hero = ({children, hero = "defaultHero"}) => {
    return (
        <header className={hero}>{children}</header>
    )
}
