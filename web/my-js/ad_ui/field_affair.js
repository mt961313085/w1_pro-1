/*
	
	场地申请事务处理
	
	affair[i]	. id
				. a_id
				. name			
				. step
				. proposer
				. processor
				. content
				. apply_t
				. rec_t
				. group						// 场地申请事务中使用，表明是否为冲突申请
				. comment[j]. step
							. processor
							. end_t
							. suggestion
							. res

content - JSON 字符串

		date:	UTC时间戳
		com:	单位/学校
		cam:	校区
		b:		楼
		room:	房号
		id:		场地id
		t:		占用时间, {t1:xx,t2:xx}
		res:	申请原因
		
*/

var affair;
affair = [{a_id:16,group:1},{a_id:16,group:2},{a_id:16,group:1},{a_id:16,group:3},{a_id:16,group:3},{a_id:17,g:-1}];
affair[0].content = '{"date":3600,"com":"wdh","cam":"s1","b":"b2","room":"412","t":{"t1":10,"t2":11},"res":"举办一个科学讲座，需要有投影仪，容纳100人以上的场地。"}';
affair[0].proposer = '匿名者';
affair[0].id = 'a001';
affair[0].apply_t = 3600;

affair[1].content = '{"date":3600,"com":"wdh","cam":"s1","b":"b3","room":"412","t":{"t1":10,"t2":11},"res":"举办一个科学讲座，需要有投影仪，容纳100人以上的场地。"}';
affair[1].proposer = '匿名者2';
affair[1].id = 'a002';
affair[1].apply_t = 7200;

affair[2].id = 'a003';

function gen_field_affair_ui( affair ) {
	var u_id = get_unique( affair );

	$.each( u_id, function(i, v) {
		var res = count_with_group( affair, v );

		if( res.num<=0 )
			return ture;
		
		if( res.num>1 ) {			// 冲突申请
			gen_field_conflict_apply_ui( affair, res.id );	
		}
		else {						// 非冲突申请
			gen_field_normal_apply_ui( affair, res.id );
		};
		
	} );
}

function gen_field_conflict_apply_ui( affair, ids ) {
	
	var tar = $('ul.info_list');
	var new_li;
	var div_l1;
	var ul;
	
	$.each( ids, function(i,v) {
		
		var cur_a = affair[v];
		
		if( i==0 ) {
			var date = '';
			var field = '';
			
			if( typeof(cur_a.c_obj)!="undefined" ) {
				var mid = cur_a.c_obj;
				date = formatDate( mid.date );
				field = mid.com + '-' + mid.cam + '-' + mid.b + '-' + mid.room;		
			}
			
			new_li = $( '<li class="a_' + cur_a.a_id + '" group="' + cur_a.group+ '"><p class="f_h">' + date + '&nbsp;&nbsp;&nbsp;&nbsp;' + field + '</p></li>' );		
			tar.append( new_li );	
			
			div_l1 = $( '<div class="f_c"><ul></ul></div>' );
			new_li.append( div_l1 );
			ul = div_l1.children( 'ul' );
		}
		
		var item = $('<li apply="' + cur_a.id + '"><input type="radio" name="a_item"/><div class="field_apply_info"></div></li>');
		ul.append( item );
		
		var apply_info = item.children( 'div[class="field_apply_info"]' );
		apply_info.append( $('<p class="field_apply_info_p"><b>申请人:</b><a>&nbsp;&nbsp;&nbsp;&nbsp;'+cur_a.proposer+'</a></p>') );
		
		if( typeof(cur_a.c_obj)!="undefined" )
			apply_info.append( $('<p class="field_apply_info_p"><b>申请使用时段:</b>&nbsp;&nbsp;&nbsp;&nbsp;'+cur_a.c_obj.t.t1+':0:0 - '+(cur_a.c_obj.t.t2+1)+':0:0</p>') );
		
		apply_info.append( $('<p class="field_apply_info_p"><b>申请日期:</b>&nbsp;&nbsp;&nbsp;&nbsp;'+formatDate_2(cur_a.apply_t)+'</p>' ) );
		
		if( typeof(cur_a.c_obj)!="undefined" )
			apply_info.append( $('<p class="field_apply_info_p" style=" line-height:1.5em;width:100%"><b>申请事由:</b><br>'+cur_a.c_obj.res+'</p>') );
			
	} );
	
	//div_l1.append( $('<div class="field_wall"><a>查看意见</a></div>') );
	div_l1.append( $('<div class="field_wall"><a class="fill_comment_a">填写意见</a></div>') );		
	div_l1.append( $('<div class="field_wall" style="padding:10px 0"><input class="button c_agree" type="submit" value="同意" /><input class="button c_refuse" type="submit" value="全部拒绝" /></div>') );
	
	div_l1.find('a.fill_comment_a').click( function() {
		var a = $(this);
		var parent = a.parent();
		
		var text_area = parent.find( 'textarea.comment_textarea' );
		if( text_area.length<=0 ) {
			parent.append( $('<textarea class="comment_textarea"></textarea>') );
			text_area = parent.find( 'textarea.comment_textarea' );
			return;
		}
		
		if( text_area.is(":visible") )
			text_area.hide();
		else
			text_area.show();
	} );
	
	div_l1.find('input.c_agree').click( function() {
		agree( $(this) );
	} );
	
	div_l1.find('input.c_refuse').click( function() {
		refuse( $(this) );
	} );
}

