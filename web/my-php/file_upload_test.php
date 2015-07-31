<?php
	
	//$postdata = file_get_contents( 'php://input' );
	
	$data = base64_decode( $_POST['data'] );
	
	$f_h = fopen( '../wdh.jpg', 'wb' );
	if( $f_h==false ) {
		echo "Fail";
		return;
	}
	
	fwrite( $f_h, $data );
	fclose( $f_h );

	echo 'return---'.strlen( $data );
	
?>