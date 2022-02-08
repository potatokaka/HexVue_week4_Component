import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`https://vue3-course-api.hexschool.io/v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired
          )}; path=/`;
          window.location = "products.html";
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
});

app.mount("#app");
