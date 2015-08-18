/*
	user_info 	. uid
				. identity
				. name
				. power[]
*/

user_info = new Array();
user_info[0] = new Object();
user_info[0].uid = '45';
user_info[0].identity = 'admin';
user_info[0].name = '1@163.com';

user_info[1] = new Object();
user_info[1].uid = '46';
user_info[1].identity = 'admin';
user_info[1].name = '2@163.com';

user_info[2] = new Object();
user_info[2].uid = '47';
user_info[2].identity = 'admin';
user_info[2].name = '-1@163.com';

user_info[3] = new Object();
user_info[3].uid = '48';
user_info[3].identity = 'admin';
user_info[3].name = '3@163.com';

user_info[4] = new Object();
user_info[4].uid = '49';
user_info[4].identity = 'admin';
user_info[4].name = '4@163.com';

user_info[5] = new Object();
user_info[5].uid = '50';
user_info[5].identity = 'admin';
user_info[5].name = '5@163.com';

user_info[6] = new Object();
user_info[6].uid = '51';
user_info[6].identity = 'admin';
user_info[6].name = '6@163.com';

function list_user( j_obj ) {
	
	var tbody = j_obj.children('tbody');

	$.each( user_info, function(i,v) {
		var tr = $('<tr id="'+v.uid+'"></tr>');
		tbody.append( tr );
		tr.append( $('<td>'+v.uid+'</td>') );
		tr.append( $('<td><a class="user_name">'+v.name+'</a></td>') );
		tr.append( $('<td><a class="user_identity">'+v.identity+'</a></td>') );
		tr.append( $('<td><a class="user_power"></a></td>') );
		tr.append( $('<td class="user_set"><input type="checkbox" class="user_valid"/>禁止<a class="delete">删除</a></td>') );
	} );
	
	
	$('a.delete').click( function() {
		var t = $(this).parents('tr');
		var uid = t.attr('id');
		
		$.each( user_info, function(i,v) {
			if( v.uid==uid ) {
				user_info.splice( i, 1 );
				t.hide( 400, function() { $(this).remove(); } );	
				ii = i;
				return false;
			}	
		} );	
		
	} );
	
	$('a.icon_search').click( function() {
		var str = $(this).prev('input[type=search]').val();
		if( str!='' ) {
			
			var uid = -1;
			
			// 查uid
			$.each( user_info, function(i,v) {
				if( v.uid==str ) {
					uid = v.uid
					return false;
				}
				
				if( v.name==str ) {
					uid = v.uid;
					return false;
				}
				
				if( v.identity==str ) {
					uid = v.uid;
					return false;
				}
			
			} );
			
			if( uid>=0 ) {		
				var y_move = $('#'+uid).offset().top - 80;
				console.log( y_move );
				$(window).scrollTop( y_move )
			}
			
		}
		
	} );
}


//-------------------------------------------------------------------------
//								public functions
//-------------------------------------------------------------------------
function parse_content( affair ) {
	$.each( affair, function(i, v) {
		if( typeof(v.content)=="undefined" || v.content==='' )
			return true;
		affair[i].c_obj = $.parseJSON( v.content );
	} );
}

// UTC - 单位为: 秒
function formatDate( UTC ) {
	var d = new Date( (UTC+8*3600)*1000 );
	var year = d.getUTCFullYear();     
	var month = d.getUTCMonth() + 1;     
	var date = d.getUTCDate();         
	return year+"."+month+"."+date;     
}

function formatDate_2( UTC ) {
	var d = new Date( (UTC+8*3600)*1000 );
	var year = d.getUTCFullYear();     
	var month = d.getUTCMonth() + 1;     
	var date = d.getUTCDate();     
	var hour = d.getUTCHours();     
	var minute = d.getUTCMinutes();     
	var second = d.getUTCSeconds();     
	return year+"."+month+"."+date+" "+hour+":"+minute+":"+second;     
}