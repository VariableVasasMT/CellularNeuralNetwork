/*
 * Created Date: Friday September 21st 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Friday September 21st 2018 10:18 pm
 * Modified By: VariableVasasMT
 * -----
 */

/**
 * * Base for all the objects for better memory management
 * TODO: add garbage collector and id to centrally manage all the data
 * 
 */
export default class BaseObject {
  private id:number
  constructor(){
    this.id = Date.now();
  }
}