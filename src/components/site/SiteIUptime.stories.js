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

export const Default = Template.bind({});
Default.args = {
  max: 24,
  value: 23,
};