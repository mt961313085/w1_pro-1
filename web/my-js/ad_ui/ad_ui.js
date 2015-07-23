/*
	affair[i]	. id
				. a_id
				. name
				. step
				. proposer
				. processor
				. content
				. rec_t
				. comment[j]. processor
							. end_t
							. suggestion
							. res
	
	user_info 	. name
				. identity
*/

function add_menu( affair ) {
	
	
}

function menu_click( clicked_id ) {
	console.log( clicked_id );
	
	$('ul.info_list li').show();
	
	var tar_str = 'ul.info_list li[class!="'+clicked_id+'"]';
	$(tar_str).hide();
	
}