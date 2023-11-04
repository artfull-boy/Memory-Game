let game_cards = document.querySelectorAll(".card");
let order_array = Array.from(game_cards.keys());
let flipped_cards_num = 0;
let wrong_ties = document.querySelector(".wrong-ties");
let start = document.querySelector(".timer");

//Timer Function
function timer() {
    let count = setInterval(()=> {
        start.innerHTML--;
        if (start.innerHTML == 0) {
            clearInterval(count);
            failed();
        }
    },1000)
}

// Starting The Game
let starting_button = document.querySelector(".memory-game .starting button");
function starts_game() {
    game_cards.forEach((card) => {
        card.classList.add("is_flipped");
        setTimeout(()=> {
            card.classList.remove("is_flipped");
            card.classList.remove("is_matched");
        }, 3000)
    });
    timer();
} 

starting_button.addEventListener("click", () => {
    let username = prompt("Enter Your name:");
    document.querySelector(".memory-game .starting").remove();
    if (username == null || username == "") {
        document.querySelector(".name").innerHTML = "Unknown";
    }
    else {
        document.querySelector(".name").innerHTML = username;
    }
    starts_game();
})

// Shuffle Function
function shuffle() {
    let current_array = game_cards.length - 1;
    game_cards.forEach((card) => {
        let random = Math.floor(Math.random() * current_array);
        card.style.order = random;
})
};
shuffle();


// Flip Cards
game_cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.add("is_flipped");
        flipped_cards_num++;
        let flipped_cards = Array.from(game_cards).filter(flippedcard => flippedcard.classList.contains("is_flipped"));
        if (flipped_cards_num == 2) {
            flipped_cards_num=0;
            if (flipped_cards[0].dataset.anime == flipped_cards[1].dataset.anime) {
                document.querySelector(".correct").play();
                flipped_cards[0].classList.remove("is_flipped");
                flipped_cards[1].classList.remove("is_flipped");
                flipped_cards[0].classList.add("is_matched");
                flipped_cards[1].classList.add("is_matched");
                let matched_cards = Array.from(game_cards).filter(flippedcard => flippedcard.classList.contains("is_matched"));
                if (matched_cards.length == game_cards.length) completed();
            }
            else {
                document.querySelector(".fail").play();
                wrong_ties.innerHTML++;
                setTimeout(()=> {
                    flipped_cards[0].classList.remove("is_flipped");
                    flipped_cards[1].classList.remove("is_flipped");
                },1000)
            }
        }
    })
})

//Complete the game
function completed() {
    document.querySelector(".memory-game .completing").style.display = "flex";
    document.querySelector(".memory-game .completing button").addEventListener("click", () => {
        document.querySelector(".memory-game .completing").style.display = "none";
        wrong_ties.innerHTML = 0;
        start.innerHTML = 90;
        shuffle();
        starts_game();
    })
}

//Game over
function failed() {
    document.querySelector(".memory-game .failed").style.display = "flex";
    document.querySelector(".memory-game .failed button").addEventListener("click", () => {
        document.querySelector(".memory-game .failed").style.display = "none";
        wrong_ties.innerHTML = 0;
        start.innerHTML = 90;
        shuffle();
        starts_game();
    })
}