var wacWidgets;
(function($) {

	wacWidgets = {
		init: function() {
			var sidebars = $( '#widgets-right .widgets-holder-wrap' ),
				wac = $('<div id="widget-area-chooser"><h3>Choose an area to place this widget&hellip;</h3><ul class="wac-sidebars"></ul><div class="wac-actions"><button class="button-primary">Add Widget</button><button class="button-secondary">Cancel</button></div></div>'),
				sidebar_select = wac.find('.wac-sidebars');

			//$( '#available-widgets' ).prepend( wac );

			sidebars.each( function( index, element ) {
				var $this = $( this ),
					name = $this.find( '.sidebar-name h3' ),
					id = $this.find( '.widgets-sortables' ).attr( 'id' );

				name.find( 'span' ).remove();
				if ( index == 0 ) {
					sidebar_select.append( '<li class="wac-selected" data-id="' + id + '">' + $.trim( name.remove('spinner').html() ) + '</li>' )
				} else {
					sidebar_select.append( '<li data-id="' + id + '">' + $.trim( name.remove('spinner').html() ) + '</li>' )
				}
			});

			$( '#available-widgets .widget .widget-title' ).on( 'click.widget-area-chooser', function() {
				var widget = $( this ).closest( '.widget' );

				if ( widget.hasClass( 'widget-in-question' ) || ( $( '#widgets-left' ).hasClass( 'chooser' ) ) ) {
					wac.find( '.button-secondary' ).trigger( 'click.widget-area-chooser' );
				} else {
					wacWidgets.clearWidgetSelection();
					$( '#widgets-left' ).addClass( 'chooser' );
					widget.addClass( 'widget-in-question' );
					
					widget.after( wac );
					wacWidgets.enableActions( wac, widget );
					wac.slideDown(200);
				}
			});
		},

		enableActions: function( wac, widget ) {
			wac.on( 'click.widget-area-chooser', '.wac-sidebars li', function() {
				$( '.wac-selected' ).removeClass( 'wac-selected' );
				$( this ).addClass( 'wac-selected' );
			});

			wac.on( 'click.widget-area-chooser', '.button-primary', function() {
				wacWidgets.addWidget( wac, widget );
				wacWidgets.closeChooser();
				wacWidgets.clearWidgetSelection();
			});

			wac.on( 'click.widget-area-chooser', '.button-secondary', function() {
				wacWidgets.closeChooser();
				wacWidgets.clearWidgetSelection();
			} );
		},

		addWidget: function( wac, chosen_widget ) {
			var widget = chosen_widget.clone(),
				widget_id = widget.attr('id'),
				add = widget.find( 'input.add_new' ).val(),
				n = widget.find( 'input.multi_number' ).val(),
				sidebar_id = wac.find( '.wac-selected' ).data('id'),
				sidebar = $( '#' + sidebar_id );


			widget.attr( 'id', widget_id.replace( '__i__', n ) );

			if ( 'multi' == add ) {
				widget.html(
					widget.html().replace(/<[^<>]+>/g, function(m) {
						return m.replace(/__i__|%i%/g, n);
					})
				);
				n++;
				$('#' + widget_id ).find('input.multi_number').val(n);
			} else if ( 'single' == add ) {
				// @TODO WTF is a 'single' widget?
				console.log( 'Single doesnt work yet.' );
			}

			sidebar.closest( '.widgets-holder-wrap.closed' ).find( '.sidebar-name' ).click();
			widget.prependTo( sidebar );

			$( 'html, body' ).animate({
				scrollTop: sidebar.offset().top - 130
			}, 200);

			setTimeout( function() {
				//sidebar.find( '#' + widget.attr( 'id' ) + ' .widget-inside' ).effect( 'highlight', {}, 3000);
				sidebar.find( '#' + widget.attr( 'id' ) + ' .widget-title' ).click();
				wpWidgets.save( widget, 0, 0, 1 );
			}, 210 );
		},

		closeChooser: function() {
			var wac = $( '#widget-area-chooser' );
			wac.slideUp(200);
			setTimeout( function() {
				wac.remove();
			}, 210 );
		},

		clearWidgetSelection: function() {
			$( '#widgets-left' ).removeClass( 'chooser' );
			$( '#widgets-left .widget').removeClass( 'widget-in-question' );
		},
	}

	$(document).ready(function($){ wacWidgets.init(); });

})(jQuery);