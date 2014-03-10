//////////////////////////////////////////////////////////////////////////////
/**
 * @module ggl
 */

/*jslint devel: true, forin: true, newcap: true, plusplus: true*/
/*jslint white: true, continue:true, indent: 2*/

/*global window, ggl, ogs, vec4, inherit, $*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class simpleRenderer
 *
 * @param canvas
 * @returns {ggl.simpleRenderer}
 */
//////////////////////////////////////////////////////////////////////////////
ggl.simpleRenderer = function(container, canvas) {
  'use strict';

  if (!(this instanceof ggl.simpleRenderer)) {
    return new ggl.simpleRenderer(container, canvas);
  }
  geo.renderer.call(this, container, canvas);

  var m_this = this,
      m_viewer = null,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function() {
    s_init();

    if (!this.canvas()) {
      var canvas = $(document.createElement('canvas'));
      canvas.attr('class', '.webgl-canvas');
      this._canvas(canvas);
      this.container().node().append(canvas);
    }
    m_viewer = vgl.viewer(this.canvas().get(0));
    m_viewer.init();

    // TODO Take it out
    //m_viewer.renderWindow().activeRenderer().setBackgroundColor(0.5, 0.5, 0.5, 1.0);
    //m_viewer.renderWindow().resize(1920, 1080);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get API used by the renderer
   */
  ////////////////////////////////////////////////////////////////////////////
  this._api = function() {
    return 'webgl';
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this._contextRenderer = function() {
    return m_viewer.renderWindow().activeRenderer();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Handle resize event
   */
  ////////////////////////////////////////////////////////////////////////////
  this._resize = function(x, y, w, h) {
    this.canvas().attr('width', w);
    this.canvas().attr('height', h);
    m_viewer.renderWindow().positionAndResize(x, y, w, h);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Render
   */
  ////////////////////////////////////////////////////////////////////////////
  this._render = function() {
    m_viewer.renderWindow().activeRenderer().resetCamera();
    m_viewer.render();
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Exit
   */
  ////////////////////////////////////////////////////////////////////////////
  this._exit = function() {
  };

  this._init();
  return this;
};

inherit(ggl.simpleRenderer, geo.renderer);

geo.registerRenderer('simple_renderer', ggl.simpleRenderer);