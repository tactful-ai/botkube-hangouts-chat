exports.handler = async (event) => {
  let body = JSON.parse(event.body);
  const fetch = require('node-fetch');
  const jbuilder = require('jbuilder');
  var k8s_meta = body.meta;
  var k8s_status = body.status;
  var k8s_summary = body.summary;

  var messageBody = jbuilder.encode(function (json) {
    json.set('cards', function (json) {
      json.child(function (json) {
        json.set('header', function (json) {
          json.set('title', `${k8s_meta.name}`);
          json.set('subtitle', `${k8s_meta.kind} in namespace ${k8s_meta.namespace}`);
        });

        json.set('sections', function (json) {
          json.child(function (json) {
            json.set('widgets', function (json) {
              json.child(function (json){
                json.set('keyValue', function(json) {
                  json.set('topLabel', `Status type ${k8s_status.type}, Level ${k8s_status.level}`);
                  json.set('content', `${k8s_summary}`);
                  json.set('contentMultiline', true);
                });
              })
            });
          });
        });
      });
    });
  });

  var options = {
    // url: process.env.GOOGLE_CHAT_URL,
    method: 'POST',
    body: messageBody,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };

  return fetch(process.env.GOOGLE_CHAT_URL, options)
    .then(res => res.json())
    .then(json => console.log(json));

};