function gen_field_normal_apply_ui( affair, ids ) {
	
	var tar = $('ul.info_list');
	var new_li;
	var div_l1;
	var ul;
	
	var cur_a = affair[ids[0]];
	
	var date = '';
	var field = '';
	if( typeof(cur_a.c_obj)!="undefined" ) {
		var mid = cur_a.c_obj;
		date = formatDate( mid.date );
		field = mid.com + '-' + mid.cam + '-' + mid.b + '-' + mid.room;		
	}
			
	new_li = $( '<li class="a_'+ cur_a.a_id + '" group="' + cur_a.group + '" apply="' + cur_a.id + '"><p class="f_h">' + date + '&nbsp;&nbsp;&nbsp;&nbsp;' + field + '</p></li>' );		
	tar.append( new_li );
	
	new_li.append( $('<p class="field_apply_info_p"><b>申请人:</b><a>&nbsp;&nbsp;&nbsp;&nbsp;'+cur_a.proposer+'</a></p>') );
	new_li.append( $('<p class="field_apply_info_p"><b>申请使用时段:</b>&nbsp;&nbsp;&nbsp;&nbsp;'+cur_a.c_obj.t.t1+':0:0 - '+(cur_a.c_obj.t.t2+1)+':0:0</p>') );	
	new_li.append( $('<p class="field_apply_info_p"><b>申请日期:</b>&nbsp;&nbsp;&nbsp;&nbsp;'+formatDate_2(cur_a.apply_t)+'</p>' ) );
	new_li.append( $('<p class="field_apply_info_p" style="height:4.5em;line-height:1.5em;width:100%"><b>申请事由:</b><br>'+cur_a.c_obj.res+'</p>') );
	
	//new_li.append( $('<div class="field_wall"><a>查看意见</a></div>') );
	new_li.append( $('<div class="field_wall"><a class="fill_comment_a">填写意见</a></div>') );
	new_li.append( $('<div class="field_wall" style="padding:10px 0"><input class="button agree" type="submit" value="同意" /><input class="button refuse" type="submit" value="拒绝" /></div>') );

	new_li.find('a.fill_comment_a').click( function() {
		var a = $(this);
		var parent = a.parent();
		
		var text_area = parent.find( 'textarea.comment_textarea' );
		if( text_area.length<=0 ) {
			parent.append( $('<textarea class="comment_textarea"></textarea>') );
			text_area = parent.find( 'textarea.comment_textarea' );
			return;
		}
		
		if( text_area.is(":visible") )
			text_area.hide();
		else
			text_area.show();
		
	} );
	
	new_li.find('input.agree').click( function() {
		agree( $(this) );
	} );
	
	new_li.find('input.refuse').click( function() {
		refuse( $(this) );
	} );
}

