import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';


export class PhoneValidator {
  static atLeastOneField(mobileField:number, homePhoneField: number, workPhoneField: number ): ValidationErrors | null {
    return (form:FormGroup) => {
      const mobileValue = form.get(mobileField.toString())?.value;
      const homePhoneValue = form.get(homePhoneField.toString())?.value;
      const workPhoneValue = form.get(workPhoneField.toString())?.value;

      if(((mobileValue.value as number) == 0)
      || ((homePhoneValue.value as number) == 0)
      || ((workPhoneValue.value as number) == 0))
        return {missing : true};
      return null;
    };
  }
}
