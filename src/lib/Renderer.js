import $ from 'jquery';
import Model from './Model';

const renderers = [];
/**
 * Classes that extend Renderer define a 
 * template and reactive behavior for all 
 * instances. A renderer instance is 
 * constructed with the following required 
 * parameters:
 * 
 * @param {Model} - model - a model instance
 * @param {string} - el - DOM selector string for a permanent DOM element
 */
class Renderer {
  // Renderers are instantiated with a model and a root DOM node
  constructor(model, el) {
    if (!model || !(model instanceof Model) || !el) {
      throw new Error('Must instantiate with (1) instance of Model and (2) valid DOM selector. If using super(), make sure to pass those parameters in.');
    }

    this.model = model;
    this.model.bindView(this);
    this.$el = $(el);
    /**
     * Renderers require a template method
     * This method MUST return an HTML string
     * The template will typically use this.model
     * to guide varied output.
     */
    if (
      !this.template || 
      typeof this.template !== 'function' ||
      typeof this.template() !== 'string'
    ) {
      throw new Error('Classes that inherit Renderer REQUIRE a template() function that returns an HTML string');
    }

    /** 
     * Optional getEvents method
     * This method must return an object. 
     * Each property defines the event listener 
     * bindings, where the key is a DOM event 
     * name and delegate DOM selector 
     * (space separated), and the value is the 
     * name of an event handler function existing 
     * on the same class. For example:
     * 
     * getEvents() {
     *   return {
     *     'click .add-item': 'handleAddItem'
     *   }
     * }
     * 
     * The above definition will add a click 
     * listener to all children elements with 
     * the add-item class, and invoke the 
     * handleAddItem() function defined on 
     * the same class.
     */

    if (this.getEvents) {
      const events = this.getEvents();
      const eventKeys = Object.keys(events);

      eventKeys.forEach(eventString => {
        const [ eventName, selector ] = eventString.split(' ');
        const fn = this[events[eventString]];
        this.$el.on(eventName, selector, fn.bind(this));
      }); 
    }
    
    renderers.push(this);
    this.render();
  } 

  renderAll() {
    renderers.forEach(renderer => renderer.render());
  }
  /**
   * By default, the return value of template() 
   * will be placed in the root element on every 
   * model update. You can override this method 
   * if you want to finetune for the rendering cycle.
   */
  render() {
    this.$el.html(this.template());
  }
}

export default Renderer;