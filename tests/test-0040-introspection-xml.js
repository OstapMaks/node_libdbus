#!/usr/bin/env node
var dbus   = require('../lib/binding')
  , assert = require('assert')
  , sys    = require('sys')
  ;

var tinyXML =
    '<!DOCTYPE node PUBLIC "-//freedesktop//DTD D-BUS Object Introspection 1.0//EN"\n'
  + '"http://www.freedesktop.org/standards/dbus/1.0/introspect.dtd">\n'
  + '<node>\n'
  + '  <interface name="org.freedesktop.DBus.Introspectable">\n'
  + '    <method name="Introspect">\n'
  + '      <arg name="data" direction="out" type="s"/>\n'
  + '    </method>\n'
  + '  </interface>\n'
  + '</node>\n'
  ;

sys.puts(JSON.stringify(dbus.introspectionStringToJSON(tinyXML)));

return;

var dbus_xml = 
    '<!DOCTYPE node PUBLIC "-//freedesktop//DTD D-BUS Object Introspection 1.0//EN"\n'
  + '"http://www.freedesktop.org/standards/dbus/1.0/introspect.dtd">\n'
  + '<node>\n'
  + '  <interface name="org.freedesktop.DBus.Introspectable">\n'
  + '    <method name="Introspect">\n'
  + '      <arg name="data" direction="out" type="s"/>\n'
  + '    </method>\n'
  + '  </interface>\n'
  + '  <interface name="org.freedesktop.DBus">\n'
  + '    <method name="Hello">\n'
  + '      <arg direction="out" type="s"/>\n'
  + '    </method>\n'
  + '    <method name="RequestName">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="in" type="u"/>\n'
  + '      <arg direction="out" type="u"/>\n'
  + '    </method>\n'
  + '    <method name="ReleaseName">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="u"/>\n'
  + '    </method>\n'
  + '    <method name="StartServiceByName">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="in" type="u"/>\n'
  + '      <arg direction="out" type="u"/>\n'
  + '    </method>\n'
  + '    <method name="UpdateActivationEnvironment">\n'
  + '      <arg direction="in" type="a{ss}"/>\n'
  + '    </method>\n'
  + '    <method name="NameHasOwner">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="b"/>\n'
  + '    </method>\n'
  + '    <method name="ListNames">\n'
  + '      <arg direction="out" type="as"/>\n'
  + '    </method>\n'
  + '    <method name="ListActivatableNames">\n'
  + '      <arg direction="out" type="as"/>\n'
  + '    </method>\n'
  + '    <method name="AddMatch">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '    </method>\n'
  + '    <method name="RemoveMatch">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '    </method>\n'
  + '    <method name="GetNameOwner">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="s"/>\n'
  + '    </method>\n'
  + '    <method name="ListQueuedOwners">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="as"/>\n'
  + '    </method>\n'
  + '    <method name="GetConnectionUnixUser">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="u"/>\n'
  + '    </method>\n'
  + '    <method name="GetConnectionUnixProcessID">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="u"/>\n'
  + '    </method>\n'
  + '    <method name="GetAdtAuditSessionData">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="ay"/>\n'
  + '    </method>\n'
  + '    <method name="GetConnectionSELinuxSecurityContext">\n'
  + '      <arg direction="in" type="s"/>\n'
  + '      <arg direction="out" type="ay"/>\n'
  + '    </method>\n'
  + '    <method name="ReloadConfig">\n'
  + '    </method>\n'
  + '    <method name="GetId">\n'
  + '      <arg direction="out" type="s"/>\n'
  + '    </method>\n'
  + '    <signal name="NameOwnerChanged">\n'
  + '      <arg type="s"/>\n'
  + '      <arg type="s"/>\n'
  + '      <arg type="s"/>\n'
  + '    </signal>\n'
  + '    <signal name="NameLost">\n'
  + '      <arg type="s"/>\n'
  + '    </signal>\n'
  + '    <signal name="NameAcquired">\n'
  + '      <arg type="s"/>\n'
  + '    </signal>\n'
  + '  </interface>\n'
  + '</node>\n'
  ;

dbus.introspectionStringToJSON(dbus_xml);