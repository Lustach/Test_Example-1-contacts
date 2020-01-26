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
      console.log(state.contacts,'state')

      let i = JSON.parse(localStorage.getItem('contacts')) || []
      i.push(object)
      localStorage.setItem('contacts',JSON.stringify(i))
      state.contacts.push(object)
      
    },
    deleteItem(state,payload){
      state.contacts.splice(payload,1)
      localStorage.setItem('contacts',JSON.stringify(state.contacts))
      // this.contacts.splice(this.contacts.indexOf(this.deletedItem), 1);
    },
    editItem(state,[index,object]){
      console.log(index,'index');
      console.log(object,'object');
      state.contacts.splice(index,1,object)
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
      console.log(JSON.parse(localStorage.getItem('contacts')),'JSON.parse(localStorage.getItem');
      // this.contacts.indexOf(this.editedItemClone),1,this.editedItem
    }
  },
  getters: {
    getData(state) {
//       for (let keys in state.contacts) {
// clone[keys]={FIO:}
//       }
      if(localStorage.getItem('contacts') !== null){
        console.log(localStorage.getItem('contacts'),'localStorage.getItem');
        state.contacts=JSON.parse(localStorage.getItem('contacts'))
      }
      else{
        localStorage.setItem('contacts',JSON.stringify(state.contacts))
      }
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
