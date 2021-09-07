import { inject } from "vue"
import { AuthState } from "../useAuth";

export const useLumiere = () => {
    const notifications = inject('notificiations', []);
    const settings = inject('settings', {});
    
    return {
       notifications,
       settings,
    }
}
