/*
 * Created Date: Friday September 21st 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Wednesday October 3rd 2018 8:25 pm
 * Modified By: VariableVasasMT
 * -----
 */

import { UnitInterval } from "../dTypes"
import BaseObject from "../core/baseObject";
import { Clock, Observable } from "../utils";

export abstract class ChildNeuron extends BaseObject {
  currentInput: number
  plusOutput: number;
  actualOutput: number;
  minusOutput: number;
  constructor({ input, weight = Math.random(), sigma }) {
    super();
    this.currentInput = input;
    this.actualOutput = input * weight;
    this.plusOutput = this.actualOutput + sigma;
    this.minusOutput = this.actualOutput - sigma;
  }

  get output() {
    const { plusOutput, actualOutput, minusOutput } = this;
    return { plusOutput, actualOutput, minusOutput };
  }
}

export interface NeuronDataDef {
  inputs?: Array<number>, 
  sigma?: number, 
  orderId: number, 
  orderNumber: number
} 
export abstract class Neuron extends BaseObject {
  actionPotential: UnitInterval = new UnitInterval(0.5)
  weight: Array<UnitInterval>
  currentInputs: Array<number> = []
  rank: number
  batch: number
  sigma: number = 0.8
  orderId: number
  orderNumber: number = 1;
  clock: Clock
  constructor({ tickDelay = 500, timer = 2 }) {
    super()
    this.clock = new Clock({ tickDelay, timer });
  }

  abstract sendForward(): void
  abstract complete(): void
  input ( input: NeuronDataDef ) {
    const { inputs, sigma, orderId, orderNumber } = input;
    if( this.orderId && this.orderId !== orderId && this.clock.isTicking ) {
      return Error("The input is not from the same batch for which clock is running!");
    }
    if( this.orderNumber !== orderNumber ) {
      return Error("The input given is for another revision and its not valid");
    }

    if( !this.orderId ) this.orderId = orderId;
    if( !this.clock.isTicking ) {
      this.clock.subscribe( new Observable( { complete: this.complete.bind(this) }))
      this.clock.start();
    }
    this.sigma = sigma;
    this.currentInputs.concat( inputs );
  }
  abstract createChild():void
}