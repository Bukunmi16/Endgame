import Languages from "./Languages";
import { languages } from "./language";
import { useState } from "react"
import { useEffect } from "react";
import { getFarewellText, getRandomWord  } from "./utils";
import clsx from "clsx";
import ReactConfetti from "react-confetti";
import {useWindowSize} from "react-use"
import { useRef } from "react";
import ConfettiComponent from "./Confetti";


export default function Main() {
    // STATE VALUES
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedWord, setGuessedWord] = useState([])    
    const gameStatusSection = useRef(null)

    useEffect(() => {
        if (isGameOver) {
            gameStatusSection.current.scrollIntoView({behavior: "smooth"})
        }
    })

    // DERIVED VALUES
    
    const wrongGuessCount = []

    guessedWord.map((letter)=> {
    if(!currentWord.toUpperCase().split("").includes(letter)){
        wrongGuessCount.push(letter)
    } 
    })    
    
    function guessWord(guess) {
        setGuessedWord(prevGuess => 
            prevGuess.includes(guess) ? prevGuess : [...prevGuess, guess])
        }
                
        const isGameWon = 
        currentWord.toUpperCase().split("").every(letter => {
            return guessedWord.includes(letter)            
        })
    
    const isGameLost = wrongGuessCount.length >= languages.length - 1 && isGameWon === false
    const isGameOver = isGameLost || isGameWon
        
            
    

        // STATIC VALUES
    // Keyboard Letters
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'
    
    const keyElements = alphabets.toUpperCase().split("").map((alphabet, index)=>{
        
        const isGuessed = guessedWord.includes(alphabet)
        const isCorrect = isGuessed && currentWord.toUpperCase().split("").includes(alphabet)
        const isWrong = isGuessed && !currentWord.toUpperCase().split("").includes(alphabet)

        
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return(

            <button disabled={isGameOver} onClick={()=> {guessWord(alphabet)}} className={className} key={alphabet + index}>
                {alphabet}
            </button>
        )
    })    

    // Guess Word
    const letterElement = currentWord.toUpperCase().split("").map((letter, index)=>{
        const correct = isGameLost || guessedWord.includes(letter)
        const missedLetter = isGameLost && !guessedWord.includes(letter)
        const className = clsx({
            missedLetter: missedLetter,
            correct: correct
        })
        

        return(
            <span className={className} key={index} >
                {correct ? letter : ""}</span>
        )
    })

    //Programming Language Elements

    const lastGuessedLetter = guessedWord[guessedWord.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.toUpperCase().split("").includes(lastGuessedLetter)


    // displayEliminatedLanguages()

    const languageElements = languages.map((language, index)=>{
    const isLanguageLost = index < wrongGuessCount.length
        
        return(
            <Languages
            language={language.name}
            backgroundColor={language.backgroundColor}
            color={language.color}
            isLanguageLost={isLanguageLost}
            key={index}
            />
        ) 
    })

    const gameClassName = clsx("game-status",{
        gameLost: isGameLost,
        gameWon: isGameWon,
        farewellMessage: !isGameOver && isLastGuessIncorrect
    }) 

    function renderGameStatus() {
     if (!isGameOver && isLastGuessIncorrect) {
      const eliminatedLanguage = languages[wrongGuessCount.length - 1].name 
      return <p className="farewell-message">{getFarewellText(eliminatedLanguage)}</p>
    } 
     if (isGameOver && isGameWon) {
        return(
        <>
        <h3>You Win!</h3>
        <p>Well Done 🎉</p>
        </>
        )
    } 
    if(isGameOver && isGameLost) {
        return(
        <>
        <h3
        
        >Game Over!</h3>
        <p>You lost! Get ready for 14 years of school 🙂</p>
        </>
        )
        }
     }   
    

    function newGame() { 
        setCurrentWord(getRandomWord())
        setGuessedWord([])
    }

    // const { width, height } = useWindowSize()


    return(
        <>
            <main
            ref={gameStatusSection}
            >
                { isGameWon && <ConfettiComponent/>}
                {/* {isGameWon &&  
                    <ReactConfetti
                    width={width}
                    height={height}
                    />} */}

        <section className="game-description">
        <h4 className="game-name">Assembly: Endgame</h4>
        <p className="game-instructions">
        The department you end on will be the course you study. Every wrong guess brings you
        closer to studying Neurosurgery. You have just 9 attempts.      
        </p>
        </section>

        
        <section className={gameClassName}
        >
        {renderGameStatus()}
        </section>
        {isGameOver && <button onClick={newGame} className="new-game">
            New Game
        </button>}
        <section className="languages">
        {languageElements}
            </section>

        <section className="current-word">
            {letterElement}
        </section>

        <section className="keyboard">
        {keyElements}
        </section>

      
        </main>
    </>        
    )
}