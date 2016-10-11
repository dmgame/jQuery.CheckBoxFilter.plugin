 // index.html filter start========================

        $('.search-input').keyup(function(e) {
            var $rows = $(this).parents('.criterion').find('.search-box li');
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

            $rows.show().filter(function(e) {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });

    jQuery(function($) {

        var $text = $('.text-input'),
            $box = $('.checkbox');
        
        
        $box.on('click', function() {

            var condVal = [];
            var brandVal = [];
            var priceVal = [];
            var locationVal = [];
            var genderVal = [];

            $attr = $(this).attr('data-target');
            console.log($('.checkbox[data-target="#condition"]').filter(':checked'));
            if ( $attr == '#condition' ) {
                $('.checkbox[data-target="#condition"]').filter(':checked').each(function() {
                    console.log(this);
                    condVal.push(this.value);
                });  
                $($attr).text(condVal.join(', '));
            } else if( $attr == '#brand' ){
                $('.checkbox[data-target="#brand"]').filter(':checked').each(function() {
                    // '.checkbox[data-target="#condition"]'
                    brandVal.push(this.value);  
                });        
                $($attr).text(brandVal.join(', '));
            } else if( $attr == '#price' ){
                $('.checkbox[data-target="#price"]').filter(':checked').each(function() {
                    priceVal.push(this.value);
                });        
                $($attr).text(priceVal.join(', '));
            } else if( $attr == '#location' ){
               $('.checkbox[data-target="#location"]').filter(':checked').each(function() {
                    locationVal.push(this.value);
                });        
                $($attr).text(locationVal.join(', '));
            } else if( $attr == '#gender' ){
                $('.checkbox[data-target="#gender"]').filter(':checked').each(function() {
                    genderVal.push(this.value);
                });        
                $($attr).text(genderVal.join(', '));
            }


        });
        
        $('.criterion-all').click(function() {
            $box.each(function() {
                $box.removeAttr('checked');
            }); 
            $text.text('');
        });

    });

// index.html filter end=========================
