import { useState, useEffect } from 'react';

function App() {
  const [ result, setResult ] = useState("");
  const [ color, setColor ] = useState("");
  const [ randomArr, setRandomArr ] = useState<String[]>();
  const [ answer, setAnswer ] = useState<String>("");

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const hex = `#${randomColor}`;
    setColor(hex);
  }

  useEffect(() => {
    generateRandomColor();
  }, []);

  useEffect(() => {
    generateAnswers();
  }, [color]);

  const generateAnswers = () => {
    const randomColorArr = [`#${Math.floor(Math.random()*16777215).toString(16)}`, color, `#${Math.floor(Math.random()*16777215).toString(16)}`];
    for (let i = randomColorArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
     [randomColorArr[i], randomColorArr[j]] = [randomColorArr[j], randomColorArr[i]];
    }
    setRandomArr(randomColorArr);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer === color) {
      setResult("Correct!");
      generateRandomColor();
    } else {
      setResult("Wrong Answer!");
    }
  }

  return (
    <div className="App">
      <div className='color-box' style={{
        backgroundColor: color
      }}></div>
      <form onSubmit={handleSubmit}>
        <div className='choices'>
          {
            randomArr?.map((clr, i) => {
              return <button type='submit' onClick={()=>setAnswer(clr)} key={i} className='choice'>{clr}</button>
            })
          }
        </div>
      </form>
      <h1 className={result === "Correct!" ? 'green' : 'red'}>{result}</h1>
    </div>
  );
}

export default App;
