import EventEmitter from "events";

const eventBus = new EventEmitter();

// as per name suggests only 50 can listen the eventBus.
eventBus.setMaxListeners(50);


export default eventBus;