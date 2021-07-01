{
    "targets":[
        {
        "target_name": "greet",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "./src/mdo-core-napi/greeting.cpp",
            "./src/mdo-core-napi/index.cpp"
        ],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
        }
    ]
}
