/*
	affair[i]	. id					// 此事务唯一标识id
				. a_id					// 事务类型id
				. name					// 事务名称
				. step
				. proposer
				. processor
				. content
				. apply_t				// 申请时间
				. rec_t					// 此申请进入此步骤的时间
				. comment[j]. step
							. processor
							. end_t
							. suggestion
							. res
	
	user_info 	. name
				. identity
*/

var FIELD_A_ID = 16;			// 场地申请事务 id


function add_menu( affair ) {
	
	
}

function menu_click( clicked_id ) {
	console.log( clicked_id );
	
	$('ul.info_list li').show();
	
	var tar_str = 'ul.info_list > li[class!="'+clicked_id+'"]';
	$(tar_str).hide();
	
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