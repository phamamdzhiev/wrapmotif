<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col text-center">
        <h1 class="font-semibold text-5xl faq-title">
          Frequently asked questions
        </h1>
      </div>
    </div>

    <!-- Customer section -->
    <div class="my-5 d-flex flex-column" v-if="faqs && faqs.customer.length">
      <h2 class="faq-subtitle">Customer FAQ's</h2>
      <div class="mt-4">
        <div id="customerAccordion" class="accordion">
          <!-- vue-bootstrap toggle -->
          <div class="card faq-card" v-for="(customerFaq, i) in faqs.customer" :key="i">
            <div class="card-header faq-card-header position-relative">
              <a v-b-toggle :href="`#customerId${customerFaq.id}`" class="faq-link" @click.prevent>
                {{ customerFaq.question }}
                <span class="position-absolute faq-caret">
                  <!-- <i class="faq-plus fas fa-plus"></i>
                  <i class="faq-minus fas fa-minus"></i> -->
                  <i class="fas fa-chevron-down faq-plus"></i>
                  <i class="fas fa-chevron-up faq-minus"></i>
                </span>
              </a>
            </div>

            <b-collapse :id="`customerId${customerFaq.id}`">
              <b-card class="border-0">
                <div v-html="customerFaq.answer"></div>
              </b-card>
            </b-collapse>
          </div>
          <!-- vue-bootstrap toggle ends -->
        </div>
      </div>
    </div>

    <!-- Wrapping company section -->
    <div class="d-flex flex-column my-5" v-if="faqs && faqs.wrapping_company.length">
      <h2 class="faq-subtitle">Wrapping company FAQ's</h2>
      <div class="mt-4">
        <div id="wrappingAccordion" class="accordion">
          <!-- vue-bootstrap toggle -->
          <div class="card faq-card" v-for="(companyFaq, i) in faqs.wrapping_company" :key="i">
            <div class="card-header faq-card-header position-relative">
              <a v-b-toggle :href="`#companyId${companyFaq.id}`" class="faq-link" @click.prevent>
                {{ companyFaq.question }}
                <span class="position-absolute faq-caret">
                  <!-- <i class="faq-plus fas fa-plus"></i>
                  <i class="faq-minus fas fa-minus"></i> -->
                  <i class="fas fa-chevron-down faq-plus"></i>
                  <i class="fas fa-chevron-up faq-minus"></i>
                </span></a>
            </div>

            <b-collapse :id="`companyId${companyFaq.id}`">
              <b-card class="border-0">
                <div v-html="companyFaq.answer"></div>
              </b-card>
            </b-collapse>
          </div>
          <!-- vue-bootstrap toggle ends -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  head() {
    return {
      title: "FAQ"
    };
  },
  data() {
    return {
      faqs: null
    };
  },

  async fetch() {
    const resFaqs = await this.$axios.$get("/faqs");
    this.faqs = resFaqs.data;
  }
};
</script>

<style lang="scss" scoped>
.faq-card {
  border: 0;
  width: 100%;
}

.faq-card-header {
  cursor: pointer;
  background-color: transparent;
  border: 0;
  border-top: 1px solid gray;
  padding: .75rem 1.35rem .75rem .75rem;
}

.faq-link {
  font-weight: 600;
}

.faq-link .faq-plus,
.faq-link .faq-minus {
  background-image: linear-gradient(#6F3A1F 0%, #DC7B54 85%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-link.collapsed .faq-plus,
.faq-link.not-collapsed .faq-minus {
  display: block;
}

.faq-link.collapsed .faq-minus,
.faq-link.not-collapsed .faq-plus {
  display: none;
}

.faq-caret {
  top: 50%;
  transform: translateY(-50%);
  right: .5rem;
}

@media only screen and (max-width: 600px) {
  .faq-title {
    font-size: 2.5rem;
  }
  .faq-subtitle {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 414px) {
  .faq-title {
    font-size: 2rem;
  }
  .faq-subtitle {
    font-size: 1.3rem;
  }
}
</style>
