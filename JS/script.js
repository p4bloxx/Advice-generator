const adviceCount = document.getElementById('advice-count');
const advice = document.getElementById('advice');
const changeAdvice = document.getElementById('new-advice');


const newAdvice = async () => {
  try {
    const adviceURL = await fetch('https://api.adviceslip.com/advice?t=' + Math.random());

    if (!adviceURL.ok) {
      if (adviceURL.status === 404) {
        throw new Error('Data not found');
      } else if (adviceURL.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    
    const adviceJSON = await adviceURL.json();
    const data = adviceJSON.slip;
    const currentId = data.id;
    const currentAdvice = data.advice;
    adviceCount.textContent = `${currentId}`
    advice.textContent = `"${currentAdvice}"`
  }

  catch (e) {
    console.error(e)
  }
}

//to call new advice every times
changeAdvice.addEventListener('click', () => {
  newAdvice();
})