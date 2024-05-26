import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnTxt }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnTxt}
            <img src={arrow} className='w-4 h-4 object-contain' />
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-6'>
            Hi, I am <span className='font-semibold'>Laura</span> 👋
            <br />
            A Developer from Colombia.
        </h1>
    ),
    2: (
        <InfoBox 
            text="Education and work experience"
            link={'/about'}
            btnTxt={'Learn more'}
        />
    ),
    3: (
        <InfoBox 
            text="Some of my passion projects"
            link={'/projects'}
            btnTxt={'Learn more'}
        />
    ),
    4: (
        <InfoBox 
            text="Let's work together! 🚀"
            link={'/contact'}
            btnTxt={'Contact'}
        />
    ),
}

const HomeInfo = ({ currentStage }) => {

    return (
        renderContent[currentStage] || null
    )
}

export default HomeInfo