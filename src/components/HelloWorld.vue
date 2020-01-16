<template>
  <v-container>
    <v-icon>mdi-delete</v-icon>
    <v-card>
      <v-card-title>
        Все контакты
        <v-spacer></v-spacer>
        <!-- <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="(item, i) in contacts"
                    :key="i"
                  >
                  {{i}}:{{item}}
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
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
          </v-card>
        </v-dialog>

        <v-dialog v-model="forEdit" max-width="425px">
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
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="contacts"
        class="elevation-1"
        :search="search"
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

        <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
        <!-- <template slot="items" slot-scope="props">
          <td>{{ props.item.FIO }}</td>
          <td>{{ props.item.phone_number[0] }}</td>
          <td>{{ props.item.email[0] }}</td>
          <td>{{ props.item.web_site }}</td>
          <td>{{ props.item.birthday }}</td>
          <td>{{ props.item.company }}</td>
          <td>{{ props.item.photo_src }}</td>
          <td>{{ props.item.category }}</td>
        </template> -->
        <!-- <template v-slot:pageText="props">
      ITEMS {{ props.pageStart }} - {{ props.pageStop }} OF {{ props.itemsLength }} // Edit this
      // ^this is what you need
    </template> -->
      </v-data-table>
    </v-card>
    <!-- <v-card>
      <v-card-title>
        Все контакты
        <v-spacer></v-spacer>
        <v-text-field
          v-model.lazy="search"
          append-icon="mdi-account-search-outline"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-simple-table class="mt-10">
        <thead>
          <tr>
            <th class="text-left" v-for="(item, i) in headers" :key="i">
              {{ item.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in contacts" :key="item.name">
            <td>{{ item.FIO }}</td>
            <td>{{ item.phone_number[0] }}</td>
            <td>{{ item.email[0] }}</td>
            <td>{{ item.web_site }}</td>
            <td>{{ item.birthday }}</td>
            <td>{{ item.company }}</td>
            <td>{{ item.photo_src }}</td>
            <td>{{ item.category }}</td>
            <td>
              <v-icon class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon class="mr-2" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
              <v-icon @click="getInfoItem(item)">
                mdi-information
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card> -->

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
    // this.contacts = this.$store.getters.getData;
    // console.log(this.$store.getters.getData[0].phone_number);

    this.contacts = this.$store.getters.getData;
    console.log(this.contacts, "contacts");
    console.log(this.$store.getters.getData, "this.$store.getters.getData");
    for (let key in this.contacts[0]) {
      // alert("Ключ: " + key + " значение: " + this.contacts[i][key]);
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
      this.forEdit=false
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.contacts[this.editedIndex], this.editedItem);
      } else {
        this.contacts.push(this.editedItem);
      }
      this.close();
    },
    editItem(index) {
      // this.editedItem={
      //   FIO:'lusta',

      // }
      console.log(index);
      this.editedItem = index;

      this.forEdit = true;
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