// trigger - jquery 对象
function agree( trigger ) {
	
	var res_obj = new Object();
	res_obj.agree = new Array();
	res_obj.refuse = new Array();
	
	var p_li = trigger.parents( 'li[group]' );
	
	var if_c_agree = trigger.attr( 'class' ).indexOf( 'c_agree' );
	
	if( if_c_agree>=0 ) {		// 冲突的场地申请 
		// 获取同意请求 li
		var agree_apply = p_li.find( 'div.f_c ul li[apply] input[type="radio"]:checked' );
		if( agree_apply.length<=0 )
			return;
		else
			res_obj.agree.push( agree_apply.eq(0).parent('li').attr('apply') );
		
		// 获取拒绝的请求 li
		var refuse_apply = p_li.find( 'div.f_c ul li[apply] input[type="radio"]:not(:checked)' );
		if( refuse_apply.length<=0 )
			return;
		else {
			$.each( refuse_apply, function(i,v) {
				res_obj.refuse.push( $(v).parent('li').attr('apply') );
			} );
		}
	}
	else {						// 正常场地申请
		res_obj.agree.push( p_li.attr('apply') );
	}
	
	// 获取意见
	var comm_obj = p_li.find( 'textarea.comment_textarea' );
	if( comm_obj.length>0 )
		res_obj.comm = comm_obj.val();	
	else
		res_obj.comm = '';
	
	agree_refuse_click( p_li, res_obj );
}

function refuse( trigger ) {
	
	var res_obj = new Object();
	res_obj.agree = new Array();
	res_obj.refuse = new Array();
	
	var p_li = trigger.parents( 'li[group]' );
	
	var if_c_refuse = trigger.attr( 'class' ).indexOf( 'c_refuse' );
	
	if( if_c_refuse>=0 ) {		// 冲突的场地申请 
		var refuse_apply = p_li.find( 'div.f_c ul li[apply]' );
		$.each( refuse_apply, function(i,v) {
			res_obj.refuse.push( $(v).attr('apply') );
		} );
	}
	else {						// 正常场地申请
		res_obj.refuse.push( p_li.attr('apply') );
	}
	
	// 获取意见
	var comm_obj = p_li.find( 'textarea.comment_textarea' );
	if( comm_obj.length>0 )
		res_obj.comm = comm_obj.val();	
	else
		res_obj.comm = '';
	
	agree_refuse_click( p_li, res_obj );
}

function agree_refuse_click( p_li, res_obj ) {
	
	p_li.hide( 'drop', 500, function() {
		var remove_group = p_li.attr('group');
		p_li.remove();
		remove_field_applys_with_group( remove_group );
		// 更新 menu 上的数量
	} );
			
/*	
	$.post( '', res_obj, function( res ) {
		if( res=='OK' )
			p_li.hide( 'drop', 500, function() {
				var remove_group = p_li.attr('group');
				p_li.remove();
				remove_field_applys_with_group( remove_group );
				// 更新 menu 上的数量
			} );
	} );
*/
} 

function get_unique( affair ) {
	var unique_id = new Array();
	$.each( affair, function(i, v) {
		if( 'group' in v && v.a_id==FIELD_A_ID )
			unique_id.push( v.group );
	} );
	
	unique_id = $.unique( unique_id );
	return unique_id;
}

function count_with_group( affair, g_val ) {
	var res = { num: 0, id:[] };
	$.each( affair, function(i, v) {
		if( 'group' in v  && v.a_id==FIELD_A_ID ) {
			if( v.group==g_val ) {
				res.num++;
				res.id.push( i );
			}
		}
	} );
	
	return res;
}

function remove_field_applys_with_group( group ) {
	
	for( var i=affair.length-1; i>-1; i-- ) {
		if( 'group' in affair[i] && affair[i].a_id==FIELD_A_ID ) {
			if( affair[i].group==group )
				affair.splice( i, 1 );
		}
	}
}