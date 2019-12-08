function getData() {
   $('#response').html('<div class="spinner-border text-primary" role="status"></div>');
   $.post("/getData", { email: $('#email').val() }, function (data, status) {
     console.log(data[0]);
     $('#response').html(JSON.stringify(data[0]));
   })
 }