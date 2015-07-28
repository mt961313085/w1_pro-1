/*
	
	场地申请事务处理
	
	affair[i]	. id
				. a_id
				. name
				. step
				. proposer
				. processor
				. content
				. rec_t
				. group
				. comment[j]. processor
							. end_t
							. suggestion
							. res


*/
var FIELD_A_ID = 16;

var affair;

affair = [{id:16,group:1},{id:16,group:2},{id:16,group:1},{id:16,group:3},{id:16,group:3},{id:17,g:-1}];

function gen_field_affair_ui( affair ) {
	var u_id = get_unique( affair );
	$.each( u_id, function(i, v) {
		var res = count_with_group( affair, v );
		
		if( res.num<=0 )
			return ture;
		
		if( res.num>1 ) {			// 冲突申请
			gen_field_conflict_apply_ui( affair, res.id );
			
		}
		else {					// 非冲突申请
			gen_field_normal_apply_ui( affair, res.id );

		};
		
	} );
}

function gen_field_conflict_apply_ui( affair, ids ) {
	
	var tar = $('ul.info_list');
	var new_li = $( '<li></li>' );
	tar.append( new_li );
	
	var div_l1 = $( '<div class="f_c"><ul></ul></div>' );
	new_li.append( div_l1 );
	
	var ul = div_l1.children( 'ul' );
	ul.append( $('<li><input name="Fruit" type="radio" checked="checked"/>苹果</li>') );
	ul.append( $("<li><input type='radio' name='w' value='ww'/></li>") );

	
}

function gen_field_normal_apply_ui( affair, ids ) {
	
	
}

function get_unique( affair ) {
	var unique_id = new Array();
	$.each( affair, function(i, v) {
		if( 'group' in v && v.id==FIELD_A_ID )
			unique_id.push( v.group );
	} );
	
	unique_id = $.unique( unique_id );
	return unique_id;
}

function count_with_group( affair, g_val ) {
	var res = { num: 0, id:[] };
	$.each( affair, function(i, v) {
		if( 'group' in v  && v.id==FIELD_A_ID ) {
			if( v.group==g_val ) {
				res.num++;
				res.id.push( i );
			}
		}
	} );
	
	return res;
}