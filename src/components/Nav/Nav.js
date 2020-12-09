import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../../img/logo.svg";
import { fetchSearched, clearSearchedGames } from "../../store/actions/games";
import { useDispatch } from "react-redux";
import { fadeIn } from "../../animations";

const Nav = () => {
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearched(textInput));
    setTextInput("");
  };
  const clearSearched = () => {
    dispatch(clearSearchedGames());
  };
  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <StyledLogo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </StyledLogo>
      <form className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    @media (max-width: 775px) {
      display: block;
      width: 100%;
      margin-bottom: 1rem;
    }
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.55rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: #fff;
  }
`;

const StyledLogo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
  }
`;

export default Nav;
