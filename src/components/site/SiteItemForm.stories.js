import SiteItem from "./SiteItemForm.vue";

export default {
    title: "SiteItemForm",
    component: SiteItem,
    argTypes: {}
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { SiteItem },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<SiteItem v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  primary: true,
  label: 'Button',
};