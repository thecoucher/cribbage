import React from 'react'
import logo from './../images/logo1.jpg'

function About() {
  return (
    <React.Fragment>
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="about">
        <h1>About the practice tool</h1>
        <p>The purpose of this tool is to create real life situations where you are presented with a random Cribbage hand and you will need to identify the number of points that the hand is worth.
        There is also the ability to modify your hand to explore different scenarios by changing the card's value or suit in your hand or in the crib.
        </p>
        <br />
        <p>You can see a complete set of rules for the game of Cribbage&nbsp;<a target="_blank" href="https://bicyclecards.com/how-to-play/cribbage/">&nbsp;here</a>.</p>
      </div>
    </React.Fragment>
  );
}

export default About;
