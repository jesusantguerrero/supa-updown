import SiteDashboard from "./SiteDashboard.vue";

export default {
    title: "SiteDashboard",
    component: SiteDashboard,
    argTypes: {}
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { SiteDashboard },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<SiteDashboard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  sites: [ {
    protocol: "https://",
    url: "www.google.com",
    lastResponse: {
      status: 200,
      message: 'OK'
    },
    responses: [
      {
        status: 200,
        message: 'OK',
        appdex: 0.5,
      },
      {
        status: 200,
        message: 'OK',
        appdex: 0.5,
      }
    ]
  },  {
    protocol: "https://",
    url: "www.google.com",
    lastResponse: {
      status: 200,
      message: 'OK'
    },
    responses: [
      {
        status: 200,
        message: 'OK',
        appdex: 0.5,
      },
      {
        status: 200,
        message: 'OK',
        appdex: 0.5,
      }
    ]
  } ]
};