/*
	user_info 	. uid
				. identity
				. name
*/

user_info = new Array();
user_info[0] = new Object();
user_info[0].uid = 45;
user_info[0].identity = 'admin';
user_info[0].name = '1@163.com';

user_info[1] = new Object();
user_info[1].uid = 46;
user_info[1].identity = 'admin';
user_info[1].name = '2@163.com';

user_info[2] = new Object();
user_info[2].uid = 47;
user_info[2].identity = 'admin';
user_info[2].name = '1@163.com';

user_info[3] = new Object();
user_info[3].uid = 48;
user_info[3].identity = 'admin';
user_info[3].name = '3@163.com';

user_info[4] = new Object();
user_info[4].uid = 49;
user_info[4].identity = 'admin';
user_info[4].name = '4@163.com';



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