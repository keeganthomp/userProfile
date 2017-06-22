(function countButtonClicks() {
    var button = document.querySelector(".homeBtn");
    var counterSpan = document.querySelector(".click-count");
    var counter = 0;
    button.addEventListener("click", function(){
        counter += 1;
        counterSpan.innerHTML = counter;
    })

})();