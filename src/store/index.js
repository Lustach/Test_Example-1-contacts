import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        FIO: "Луста Владислав Михайлович",
        phone_number: ["+380714494247", "+380714595248"],
        email: ["lusta.vlad@mail.ru", "lusta.vlad2001@gmail.com"],
        web_site: "https://vk.com/tartarin3",
        birthday: "04.01.2001",
        company: "Any",
        photo_src: "/src/static/img/VladLusta.jpg",
        category: "best friends"
      },
      {
        FIO: "Куркурин Никита Леонидович",
        phone_number: ["+380714412687", "+380714595213"],
        email: ["nik.kurk@mail.ru", "kurk.nik@gmail.com"],
        web_site: "https://vk.com/antipupsik",
        birthday: "23.03.2001",
        company: "Any",
        photo_src: "../static/img/Kurkur.jpg",
        category: "best friends"
      }
    ]
    // contacts_headers:[

    // ],
  },
  mutations: {},
  getters: {
    getData(state) {
      let clone = {};
//       for (let keys in state.contacts) {
// clone[keys]={FIO:}
//       }
      console.log(clone);
      return state.contacts;
    },
    NAME: state => {
      return state.contacts;
    }
  },
  actions: {},
  modules: {}
});
