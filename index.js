var mysql = require("mysql");
var conn;

exports.mysql_setting = function(host, port, db_name, db_user_id, db_user_pw) {
    conn = mysql.createConnection({
        user        :   db_user_id
        ,password   :   db_user_pw
        ,host       :   host    //localhost
        ,port       :   port    //3306
        ,database   :   db_name
    });
};

exports.cms_setting = function(board, writer_id, writer_pw, writer_name, writer_email) {
    this.board           =   board;      //xe : modeul_srl, gnu : name of board
    this.writer_id       =   writer_id;
    this.writer_pw       =   writer_pw;
    this.writer_name     =   writer_name;
    this.writer_email    =   writer_email;
}

exports.xe_insert = function(title, content, publish_date) {
    conn.connect();

    var target_table = 'xe_documents';
    var document_srl = 0;

    conn.query(" INSERT INTO `xe_sequence`(seq) VALUES(NULL)", function(err, result) {
        var document_srl = result.insertId;

        if (err) {
            console.log(err.message);
        } else {
            var query_val  = {
                'document_srl'          :   document_srl
                ,'module_srl'           :    exports.board
                ,'category_srl'         :    0
                ,'title'                :    title
                ,'content'              :    content
                ,'user_id'              :    exports.writer_id
                ,'user_name'            :    exports.writer_id
                ,'nick_name'            :    exports.writer_name
                ,'member_srl'           :    ''
                ,'email_address'        :    exports.writer_email
                ,'regdate'              :    publish_date
                ,'lang_code'            :    'ko'
                ,'title_color'          :    'N'
                ,'extra_vars'           :    'N'
                ,'allow_trackback'      :    'N'
                ,'list_order'           :    -1*document_srl
                ,'update_order'         :    -1*document_srl
            };

            conn.query("INSERT INTO " + target_table + " SET    ?", query_val,  function(err, row) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log('success');
                }
                conn.end();
            });
        }
    });
};


exports.gnu_insert = function(title, content, publish_date) {
    conn.connect();

    var target_table = 'g5_write_' + exports.board;
    var document_srl = 0;

    conn.query(" SELECT IFNULL(MAX(wr_id), 0) as wr_id, IFNULL(COUNT(wr_id), 0) as wr_count FROM " +target_table, function(err, rows) {
        var document_srl = parseInt(rows[0].wr_id) + 1;
        var wr_count = parseInt(rows[0].wr_count) +1;

        if (err) {
            console.log(err.message);
        } else {
            var query_val  = {
                'wr_id'                 :    document_srl
                ,'wr_num'               :    -1*document_srl
                ,'wr_parent'            :    document_srl
                ,'wr_is_comment'        :    0
                ,'wr_comment'           :    0
                ,'wr_option'            :    'html1'
                ,'wr_subject'           :    title
                ,'wr_content'           :    content
                ,'mb_id'                :    exports.writer_id
                ,'wr_password'          :    exports.writer_pw
                ,'wr_name'              :    exports.writer_name
                ,'wr_email'             :    exports.writer_email
                ,'wr_datetime'          :    publish_date
                ,'wr_last'              :    publish_date
                ,'wr_ip'                :    ''
            };
            conn.query("INSERT INTO " + target_table + " SET ?", query_val,  function(err, row) {
                if (err) {
                    console.log(err.message);
                } else {
                    var query_val =  [ wr_count, exports.board ];
                    conn.query("UPDATE g5_board SET bo_count_write = ? WHERE bo_table = ? ", query_val,  function(err, row) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            //console.log('success');
                        }
                    });
                }
                conn.end();
            });
        }
    });
};
