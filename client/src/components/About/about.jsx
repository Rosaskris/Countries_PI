import './about.modules.css'
import { Link } from 'react-router-dom'
import img from './img.jpeg'

export default function About(props){
    return(
        <div className="about">
        <div className='definition'>
            <div className='text'>
            <h1>Hello World!</h1>
            <h2>This page is an indivual project created for SoyHenry's Bootcamp</h2>
            <h2>You can find information such as population, area and languages of the countries,</h2>
            <h2>As well as create and save turistic activities you've done in these countries.</h2>
            <h2>I used HTML5, CSS3, React, Redux, Node JS, Express JS, Sequelize and PostgreSQL.</h2>
            <h2>I invite you to take a look and explore it!</h2>
            </div>
        </div>

        <div className='me'>
            <div className='myInfo'>
            <img src={img} alt="myPic" />
            </div>

        <div className='media'>
        <h1>Who am I?</h1>
        <h2>My name is Krisbel Rosas, I'm a developer in making.</h2>
        <h2>I'm 21 years old by the time you're reading this</h2>
        <h2>I love dancing, crafting and anything that involves a challenge</h2>
        <h2>This project is one of my very first babies when it comes to websites,</h2>
        <h2>and I'm very proud and thankful with SoyHenry's for all that I've learned</h2>
        <h2>I'm always looking for ways of improving, so if you have any feedback...</h2>
        <h2>Reach me out!</h2>
        <Link to='https://github.com/Rosaskris'>
                    <button className='mediaLink' title='Visit my Github'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" className='buttonMedia'>    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path></svg>
                    </button>
                    </Link>
                    <Link to='https://www.linkedin.com/in/krisbel-rosas-23b14b26b/'>
                    <button className='mediaLink' title='Connect with me'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32" className='buttonMedia'>
                    <path d="M 7.5 5 C 6.132813 5 5 6.132813 5 7.5 L 5 24.5 C 5 25.867188 6.132813 27 7.5 27 L 24.5 27 C 25.867188 27 27 25.867188 27 24.5 L 27 7.5 C 27 6.132813 25.867188 5 24.5 5 Z M 7.5 7 L 24.5 7 C 24.785156 7 25 7.214844 25 7.5 L 25 24.5 C 25 24.785156 24.785156 25 24.5 25 L 7.5 25 C 7.214844 25 7 24.785156 7 24.5 L 7 7.5 C 7 7.214844 7.214844 7 7.5 7 Z M 10.4375 8.71875 C 9.488281 8.71875 8.71875 9.488281 8.71875 10.4375 C 8.71875 11.386719 9.488281 12.15625 10.4375 12.15625 C 11.386719 12.15625 12.15625 11.386719 12.15625 10.4375 C 12.15625 9.488281 11.386719 8.71875 10.4375 8.71875 Z M 19.46875 13.28125 C 18.035156 13.28125 17.082031 14.066406 16.6875 14.8125 L 16.625 14.8125 L 16.625 13.5 L 13.8125 13.5 L 13.8125 23 L 16.75 23 L 16.75 18.3125 C 16.75 17.074219 16.996094 15.875 18.53125 15.875 C 20.042969 15.875 20.0625 17.273438 20.0625 18.375 L 20.0625 23 L 23 23 L 23 17.78125 C 23 15.226563 22.457031 13.28125 19.46875 13.28125 Z M 9 13.5 L 9 23 L 11.96875 23 L 11.96875 13.5 Z"></path>
                    </svg>
                    </button>
                    </Link>
        </div>
        </div>
        </div>
    )
}