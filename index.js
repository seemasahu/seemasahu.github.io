$(document).ready(function () {

    var top_nav_collapse = false;

    $(window).scroll(function () {
        var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if ((scrollTop > 200 && top_nav_collapse) || (scrollTop < 200 && !top_nav_collapse)) {
            return;
        } else {
            var nav_collpase_class = $('#nav-bar-top').hasClass("top-nav-collapse");
            if (top_nav_collapse && nav_collpase_class) {
                $('#nav-bar-top').removeClass('top-nav-collapse');
                top_nav_collapse = false;
            } else {
                top_nav_collapse = true;
                $('#nav-bar-top').addClass('top-nav-collapse');
            }
        }
    });


    $('.contactForm').on("keyup",'input, textarea', function () {
      //console.log("coming"+$(this).prev().text());
          var level = $(this).prev().text()
          //console.log(level);

        if($(this).val().length > 0){
          $(this).prev().text("");
            $(this).addClass("has-value");
        }
        if($(this).val().length == 0){
          //console.log(level);
          $(this).prev().text(level);
        }
    });

    $('.contactFormClass').on('keyup','.requiredClass',function () {
        $(this).siblings('.has-error').hide();
    });
    $('.sendBtn').on('click',function (event) {
        var valid = true,
            data = {};
        event.stopPropagation();
        event.preventDefault();
        $('.contactFormClass input, textarea').each(function () {
            var $this = $(this);
            if ( !$this.val() && $this.hasClass('requiredClass') ) {
                $this.siblings('.has-error').show();
                valid = false;
            }else if($this.attr('name') == 'email'){
                var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
                valid = pattern.test($this.val());
                if(!valid){
                    $this.siblings('.has-error').show();
                }else {
                    data[$this.attr('name')] = $this.val();
                }
            }else{
                data[$this.attr('name')] = $this.val();
            }
        });
        if(valid){
            $.ajax({
                url: "https://formspree.io/seema.cite@email.com",
                method: "POST",
                data: data,
                dataType: "json"
        }).then( function success(rsp) {
                $('.contactFormClass input, textarea').each(function () {
                    $(this).val("");
                })
                $('#responseText').text("Thank you!! I will get back to you.");
            }, function fail(err) {
                $('#responseText').css('color','red').text("Please try AGAIN!!")
            });
        }
    });

})
