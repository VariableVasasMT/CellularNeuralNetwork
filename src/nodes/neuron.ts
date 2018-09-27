/*
 * Created Date: Friday September 21st 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Monday September 24th 2018 5:20 pm
 * Modified By: VariableVasasMT
 * -----
 */

 import { Tensor } from "@tensorflow/tfjs-core";
 import { UnitInterval } from "../dTypes"
 import BaseObject from "../core/baseObject";

export class ChildNeuron extends BaseObject {

}
export class Neuron extends BaseObject {
  actionPotential: UnitInterval = new UnitInterval(0.5)
  weight: Array<UnitInterval>
  currentInputs: Tensor
  rank: number
  timer: TimeRanges
  input: () => {

  }
  createChild: () => {

  }
}