/*
 * Created Date: Friday September 21st 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Friday September 21st 2018 10:29 pm
 * Modified By: VariableVasasMT
 * -----
 */

import {ENV} from '../config/environment';

export function warn(...msg: Array<{}>): void {
  if (!ENV.get('IS_TEST')) {
    console.warn(...msg);
  }
}

export function log(...msg: Array<{}>): void {
  if (!ENV.get('IS_TEST')) {
    console.log(...msg);
  }
}
