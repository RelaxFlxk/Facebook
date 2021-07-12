<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" bottom fixed app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-img src='./assets/logo_vgroup.png' /> -->
            <v-img :src="require('@/assets/logo.png')"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ session.data.userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list>
          <v-list-group
            v-for="(topic, i) in ListHeaderMenu"
            :key="i"
            :value="true"
            prepend-icon="mdi-account-circle"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ topic.menuName }}</v-list-item-title>
            </template>
            <!-- ข้อมูลหลัก -->
            <v-list-group
              v-for="(header, i) in topic.header"
              :key="i"
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ header.menuName }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(item, i) in header.sub"
                :key="i"
                :to="item.menuPath"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.menuName" />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn dark color="red" block @click.prevent="logout()">
            <v-icon>mdi-location-exit</v-icon> Out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'HRM - Vgroup Honda',
      drawer: true,
      mini: false,
      session: this.$session.getAll(),
      ListMenu: [],
      ListHeaderMenu: [],
      ListTopicMenu: []
    }
  },
  computed: {},
  mounted () {
    this.getMenu()
  },
  methods: {
    async getMenu () {
      var ListMenu = []
      var ListHeaderMenu = []
      var ListTopicMenu = []
      this.session.menu.forEach((element) => {
        if (element.menuType === 'Topic') {
          ListTopicMenu.push(element)
        } else if (element.menuType === 'Header') {
          ListHeaderMenu.push(element)
        } else if (element.menuType === 'Sub') {
          ListMenu.push(element)
        }
      })

      ListTopicMenu.forEach((objTopic) => {
        console.log(objTopic.menuName)
        var h = []
        ListHeaderMenu.forEach((objHeader) => {
          if (objTopic.menuName === objHeader.menuRefCodeHeader) {
            h.push(objHeader)
            objTopic.header = h
          }
        })
        this.ListHeaderMenu.push(objTopic)
      })

      this.ListHeaderMenu.forEach((el_) => {
        if (el_.header !== null) {
          var Subs = []
          var x = el_.header
          x.forEach((el2) => {
            Subs.push(el2)
          })
          Subs.forEach((element) => {
            var s = []
            ListMenu.forEach((element2) => {
              if (element2.menuRefCodeHeader === element.menuName) {
                element2.header = element
                s.push(element2)
              }
            })
            var y = []
            s.forEach((elX) => {
              if (element.menuName === elX.menuRefCodeHeader) {
                y.push(elX)
                element.sub = y
              }
            })
            this.ListMenu.push(element)
          })
        }
      })
      // console.log('this.ListHeaderMenu', this.ListHeaderMenu)

      // console.log('route', this.$route.path)
      var count = 0
      this.session.menu.forEach((element) => {
        // console.log('element check menu', element.menuPath)
        if (element.menuPath === this.$route.path) {
          count += count + 1
        }
      })
      // console.log('count', count)
      if (count < 1 && this.$route.path !== '/Core/Home') {
        this.$router.push('/Core/Login')
      }
    },
    logout () {
      console.log(this.$session.getAll().AccessKey)
      // this.$session.destroy()
      // this.$session.clear()
      this.$router.push('/Core/Login?access=' + this.$session.getAll().AccessKey)
    }
  }
}
</script>

<style lang="css" scoped></style>
