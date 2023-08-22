



const container = document.querySelector(".container");
const infoText = document.querySelector(".info-text");
const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');


const getSeatsFromDataBase = () => {

    const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'));
    if (dbSelectedMovie) {
        movie.selectedIndex = dbSelectedMovie
    }
    dbSelectIndex = JSON.parse(localStorage.getItem('selectedIndex'));
    if (dbSelectIndex !== null && dbSelectIndex.length > 0) {

        seats.forEach((seat, index) => {
            if (dbSelectIndex.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })

    }
}




const saveToDatabase = (seatIndexData) => {
    localStorage.setItem("selectedIndex", JSON.stringify(seatIndexData));
    // console.log(movie.selectedIndex)
    localStorage.setItem('movieIndex', JSON.stringify(movie.selectedIndex));
}
getSeatsFromDataBase()
const calculateTotal = () => {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const allSeatsArray = [];
    const allSelectedSeatsArray = [];

    seats.forEach((seat) => {
        allSeatsArray.push(seat);
    });
    selectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat)
    });

    let selectedIndexs = allSelectedSeatsArray.map((allSelectedSeat) => {
        return allSeatsArray.indexOf(allSelectedSeat)
    })


    let selectedSeatsCount = container.querySelectorAll('.seat.selected').length

    if (selectedSeatsCount > 0) {
        infoText.style.display = "block"
    } else {
        infoText.style.display = "none"
    }
    let price = movie.value

    let total = price * selectedSeatsCount
    infoText.innerHTML = ` <span>${selectedSeatsCount}</span>koltuk için hesaplanan ücret
     <span>${total}</span>TL`
    saveToDatabase(selectedIndexs)
}

calculateTotal()
container.addEventListener("click", (e) => {
    if (e.target.offsetParent.classList.contains("seat") &&
        !e.target.offsetParent.classList.contains("reserved")) {
        e.target.offsetParent.classList.toggle("selected")
    }
    calculateTotal()
})
movie.addEventListener('change', () => {
    calculateTotal()
})
