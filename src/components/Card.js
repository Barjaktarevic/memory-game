import './Card.css'

export default function Card({card, handleChoice, flipped, disabled}) {

  const handleClick = () => {
    if (disabled === false) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={ flipped ? 'flipped' : ''}>
      <img src={card.src} alt="card front"className='front' />
      <img src='/images/darkblue-cover-1.jpg' alt="card back"  className='back' onClick={handleClick}/>
      </div>
    </div>
  )
}
