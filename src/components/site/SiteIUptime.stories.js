import { sub, subDays, format } from "date-fns";
import getDates from "../../utils/getDates";
import SiteUptime from "./SiteUptime.vue";

export default {
    title: "SiteUptime",
    component: SiteUptime,
    argTypes: {}
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { SiteUptime },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<SiteUptime v-bind="args" />',
});
const date = new Date();
const dates = getDates(subDays(date, 90) , date )

export const Default = Template.bind({});
Default.args = {
  max: 24,
  responses: dates.map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    status: 200,
  })),
};