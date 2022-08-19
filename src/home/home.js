import React from 'react';

import "../commons/styles/home.css"

import Video from "./video.mp4";

import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
} from "./Style";


class Home extends React.Component {


    render() {

        return (

            <HeroContainer id="home">
                <HeroBg>
                    <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
                </HeroBg>
                <HeroContent>
                    <HeroH1> Your event starts here! </HeroH1>
                    <br/><br/>
                    <HeroP>
                        Create a story event with our team and enjoy the most beautiful moments in your life!
                    </HeroP>
                    <HeroBtnWrapper>
                    </HeroBtnWrapper>
                </HeroContent>
            </HeroContainer>
        );
    };

}

export default Home
