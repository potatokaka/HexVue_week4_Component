export default {
  props: ["pages"],
  methods: {
    emitProducts(item) {
      this.$emit("emit-products", item);
    },
  },
  template: `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
            <li class="page-item" :class="{ disabled : !pages.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitProducts(pages.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="(item) in pages.total_pages" :key="item" :class="{ active : pages.current_page === item }">
                <a class="page-link" href="#" @click.prevent="emitProducts(item)">{{ item }}</a>
            </li>
            
            <li class="page-item" :class="{ disabled : !pages.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="emitProducts(pages.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            </ul>
        </nav>
    `,
};
