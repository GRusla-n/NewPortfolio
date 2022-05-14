import './index.scss'

const AnimatedLetters = ({ letterClass, str, index }) => {
  return (
    <span>
      {Array.from(str).map((char, i) => (
        <span key={char + i} className={`${letterClass} _${i + index}`}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default AnimatedLetters
