/*
 * Created Date: Friday September 21st 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Friday September 21st 2018 11:15 pm
 * Modified By: VariableVasasMT
 * -----
 */

import * as env from "./config.json";

class Env{
  private attributes = {};
  constructor() {
    this.attributes = { ...env };
  }
  get( property ) {
    return this.attributes[property];
  }
}
 
 export const ENV = new Env();
 