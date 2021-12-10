// function onBatteryStatus(status) {
//   console.log("Battery Level Low " + status.level + "%");
// }

function onOffline() {
  const modal = document.getElementById("modal");
  const app = document.getElementById("app");
  modal.style.display = "block";
  app.style.display = "none";
}

function onOnline() {
  const modal = document.getElementById("modal");
  const app = document.getElementById("app");
  modal.style.display = "none";
  app.style.display = "inline";
}

const elementSelect = (link) => {
  const elements = document.getElementById("list");
  elements.style.display = "none";
  const pokemon = document.getElementById("list2");
  pokemon.style.display = "block";
  const ajout = document.getElementById("ajout");
  ajout.style.display = "none";
  sessionStorage.setItem('type', link);
  var elem = JSON.parse(sessionStorage.getItem(link));
  fetchApiElementsPokemon(elem);
};

const divElementPokemon = `
<div class="col-12 col-md-4">
  <div class="card">
    <div class="card-body">
        <h5 class="card-title"><img src="__src__" class="card-img-top2" /> __top__. __title__</h5>
    </div>
  </div>
</div>
`;

const fetchApiDonePokemon = (json) => {
  const divList = document.getElementById("list2");
  json.forEach((element, i) => {
    const newdivElementPokemon = divElementPokemon
      .replace("__src__", "img/pokemons/" + element.img)
      .replace("__top__", element.id)
      .replace("__title__", element.name)
    divList.appendChild(htmlToElement(newdivElementPokemon));
  });
};

const fetchApiElementsPokemon = (json) => {
  fetchApiDonePokemon(json);
};

const deviceReady = () => {
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  var feu = [{ id: 1, name: "Salamèche", img: "feu1.png" }, { id: 2, name: "Caninos", img: "feu2.png" }, { id: 3, name: "Ponyta", img: "feu3.png" }];
  var eau = [{ id: 1, name: "Carapuce", img: "eau1.png" }, { id: 2, name: "Psykokwak", img: "eau2.png" }, { id: 3, name: "Magicarpe", img: "eau3.png" }];
  var plante = [{ id: 1, name: "Bulbizarre", img: "plante1.png" }, { id: 2, name: "Germignon", img: "plante2.png" }, { id: 3, name: "Arcko", img: "plante3.png" }];
  sessionStorage.setItem('Feu', JSON.stringify(feu));
  sessionStorage.setItem('Eau', JSON.stringify(eau));
  sessionStorage.setItem('Plante', JSON.stringify(plante));
};
