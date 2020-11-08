<template>
  <div>
    <form v-on:submit="ajouterRestaurant($event)">
      <label>
        Nom :
        <input
          style="border: 1px solid black"
          name="nom"
          type="text"
          required
          v-model="nom"
        />
      </label>
      <br />
      <br />
      <label>
        Cuisine :
        <input
          style="border: 1px solid black; margin-right: 20px"
          name="cuisine"
          type="text"
          required
          v-model="cuisine"
        />
      </label>
      <br />
      <br />
      <button style="border-radius:5px;color: white;padding: 5px 20px;border: 1px solid black; margin-left: 30px;background-color: #4CAF50;">Ajouter</button>
    </form>

    <h3>Nombre de restaurants répertoriés : {{ nbRes }}</h3>
    <p>
      Chercher par nom :
      <input
        @input="chercherRestaurants()"
        type="text"
        style="border: 1px solid black;"
        v-model="nomRestauRecherche"
      />
    </p>
    <p>Nombre de page : {{ nbPageTotal }}</p>   
    <v-btn :disabled="page === 0" @click="pagePrecedente()" class="mx-2" dark color="indigo" >Précédent</v-btn>
    &nbsp;&nbsp;
    <v-btn :disabled="page === nbPageTotal" @click="pageSuivante()" class="mx-2" dark color="indigo" >Suivant</v-btn>
    <br />
    <br />
    <v-simple-table>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
        <th>Ville</th>
        <th>Détails</th>
      </tr>
      <tbody>
        <tr
          v-for="(r, index) in restaurants"
          :key="index"
        >
          <td>{{ r.name }}</td>
          <td>{{ r.cuisine }}</td>
          <td>{{ r.borough }}</td>
          <td>
            <router-link :to="'/restaurant/' + r._id" tag="button"><v-btn color="primary" elevation="2">Détail d'un restaurant</v-btn></router-link
            >
          </td>
          <td><v-btn depressed color="error" @click="supprimerRestaurant(r)" elevation="5">delete</v-btn></td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "ListeRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      ville: "",
      nbRes: 0,
      page: 0,
      pageSize: 10,
      nbPageTotal: 0,
      msg: "",
      nomRestauRecherche: "",
    };
  },
  mounted() {
    console.log("AVANT RENDU HTML");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.nbPageTotal) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            console.log(resJS);
            this.restaurants = resJS.data;
            this.nbRes = resJS.count;
            this.nbPageTotal = Math.round(this.nbRes / this.pageSize);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    chercherRestaurants: _.debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            this.msg = resJS.msg;
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants?";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      this.nom = "";
      this.cuisine = "";
      this.ville = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<style scoped>
</style>
