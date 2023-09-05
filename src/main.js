import Coordy from "@/coordy.vue";
import "@/css/coordy-vue.css"

module.exports =  {
    install: (app, options) => {
        app.component("Coordy",Coordy)
    },
};