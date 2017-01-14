var test = require("../index.js");

var host = "localhost";
var port = "3306";
var db_name = YOUR DB NAME;
var db_user_id = YOUR MYSQL ID;
var db_user_pw = YOUR MYSQL PASSWORD;
test.mysql_setting(host, port, db_name, db_user_id, db_user_pw);

var board = MODEUL_SRL(XE) OR BOARD_NAME(GNU);
var writer_id = WRITER ID;
var writer_pw = WRITER PASSWORD;
var writer_name = WRITER NAME;
var writer_email = WRITER EMAIL;
test.cms_setting(board, writer_id, writer_pw, writer_name, writer_email);

var title = ARTICLE TITLE;
var content = ARTICLE CONTENT;
var publish_date = PUBLISH_DATE(yyyy-MM-dd);
test.gnu_insert(title, content, publish_date);
