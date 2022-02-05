import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import VueMatomo from 'vue-matomo'
import {configuration} from '@/config'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

Vue.config.productionTip = configuration.isProd

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Sentry.init({
  Vue,
  dsn: "https://6254ba11e2704d3c81fdfea295d856b3@o1125895.ingest.sentry.io/6187776",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "qr.owenclc.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Vue.use(VueMatomo, {
  // Configure your matomo server and site by providing
  host: configuration.matomoUrl,
  siteId: configuration.matomoSiteId,
  trackerFileName: 'owenclcinsights',
  enableLinkTracking: true,
  requireConsent: false,
  trackInitialView: true,
  disableCookies: false,
  requireCookieConsent: false,
  enableHeartBeatTimer: true,
  heartBeatTimerInterval: 15,
  debug: !configuration.isProd,

  // UserID passed to Matomo (see https://developer.matomo.org/guides/tracking-javascript-guide#user-id)
  // Default: undefined
  userId: undefined,
  cookieDomain: '*.owenclc.com',
  domains: 'server.iva,*.owenclc.com',
  preInitActions: [],
  trackSiteSearch: false
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
