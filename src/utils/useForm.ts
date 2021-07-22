import { reactive, watch } from "vue";
import { cloneDeep, isEqual } from "lodash-es";

export default function useForm(...props) {
    const data = (typeof props[0] === "string" ? props[1] : props[0]) || {};
    const defaults = cloneDeep(data);
    let transform = data => data;

    let form = reactive({
        ...data,
        isDirty: false,
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
    })

    watch(form, newValue => {
        form.isDirty = !isEqual(form.data(), defaults)
    }, { immediate: true, deep: true })

    return form;
}