String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function fetch(url) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
				// Resolve the promise with the response text
				resolve(req.response);
			}
			else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = function() {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
}

(function ( $ ) {
	'use strict';
	
	// Ready function for setup and plugin initiation:
	$(function(){
		$('html').removeClass('no-js').addClass('js');
	
		$('#content').css('margin-bottom', ($('footer').height() + 55) + 'px');
		
		function test_for_localstorage() {
			var mod = '';
			try {
				localStorage.setItem(mod, mod);
				localStorage.removeItem(mod);
				return true;
			} catch(e) {
				return false;
			}
		}
		$('html').addClass(test_for_localstorage() ? 'localstorage' : 'no-localstorage');
	
		// Load the responsive tabs plugin:
		fakewaffle.responsiveTabs(['xs']);
	});

	// Ready function for all hash related components:
	$(function() {
		// What's the default tab's ID?
		var default_hash = '#' + $('.tab-pane.active').attr('id');
	
		// Track hash changes:
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var target = $(e.target).attr('href');
			window.location.hash = target == default_hash ? '' : target;
			$(target).find('script[type="text/jitp-template"]').each(function(i,el) {
				var $el = $(el);
				$el.jitp_template();
			});
		});
		
		$('a[href="#figures"]').on('show.bs.tab', function(ev) {
			$('#figures .figure').each(function(i, el) {
				var $el = $(el);
				load_chart($el.attr('id'));
			});
			
		});
		
		//Switch to tab in hash:
		if(window.location.hash != '') {
			var hash_parts = window.location.hash.split("/");
			$('a[href="'+hash_parts[0]+'"]').tab('show');
		}
		$(window).on('hashchange', function(event) {
			event.stopPropagation();
			event.preventDefault()
		});
		
		// Modal code:
		$('a[href^="#modal"]').on('click', function(event) {
			var modal_content = $($(this).attr('href').replace(/^\#modal\:/,'')),
			    modal_object;
			if(modal_content.attr('id').match(/^table/)) {
				modal_object = $('<'+modal_content.get(0).tagName+'></'+modal_content.get(0).tagName+'>');
				modal_object.addClass(modal_content.attr('class'));
				modal_object.append(modal_content.html());
			
				$('#ContentModal .modal-mountpoint').empty().append(modal_content.prev('h2')).append(modal_object);
				$('#ContentModal').modal('show');
			
				$('#ContentModal .modal-mountpoint').find('script[type="text/jitp-template"]').each(function(i,el) {
					var $el = $(el);
					$el.jitp_template();
				});
			} else {
				var h2 = $($(this).attr('href').replace(/^\#modal\:/,'')).prev('h2');
				//.parent().parent().prev();
				if(h2.length == 0) {
					h2 = $($(this).attr('href').replace(/^\#modal\:/,'')).parent().parent().prev('h2');
				}
				h2 = h2.clone();
				modal_object = $('<div class="figure"><svg></svg></div>');
				$('#ContentModal .modal-mountpoint').empty().append(modal_object);
				$('#ContentModal').modal('show');
				load_chart($(this).attr('href').replace(/^\#modal\:/,''), '#ContentModal');
				$('#ContentModal .modal-content svg').before(h2);
				$('#ContentModal .modal-content').css('height', 490 + h2.height());
			}
			
			event.stopPropagation();
			event.preventDefault()
		});
		$('#ContentModal').on('hidden.bs.modal', function(event) {
			$('#ContentModal .modal-mountpoint').empty();
		});
	});
	
	window.DataRepository = {
		data_repository: $('html').hasClass('localstorage') ? JSON.parse(localStorage.getItem('data_repository')) : {},
		init: function() {
			this.data_repository = {};
			if($('html').hasClass('localstorage')) {
				localStorage.setItem('data_repository', JSON.stringify(this.data_repository));
			}
		},
		set: function(key, value) {
			if(this.data_repository === null) {
				this.init();
			}
			
			this.data_repository[key] = value;
			if($('html').hasClass('localstorage')) {
				localStorage.setItem('data_repository', JSON.stringify(this.data_repository));
			}
		},
		get: function(key) {
			if(this.data_repository === null) {
				this.init();
			}
			
			return this.data_repository[key];
		},
		has: function(key) {
			if(this.data_repository === null) {
				this.init();
			}
			
			return _.has(this.data_repository, key);
		}
	}
	
	window.jitp_data = function(key) {
		var access_key = undefined;
		
		if(window.DataRepository.has(key)) {
			return window.DataRepository.get(key);
		} 
		
		if (key.match(/^source\/data/)) {
			access_key = key;
		} else {
			access_key = 'data/' + key;
		}
			
		if(!key.match(/(\.json|\.csv|\.txt)$/)) {
			access_key = 'data/' + key + '.json';
		}
	
		// Keep a list of tracked promises for loading the data:
		if(window.what_we_have_fetched === undefined) {
			window.what_we_have_fetched = {};
		}
		if(!_.has(window.what_we_have_fetched, access_key)) {
			if (build) {
				window.what_we_have_fetched[access_key] = new Promise(function(resolve, reject) {
					var response = $('#' + access_key.replace(/[\/.]/g,'_')).html();
					if (access_key.match(/\.json$/)) {
						try {
							response = JSON.parse(response);
						} catch(e) {
							reject(e);
						}
					}
					resolve(response);
				});
			} else {
				window.what_we_have_fetched[access_key] = fetch(access_key);
			}
		}
		return window.what_we_have_fetched[access_key];
	}
	$.fn.extend({
		jitp_template: function(options, data) {
			var data_calls = null;
			var tpl = $(this).html();
			if(options === undefined) {
				options = {};
			}
			if (data === undefined) {
				data = {};
			}
			if(data_calls = tpl.match(/jitp_data\(\'([^)]+)\'\)/g)) {
				data_calls = _.compact(_.uniq(_.map(data_calls, function(x) {
					x = x.replace(/jitp_data\(\'/,'').replace(/\'\)/,'')
					return window.DataRepository.has(x) ? false : x;
				})));
				Promise.all(_.map(data_calls, function(x) {  return window.jitp_data(x); })).then(_.bind(function(values) {
					_.each(values, function(v, i) {
						if(!window.DataRepository.has(data_calls[i])) {
							try {
								window.DataRepository.set(data_calls[i],JSON.parse(v));
							} catch(err) {
								window.DataRepository.set(data_calls[i],v);
							}
						}
					});
					try{
						$(this).parent().html(_.template(tpl, options)(data));
					} catch(e) {
						$(this).parent().html('<strong>Template Error</template>: ' + e);
					}
				}, this), function(err) {
					console.log(err);
				});
			} else {
				try{
					$(this).parent().html(_.template(tpl, options)(data));
				} catch(e) {
					$(this).parent().html('<strong>Template Error</template>: ' + e);
				}
			}
			return $(this);
		}
	});
	
	// Ready function for D3:
	$(function() {
		
	});
}(window.jQuery));