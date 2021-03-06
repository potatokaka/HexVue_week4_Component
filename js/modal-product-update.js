export default {
  props: ["tempProduct", "editState", "apiUrl", "apiPath", "pagination"],
  methods: {
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let httpMethod = "post";
      // 如果是新增狀態，getProducts() 列表頁要去抓第一頁的資料
      let currentPage = 1;

      // 如果是編輯狀態
      if (this.editState == "edit") {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        httpMethod = "put";
        // 去抓目前在編輯的產品，是在當前列表的哪一頁
        currentPage = this.pagination.current_page;
      }

      console.log(currentPage);

      axios[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$emit("hide-product-modal");
          // 重新渲染產品列表，並去 load 該頁面
          this.$emit("get-product", currentPage);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    createImage() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
  template: `
    <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    >
        <div class="modal-dialog modal-xl">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                <span v-if="editState == 'create'">新增產品</span>
                <span v-else-if="editState == 'update'">編輯產品</span>
                </h5>
                <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="mb-2">
                        <div class="mb-3">
                            <label for="imageUrl" class="form-label"
                            >輸入圖片網址</label
                            >
                            <input
                            type="text"
                            class="form-control"
                            placeholder="請輸入圖片連結"
                            v-model="tempProduct.imageUrl"
                            />
                        </div>
                        <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                    </div>

                    <h3 class="mb-3">多圖新增</h3>

                    <div v-if="Array.isArray(tempProduct.imagesUrl)">
                        <div class="mb-3" v-for="(item, index) in tempProduct.imagesUrl" :key="index">
                            <label for="imageUrl" class="form-label"
                            >輸入圖片網址</label
                            >
                            <input
                            type="text"
                            class="form-control"
                            placeholder="請輸入圖片連結"
                            v-model="tempProduct.imagesUrl[index]"
                            />
                            <img class="img-fluid" :src="item" alt="" />
                        </div>
                        <button 
                            class="btn btn-outline-primary btn-sm d-block w-100"
                            v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                            @click="tempProduct.imagesUrl.push('')"
                        >
                            新增圖片
                        </button>
                        <button class="btn btn-outline-danger btn-sm d-block w-100" v-else @click="tempProduct.imagesUrl.pop()">
                            刪除圖片
                        </button>
                    </div>
                    <div v-else>
                        <button class="btn btn-outline-primary btn-sm d-block w-100" @click.prevent="createImage">
                            新增圖片
                        </button>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input
                        id="title"
                        type="text"
                        class="form-control"
                        placeholder="請輸入標題"
                        v-model="tempProduct.title"
                    />
                    </div>

                    <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="category" class="form-label">分類</label>
                        <input
                        id="category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        v-model="tempProduct.category"
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">單位</label>
                        <input
                        id="unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        v-model="tempProduct.unit"
                        />
                    </div>
                    </div>

                    <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="origin_price" class="form-label">原價</label>
                        <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model.number="tempProduct.origin_price"
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">售價</label>
                        <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                        v-model.number="tempProduct.price"
                        />
                    </div>
                    </div>
                    <hr />

                    <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea
                        id="description"
                        type="text"
                        class="form-control"
                        placeholder="請輸入產品描述"
                        v-model="tempProduct.description"
                    >
                    </textarea>
                    </div>
                    <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                        id="description"
                        type="text"
                        class="form-control"
                        placeholder="請輸入說明內容"
                        v-model="tempProduct.content"
                    >
                    </textarea>
                    </div>
                    <div class="mb-3">
                    <div class="form-check">
                        <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="tempProduct.is_enabled"
                        />
                        <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                        >
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                >
                取消
                </button>
                <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
            </div>
            </div>
        </div>
    </div>
    `,
};
