import sys
import Options
import os

# nice, but requires python 2.6 ... 
#import json
#package = json.load(open('package.json'))
#APPNAME = 'node_' + package['name'] # used by 'node-waf dist'
#VERSION = package['version']        # dito

APPNAME = 'node_dbus'
VERSION = '0.0.1'

def set_options(opt):
  opt.tool_options('compiler_cxx')
  opt.tool_options('node_addon')

def configure(conf):
  conf.check_tool('compiler_cxx')
  conf.check_tool('node_addon')

  conf.check_cfg(
      package='dbus-1'
    , args='--cflags --libs'
    , uselib_store='DBUS'
  )

  conf.write_config_header('node_dbus_config.h');


def post_build(ctx):
  #print("=== post")
  if not os.path.exists('lib/binding.node'):
      os.symlink( '../build/default/binding.node', 'lib/binding.node')

def build(bld):
  bld.add_post_fun(post_build)
  addon = bld.new_task_gen('cxx', 'shlib', 'node_addon')
  addon.target = 'binding'
  addon.uselib = 'DBUS'
  addon.source = [
      'src/binding.cpp'
    , 'src/node_dbus_connection.cpp'
    , 'src/node_dbus_utils.cpp'
    , 'src/node_dbus_watch.cpp'
  ]
  
# vim: set filetype=python :