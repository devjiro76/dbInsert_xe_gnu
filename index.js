var conn;
var cms_type, board, writer_id, writer_pw, writer_name, writer_email;

exports.mysql_setting = function(host, port, db_name, db_user_id, db_uesr_pw) {
    conn = mysql.createConnection({
        user        :   db_user_id
		,password   :   db_uesr_pw
        ,host       :   host    //localhost
        ,port       :   port    //3306
        ,database   :   db_name
    });
};

exports.cms_setting = function(cms_type, board, writer_id, writer_pw, writer_name, writer_email) {
    cms_type        =   cms_type;
    board           =   board;      //xe : modeul_srl, gnu : name of board
    writer_id       =   writer_id;
    writer_pw       =   writer_pw;
    writer_name     =   writer_name;
    writer_email    =   writer_email;
}

exports.article_insert = function(url, title, content, publish_date) {
    if( cms_type == 'xe' || cms_type == 'XE' ) { //xe
		var target_table = 'xe_documents';
		var document_srl = 0;

		var d = new Date(publish_date);
		var old_date = d.format("yyyyMMddHHmmss");

		conn.query(" INSERT INTO `xe_sequence`(seq) VALUES(NULL)", function(err, result) {
			document_srl = result.insertId;

			if (err) {
				console.log(err.message);
			} else {
				var query_val  = {
					'document_srl'			:	document_srl
					,'module_srl'			:	board
					,'category_srl'			:	0
					,'title'				:	title
					,'content'				:	content
					,'user_id'				:	writer_id
					,'user_name'			:	writer_id
					,'nick_name' 			:	writer_name
					,'member_srl' 			:	''
					,'email_address'		:	writer_email
					,'regdate'				:	old_date
					,'lang_code'			:	'ko'
					,'title_color'			:	'N'
					,'extra_vars'			:	'N'
					,'allow_trackback'		:	'N'
					,'list_order'			:	-1*document_srl
					,'update_order'		    :	-1*document_srl
				};

				conn.query("INSERT INTO " + target_table + " SET	?", query_val,  function(err, row) {
					if (err) {
						console.log(err.message);
					} else {
						//console.log('success');
					}
				});
			}
		});
    } else { //Gnuboard
		var target_table = 'g5_write_' + board;
		var document_srl = 0;

		var d = new Date(publish_date);
		var old_date = d.format("yyyy-MM-dd HH:mm:ss");

		conn.query(" SELECT IFNULL(MAX(wr_id), 0) as wr_id, IFNULL(COUNT(wr_id), 0) as wr_count FROM " +target_table, function(err, rows) {
			document_srl = parseInt(rows[0].wr_id) + 1;
			wr_count = parseInt(rows[0].wr_count) +1;

			if (err) {
				console.log(err.message);
			} else {
				var query_val  = {
					'wr_id'					:	document_srl
					,'wr_num'				:	-1*document_srl
					,'wr_parent'			:	document_srl
					,'wr_is_comment'		:	0
					,'wr_comment'			:	0
					,'wr_option'			:	'html1'
					,'wr_subject'			:	title
					,'wr_content'			:	content
					,'mb_id'				:	writer_id
					,'wr_password'			:	writer_pw
					,'wr_name'				:	writer_name
					,'wr_email'				:	writer_email
					,'wr_datetime'			:	old_date
					,'wr_last'				:	old_date
					,'wr_ip'				:	''
				};
				conn.query("INSERT INTO " + target_table + " SET ?", query_val,  function(err, row) {
					if (err) {
						console.log(err.message);
					} else {
						var query_val =  [ wr_count, target_module ];
						conn.query("UPDATE g5_board SET bo_count_write = ? WHERE bo_table = ? ", query_val,  function(err, row) {
							if (err) {
								console.log(err.message);
							} else {
								//console.log('success');
							}
						});
					}
				});
			}
    	};
    }
};
