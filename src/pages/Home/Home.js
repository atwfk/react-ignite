import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "../../components/Game/Game";
import { fetchGames } from "../../store/actions/games";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import GameDetails from "../../components/GameDetails/GameDetails";
import { useLocation } from "react-router-dom";
import { fadeIn } from "../../animations";

const Home = () => {
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  const dispach = useDispatch();
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  useEffect(() => {
    dispach(fetchGames());
  }, [dispach]);
  return (
    <StyledGameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && <GameDetails pathId={pathId} />}
        </AnimatePresence>
        {searched.length === 0 ? (
          ""
        ) : (
          <div className="searched">
            <h2>Searched Games</h2>
            <StyledGames>
              {searched.map((game) => (
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  image={game.background_image}
                />
              ))}
            </StyledGames>
          </div>
        )}
        <h2>New Games</h2>
        <StyledGames>
          {newGames.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
            />
          ))}
        </StyledGames>
        <h2>Popular Games</h2>
        <StyledGames>
          {popular.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
            />
          ))}
        </StyledGames>
        <h2>Upcoming Games</h2>
        <StyledGames>
          {upcoming.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              released={game.released}
              id={game.id}
              image={game.background_image}
            />
          ))}
        </StyledGames>
      </AnimateSharedLayout>
    </StyledGameList>
  );
};

const StyledGameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
  @media (max-width: 575px) {
    padding: 0 1rem;
    h2 {
      padding: 1rem 0;
    }
  }
`;

const StyledGames = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 5rem 3rem;
`;

export default Home;
