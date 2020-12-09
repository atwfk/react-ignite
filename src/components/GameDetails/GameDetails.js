import React, { Fragment } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { smallImage } from "../../shared/utility";
import playstation from "../../img/playstation.svg";
import steam from "../../img/steam.svg";
import xbox from "../../img/xbox.svg";
import nintendo from "../../img/nintendo.svg";
import apple from "../../img/apple.svg";
import gamepad from "../../img/gamepad.svg";
import starEmpty from "../../img/star-empty.png";
import starFull from "../../img/star-full.png";

const GameDetails = ({ pathId }) => {
  const { screen, game, loading } = useSelector((state) => state.detail);
  const history = useHistory();
  const exitDetailHandler = (e) => {
    e.stopPropagation();
    document.body.style.overflow = "auto";
    history.push("/");
    e.target.style.pointerEvents = "none";
  };
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };
  return (
    <Fragment>
      {!loading && (
        <StyledCardShadow onClick={exitDetailHandler}>
          <StyledDetail layoutId={pathId} onClick={(e) => e.stopPropagation()}>
            <StyledStats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <StyledInfo>
                <h3>Platforms</h3>
                <StyledPlatforms>
                  {game.platforms.map((data) => (
                    <img
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                      alt={data.platform.name}
                    ></img>
                  ))}
                </StyledPlatforms>
              </StyledInfo>
            </StyledStats>
            <StyledMedia>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt={game.background_image}
              />
            </StyledMedia>
            <StyledDescription>
              <p>{game.description_raw}</p>
            </StyledDescription>
            <div className="gallery">
              {screen.results.map((screen) => (
                <img
                  key={screen.id}
                  src={smallImage(screen.image, 1280)}
                  alt={screen.image}
                />
              ))}
            </div>
          </StyledDetail>
        </StyledCardShadow>
      )}
    </Fragment>
  );
};

const StyledCardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }
`;

const StyledDetail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: #fff;
  position: absolute;
  left: 10%;
  color: #000;
  img {
    width: 100%;
  }
  @media (max-width: 930px) {
    padding: 1rem 1rem;
  }
`;

const StyledStats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
  @media (max-width: 775px) {
    flex-direction: column;
  }
`;

const StyledInfo = styled(motion.div)`
  text-align: center;
`;

const StyledPlatforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
    @media (max-width: 775px) {
      margin-left: 1rem;
    }
  }
`;

const StyledMedia = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const StyledDescription = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetails;
