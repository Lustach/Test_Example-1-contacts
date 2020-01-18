<template>
  <v-container>
    <v-icon>mdi-delete</v-icon>
    <v-card>
      <v-card-title>
        Все контакты
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-5 mt-3" @click="save()">
          Add contact
        </v-btn>
        <v-text-field
          v-model.lazy="search"
          append-icon="mdi-account-search-outline"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
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
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-for="(item, i) in editedItem"
                    :key="i"
                  >
                  {{editedItem[i]}}
                  
                    <ul>
                      <li v-if="Array.isArray(item)">
                        {{ i }}:{{editedItem[i]}}
                        <!-- <p v-for="(j,k) in editedItem[i]" :key="j">{{k}}</p> -->
                        <v-text-field
                          v-for="(j,k) in editedItem[i]"
                          :key="k"
                          :value="j"
                          v-model="editedItem[i][k]"
                        ></v-text-field>
                      </li>
                      <li v-else>
                        <!-- {{editedItem[i]}} -->
                        {{ i }}: <v-text-field :value="editedItem[i]" v-model="editedItem[i]"></v-text-field>
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
        item-key="id"
        hide-default-footer
      >
        <!-- КОД НИЖЕ ОТОБРАЖАЕТ ПОЛЯ ТАК КАК НУЖНО-->
        <template #item.phone_number="{item}">
          {{ item.phone_number[0] }}
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
      <v-row>
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
            :headers="category_header"
            :items="contacts"
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

    <div v-for="(item, i) in contacts" :key="i">
      {{ item.photo_src }}
    </div>
    <!-- <v-img src="../images/LustaVlad.jpg"></v-img> -->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  mounted() {
    this.contacts = this.$store.getters.getData;
    console.log(this.contacts, "contacts");
    console.log(this.$store.getters.getData, "this.$store.getters.getData");
    for (let key in this.contacts[0]) {
      this.contacts_headers.push({ text: key, value: key });
    }
    console.log(this.contacts_headers, "this.contacts_headers");
  },
  data: () => ({
    contacts: [],
    contacts_headers: [],
    search: "",
    forEdit: false,
    headers: [
      { text: "FIO", value: "FIO" },
      { text: "phone_number", value: "phone_number" },
      { text: "email", value: "email" },
      { text: "web_site", value: "web_site" },
      { text: "birthday", value: "birthday" },
      { text: "company", value: "company" },
      { text: "photo_src", value: "photo_src" },
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
    categories: [{}],
    editedIndex: -1,
    editedItem: {
      FIO: "",
      phone_number: ["0714494247"],
      email: [],
      web_site: "",
      birthday: "",
      company: "",
      photo_src: "",
      category: ""
    },
    defaultItem: {
      FIO: "",
      phone_number: [],
      email: [],
      web_site: "",
      birthday: "",
      company: "",
      photo_src: "",
      category: ""
    },
    dialog: false
  }),
  methods: {
    ...mapMutations([""]),
    deleteItem(item) {
      const index = this.contacts.indexOf(item);
      confirm("Вы действительно хотите удалить данную запись?") &&
        this.contacts.splice(index, 1);
    },
    close() {
      this.forEdit = false;
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save(index) {
      // console.log(index,'INDEX');
      // if (this.editedIndex > -1) {
      //   Object.assign(this.contacts[this.editedIndex], this.editedItem);
      // } else {
      //   this.contacts.push(this.editedItem);
      // }
      console.log(index,"INDEX");
      console.log(this.contacts.indexOf(this.editedItem), "her");
      console.log(index, "index");

      // console.log(this.editedIndex,'eind');
      // console.log(Object.assign(this.contacts[this.editedIndex], this.editedItem),'HEUI');
      // Object.assign(this.contacts[this.editedIndex], this.editedItem);
      // this.close();
    },
    editItem(index) {
      // this.editedItem={
      //   FIO:'lusta',

      // }
      console.log(index,'HUINDEX');
      const start = new Date().getTime();
      this.editedItem = index;
      this.forEdit = true;
      const end = new Date().getTime();
      console.log(`SecondWay: ${end - start}ms`);

    },
    getInfoItem(item) {
      this.editedItem = item;
      this.dialog = true;
      console.log(item, "ITEMS");
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
    ...mapGetters(["getData"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getInfo() {
      this.contacts;
    }
  }
};
</script>
