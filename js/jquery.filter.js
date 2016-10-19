;(function($){

	var defaults = {
		separator: ', ',
		resetFilterClass: 'criterion-all',
		search: true,
		searchClass: '.search-input',
		resetOneCategory: true,
		allInOneOutput: true,
	}

	function InputFilter(element, options){
		this.config = $.extend({},defaults, options);
		this.element = element;
		this.elementClass = '.' + $(element).attr('class');
		this.init();
	}

	InputFilter.prototype.init = function(){

		this._attrArray = [];
		for (var i = 0; i < this.element.length; i++) {
			this._attrArray.push($(this.element[i]).attr('data-target'));
		}



		this._attrArray = this._attrArray.filter(this.unicVal) ;
		
		var self = this;

		$('a.reset-category').addClass('disabled');

		$(this.element).on('click', function() {
			var elemenObj = self.createObjWriteElemen({})
			
			var curentAttr = $(this).attr('data-target');
			var checkbox = self.elementClass +'['+'data-target='+'"' + curentAttr + '"' +']'+':checked';

			$(checkbox).each(function() {
				elemenObj[curentAttr].push(this.value);
			});
			if (elemenObj[curentAttr].length) {$(curentAttr).parent().addClass('choose');}
				else{$(curentAttr).parent().removeClass('choose');}

			$(curentAttr).text(elemenObj[curentAttr].join(self.config.separator));
			
			if (elemenObj[curentAttr].length != 0) {$(curentAttr).siblings('a.reset-category').removeClass('disabled')} 
				else{$(curentAttr).siblings('a.reset-category').addClass('disabled')}
				
			// if (self.config.allInOneOutput) {
			// 	for (var key in elemenObj){
			// 		elemenObj['all'] += elemenObj[key].join(' ');
			// 		console.log(elemenObj);
			// 	}
			// 	console.log(elemenObj['all']);	
			// }
		});

		if (this.config.resetFilterClass) {
			this.reset(self);
		}
		if (this.config.search) {
			var newObj = this.createObjWriteElemen({});
			this.search(newObj, this.config.searchClass)
		}
		if (this.config.resetOneCategory) {
			this.resetCategory(self);
		}
	}
	InputFilter.prototype.resetCategory= function(self){
		$('.reset-category').click(function(){
			var category =  '#' + $(this).siblings('div').attr('id');
			$(category).text('');
			$(self.elementClass + '['+'data-target='+'"' + category + '"' +']').removeAttr('checked');
			$(this).addClass('disabled');
		})
	}
	InputFilter.prototype.unicVal = function(value, index, self){
		return self.indexOf(value) === index;
	}

	InputFilter.prototype.createObjWriteElemen = function(cleanObj){

		this._writeElementObj = cleanObj;

		for (var i = 0; i < this._attrArray.length; i++) {
			this._writeElementObj[this._attrArray[i]] = [];
		}
		this._writeElementObj['all'] = '';
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
			$('a.reset-category').addClass('disabled');
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