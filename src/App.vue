<template>
  <v-app>
    <div class="zaglushka" @click="ChangeDrawer" v-if="drawer">
      
    </div>
    <v-app-bar app color="primary" dark fixed>
      <v-btn text @click.stop="ChangeDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-flex justify-center row>
        Тестовое задание №3
      </v-flex>
    </v-app-bar>
    <div>
      <v-navigation-drawer permanent v-if="drawer" fixed class="side-bar">
        <v-list-item>
          <v-list-item-content>
            <router-link to="/" @click.stop="ChangeDrawer"><v-list-item-title class="title">
              На главную
            </v-list-item-title></router-link>
            <!-- <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav v-for="(item,index) in items" :key="index">
          <router-link :to="item.link"><v-list-item   link>
              <v-list-item-title @click="ChangeDrawer"><h1>{{item.title}}</h1></v-list-item-title>
          </v-list-item></router-link>
        </v-list>
      </v-navigation-drawer>
    </div>
    
    <v-content class="">
      <router-view ></router-view>
    </v-content>
  </v-app>
</template>

<script>
import MainBanner from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    MainBanner
  },
mounted(){
      // this.$router.push(`/articles/1`)
},
  data: () => ({
    drawer: null,
    items: [
      { title: "Избранное", link:'/Favourite' },
      // { title: "Статьи", link:'LookingPage'}
    ]
  }),
methods:{
  ChangeDrawer(){
    this.drawer = !this.drawer
  },
}
};
</script>
<style lang="scss">
.zaglushka {
  position: absolute;
  z-index: 99;
  background-color: rgb(129, 129, 129);
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
.side-bar {
  position:absolute;
  z-index: 100 !important;
}
</style>
