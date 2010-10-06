#include <iostream>

#include "converter.hpp"
#include "node_dbus_converter.hpp"

using namespace v8;

namespace node_dbus { namespace tests {

struct unit_test {
    unit_test() : count_(), failed_() {}
    ~unit_test() {
        total_count += count_;
        total_failed += failed_;
    }

    void
    ok( bool exp, const char * exp_str) {
        std::cerr << (exp ? "Ok     "
                : "FAIL   ") << exp_str << std::endl;
        ++count_;
        failed_ += exp ? 0 : 1;
    }

    virtual void run() = 0;

    size_t count_;
    size_t failed_;

    static size_t total_count;
    static size_t total_failed;
};

size_t unit_test::total_count = 0;
size_t unit_test::total_failed = 0;

#define OK(exp) ok(exp, #exp)

struct testConvert : unit_test {
    void
    run() {
        std::cerr << "=== testConvert" << std::endl;
        HandleScope scope;

        Local<Object> a = Array::New();

        const size_t s = 5;
        for (size_t i = 0; i < s; ++i) {
            a->Set(i, Integer::New(i));
        }
        DBusMessage * msg = dbus_message_new_signal("/foo", "de.foo.bar", "foobar");
        convert(a, msg);

        std::string expected_sig("iiiii");
        OK(expected_sig == dbus_message_get_signature(msg));

        Local<Array> out = Array::New();
        convert(msg, out);
        OK(out->Length() == s);
        for (size_t i = 0; i < s; ++i) {
            OK(a->Get(i)->Int32Value() == out->Get(i)->Int32Value());
        }

        Local<Array> array_of_arrays = Array::New();
        array_of_arrays->Set(0, a);
        array_of_arrays->Set(1, out);
        DBusMessage * array_of_arrays_msg = dbus_message_new_signal("/foo", "de.foo.bar", "foobar");
        convert(array_of_arrays, array_of_arrays_msg);

        std::cerr << "=== SIG: " << dbus_message_get_signature(array_of_arrays_msg) << std::endl;

        Local<Object> o = Object::New();
        o->Set(String::New("one"), Integer::New(1));
        o->Set(String::New("two"), Integer::New(2));
        o->Set(String::New("three"), Integer::New(3));
    }
};

void
run_tests() {
    testConvert().run();
}
}} // end of namespace tests, node_dbus

extern "C"
void
init(Handle<Object> exports) {
    node_dbus::tests::run_tests();
    exports->Set(String::NewSymbol("total"), Integer::New(node_dbus::tests::unit_test::total_count));
    exports->Set(String::NewSymbol("failed"), Integer::New(node_dbus::tests::unit_test::total_failed));
}

