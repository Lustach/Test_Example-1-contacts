<template>
  <v-container>
    <!-- <v-icon>mdi-delete</v-icon>
    {{ categories }} -->
    <v-card>
      <v-card-title>
        Все контакты
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-5 mt-3" @click="addNewContact()">
          Add contact
        </v-btn>
        <v-text-field
          v-model.lazy="search"
          append-icon="mdi-account-search-outline"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="forDelete" max-width="250px" class="d-flex">
          <v-card>
            <v-card-title>
              Удалить контакт?
            </v-card-title>
            <v-card-actions class="justify-center align-center">
              <v-btn color="primary" @click="save(deletedItem)">Да</v-btn>
              <v-btn color="primary" @click="close()">Нет</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="425px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-for="(item, i) in editedItem"
                    :key="i"
                  >
                    <!-- {{i}} <ul v-if="Array.isArray(j)"><li v-for="j in item" :key="j">{{j}}</li></ul> -->
                    <ul>
                      <li v-if="Array.isArray(item)">
                        {{ i }}:
                        <p v-for="j in item" :key="j">{{ j }}</p>
                      </li>
                      <li v-else>{{ i }}: {{ item }}</li>
                    </ul>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="forEdit" max-width="825px">
          <!-- {{ editedItem }}
          {{ contacts }} -->
          <v-card>
            <v-card-text>
              {{ editedItem }} HERE
              {{defaultItem}} oops
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-for="(item, i) in editedItem"
                    :key="i"
                  >
                    <ul>
                      <li v-if="Array.isArray(item)">
                        {{ i }}:
                        <v-col cols="12" class="pa-0">
                          <input
                            class="custom_field"
                            style="border-bottom-style:solid;
                            border-bottom-width:1px;
                            border-color:black;
                            height:32px;width:inherit;color:black;
                            outline:none;"
                            placeholder="hello"
                            type="text"
                            v-for="(j, k) in editedItem[i]"
                            :key="k"
                            :value="editedItem[i][k]"
                            @input="editedItem[i][k] = $event.target.value"
                          />
                          <v-btn
                            @click="addElementOfArray(editedItem[i])"
                            color="primary"
                            class="ma-1"
                            ><v-icon>mdi-plus</v-icon></v-btn
                          >
                        </v-col>
                      </li>
                      <li v-else-if="i == 'birthday'">
                        <!-- {{editedItem[i]}} -->
                        {{ i }}:
                        <v-text-field
                          :value="editedItem[i]"
                          v-model="editedItem[i]"
                        ></v-text-field>
                        <v-date-picker
                          v-model="editedItem[i]"
                          :value="editedItem[i]"
                        ></v-date-picker>
                      </li>
                      <li v-else>
                        <v-col cols="12" class="pa-0">
                          {{ i }}:
                          <v-text-field
                            placeholder="v-else"
                            :value="editedItem[i]"
                            v-model="editedItem[i]"
                          ></v-text-field>
                        </v-col>
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="contacts"
        class="elevation-1"
        :search="search"
        hide-default-footer
      >
        <!-- КОД НИЖЕ ОТОБРАЖАЕТ ПОЛЯ ТАК КАК НУЖНО-->
        <template #item.phone_number="{item}">
          {{ item.phone_number[0] }}
        </template>
        <template #item.photo_src="{item}">
          <!-- {{item.photo_src}} -->
          <v-img
            :src="getImgUrl(item.photo_src)"
            width="75px"
            height="120px"
            class="ma-1"
          >
          </v-img>
        </template>
        <template #item.email="{item}">
          <!-- {{ item.email[0] }} -->
          <a :href="'mailto:' + 'item.email[0]'">{{ item.email[0] }}</a>
        </template>
        <template #item.web_site="{item}">
          <a :href="item.web_site">{{ item.web_site }}</a>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon @click="getInfoItem(item)">
            mdi-information
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-flex>
      <v-row style="justify-content:center;">
        <v-card class="ma-5" max-width="400px">
          <v-card-title>
            Дни рождения
          </v-card-title>
          <v-data-table
            :headers="birthday_header"
            :items="contacts"
            dense
            hide-default-footer=""
          >
          </v-data-table>
        </v-card>
        <v-card class="ma-5" max-width="400px">
          <v-card-title primary-title>
            Категории
          </v-card-title>
          <v-data-table
            :headers="categories"
            :items="contacts"
            group-by="category"
            dense
            hide-default-footer=""
          >
          </v-data-table>
        </v-card>
        <v-card>
          <v-simple-table> </v-simple-table>
        </v-card>
      </v-row>
    </v-flex>

    <!-- <div v-for="(item, i) in contacts" :key="i">
      {{ item.photo_src }}
      <img :src="getImgUrl(item.photo_src)" />
    </div> -->
    <!-- <img src="../static/img/VladLusta.jpg" alt="" /> -->
    <!-- <v-img src="../images/LustaVlad.jpg"></v-img> -->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  mounted() {
    this.contacts = this.getData;
    console.log(this.contacts, "contacts");
    // console.log(this.$store.getters.getData, "this.$store.getters.getData");
    for (let key in this.contacts[0]) {
      this.contacts_headers.push({ text: key, value: key });
    }
    console.log(this.getCategories, "getCategories");
    // this.categories={text:this.getCategories,value:"category"}
    // for (let key in this.getCategories) {
    //   // console.log(typeof this.getCategories[key]);
    //   // if(typeof(this.getCategories[key]) === 'string')
    //     this.categories.push({text:this.getCategories[key]})
    //   }
    this.categories = [
      { text: "FIO", value: "FIO" }
      // { text: "phone_number", value: "phone_number" }
    ];
    for (let i = 0; i < this.contacts.length; i++) {}
    console.log(this.categories);
    // console.log(this.contacts_headers, "this.contacts_headers");
  },

  data: () => ({
    contacts: [],
    contacts_headers: [],
    search: "",
    forEdit: false,
    headers: [
      { text: "photo_src", value: "photo_src" },
      { text: "FIO", value: "FIO" },
      { text: "phone_number", value: "phone_number" },
      { text: "email", value: "email" },
      { text: "web_site", value: "web_site" },
      { text: "birthday", value: "birthday" },
      { text: "company", value: "company" },
      { text: "category", value: "category" },
      { text: "", value: "action", sortable: false }
    ],
    birthday_header: [
      { text: "date", value: "birthday" },
      { text: "FIO", value: "FIO" }
    ],
    category_header: [
      { text: "category", value: "category" },
      { text: "FIO", value: "FIO" }
    ],
    categories: [],
    editedItemClone: "",
    editedIndex: -1,
    editedItem: {
      FIO: "",
      phone_number: [""],
      email: [""],
      web_site: "",
      birthday: "",
      company: "",
      photo_src: "",
      category: ""
    },
    defaultItem: {
      FIO: "",
      phone_number: [""],
      email: [""],
      web_site: "",
      birthday: "",
      company: "",
      photo_src: "",
      category: ""
    },
    dialog: false,
    forDelete: false,
    forAdd: false,
    deletedItem: {}
  }),
  methods: {
    ...mapMutations([""]),
    deleteItem(item) {
      // const index = this.contacts.indexOf(item);
      // confirm("Вы действительно хотите удалить данную запись?") &&
      // this.contacts.splice(index, 1);
      this.deletedItem = item;
      this.forDelete = true;
      // this.save(item)
    },
    close() {
      this.forEdit = false;
      this.dialog = false;
      this.forDelete = false;
      this.forAdd = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(index) {
      if (this.forAdd == false) {
        console.log(index, "GUINDEX");
        if (index) {
          console.log("FINGDELETE");
          this.contacts.splice(this.contacts.indexOf(this.deletedItem), 1);
        } else {
          console.log(
            this.contacts[this.contacts.indexOf(this.editedItemClone)],
            "this.contacts[this.contacts.indexOf(this.editedItemClone)]"
          );
          console.log(index, "INDEX");
          console.log(this.contacts.indexOf(this.editedItemClone, "indexPF"));
          console.log(this.editedItem, "this.editedItem");
          //  this.contacts[this.contacts.indexOf(this.editedItemClone)] = Object.assign({},this.editedItem)
          this.contacts.splice(
            this.contacts.indexOf(this.editedItemClone),
            1,
            this.editedItem
          );
          console.log(
            this.contacts[this.contacts.indexOf(this.editedItemClone)],
            "11this.contacts[this.contacts.indexOf(this.editedItemClone)]"
          );
        }
      } else {
        // if(this.editedItem.FIO!=""){
        if (this.editedItem.photo_src == "")
          this.editedItem.photo_src = "Github_avatar.jpg";
        this.contacts.push(this.editedItem);
        console.log(this.editedItem,'THIS.EDITEDITEM');
        console.log(this.defaultItem,'THIS>DELETEDITEM');
        this.editedItem = Object.assign({}, this.defaultItem);
        this.forAdd = false;
        // }
      }
      this.close();
    },
    editItem(index) {
      console.log(index, "INDEXINDEX");
      this.editedItemClone = index;
      this.editedItem = Object.assign({}, index);
      console.log(Object.assign({}, index), "Object.assign({},index)");
      this.forEdit = true;
      this.forAdd = false;
    },
    getInfoItem(item) {
      this.editedItem = item;
      this.dialog = true;
      console.log(item, "ITEMS");
    },
    birthdayDate() {},
    getImgUrl(pic) {
      return require("../static/img/" + pic);
    },
    addNewContact() {
      this.forEdit = true;
      this.forAdd = true;
      this.editedItem = Object.assign({}, this.defaultItem); // after edit-button click, contact data saves to editedItem
    },
    addElementOfArray(element) {
      element.push("");
      // element.push('hui')
      // console.log(element,'element');
    }
    // test() {
    //   const start = new Date().getTime();
    //   for (let i = 0; i < 10000; i++) {
    //   }
    //   const end = new Date().getTime();
    //   console.log(`SecondWay: ${end - start}ms`);
    // }
  },
  computed: {
    ...mapGetters(["getData", "getCategories"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getInfo() {
      this.contacts;
    }
  }
};
</script>
<style lang="scss">
// .custom_field{

// }
</style>
