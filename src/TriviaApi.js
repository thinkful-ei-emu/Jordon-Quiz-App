class TriviaApi{
  static BASE_URL = "https://opentdb.com/api.php?amount=5";

  getQuestions(){
    const url = new URL(TriviaApi.BASE_URL);
    
    return fetch(url)
    .then(res => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  } 
}

export default TriviaApi;


