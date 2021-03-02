const $audio = document.getElementById("audio"),
  $score = document.getElementById("score"),
  $steps = document.getElementById("steps"),
  $timer = document.getElementById("timer"),
  $board = document.getElementById("board"),
  $start = document.getElementById("start"),
  cards = [
    {
      answer: "turtle",
      image:
        "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247_960_720.jpg",
    },
    {
      answer: "cat",
      image:
        "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg",
    },
    {
      answer: "lion",
      image:
        "https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045_960_720.jpg",
    },
    {
      answer: "fox",
      image:
        "https://cdn.pixabay.com/photo/2016/12/05/11/39/fox-1883658_960_720.jpg",
    },
    {
      answer: "butterfly",
      image:
        "https://cdn.pixabay.com/photo/2012/03/01/00/55/garden-19830_960_720.jpg",
    },
    {
      answer: "hedgehog",
      image:
        "https://cdn.pixabay.com/photo/2014/10/01/10/44/hedgehog-468228_960_720.jpg",
    },
    {
      answer: "dolphin",
      image:
        "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg",
    },
    {
      answer: "tiger",
      image:
        "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_960_720.jpg",
    },
  ];

let timerInterval,
  selected = [],
  timer = 60,
  steps = 0,
  score = 0;

const shuffle = (arrayofItems) => {
  let counter = arrayofItems.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp_ar = arrayofItems[counter];
    arrayofItems[counter] = arrayofItems[index];
    arrayofItems[index] = temp_ar;
  }

  return arrayofItems;
};

const countTime = () => {
  timer = 60;
  timerInterval = setInterval(() => {
    --timer;
    $timer.innerHTML = timer;
    if (!timer) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

const countStep = () => {
  ++steps;
  $steps.innerHTML = steps;
};

const checkIfGameOver = () =>{
  const openCards = (document.getElementsByClassName('open')).length;
  if(cards.length * 2 == openCards || !timer){
      clearInterval(timerInterval);
        setTimeout(() => {
            Swal.fire({
                // icon: "success",
                imageUrl: 'https://cdn.pixabay.com/photo/2016/10/10/01/49/hook-1727484_150.png',
                title: "Game Over",
                text: `Your Score is ${score}`,
                confirmButtonText: "Play Again",
                showDenyButton: true,
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                  
                    startGame();
                } else if (result.isDenied) {
                    console.log("Bye");
                    $start.classList.remove('hide')
                }
            });

        }, 800);

    }

}
const checkGameState = () => {
    countStep();
    calcScore();
    checkIfGameOver();

};

const calcScore = () => {
  const rating3Limte = cards.length / 2 + 2,
    rating2Limte = cards.length,
    rating1Limte = cards.length * 1.5;
  const is3Star = steps <= rating3Limte,
    is2Star = steps >= rating2Limte && steps < rating1Limte,
    is1Star = steps >= rating2Limte;

  if (is3Star) {
    score = 3;
  } else if (is2Star) {
    score = 2;
  } else if (is1Star) {
    score = 1;
  }
  $score.innerHTML = score;
};

const printCards = (cardsArrray) => {
  const shuffledCrads = shuffle([...cardsArrray, ...cardsArrray]);
//   console.log(shuffledCrads);
$board.innerHTML = '';
  shuffledCrads.forEach((card) => {
    const liElement = document.createElement("li");
    liElement.dataset.answer = card.answer;
    const imageElement = document.createElement("img");
    imageElement.src = card.image;
    imageElement.alt = card.answer;
    liElement.appendChild(imageElement);
    $board.appendChild(liElement);
  });
};

const startGame = () => {
  steps = 0;
  score = 0;
  $steps.innerHTML = steps;
  $score.innerHTML = score;
  printCards(cards);
  countTime();
};

const flipCards = (isCorrect) => {
  setTimeout(() => {
    const flipCards = Array.from(document.getElementsByClassName("flip"));
    flipCards.forEach((card) => {
     
      if (isCorrect) {
        card.classList.replace("flip", "open");
      } else {
        card.classList.remove("flip");
      }
    });
    $board.classList.remove("compare");
    checkGameState();
  }, 500);
};

$board.addEventListener("click", (e) => {
  const isCard = e.target.localName === "li";
  const isOPenCard = e.target.classList.contains("open");
  const isFlipCard = e.target.classList.contains("flip");
  // console.log("isOPenCard",isOPenCard);

  if (!isCard || isOPenCard || isFlipCard) {
    return;
  }
  const currentUserSelection = e.target.dataset.answer;
  e.target.classList.add("flip");
  selected.push(currentUserSelection);
  // console.log("selected array length->",selected.length);
  if (selected.length === 2) {
    $board.classList.add("compare");
    const isCorrectAnwser = selected[0] === selected[1];
    if (isCorrectAnwser) {
      flipCards(isCorrectAnwser);
    } else {
      flipCards(isCorrectAnwser);
    }
    selected = [];
  }
});

$start.addEventListener('click',()=>{
  startGame();
  $start.classList.add('hide')
});
// startGame();

Swal.fire({
    // icon: "question",
    imageUrl: 'https://cdn.pixabay.com/photo/2016/10/18/18/19/question-mark-1750942_150.png',
    // title: "Hello",
    text: "Hi, Welcome Do want to play?",
    confirmButtonText: "Start Game",
    showDenyButton: true,
    // background: '#ffffff url(https://cdn.pixabay.com/photo/2017/12/05/15/45/punctuation-marks-2999583_960_720.jpg) no-repeat center',
}).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
        startGame();
        $start.classList.add('hide')
    } else if (result.isDenied) {
        console.log("Bye");
        $start.classList.remove('hide')
    }
});


