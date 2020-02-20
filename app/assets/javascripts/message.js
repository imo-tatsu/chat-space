$(function(){
  function buildHTML(message){
    if (message.content && message.image) {
      var html =
        `
        <div class="message" data-message-id="${message.id}">
          <div class="main_chat__messages__message">
            <div class="main_chat__messages__message__info">
              <div class="main_chat__messages__message__info__taker">
              ${message.user_name}
              </div>
              <div class="main_chat__messages__message__info__date">
              ${message.created_at}
              </div>
            </div>
            <div class="main_chat__messages__message__text">
              <p class="main_chat__messages__message__text__content">
              ${message.content}
              </p>
              <img src=${message.image} >
            </div>
          </div>
        </div>`
    } else if (message.content) {
      var html =
        `
        <div class="message" data-message-id="${message.id}">
          <div class="main_chat__messages__message">
            <div class="main_chat__messages__message__info">
              <div class="main_chat__messages__message__info__taker">
              ${message.user_name}
              </div>
              <div class="main_chat__messages__message__info__date">
              ${message.created_at}
              </div>
            </div>
            <div class="main_chat__messages__message__text">
              <p class="main_chat__messages__message__text__content">
              ${message.content}
              </p>
            </div>
          </div>
        </div>`
    } else if (message.image) {
      var html =
        `
        <div class="message" data-message-id="${message.id}">
          <div class="main_chat__messages__message">
            <div class="main_chat__messages__message__info">
              <div class="main_chat__messages__message__info__taker">
              ${message.user_name}
              </div>
              <div class="main_chat__messages__message__info__date">
              ${message.created_at}
              </div>
            </div>
            <div class="main_chat__messages__message__text">
              <img src=${message.image} >
            </div>
          </div>
        </div>`
    };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__messages').append(html);
      $('.main_chat__messages').animate({ scrollTop: $('.main_chat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i,message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__messages').append(insertHTML);
        $('.main_chat__messages').animate({ scrollTop: $('.main_chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});

