# dbinsert_xe_gnu
Direct insert contents to XE/Gnuboard CMS
(DB를 통해 XE/그누보드에 직접 게시물 입력)

### Dependencies 의존성
    1. "mysql"

### Usage 사용법
    var xe = require("dbinsert_xe_gnu");

    //setting DB info DB정보 세팅
    var host = "localhost";
    var port = "3306";
    var db_name = YOUR DB NAME;
    var db_user_id = YOUR MYSQL ID;
    var db_user_pw = YOUR MYSQL PASSWORD;
    xe.mysql_setting(host, port, db_name, db_user_id, db_user_pw);

    //setting target Board, write's info 게시판, 작성자정보 세팅
    var board = MODEUL_SRL(XE) OR BOARD_NAME(GNU);
    var writer_id = WRITER ID;
    var writer_pw = WRITER PASSWORD;
    var writer_name = WRITER NAME;
    var writer_email = WRITER EMAIL;
    xe.cms_setting(board, writer_id, writer_pw, writer_name, writer_email);

    //Insert article to DB 데이터베이스에 게시물 입력
    var title = ARTICLE TITLE;
    var content = ARTICLE CONTENT;
    var publish_date = PUBLISH_DATE(yyyy-MM-dd);

    xe.xe_insert(title, content, publish_date);
    xe.gnu_insert(title, content, publish_date);
