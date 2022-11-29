import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';


const cardImages = [
  {'src' : '/images/luka-modrić-1.jpg', value: 'modrić', matched: false},
  {'src' : '/images/mateo-kovačić-1.jpeg', value: 'kovačić', matched: false},
  {'src' : '/images/marko-livaja-1.jpg', value: 'livaja', matched: false},
  {'src' : '/images/domagoj-vida-1.jpg', value:'vida', matched: false},
  {'src' : '/images/dejan-lovren-1.jpg', value:'lovren', matched: false},
  {'src' : '/images/dominik-livaković-1.jpeg', value:'livaković', matched: false},
  {'src' : '/images/ivan-perišić-1.jpg', value:'perišić', matched: false},
  {'src' : '/images/joško-gvardiol-1.jpeg', value:'gvardiol', matched: false},

  {'src' : '/images/marko-livaja-2.png', value: 'livaja', matched: false},
  {'src' : '/images/mateo-kovačić-2.png', value: 'kovačić', matched: false},
  {'src' : '/images/luka-modrić-2.png', value: 'modrić', matched: false},
  {'src' : '/images/domagoj-vida-2.png', value:'vida', matched: false},
  {'src' : '/images/dejan-lovren-2.png', value:'lovren', matched: false},
  {'src' : '/images/dominik-livaković-2.png', value:'livaković', matched: false},
  {'src' : '/images/ivan-perišić-2.png', value:'perišić', matched: false},
  {'src' : '/images/joško-gvardiol-2.png', value:'gvardiol', matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)   // has to be called by an anonymous function //
      .map((card) => ({...card, id: Math.random()})) // we're spreading them into an object, that now has all the card properties (i.e. just the 'src'), but now also has an id //
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)  //every time we start a new game, we have to shuffle the cards and set the turns to 0
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    console.log(card)
    // you cannot compare the two choices here, because of state scheduling, instead you need to use useEffect - LOOK BELOW! //
  } 

  useEffect(() => {
  
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.value === choiceTwo.value) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.value === choiceOne.value) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurns()
    } else {
      setTimeout(() => {
        resetTurns()
      }, 1000)
    }
  }
  }, [choiceOne, choiceTwo])

console.log(cards)

  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  return (
    <div className="App">
          <h1 className='title'>Spoji igrače s imenima!</h1>
          <button onClick={shuffleCards}>Nova igra</button>

          <div className="card-grid">
            {cards.map(card => (   //apparently templates are only returned between normal brackets, not curly ones //
              <Card card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>  //key should be here, and not in that div, because it is this component that is the DIRECT CHILD OF A MAP FUNCTION!
            ))}
          </div>
          <p className='score'>Potezi: {turns}</p>
    </div>
  );
}

export default App;
