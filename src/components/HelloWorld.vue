<template>
  <v-container>
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
                    <ul>
                      <li v-if="Array.isArray(item)">
                        {{ i }}:
                        <v-col cols="12" class="pa-0">
                          <input
                            class="custom_field"
                            style=""
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
                      <li v-else-if="i == 'photo_src'">
                        <!-- <div class="file-upload-form">
                Upload an image file:
                <input type="file" @change="previewImage" accept="image/*">
            </div> --><v-col cols="12" class="pa-0">
                          {{ i }}:
                          <div class="file-upload-form">
                            Upload an image file:
                            <input
                              type="file"
                              @change="previewImage($event, editedItem)"
                              accept="image/*"
                            />
                          </div>
                          <!-- <v-text-field
                            placeholder="v-else"
                            :value="editedItem[i]"
                            v-model="editedItem[i]"
                          ></v-text-field> -->
                        </v-col>
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
          <!-- <img :src="imageData"             width="75px"
            height="120px"
            class="ma-1" alt="image"/>
            <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData" />
        </div> -->
          <v-img
            :src="getImgUrl(item)"
            width="75px"
            height="120px"
            class="ma-1"
          >
          </v-img>
          <!-- <img
            :src="getImgUrl(item.photo_src) || imageData"
            alt=""
            width="75px"
            height="120px"
            class="ma-1"
          /> -->

          <!-- <img :src="imageData" alt=""> -->
        </template>
        <template #item.email="{item}">
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  mounted() {
    if (localStorage.getItem("contacts") == null) {
      this.contacts = localStorage.setItem(
        "contacts",
        JSON.stringify(this.getData)
      );}
      this.contacts = this.getData;
    // } else {
    //   // this.contacts = JSON.parse(localStorage.getItem("contacts"))||[];
    //   this.contacts = this.getData;
    //         console.log(this.contacts);
    // }

    for (let key in this.contacts[0]) {
      this.contacts_headers.push({ text: key, value: key });
    }
    this.categories = [{ text: "FIO", value: "FIO" }];
    // editedItem
  },

  data: () => ({
    contacts: [],
    contacts_headers: [],
    search: "",
    forEdit: false,
    imageData: "",
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
    editedItem: {
      // объект с котороым происходят вся логика
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
      //для указания полей по умолчанию
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
    ...mapMutations(["addContact", "editItem", "deleteItem"]),
    deleteItem(item) {
      this.deletedItem = item;
      this.forDelete = true;
    },
    close() {
      this.forEdit = false;
      this.dialog = false;
      this.forDelete = false;
      this.forAdd = false;
      setTimeout(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem)); //Object.assign в случае если свойство объекта есть массив, будет изменять и дефолтИтем
        this.editedIndex = -1;
      }, 300);
    },

    save(index) {
      if (this.forAdd == false) {
        if (index) {
          //для удаления
          console.log(
            this.contacts.indexOf(this.deletedItem),
            "this.contacts.indexOf(this.deletedItem)"
          );
          this.$store.commit(
            "deleteItem",
            this.contacts.indexOf(this.deletedItem)
          );
        } else {
          //для реадктирования
          this.$store.commit("editItem", [
            this.contacts.indexOf(this.editedItemClone),
            this.editedItem
          ]);
        }
      } else {
        //для добавления
        if (this.editedItem.photo_src == "")
          //по дефолту
          this.editedItem.photo_src = "Github_avatar.jpg";
        this.addContact(this.editedItem);
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
        this.forAdd = false;
      }
      this.close();
    },
    editItem(index) {
      //кнопка редактирования
      this.editedItemClone = index;
      this.editedItem = Object.assign({}, index);
      this.forEdit = true;
      this.forAdd = false;
    },
    getInfoItem(item) {
      //кнопка инфы
      this.editedItem = item;
      this.dialog = true;
    },
    birthdayDate() {},
    getImgUrl(pic) {
      // console.log(typeof this.imageData,'PICTURE');//string
      if (pic.photo_src == "VladLusta.jpg" || pic.photo_src == "Kurkur.jpg") {
        return require("../static/img/" + pic.photo_src);
      } else {
        return this.contacts[this.contacts.indexOf(pic)].photo_src
        // return this.imageData;
      }

      // if(pic='Kurkur.jpg')
      // return require("../static/img/" + pic);
    },
    addNewContact() {
      this.forEdit = true;
      this.forAdd = true;
      this.editedItem = JSON.parse(JSON.stringify(this.defaultItem)); // after edit-button click, contact data saves to editedItem
    },
    addElementOfArray(element) {
      element.push("");
    },
    previewImage(event, item) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
          item.photo_src = this.imageData;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  },
  computed: {
    ...mapGetters(["getData"]),
    getInfo() {
      this.contacts;
    }
  }
};
</script>
<style lang="scss">
.custom_field {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: rgb(148, 148, 148);
  color: black;
  height: 32px;
  width: inherit;
  outline: none;
}
</style>
