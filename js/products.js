import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
import modulePagination from "./pagination.js";
import modalProductUpdate from "./modal-product-update.js";
import modalProductDelete from "./modal-product-delete.js";

let deleteModal = "";
let productModal = "";

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "filter117",
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      editState: "",
    };
  },
  components: {
    modulePagination,
    modalProductUpdate,
    modalProductDelete,
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          //   console.log(res.data);
          this.getProducts();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getProducts(page = 1) {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    openModal(state, item) {
      if (state == "create") {
        this.editState = state;
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      } else if (state == "edit") {
        this.editState = state;
        // this.tempProduct = { ...item };
        // 改成深拷貝
        this.tempProduct = JSON.parse(JSON.stringify(item));
        productModal.show();
      } else if (state == "delete") {
        this.editState = state;
        this.tempProduct = item;
        deleteModal.show();
      }
    },
    hideProductModal() {
      productModal.hide();
    },
    hideDeleteModal() {
      deleteModal.hide();
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    // 確認是否登入
    this.checkLogin();

    productModal = new bootstrap.Modal(document.querySelector("#productModal"));

    deleteModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );
  },
});

app.mount("#app");
