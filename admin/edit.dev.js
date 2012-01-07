/**
 *
 *
 * @since 1.0.0
 */

jQuery(document).ready( function( $ ) {
	var tp = {
		made_changes: false,
		table: {
			id: $( '#tp-table-id' ).val(),
			rows: $( '#tp-rows' ).val(),
			columns: $( '#tp-columns' ).val(),
			head: $( '#tp-table-head' ).prop( 'checked' ),
			foot: $( '#tp-table-foot' ).prop( 'checked' ),
			no_data_columns_pre: 2,
			no_data_columns_post: 1,
			body_cells_pre: '<tr><td><span class="move-handle"></span></td><td><input type="checkbox" /><input type="hidden" class="visibility" value="1" /></td>',
			body_cells_post: '<td><span class="move-handle"></span></td></tr>',
			body_cell: '<td><textarea></textarea></td>',
			head_cell: '<th class="head"><span class="sort-control sort-desc" title="' + tp_strings.sort_desc + '"></span><span class="sort-control sort-asc" title="' + tp_strings.sort_asc + '"></span><span class="move-handle"></span></th>',
			foot_cell: '<th><input type="checkbox" /><input type="hidden" class="visibility" value="1" /></th>',
			set_table_changed: function() {
				tp.made_changes = true;
			},
			unset_table_changed: function() {
				tp.made_changes = false;
				$( '#tp-preview' ).empty(); // clear preview
				$( '#tp-edit-body' ).one( 'change', 'textarea', tp.table.set_table_changed );
			},
			change_id: function( /* event */ ) {
				if ( this.value == tp.table.id )
					return;
				
				if ( confirm( tp_strings.ays_change_table_id ) ) {
					tp.table.id = this.value;
					$( '#tp-shortcode' ).val( '[table id=' + tp.table.id + ' /]' ).click(); // click() to focus and select
					tp.table.set_table_changed();
				} else {
					$(this).val( tp.table.id );
				}
			},
			change_table_head: function( /* event */ ) {
				tp.table.head = $(this).prop( 'checked' );
				tp.rows.stripe();
			},
			change_table_foot: function( /* event */ ) {
				tp.table.foot = $(this).prop( 'checked' );
				tp.rows.stripe();
			},
			prepare_ajax_request: function( wp_action, wp_nonce ) {
					var $table_body = $( '#tp-edit-body' ),
						table_data = [],
						table_options,
						table_visibility = { rows: [], columns: [], hidden_rows: 0, hidden_columns: 0 };
	
					$table_body.children().each( function( idx, row ) {
						table_data[idx] = $(row).find( 'textarea' )
							.map( function() {
								return $(this).val();
							} )
							.get();
					} );
					table_data = JSON.stringify( table_data );
	
					// evtl. für options-saving: http://stackoverflow.com/questions/1184624/serialize-form-to-json-with-jquery
					table_options = {
						table_head: tp.table.head,
						table_foot: tp.table.foot
					};
					table_options = JSON.stringify( table_options );
	
					table_visibility.rows = $table_body.find( ':hidden' )
						.map( function() {
							if ( '1' == $(this).val() )
								return 1;
							table_visibility.hidden_rows += 1;
							return 0;
						} )
						.get();
					table_visibility.columns = $( '#tp-edit-foot' ).find( ':hidden' )
						.map( function() {
							if ( '1' == $(this).val() )
								return 1;
							table_visibility.hidden_columns += 1;
							return 0;
						} )
						.get();
					table_visibility = JSON.stringify( table_visibility );
	
					// request_data =
					return {
						action: wp_action,
						_ajax_nonce : $( wp_nonce ).val(),
						tp: {
							id: tp.table.id,
							rows: tp.table.rows,
							columns: tp.table.columns,
							data: table_data,
							options: table_options,
							visibility: table_visibility
						}
					};
			},
			preview: {
				trigger: function( /* event */ ) {
					if ( ! tp.made_changes && $( '#tp-preview' ).children().length ) {
						tp.table.preview.show();
						return;
					}

					$(this).after( '<span class="tp-animation-preview" title="' + tp_strings.preparing_preview + '"/>' );
					$( '.tp-show-preview' ).prop( 'disabled', true );
					$( 'body' ).addClass( 'wait' );
					
					$.post(
							ajaxurl,
							tp.table.prepare_ajax_request( 'TablePress_preview_table', '#tp-ajax-nonce-preview-table' ),
							function() { /* done with .success() below */ },
							'json'
						)
						.success( tp.table.preview.ajax_success )
						.error( tp.table.preview.ajax_error );
				},
				ajax_success: function( data, status, jqXHR ) {
					if ( ( 'undefined' == typeof status ) || ( 'success' != status ) )
						tp.table.preview.error( 'AJAX call successful, but unclear status' );
					else if ( ( 'undefined' == typeof data ) || ( null == data ) || ( '-1' == data ) || ( 'undefined' == typeof data.success ) || ( true !== data.success ) )
						tp.table.preview.error( 'AJAX call successful, but unclear data' );
					else
						tp.table.preview.success( data );
				},
				ajax_error: function( jqXHR, status, error_thrown ) {
					tp.table.preview.error( 'AJAX call failed: ' + status + ' - ' + error_thrown );
				},
				success: function( data ) {
					$( '#tp-preview' ).empty();
					$( '<iframe id="tp-preview-iframe" />' ).load( function() {
					    var $iframe = $(this).contents();
					    $iframe.find( 'head' ).append( data.head_html );
					    $iframe.find( 'body' ).append( data.body_html );
					} ).appendTo( '#tp-preview' );
					$( '.tp-animation-preview' ).remove();
					$( '.tp-show-preview' ).prop( 'disabled', false );
					$( 'body' ).removeClass( 'wait' );
					tp.table.preview.show();
				},
				error: function( message ) {
					$( '.tp-animation-preview' )
						.after( '<span class="tp-preview-error">' + tp_strings.preview_error + ' ' + message + '</span>' )
						.remove();
					$( '.tp-preview-error' ).delay( 2000 ).fadeOut( 2000, function() { $(this).remove(); } );
					$( '.tp-show-preview' ).prop( 'disabled', false );
					$( 'body' ).removeClass( 'wait' );
				},
				show: function() {
					var width = $(window).width() - 120,
						height = $(window).height() - 120;
					if ( $( 'body.admin-bar' ).length )
						height -= 28;
					tb_show( tp_strings.preview, '#TB_inline?height=' + height + '&width=' + width + '&inlineId=tp-preview-container', false );
				}
			}
		},
		rows: {
			create: function( num_rows ) {
				var i, j,
					column_idxs,
					new_rows = '';
				
				for ( i = 0; i < num_rows; i++ ) {
					new_rows += tp.table.body_cells_pre;
					for ( j = 0; j < tp.table.columns; j++ )
						new_rows += tp.table.body_cell;
					new_rows += tp.table.body_cells_post;
				}
				
				column_idxs = $( '#tp-edit-foot' ).find( '.column-hidden' )
					.map( function() { return $(this).index(); } ).get();
				return $( new_rows ).each( function( row_idx, row ) {
					$(row).children()
						.filter( function( idx ) { return ( -1 != jQuery.inArray( idx, column_idxs ) ); } )
						.addClass( 'column-hidden' );
				} );
			},
			append: function( /* event */ ) {
				var num_rows = $( '#tp-rows-append-num' ).val();

				if ( ! ( /^[1-9][0-9]{0,3}$/ ).test( num_rows ) ) {
					alert( tp_strings.append_num_rows_invalid );
					$( '#tp-rows-append-num' ).focus().select();
					return;
				}
				
				$( '#tp-edit-body' ).append( tp.rows.create( num_rows ) );
	
				tp.rows.stripe();
				tp.reindex();
			},
			insert: function( event ) {
				var $selected_rows = $( '#tp-edit-body' ).find( 'input:checked' )
					.prop( 'checked', event.altKey ).closest( 'tr' );
					
				if ( 0 === $selected_rows.length ) {
					alert( tp_strings.no_rows_selected );
					return;
				}

				$selected_rows.before( tp.rows.create( 1 ) );

				tp.rows.stripe();	
				tp.reindex();
			},
			hide: function( event ) {
				var $selected_rows = $( '#tp-edit-body' ).find( 'input:checked' )
					.prop( 'checked', event.altKey ).closest( 'tr' );
					
				if ( 0 === $selected_rows.length ) {
					alert( tp_strings.no_rows_selected );
					return;
				}
				
				$selected_rows.addClass( 'row-hidden' ).find( '.visibility' ).val( '0' );
	
				tp.rows.stripe();
				tp.table.set_table_changed();
			},
			unhide: function( event ) {
				var $selected_rows = $( '#tp-edit-body' ).find( 'input:checked' )
					.prop( 'checked', event.altKey ).closest( 'tr' );
					
				if ( 0 === $selected_rows.length ) {
					alert( tp_strings.no_rows_selected );
					return;
				}
				
				$selected_rows
					.removeClass( 'row-hidden' )
					.find( '.visibility' ).val( '1' );

				tp.rows.stripe();	
				tp.table.set_table_changed();
			},
			remove: function( /* event */ ) {
				var $selected_rows = $( '#tp-edit-body' ).find( 'input:checked' ).closest( 'tr' );
				
				if ( 0 === $selected_rows.length ) {
					alert( tp_strings.no_rows_selected );
					return;
				}
				
				if ( tp.table.rows === $selected_rows.length ) {
					alert( tp_strings.no_remove_all_rows );
					return;
				}
				
				if ( ! confirm( tp_strings.ays_remove_rows ) )
					return;
				
				$selected_rows.remove();

				tp.rows.stripe();
				tp.reindex();
			},
			move: {
				start: function( event, ui ) {
					$( ui.placeholder ).removeClass( 'row-hidden' ).css( 'visibility', 'visible' )
						.html( '<td colspan="' + ( tp.table.columns + tp.table.no_data_columns_pre + tp.table.no_data_columns_post ) + '"><div/></td>' );
					$( ui.helper ).removeClass( 'odd head-row foot-row' );
				},
				change: function( event, ui ) {
					tp.rows.stripe( ui.helper );
				},
				stop: function( /* event, ui */ ) {
					tp.rows.stripe();
				}
			},
			sort: function() {
				var column_idx = $(this).parent().index(),
					direction = ( $(this).hasClass( 'sort-asc' ) ) ? 1 : -1,
					$table_body = $('#tp-edit-body'),
					$head_rows = $table_body.find( '.head-row' ).prevAll().andSelf(),
					$foot_rows = $table_body.find( '.foot-row' ).nextAll().andSelf(),
					rows = $table_body.children().not( $head_rows ).not( $foot_rows ).get(),
					/*
					 * Natural Sort algorithm for Javascript - Version 0.6 - Released under MIT license
					 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
					 * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams, guillermo
					 * See: http://js-naturalsort.googlecode.com/ and http://www.overset.com/2008/09/01/javascript-natural-sort-algorithm-with-unicode-support/
					 */
					natural_sort = function( a, b ) {
						var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
							sre = /(^[ ]*|[ ]*$)/g,
							dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
							hre = /^0x[0-9a-f]+$/i,
							ore = /^0/,
							// convert all to strings and trim()
							x = a.toString().replace(sre, '') || '',
							y = b.toString().replace(sre, '') || '',
							// chunk/tokenize
							xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
							yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
							// numeric, hex or date detection
							xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
							yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null;
						// first try and sort Hex codes or Dates
						if (yD) {
							if ( xD < yD ) return -1;
							else if ( xD > yD )	return 1;
						}
						// natural sorting through split numeric strings and default strings
						for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
							// find floats not starting with '0', string or 0 if not defined (Clint Priest)
							oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
							oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
							// handle numeric vs string comparison - number < string - (Kyle Adams)
							if (isNaN(oFxNcL) !== isNaN(oFyNcL)) return (isNaN(oFxNcL)) ? 1 : -1; 
							// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
							else if (typeof oFxNcL !== typeof oFyNcL) {
								oFxNcL += ''; 
								oFyNcL += ''; 
							}
							if (oFxNcL < oFyNcL) return -1;
							if (oFxNcL > oFyNcL) return 1;
						}
						return 0;
					};

				$.each( rows, function( row_idx, row ) {
					//parseFloat???
					row.sort_key = $(row).children().eq( column_idx ).find( 'textarea' ).val().toUpperCase();
				} );

				rows.sort( function( a, b ) {
					return direction * natural_sort( a.sort_key, b.sort_key );
				} );

				// might not be necessary:
				$.each( rows, function( row_idx, row ) {
					row.sort_key = null;
				} );

				$table_body.append( $head_rows );
				$table_body.append( rows );
				$table_body.append( $foot_rows );

				tp.rows.stripe();	
				tp.reindex();	
			},
			stripe: function( helper ) {
				if ( 'undefined' == typeof helper )
					helper = null;
				helper = $( helper );
				var $rows = $( '#tp-edit-body' ).children().removeClass( 'odd head-row foot-row' ).not( helper );
				$rows.filter( ':even' ).addClass( 'odd' );
				$rows = $rows.not( '.row-hidden' );
				if( helper.hasClass( 'row-hidden' ) )
					$rows = $rows.not( '.ui-sortable-placeholder' );				
				if ( tp.table.head )
					$rows.first().addClass( 'head-row' );
				if ( tp.table.foot )
					$rows.last().addClass( 'foot-row' );
			}
		},
		columns: {
			append: function( /* event */ ) {
				var i,
					num_columns = $( '#tp-columns-append-num' ).val(),
					new_body_cells = new_head_cells = new_foot_cells = '';
					
				if ( ! ( /^[1-9][0-9]{0,3}$/ ).test( num_columns ) ) {
					alert( tp_strings.append_num_columns_invalid );
					$( '#tp-columns-append-num' ).focus().select();
					return;
				}

				for ( i = 0; i < num_columns; i++ ) {
					new_body_cells += tp.table.body_cell;
					new_head_cells += tp.table.head_cell;
					new_foot_cells += tp.table.foot_cell;
				}
				
				$( '#tp-edit-body' ).children().each( function( row_idx, row ) {
					$(row).children().slice( - tp.table.no_data_columns_post )
						.before( new_body_cells );
				} );
				$( '#tp-edit-head' ).children().slice( - tp.table.no_data_columns_post )
					.before( new_head_cells );
				$( '#tp-edit-foot' ).children().slice( - tp.table.no_data_columns_post )
					.before( new_foot_cells );
				
				tp.reindex();
			},
			insert: function( event ) {
				var column_idxs,
					$selected_columns = $( '#tp-edit-foot' ).find( 'input:checked' )
						.prop( 'checked', event.altKey ).closest( 'th' );

				if ( 0 === $selected_columns.length ) {
					alert( tp_strings.no_columns_selected );
					return;
				}		
	
				column_idxs = $selected_columns.map( function() { return $(this).index(); } ).get();
				$( '#tp-edit-body' ).children().each( function( row_idx, row ) {
					$(row).children()
						.filter( function( idx ) { return ( -1 != jQuery.inArray( idx, column_idxs ) ); } )
						.before( tp.table.body_cell );
				} );
				$( '#tp-edit-head' ).children()
					.filter( function( idx ) { return ( -1 != jQuery.inArray( idx, column_idxs ) ); } )
					.before( tp.table.head_cell );
				$selected_columns.before( tp.table.foot_cell );
				
				tp.reindex();
			},
			hide: function( event ) {	
				var column_idxs,
					$selected_columns = $( '#tp-edit-foot' ).find( 'input:checked' )
						.prop( 'checked', event.altKey ).closest( 'th' );

				if ( 0 === $selected_columns.length ) {
					alert( tp_strings.no_columns_selected );
					return;
				}		
	
				column_idxs = $selected_columns.map( function() { return $(this).index(); } ).get();
				$( '#tp-edit-body' ).children().add( '#tp-edit-head' ).each( function( row_idx, row ) {
					$(row).children()
						.filter( function( idx ) { return ( -1 != jQuery.inArray( idx, column_idxs ) ); } )
						.addClass( 'column-hidden' );
				} );
				$selected_columns.addClass( 'column-hidden' ).find( '.visibility' ).val( '0' );

				tp.table.set_table_changed();
			},
			unhide: function( event ) {
				var column_idxs,
					$selected_columns = $( '#tp-edit-foot' ).find( 'input:checked' )
						.prop( 'checked', event.altKey ).closest( 'th' );

				if ( 0 === $selected_columns.length ) {
					alert( tp_strings.no_columns_selected );
					return;
				}		
	
				column_idxs = $selected_columns.map( function() { return $(this).index(); } ).get();
				$( '#tp-edit-body' ).children().add( '#tp-edit-head' ).each( function( row_idx, row ) {
					$(row).children()
						.filter( function( idx ) { return ( -1 != jQuery.inArray( idx, column_idxs ) ); } )
						.removeClass( 'column-hidden' );
				} );
				$selected_columns.removeClass( 'column-hidden' ).find( '.visibility' ).val( '1' );

				tp.table.set_table_changed();
			},
			remove: function( /* event */ ) {
				var column_idxs,
					$selected_columns = $( '#tp-edit-foot' ).find( 'input:checked' ).closest( 'th' );
					
				if ( 0 === $selected_columns.length ) {
					alert( tp_strings.no_columns_selected );
					return;
				}
	
				if ( tp.table.columns === $selected_columns.length ) {
					alert( tp_strings.no_remove_all_columns );
					return;
				}		

				if ( ! confirm( tp_strings.ays_remove_columns ) )
					return;
			
				column_idxs = $selected_columns.map( function() { return $(this).index(); } ).get();
				$( '#tp-edit-body' ).children().add( '#tp-edit-head' ).each( function( row_idx, row ) {
					$(row).children()
						.filter( function( idx ) { return ( -1 != jQuery.inArray( idx, column_idxs ) ); } )
						.remove();
				} );		
				$selected_columns.remove();
				
				tp.reindex();
			},
			move: {
				source_idx: -1,
				target_idx: -1,
				$rows: null,
				$row_children: null,
				$cell: null,
				$cells: null,
				$placeholder: null,
				$helper: null,
				start: function( event, ui ) {
					var $item = $( ui.item ),
						column_width;

					tp.columns.move.source_idx = $item.index();

					tp.columns.move.$rows = $( '#tp-edit-body' ).children().add( '#tp-edit-foot' );
	
					tp.columns.move.$cells = tp.columns.move.$rows
						.find( ':nth-child(' + ( tp.columns.move.source_idx + 1 ) + ')' )
						.each( function() {
							tp.columns.move.$cell = $(this);
							$( '<td class="move-placeholder"><div/></td>' ).insertBefore( tp.columns.move.$cell );				
							tp.columns.move.$cell.insertAfter( tp.columns.move.$cell.nextAll().last() )
								.clone().addClass( 'move-hover' ).insertAfter( tp.columns.move.$cell )
								.find( 'textarea' ).val( tp.columns.move.$cell.find( 'textarea' ).val() );
								// last line works around problem with clone() of textareas, see jQuery bugs 5524, 2285, 3016
						} )
						.hide();
						
					tp.columns.move.$helper = tp.columns.move.$rows.find( '.move-hover' );
					/* // seems not to be working for rows, so disable it for columns
						.each( function() {
							tp.columns.move.$cell = $(this);
							tp.columns.move.$cell.css( 'top', ( tp.columns.move.$cell.position().top - 3 ) + 'px' );
						} );
					*/
						
					column_width = tp.columns.move.$helper.eq(1).width(); // eq(0) is table foot
					tp.columns.move.$helper.eq(0).width( column_width );
					tp.columns.move.$placeholder = tp.columns.move.$rows.find( '.move-placeholder' );
					tp.columns.move.$placeholder.find( 'div' ).width( column_width );
				},
				change: function( event, ui ) {
					tp.columns.move.target_idx = $( ui.placeholder ).index();
	
					if ( ( tp.columns.move.target_idx - tp.columns.move.source_idx ) == 1 )
						tp.columns.move.target_idx += 1;
					else
						if ( tp.columns.move.target_idx == tp.columns.move.source_idx )
							tp.columns.move.target_idx -= 1;
	
					tp.columns.move.$placeholder.each( function() {
						tp.columns.move.$cell = $(this);
						tp.columns.move.$cell.insertBefore( tp.columns.move.$cell.parent().children().eq( tp.columns.move.target_idx ) );
					} );
				
					if ( tp.columns.move.target_idx > tp.columns.move.source_idx )
						tp.columns.move.target_idx -= 1;
	
					tp.columns.move.source_idx = tp.columns.move.target_idx;
				},
				sort: function( event, ui ) {
					tp.columns.move.$helper.css( 'left', ui.offset.left );
				},
				stop: function( /* event, ui */ ) {
					tp.columns.move.$helper.remove();
					tp.columns.move.$cells
						.each( function() {
							tp.columns.move.$cell = $(this);
							tp.columns.move.$cell.insertBefore( tp.columns.move.$cell.parent().find( '.move-placeholder' ) );	
						} )
						.show();
					tp.columns.move.$placeholder.remove();
	
					tp.columns.move.source_idx = tp.columns.move.target_idx = -1;
					tp.columns.move.$rows = tp.columns.move.$row_children = tp.columns.move.$cell
					= tp.columns.move.$cells = tp.columns.move.$placeholder = tp.columns.move.$helper
					= null;
	
					tp.reindex();
				}
			},
			number_to_letter: function( number ) {
				var column = '';
				while ( number > 0 ) {
					column = String.fromCharCode( 65 + ( ( number-1) % 26 ) ) + column;
					number = Math.floor( (number-1) / 26 );
				}
				return column;
			}/*,
			letter_to_number: function( column ) {
				column = column.toUpperCase();
				var count = column.length,
					number = 0,
					i;
				for ( i = 0; i < count; i++ ) {
					number += ( column.charCodeAt( count-1-i ) - 64 ) * Math.pow( 26, i );
				}
				return number;
			}*/
		},
		cells: {
			$focus: $( null ),
			autogrow: function( /* event */ ) {
				tp.cells.$focus.removeClass( 'focus' );
				tp.cells.$focus = $(this).closest( 'tr' ).addClass( 'focus' );
			},
			visual_editor: {
				$textarea: null,
				open: function( event ) {
					// evtl. lieber event.shiftKey oder event.ctrlKey
					if ( ! event.altKey )
						return;

					tp.cells.$textarea = $(this).blur();
					$( '#tp-visual-editor-content' ).val( tp.cells.$textarea.val() );
					tb_show( 'Visual Editor', '#TB_inline?height=153&width=400&inlineId=tp-visual-editor-container&modal=true', false );
					$( '#tp-visual-editor-content' ).focus();
				},
				save: function() {
					var $ve_content = $( '#tp-visual-editor-content' ).blur().val();
					if ( tp.cells.$textarea.val() != $ve_content ) {
						tp.cells.$textarea.val( $ve_content );
						tp.table.set_table_changed();
					}
					tp.cells.$textarea.focus();
					tp.cells.visual_editor.close();
				},
				close: function() {
					tb_remove();
				}
			},
			checkboxes: {
				last_clicked: { '#tp-edit-body' : false, '#tp-edit-foot' : false },
				multi_select: function ( event ) {
					if ( 'undefined' == event.shiftKey )
						return true;
			
					if ( event.shiftKey ) {
						if ( ! tp.cells.checkboxes.last_clicked[ event.data.parent ] )
							return true;
			
						var $checkboxes = $( event.data.parent ).find( ':checkbox' ),
							first_cb = $checkboxes.index( tp.cells.checkboxes.last_clicked[ event.data.parent ] ),
							last_cb = $checkboxes.index( this );
						if ( first_cb != last_cb ) {
							$checkboxes.slice( Math.min( first_cb, last_cb ), Math.max( first_cb, last_cb ) ).prop( 'checked', $(this).prop( 'checked' ) );
						}
					}
					tp.cells.checkboxes.last_clicked[ event.data.parent ] = this;
					return true;
				}
			}
		},
		content: {
			link: {
				add: function( /* event */ ) {
					var link_url,
						link_text,
						target = '',
						html;

					link_url = prompt( tp_strings.link_url + ':', 'http://' );
					if ( ! link_url )
						return;

					link_text = prompt( tp_strings.link_text + ':', tp_strings.link_text );
            		if ( ! link_text )
            			return;

			        if ( tp_options.link_target_blank )
						target = ' target="_blank"';

                	html = '<a href="' + link_url + '"' + target + '>' + link_text + '</a>';
                	html = prompt( tp_strings.link_insert_explain, html );
                	if ( ! html )
                		return;
                		
                    $( '#tp-edit-body' ).one( 'click', 'textarea', function() {
                		var $textarea = $(this);
						$textarea.val( $textarea.val() + html );
						tp.table.set_table_changed();
                	} );
                }
			},
			image: {
				insert: function( /* event */ ) {

				},
				add: function( /* event */ ) {

				}				
			},
			span: {
				add: function( span ) {
					// todo: Frage entsprechend des span-Typs
					if ( ! confirm( tp_strings.span_add ) )
						return;
						
					$( '#tp-edit-body' ).one( 'click', 'textarea', function() {
						var $textarea = $(this),
							col_idx = $textarea.parent().index(),
							row_idx = $textarea.closest( 'tr' ).index();
						if ( ( '#rowspan#' == span ) && ( 0 == row_idx ) ) {
							alert( tp_strings.no_rowspan_first_row );
							return;
						} else if ( ( '#colspan#' == span ) && ( tp.table.no_data_columns_pre == col_idx ) ) {
							alert( tp_strings.no_colspan_first_col );
							return;				
						}	
						$textarea.val( span );
						tp.table.set_table_changed();
					} );
				}
			}
		},		
		check: {
			append_num: function( event ) {
				if ( ( 37 == event.which ) || ( 39 == event.which ) )
					return;
				var $input = $(this);
				$input.val( $input.val().replace( /[^0-9]/g, '' ) );
			},
			table_id: function( event ) {
				if ( ( 37 == event.which ) || ( 39 == event.which ) )
					return;
				var $input = $(this);
				$input.val( $input.val().replace( /[^0-9a-zA-Z-_]/g, '' ) );
			},			
			changes_saved: function() {
				if ( tp.made_changes )
					return tp_strings.unsaved_changes_unload;
			}
		},
		reindex: function() {
			var $row,
				$rows = $( '#tp-edit-body' ).children(),
				$cell, known_references = {};
				
			tp.table.rows = $rows.length;
			if ( tp.table.rows > 0 )
				tp.table.columns = $rows.first().children().length - tp.table.no_data_columns_pre - tp.table.no_data_columns_post;
			else
				tp.table.columns = 0;
						
			$rows
			.each( function( row_idx, row ) {
				$row = $( row );
				$row.find( 'textarea' )
					.val( function( column_idx, value ) {
						// If the cell is not a formula, there's nothing to do here
						if ( ( '' == value ) || ( '=' != value.charAt(0) ) )
							return value;

						return value.replace( /\[([a-z]+[0-9]+)(?::([a-z]+[0-9]+))?\]/gi, function( full_match, first_cell, second_cell ) {
							// first_cell must always exist, while second_cell only exists in ranges like [A4:B7]
							// we will use full_match as our result variable, so that we don't need an extra one
							
							if ( ! known_references.hasOwnProperty( first_cell ) ) {
								$cell = $( '#tp-cell-' + first_cell.toUpperCase() );
								if ( $cell.length )
									known_references[ first_cell ] = tp.columns.number_to_letter( $cell.parent().index() - tp.table.no_data_columns_pre + 1 ) + ( $cell.closest( 'tr' ).index() + 1 );
								else
									known_references[ first_cell ] = first_cell;					
							}
							full_match = '[' + known_references[ first_cell ];

							if ( 'undefined' != typeof second_cell ) {
								if ( ! known_references.hasOwnProperty( second_cell ) ) {
									$cell = $( '#tp-cell-' + second_cell.toUpperCase() );
									if ( $cell.length )
										known_references[ second_cell ] = tp.columns.number_to_letter( $cell.parent().index() - tp.table.no_data_columns_pre + 1 ) + ( $cell.closest( 'tr' ).index() + 1 );
									else
										known_references[ second_cell ] = second_cell;
								}
								full_match += ':' + known_references[ second_cell ];
							}

							return full_match + ']';
						} );
					} )
					.attr( 'name', function( column_idx /*, old_name */ ) {
						return 'tp[data][' + row_idx + '][' + column_idx + ']';
					} );

				$row.find( '.move-handle' ).html( row_idx + 1 );
				$row.find( '.visibility' ).attr( 'name', 'tp[visibility][row][' + row_idx + ']' );
			} )
			.each( function( row_idx, row ) {
				$( row ).find( 'textarea' ).attr( 'id', function( column_idx /*, old_id */ ) {
					return 'tp-cell-' + tp.columns.number_to_letter( column_idx + 1 ) + ( row_idx + 1 );
				} );
			});
			$( '#tp-edit-head' ).find( '.move-handle' )
				.html( function( idx ) { return tp.columns.number_to_letter( idx + 1 ); } );
			$( '#tp-edit-foot' ).find( '.visibility' ).attr( 'name', function( column_idx /*, old_name */ ) {
				return 'tp[visibility][column][' + column_idx + ']';
			} );

			$( '#tp-rows' ).val( tp.table.rows );
			$( '#tp-columns' ).val( tp.table.columns );

			tp.table.set_table_changed();
		},
		save_changes: {
			trigger: function( /* event */ ) {
				$(this).after( '<span class="tp-animation-saving" title="' + tp_strings.saving_changes + '"/>' );
				$( '.tp-save-changes' ).prop( 'disabled', true );
				$( 'body' ).addClass( 'wait' );

				$.post(
						ajaxurl,
						tp.table.prepare_ajax_request( 'TablePress_save_table', '#tp-ajax-nonce-save-table' ),
						function() { /* done with .success() below */ },
						'json'
					)
					.success( tp.save_changes.ajax_success )
					.error( tp.save_changes.ajax_error );
			},
			ajax_success: function( data, status, jqXHR ) {
				if ( ( 'undefined' == typeof status ) || ( 'success' != status ) )
					tp.save_changes.error( 'AJAX call successful, but unclear status' );
				else if ( ( 'undefined' == typeof data ) || ( null == data ) || ( '-1' == data ) || ( 'undefined' == typeof data.success ) || ( true !== data.success ) )
					tp.save_changes.error( 'AJAX call successful, but unclear data' );
				else
					tp.save_changes.success( data );
			},
			ajax_error: function( jqXHR, status, error_thrown ) {
				tp.save_changes.error( 'AJAX call failed: ' + status + ' - ' + error_thrown );
			},
			success: function( data ) {
				tp.table.unset_table_changed();
				tp.save_changes.after_saving_dialog( 'success' );
			},
			error: function( message ) {
				tp.save_changes.after_saving_dialog( 'error', message );
				//alert( tp_strings.save_changes_error );
			},
			after_saving_dialog: function( type, message ) {
				if ( 'undefined' == typeof message )
					message = '';
				else
					message = ' ' + message;
				$( '.tp-animation-saving' )
					.after( '<span class="tp-save-changes-' + type + '">' + tp_strings['save_changes_' + type] + message + '</span>' )
					.remove();
				$( '.tp-save-changes-' + type ).delay( 2000 ).fadeOut( 2000, function() { $(this).remove(); } );
				$( '.tp-save-changes' ).prop( 'disabled', false );
				$( 'body' ).removeClass( 'wait' );
			}
		},
		init: function() {
			var callbacks = {
				'click': {
					'#tp-shortcode':		function() { $(this).focus().select(); },
					'#tp-rows-insert':		tp.rows.insert,
					'#tp-columns-insert':	tp.columns.insert,
					'#tp-rows-remove':		tp.rows.remove,
					'#tp-columns-remove':	tp.columns.remove,
					'#tp-rows-hide':		tp.rows.hide,
					'#tp-columns-hide':		tp.columns.hide,
					'#tp-rows-unhide':		tp.rows.unhide,
					'#tp-columns-unhide':	tp.columns.unhide,	
					'#tp-rows-append':		tp.rows.append,
					'#tp-columns-append':	tp.columns.append,
					'#tp-link-add':			tp.content.link.add,
					'#tp-image-add':		tp.content.image.add,
					'#tp-span-add-rowspan':	function() { tp.content.span.add( '#rowspan#' ); },
					'#tp-span-add-colspan':	function() { tp.content.span.add( '#colspan#' ); },
					'.tp-show-preview':		tp.table.preview.trigger,
					'.tp-save-changes':		tp.save_changes.trigger
				},
				'keyup': {
					'#tp-rows-append-num, #tp-columns-append-num': tp.check.append_num,
					'#tp-table-id':			tp.check.table_id					
				},
				'change': {
					'#tp-table-head':		tp.table.change_table_head, 
					'#tp-table-foot':		tp.table.change_table_foot
				},
				'blur': {
					'#tp-table-id':			tp.table.change_id	// onchange would not recognize changed values from tp.check.table_id
				}
			},
			$table = $( '#tp-edit-body' );

			$.each( callbacks, function( event, event_callbacks ) {
				$.each( event_callbacks, function( selector, callback ) {
					$( selector ).on( event, callback );
				} );
			} );

			$( window ).on( 'beforeunload', tp.check.changes_saved );

			$table.one( 'change', 'textarea', tp.table.set_table_changed ); // just once is enough, will be reset after saving

			if ( tp_options.cells_visual_editor ) {
				$table.on( 'click', 'textarea', tp.cells.visual_editor.open );
				$( '#tp-visual-editor-confirm' ).on( 'click', tp.cells.visual_editor.save );
				$( '#tp-visual-editor-cancel' ).on( 'click', tp.cells.visual_editor.close );
			}

			if ( tp_options.cells_auto_grow )
				$table.on( 'focus', 'textarea', tp.cells.autogrow );

			$( '#tp-edit-body' ).on( 'click', 'input:checkbox', { parent: '#tp-edit-body' }, tp.cells.checkboxes.multi_select );
			$( '#tp-edit-foot' ).on( 'click', 'input:checkbox', { parent: '#tp-edit-foot' }, tp.cells.checkboxes.multi_select );

			$( '#tp-edit-head' ).on( 'click', '.sort-control', tp.rows.sort );

			$( '#tp-table-information' )
				.on( 'focus', '.placeholder', function() {
					if ( this.value == this.defaultValue )
						this.value = '';
				} )
				.on( 'blur', '.placeholder', function() {
					if ( '' == this.value )
						this.value = this.defaultValue;
				} )
				.on( 'change', '.placeholder', tp.table.set_table_changed );

			$table.sortable( {
				axis: 'y',
				containment: $( '#tp-edit' ), // to get better behavior when dragging before/after the first/last row
				forceHelperSize: true, // necessary?
				handle: '.move-handle',
				start: tp.rows.move.start,
				change: tp.rows.move.change,
				stop: tp.rows.move.stop,
				update: tp.reindex
			} ); // disableSelection() prohibits selection of text in textareas via keyboard

			$( '#tp-edit-head' ).sortable( {
				axis: 'x',
				items: '.head',
				containment: 'parent',
				forceHelperSize: true, // necessary?		
				helper: 'clone',
				handle: '.move-handle',
				start: tp.columns.move.start,
				stop: tp.columns.move.stop,
				change: tp.columns.move.change,
				sort: tp.columns.move.sort
			} ).disableSelection();
	
		}
	};
	
	tp.init();

} );