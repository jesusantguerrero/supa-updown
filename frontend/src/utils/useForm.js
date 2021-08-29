import { computed, reactive, watch } from "vue";
import { cloneDeep, isEqual } from "lodash-es";

export default function useForm(...props) {
    const data = (typeof props[0] === "string" ? props[1] : props[0]) || {};
    const defaults = cloneDeep(data);
    let transform = data => data;
    let validationSchema = {};

    let form = reactive({
        ...data,
        isDirty: false,
        errors: {},
        hasErrors: computed(() => Object.keys(form.errors).length > 0),
        data() {
            return Object
              .keys(data)
              .reduce((carry, key) => {
                carry[key] = this[key]
                return carry
              }, {})
        },
        transform(callback) {
          transform = callback
          return this
        },
        validationSchema(schema) {
          validationSchema = schema
          return this
        },
        reset(...fields) {
          let clonedDefaults = cloneDeep(defaults)
          if (fields.length === 0) {
            Object.assign(this, clonedDefaults)
          } else {
            Object.assign(
              this,
              Object
                .keys(clonedDefaults)
                .filter(key => fields.includes(key))
                .reduce((carry, key) => {
                  carry[key] = clonedDefaults[key]
                  return carry
                }, {}),
            )
          }
    
          return this
        },
        submit(method, options) {
          options = options || {}
    
          if (typeof method === "function") {
            method('submit', transform(form.data()))
          } else {
            options.url = method
          }
          
          options.onSuccess && options.onSuccess();
        },
        validate(schema = validationSchema) {
          form.errors = {}
          const fields = Object.keys(schema)
          if (fields.length) {
            fields.forEach(field => {
              if (validationSchema[field] && validationSchema[field].length) {
                const result = validationSchema[field].map(validator => validator(form.data()[field])).filter(result => result !== true)
                if (result.length) {
                  form.errors[field] = result[0];
                }
              }
            })
          }
          return !form.hasErrors;
        }
    })

    watch(form, newValue => {
        form.isDirty = !isEqual(form.data(), defaults);
        if (form.hasErrors.value) {
          form.validate();
        }
    }, { immediate: true, deep: true })

    return form;
}

export const validators = {
  isRequired(url)  {
    return url ? true : 'URL is required' 
  },
  isUrl (url)  {
    return ('https://' + url).match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/) ? true : 'Invalid URL'
  },
}