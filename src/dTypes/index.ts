/*
 * Created Date: Friday September 21st 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Friday September 21st 2018 11:26 pm
 * Modified By: VariableVasasMT
 * -----
 */

import { warn } from "../utils/log"
import BaseObject from "../core/baseObject";

export class UnitInterval extends BaseObject {
  value : number
  validate = ( value ): boolean => {
    if( value < 0 && value > 1 ) {
      warn( `UnitInterval only accepts values [0, 1] but received ${ value }` );
      return false;
    }
    return true
  }

  set( value ) {
    if( this.validate( value ) ) this.value = value;
  }
  constructor( value ){
    super();
    if( !!value ) this.set( value );
  }
}