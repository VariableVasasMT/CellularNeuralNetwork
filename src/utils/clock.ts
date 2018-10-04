/*
 * Created Date: Monday September 24th 2018
 * Author: VariableVasasMT (kritivasas.shukla@mindtickle.com)
 * -----
 * Last Modified: Sunday September 30th 2018 2:16 am
 * Modified By: VariableVasasMT
 * -----
 * taken and modified from https://gist.github.com/ericelliott/2d5d0cec07924a6e2d5e684da805fc94#file-observable-clock-js
 */

import BaseObject from "../core/baseObject";

class ClockAttributes extends BaseObject {
  isTicking: Boolean
  ticks: number
  lastTick: number
  lastDelay: number
  observers: Object = {}
  clock: Object = {}
  timer: number = 0
  tickDelay: number = 20
  scheduler = setTimeout

  constructor( {
    scheduler = setTimeout,  // A setTimeout() compatible scheduling API.
    tickDelay = 20,          // Ms per tick.
    timer = 0                // A countdown timer in ticks.
  }) {
    super();
    this.scheduler = scheduler;
    this.timer = timer;
    this.tickDelay = tickDelay;
  }
}

export class Clock extends BaseObject {
  private attributes: ClockAttributes

  constructor({
    scheduler = setTimeout,  // A setTimeout() compatible scheduling API.
    tickDelay = 20,          // Ms per tick.
    timer = 0                // A countdown timer in ticks.
  }){
    super();
    this.attributes = new ClockAttributes( {
      scheduler,  // A setTimeout() compatible scheduling API.
      tickDelay,          // Ms per tick.
      timer                // A countdown timer in ticks.
    } );
  }
  start () {
    this.attributes.isTicking = true;
    this.scheduler( this.tick.bind(this), this.attributes.tickDelay );
    return this;
  }
  stop () {
    Object.getOwnPropertySymbols( this.attributes.observers ).forEach(
      key => {
        const complete = this.attributes.observers[key] && this.attributes.observers[key].complete;
        if (typeof complete === 'function') complete( this.attributes.ticks );
      }
    );

    this.attributes.isTicking = false;
    return this;
  }

  get ticks () {
    return this.attributes.ticks;
  }
  get scheduler () {
    return this.attributes.scheduler;
  }
  get tickDelay () {
    return this.attributes.tickDelay;
  }
  get timer () {
    return this.attributes.timer;
  }
  get isTicking () {
    return this.attributes.isTicking;
  }

  // An ES-Observable-inspired API.
  // We want strict control over timing, so we won't use a 3rd party lib.
  // observert has next() and complete() and ignores error handling.
  subscribe (observer) {
    const symbol = Symbol();
    this.attributes.observers[symbol] = observer;
    return {
      unsubscribe () {
        delete this.attributes.observers[symbol];
      }
    };
  }

  private tick = () => {
    this.attributes.ticks += 1;
    Object.getOwnPropertySymbols(this.attributes.observers).forEach( key => {
      const next = this.attributes.observers[key].next;
      if ( typeof next === 'function' ) next( this.ticks );
    });

    if ( this.timer > 0 && this.ticks >= this.timer) this.stop();
    if (this.attributes.isTicking) {
      const now = Date.now();
      const elapsed = now - this.attributes.lastTick;
      const diff = elapsed - this.attributes.lastDelay;
      const correctDelay = Math.abs(this.attributes.tickDelay - diff);

      this.attributes.lastTick = now;
      this.attributes.lastDelay = correctDelay;
      this.scheduler(this.tick.bind(this), correctDelay);
    }
  } 

}