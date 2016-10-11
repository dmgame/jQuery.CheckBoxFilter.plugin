;(function($){

	var defaults = {
		separator: ', ',
		resetFilterClass: 'criterion-all',
		search: true,
	}

	function Filter(element, options){
		this.config = $.extend({},defaults, options);
		this.element = element;
		this.init();
	}

	Filter.prototype.init = function(){

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

			$(curentAttr).text(elemenObj[curentAttr].join(self.config.separator));

		});

		if (this.config.resetFilterClass) {
			this.reset(self);
		}

		if (this.config.search) {
			var newObj = this.createObjWriteElemen({});
			this.search(newObj)
		}
	}

	Filter.prototype.unicVal = function(value, index, self){
		return self.indexOf(value) === index;
	}

	Filter.prototype.createObjWriteElemen = function(cleanObj){

		this._writeElementObj = cleanObj;

		for (var i = 0; i < this._attrArray.length; i++) {
			this._writeElementObj[this._attrArray[i]] = [];
		}
		return  this._writeElementObj;
	}
	
	Filter.prototype.reset = function(self){
		this.config.resetFilterClass = '.'+ this.config.resetFilterClass;
		var elementArr = this._attrArray;
		$(this.config.resetFilterClass).on('click', function(event) {
			for (var i = 0; i < elementArr.length; i++) {
				$(elementArr[i]).text('');
			}
			$(self.element).removeAttr('checked');
			self.createObjWriteElemen({})
		});
	}

	Filter.prototype.search = function(obj) {
		var nemObjFoValue = obj;

		for (var i = 0; i < this.element.length; i++) {
			var a = $(this.element[i]).attr('data-target');
			nemObjFoValue[a].push($(this.element[i]).attr('value'));
		}
		console.log(nemObjFoValue);
		
	}

	$.fn.filter = function(options){
		new Filter(this,options);
	};


})(jQuery)