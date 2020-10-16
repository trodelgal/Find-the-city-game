// The following example creates a marker in Stockholm, Sweden using a DROP
// animation. Clicking on the marker will toggle the animation between a BOUNCE
// animation and no animation.
const gameBar = document.getElementById('gameBar');
const resultDiv = document.getElementById('result');
const distDiv = document.getElementById('distance');
const pointsDiv = document.getElementById('points');
const newGameButton = document.createElement('button');
let marker;
let answersMarkers = [];
let results = [];
let points = 0;
let map;
let cities;
let city;
let count = 0;
let start = false;
const israel = {
    lat: 32,
    lng: 34.5
};


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6.5,
        center: israel,
        scrollwheel: false,
        zoomControl: false,
    });
    const centerControlDiv = document.createElement("div");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    marker = new google.maps.Marker({
        position: israel,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        clickable: false,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    // marker.addListener("click", toggleBounce);
    google.maps.event.addListener(map, "click", (event) => {
        moveMarker(event.latLng, map, marker)
    });
    const startBtn = document.getElementById('start')
    startBtn.addEventListener('click', startGame)
    CenterControl(centerControlDiv, map);
    getCities();

}


async function getCities() {
    try {
        const {
            data
        } = await axios.get('http://localhost:8080/api/cities');
        cities = data;
    } catch (err) {
        console.log(err);
    }
}

function startGame() {
    if (count < 5) {
        count++;
        marker.setPosition(israel)
        start = true;
        const cityName = document.createElement('lable');
        let i = Math.floor(Math.random() * 1240);
        city = cities[i];
        cityName.innerHTML = `${count}. ${cities[i].MGLSDE_L_4}, `;
        gameBar.appendChild(cityName);
    } else {
        start = false;
        resultDiv.innerText = `nice! your result is: ${points}`
        newGameButton.innerText = 'New Game'
        resultDiv.appendChild(newGameButton)
        result = []
        answersMarkers.forEach(val => {
            val.setClickable(true)
        })
        newGameButton.addEventListener('click', () => {
            count = 0;
            resultDiv.removeChild(newGameButton)
            gameBar.innerHTML = '';
            distDiv.innerHTML = '';
            resultDiv.innerText='';
            pointsDiv.innerText = '';
            answersMarkers.forEach(val => {
                val.setMap(null)
            })
            startGame()
        })
    }
}



function moveMarker(location, map, marker) {
    console.log(points);
    marker.setPosition(location)
    if (start) {
        const distance = calcDistance(location, {
            lat: city.Y,
            lng: city.X
        })
        results.push(distance.toFixed(2));
        let massege = '';
        distance < 20 ? massege = `VERY GOOD! Your distance mistake is: ${distance.toFixed(2)} KM` : massege = `NICE, Your distance mistake is: ${distance.toFixed(2)} KM`;
        distDiv.innerText = massege;
        let roundPoint = Number((100 / distance.toFixed(0)).toFixed(0));
        points = points + roundPoint;
        pointsDiv.innerText = `score: ${points}`
        setTimeout(() => {
            const answerMarker = new google.maps.Marker({
                position: {
                    lat: city.Y,
                    lng: city.X
                },
                draggable: false,
                animation: google.maps.Animation.DROP,
                title: city.MGLSDE_L_4,
                clickable: false,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            answersMarkers.push(answerMarker)
            answerMarker.setMap(map)
        }, 500)
        setTimeout(() => {
            startGame()
        }, 1000)
    }
}

// function toggleBounce() {
//     if (marker.getAnimation() !== null) {
//         marker.setAnimation(null);
//     } else {
//         marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
// }

function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to reset the map";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "center Map";
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
        map.setCenter(israel);
        map.setZoom(6.5);
        marker.setPosition(israel);
    });
}

function calcDistance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}