<template>
	<div>
		<div class="page-wrapper">
			<!-- Header Image -->
			<div class="container-fluid header-image" :style="{ '--colour': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + getPartnerPageContent.secondaryMediaUrl + ')' }">
				<div class="container light-section" style="min-height: 530px; height: 100%">
					<div class="row justify-content-center align-items-center h-100">
						<div class="col-lg-4 text-center text-white">
							<h1 class="text-uppercase mb-3 text-6xl partner-title">
<!--								<b>Become</b> <span>our partner</span>-->
                <b>{{ getPartnerPageContent.data.title_sign }}</b>
							</h1>
							<p v-html="getPartnerPageContent.data.content_sign">
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Partner step from -->
			<div class="mt-5">
				<multi-step-form stepWidth="210px" :activeLineWidth="activeLineWidth" :stepData="stepData" :offsetTop="160"></multi-step-form>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	head() {
		return {
			title: "Become A Partner",
		};
	},
  computed: {
    ...mapGetters({
      getPartnerPageContent: "config/getPartnerPageContent"
    })
  },
	data() {
		return {
			stepData: [
				{ title: "USER", component: "user-step" },
				{ title: "COMPANY", component: "company-step" },
			],
		};
	},
	methods: {
		activeLineWidth(index) {
			let w;
			if (index == 0) w = "105px";
			return { width: w };
		},
	},
	mounted() {
		this.isLoading = false;
	},
};
</script>

<style lang="scss" scoped>
.header-image {
	background-image: var(--colour);
	background-color: #000;
	background-repeat: no-repeat;
	height: 507px;
	background-position: 50%;
	background-size: cover;
}

.stepper-box {
	box-shadow: none;
}

@media only screen and (max-width: 600px) {
	.partner-title {
		font-size: 2.5rem;
	}
}
@media only screen and (max-width: 414px) {
	.partner-title {
		font-size: 2.2rem;
	}
}
</style>
