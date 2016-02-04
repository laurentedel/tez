/*jshint node:true*/
/* global require, module */

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Funnel = require("broccoli-funnel");
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false
  });

  var configEnv = new Funnel('config', {
     srcDir: '/',
     include: ['*.env'],
     destDir: '/config'
  });
  var zipWorker = new Funnel('bower_components/zip.js', {
     srcDir: '/WebContent',
     include: ['z-worker.js', 'deflate.js', 'inflate.js'],
     destDir: '/assets/zip'
  });

  app.import("bower_components/snippet-ss/less/force.less");
  app.import("bower_components/snippet-ss/less/effects.less");
  app.import("bower_components/snippet-ss/less/no.less");

  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/jquery-ui/jquery-ui.js');
  app.import('bower_components/jquery-ui/ui/tooltip.js');

  app.import('bower_components/more-js/dist/more.js');

  app.import('bower_components/FileSaver/FileSaver.js');
  app.import('bower_components/zip.js/WebContent/zip.js');

  app.import('bower_components/codemirror/lib/codemirror.js');
  app.import('bower_components/codemirror/mode/sql/sql.js');
  app.import('bower_components/codemirror/mode/pig/pig.js');
  app.import('bower_components/codemirror/lib/codemirror.css');

  return app.toTree(new MergeTrees([configEnv, zipWorker]));
};