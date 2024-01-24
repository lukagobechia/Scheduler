import {FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidator {

    static noSpaceValidator(control: FormControl) {
        if (control.value != null && control.value.indexOf(' ') != -1) {
            return { noSpaceValidator: true }
        }
        return null;
    }

    static usernameNotAllowed(control: FormControl): Promise<any> | Observable<any> {
        const response = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'admin@gmail.com') {
                    resolve ({ usernameNotAllowed: true })
                } else {resolve(null)}
            }
                , 100)
        });
        return response;
    }
}