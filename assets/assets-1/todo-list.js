$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });

  $('.dd').on('click', function(){
      var item = $(this).parent().text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          location.reload();
        }
      });
  });

  $('.dc').on('click', function(){
    $(this).parent().addClass('done');
    $(this).removeClass('fa-check');
    $(this).addClass('fa-clipboard-list');
  })

});
