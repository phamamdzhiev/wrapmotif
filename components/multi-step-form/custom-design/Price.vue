<template>
  <div class="col-lg-8 mx-auto">
    <div class="row">
      <!-- Header -->
      <div class="col-12">
        <p class="mb-5 text-center">
          Select the design type and your budget for the custom car wrap design
        </p>
        <p class="mb-3">
          <span class="mr-2">Select design type </span>
          <i v-if="
              $v.form.characterOfDesign.$dirty &&
              !$v.form.characterOfDesign.$anyError
            " class="fas fa-check text-success" :style="{ 'font-size': '15px' }"></i>
          <i v-else class="fas fa-circle text-danger" :style="{ 'font-size': '8px' }"></i>
        </p>
      </div>

      <!-- Image -->
      <div class="col-md-4 col-sm-6" v-for="(item, i) in designs" :key="i">
        <div class="overlay-wrapper" :class="{ highlited: item.selected, 'border-primary': item.selected }" @click="handleSelect(i)">
          <img :src="item.primaryMediaUrl" class="img-fluid" />
          <!-- Overlay -->
          <div class="overlay p-1 text-center rounded">
            <p>
              Deposit Amount
              {{
                item.depositAmount
                  | currency(
                    $store.state.currency.selectedCurrency,
                    $store.state.currency.exchangeRate
                  )
              }}
            </p>
          </div>
        </div>
        <p class="lead mt-2">{{ item.category.name }}</p>
      </div>

      <!-- Range -->
      <div class="col-12 mt-5 mb-4">
        <div class="row">
          <div class="col-md-8 mx-auto">
            <p class="text-center mb-3">
              Select your budget for custom design:
            </p>
            <client-only >
              <vue-slider :marks="marks" :min="1000" :max="3000" :enable-cross="false" v-model="form.priceValue" :height="10" :dotSize="22" />
            </client-only>

            <p class="text-center mt-3 lead">
              Your budget will be in between {{ $store.state.currency.selectedCurrency === 'EUR' ? '€':'$' }} {{ form.priceValue[0] }} to ${{
                form.priceValue[1]
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <step-pagination :increment="increment" :decrement="decrement" :disableNext="$v.$invalid" @onNext="saveData"></step-pagination>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
export default {
  name: "price",

  data() {
    return {
      marks: {
        '1000': {
          label: 'Simple',
            labelStyle: {
              left: '100%',
              margin: '0 0 0 10px',
              top: '50%',
              transform: 'translate(-80px,-50%)',
              fontSize: '18px',
            }
        },
        '3000': {
          label: 'Complex',
          labelStyle: {
            left: '100%',
            margin: '0 0 0 10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
          }
        }
      },
      form: {
        priceValue: [1000, 3000],
        characterOfDesign: ""
      },
      designs: []
    };
  },
  validations: {
    form: {
      characterOfDesign: { required }
    }
  },
  computed: {
    getAmount() {
      return this.designs.find(item => item.id == this.form.characterOfDesign)
        .depositAmount;
    }
  },
  methods: {
    ...mapMutations({
      setFields: "customDesign/setFields"
    }),
    saveData(e, increment) {
      this.setFields({
        categoryId: this.form.characterOfDesign,
        rangeFrom: this.form.priceValue[0],
        rangeTo: this.form.priceValue[1],
        customerAmount: this.convertCurrency(this.getAmount),
        depositAmount: this.getAmount,
        customerCurrency: this.$store.state.currency.selectedCurrency
      });
      increment();
    },
    handleSelect(index) {
      this.$v.form.characterOfDesign.$touch();
      this.form.characterOfDesign = this.designs[index].id;

      this.designs.forEach((item, i) => {
        if (i == index) item.selected = true;
        else item.selected = false;
      });
    }
  },
  props: {
    increment: {
      type: Function
    },
    decrement: {
      type: Function
    }
  },
  async fetch() {
    const resDesigns = await this.$axios.get("/design-characters");
    this.designs = resDesigns.data.data.map(item => ({
      ...item,
      selected: false
    }));
  }
};
</script>

<style>
.vue-slider-process {
  background: #c85007de !important;
}
.vue-slider-dot-handle {
  border-color: var(--primary) !important;
}
</style>

<style lang="scss" scoped>
.overlay-wrapper {
  position: relative;
  cursor: pointer;
  border: 3px solid #ddd;
  border-radius: 3px;
  &:hover {
    .overlay {
      display: block;
    }
  }
  .overlay {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffffeb;
    min-width: 80%;
    font-size: 19px;
    cursor: pointer;
    z-index: 20;
  }
  &.highlited {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #ffffff73;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }
}
</style>
