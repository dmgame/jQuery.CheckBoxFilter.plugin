;(function($){

	var defaults = {
		separator: ', ',
		resetFilterClass: 'criterion-all',
		search: true,
		searchClass: '.search-input',
	}

	function InputFilter(element, options){
		this.config = $.extend({},defaults, options);
		this.element = element;
		this.init();
	}

	InputFilter.prototype.init = function(){

		this._attrArray = [];
		for (var i = 0; i < this.element.length; i++) {
			this._attrArray.push($(this.element[i]).attr('data-target'));
		}



		this._attrArray = this._attrArray.filter(this.unicVal) ;
		
		var self = this;


		$(this.element).on('click', function() {
			var elemenObj = self.createObjWriteElemen({})
			
			var curentAttr = $(this).attr('data-target');
			var checkbox = '.checkbox'+'['+'data-target='+'"' + curentAttr + '"' +']'+':checked';
			
			
			
			$(checkbox).each(function() {
				elemenObj[curentAttr].push(this.value);	
			});

			if (elemenObj[curentAttr].length) {$(curentAttr).parent().addClass('choose');}
			else{$(curentAttr).parent().removeClass('choose');}

			$(curentAttr).text(elemenObj[curentAttr].join(self.config.separator));

		});

		if (this.config.resetFilterClass) {
			this.reset(self);
		}

		if (this.config.search) {
			var newObj = this.createObjWriteElemen({});
			this.search(newObj, this.config.searchClass)
		}
	}

	InputFilter.prototype.unicVal = function(value, index, self){
		return self.indexOf(value) === index;
	}

	InputFilter.prototype.createObjWriteElemen = function(cleanObj){

		this._writeElementObj = cleanObj;

		for (var i = 0; i < this._attrArray.length; i++) {
			this._writeElementObj[this._attrArray[i]] = [];
		}
		return  this._writeElementObj;
	}
	
	InputFilter.prototype.reset = function(self){
		this.config.resetFilterClass = '.'+ this.config.resetFilterClass;
		var elementArr = this._attrArray;
		$(this.config.resetFilterClass).on('click', function(event) {
			for (var i = 0; i < elementArr.length; i++) {
				$(elementArr[i]).text('').parent().removeClass('choose');
			}
			$(self.element).removeAttr('checked');
			self.createObjWriteElemen({})
		});
	}

	InputFilter.prototype.search = function(obj, searchClass) {
		$(searchClass).keyup(function(){
				var findElement = $(this).siblings('div').find('li');
				var inputUserVal = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
				
				findElement.show().filter(function(e) {
					var inputInLi = $(this).find('input');
		            var text = $(inputInLi).val().replace(/\s+/g, ' ').toLowerCase();
		            return !~text.indexOf(inputUserVal);
	        	}).hide();

		})
		
		
		
	}

	$.fn.inputFilter = function(options){
		new InputFilter(this,options);
	};


})(jQuery)