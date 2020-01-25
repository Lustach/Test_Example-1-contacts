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
        web_site: "https://www.youtube.com/",
        birthday: "2001-01-04",
        company: "Any",
        photo_src: "VladLusta.jpg",
        category: "best friends",
      },
      {
        FIO: "Куркурин Никита Леонидович",
        phone_number: ["+380714412687", "+380714595213"],
        email: ["nik.kurk@mail.ru", "kurk.nik@gmail.com"],
        web_site: "https://www.youtube.com/",
        birthday: "2001-03-23",
        company: "Any",
        photo_src: "Kurkur.jpg",
        category: "collegs",
      }
    ],
    categories:["best friends","collegs"],
    // contacts_headers:[

    // ],
  },
  mutations: {
    addContact(state,object){
      console.log(state,'state')
      state.contacts.push(object)
    },
    deleteItem(state,payload){
      state.contacts.splice(payload,1)
      // this.contacts.splice(this.contacts.indexOf(this.deletedItem), 1);
    },
    editItem(state,[index,object]){
      console.log(index,'index');
      console.log(object,'object');
      state.contacts.splice(index,1,object)
      // this.contacts.indexOf(this.editedItemClone),1,this.editedItem
    }
  },
  getters: {
    getData(state) {
//       for (let keys in state.contacts) {
// clone[keys]={FIO:}
//       }
      return state.contacts;
    },
    getCategories(state){
      return state.categories
    }
    // NAME: state => {
    //   return state.contacts;
    // }
  },
  actions: {},
  modules: {}
});
