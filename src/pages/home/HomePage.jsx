import { APP_ROUTES } from 'AppSetting';
import React from 'react';
import { Link } from 'react-router-dom';
import { DecorativeHeader, DecorativeHeaderSpace } from '../../components/headers/DecorativeHeader';
import useHomePage from './hooks/useHomePage';

function UnfinishedGameLink({ url }) {
    const position = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    };
    return (
        <div style={position} className="animate__animated animate__fadeInRight animate__delay-1s flex center">
            <div className="flex center column panel alternate unfinished-game-div">
                <span>Jest zapisana niedokończona rozgrywka.</span>
                <Link to={url} className="btn w100 center alternate">
                    Kontynuuj rozgrywkę
                </Link>
            </div>
        </div>
    );
}

export default function HomePage() {
    const { unfinishedGame } = useHomePage();
    console.log({
        unfinishedGame,
    });

    return (
        <>
            <DecorativeHeader style={{ height: '200px' }}></DecorativeHeader>
            
            {unfinishedGame.hasUnfinishedGame ? <UnfinishedGameLink url={unfinishedGame.url} /> : null}

            <DecorativeHeaderSpace extraSpace={unfinishedGame.hasUnfinishedGame}>
                <div className="animate__animated animate__fadeInUp flex center grow">
                    <div className="flex center column panel">
                        <Link to={APP_ROUTES.OPTIONS.INDEX} className="w100 btn center">
                            Graj
                        </Link>
                        <Link to={APP_ROUTES.ABOUT} className="w100 btn center">
                            O aplikacji
                        </Link>

                        <Link to={APP_ROUTES.CHANGELOG} className="w100 btn center">
                            Historia zmian 
                        </Link>
                    </div>
                </div>
            </DecorativeHeaderSpace>
        </>
    );
}
