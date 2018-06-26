# Manager Order Web
# Các yêu cầu để chạy project

1. Tải Nodejs https://nodejs.org/en/ ( Bạn nên tải bản Recommended For Most Users )
2. Tải MongoDb https://www.mongodb.com/download-center
3. Tải Robo3T https://robomongo.org/download

Sau khi tải tất cả những gì yêu cầu, bạn tiến hành cài đặt lần lượt theo thứ tự ở trên

# Tạo service cho MongoDb và kết nối Robo3T với MongoDb
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# Tạo dữ liệu mẫu để test
Bạn tiến hành tải project bằng 2 cách sau
- Sử dụng git command, bạn có thể tại git bằng link https://git-scm.com/downloads, sau khi tải và cài đặt xong, bạn ra ngoài màn hình desktop, chuột phải vào click vào Git Bash Here, git sẽ mở ra một command line,
bạn copy https://github.com/TranDuyPhong/app-web-manager-order.git vào command line và ấn enter để git tiến hành clone project về
- Tải file zip, vào link https://github.com/TranDuyPhong/app-web-manager-order/, tìm nút có chữ Clone or Download, click vào bạn sẽ thấy chữ Download ZIP và tiến hành tải file zip

Bạn có thể mở project bằng trình soạn thảo Visual Studio Code hoặc Sublime Text, có thể tải 2 trình soản thạo này với link dưới
- Visual Studio Code https://code.visualstudio.com/download
- Sublime Text https://www.sublimetext.com/3

Bạn cần tiến hành đúng theo từng bước sau
1. Đầu tiên bạn cần mở command line, nếu bạn đã tải git command thì chỉ cần chuột phải vào thư mục chứa project, nếu dùng command của window thì bạn mở command của window lên 
và copy đường dẫn chứa project và dán vào command window và ấn enter
2. Bạn gõ dòng lệnh npm install ( Lệnh này để tải tất cả những mobule cần thiết của project )
3. Mở project bằng trình soạn thảo, tiếp tục mở file server.js để tiến hành tạo dữ liệu mẫu
4. Mở command line và gõ dòng lệnh npm run server
5. Bạn bỏ comment dòng số 29 ( // require('./db/seeds/account/account') -> require('./db/seeds/account/account') ) và save lại, mở command line, đợi đến khi nào có thông báo ở command line 'Account 1 generated' là đã tạo thành công 1 dòng dữ liệu cho bảng accounts, sau đó comment dòng vừa nãy thành trạng thái ban đầu và save lại
6. Bạn bỏ comment dòng số 30 ( // require('./db/seeds/category/category') -> require('./db/seeds/category/category') ) và save lại, mở command line, đợi đến khi nào có thông báo ở command line 'Category 1 generated' là đã tạo thành công 1 dòng dữ liệu cho bảng categories, sau đó comment dòng vừa nãy thành trạng thái ban đầu và save lại
7. Bạn mở Robo3T đã tải, lưu ý là đã thiết lập service cho MongoDb mới làm được bước này, bạn để ý sẽ thấy nút Create ở góc trái trên cùng, click vào đó để tạo kết nối đến MongoDb, click tiếp vào nút Save để tạo, 
tiếp tục chọn vào Connection vừa tạo và click vào Connect, đến đây bạn sẽ thấy database 'managerorder', đó chính là database ta đã tạo, bạn click vào dấu mũi tên và click tiếp vào Collections để xem các bảng vừa tạo,
tiếp tục bạn click đúp vào bảng categories bạn sẽ thấy 1 document, đó chính là 1 document ( dòng ) danh mục mà bạn đã tạo, click chuột phải vào document, click tiếp vào view document. Bạn copy giá trị chuỗi của thuộc tính _id, chỉ copy chuỗi không copy ObjectId
8. Bạn quay trở lại project mở file food.js theo đường dẫn db -> seeds -> food -> food.js, bạn sẽ thấy một object food có tên food_1, bạn copy chuỗi _id danh mục vừa này vào thuộc tính idCategory và save lại
9. Bạn quay trở lại file server.js, bỏ comment dòng số 31 ( // require('./db/seeds/food/food') -> require('./db/seeds/food/food') ) và save lại, mở command line, đợi đến khi nào có thông báo ở command line 'Food 1 generated' là đã tạo thành công 1 dòng dữ liệu cho bảng foods, sau đó comment dòng vừa nãy thành trạng thái ban đầu và save lại
10. Bạn bỏ comment dòng số 32 ( // require('./db/seeds/table/table') -> require('./db/seeds/table/table') ) và save lại, mở command line, đợi đến khi nào có thông báo ở command line 'Table 1 generated' -> 'Table 18 generated' là đã tạo thành công 18 dòng dữ liệu cho bảng tables, sau đó comment dòng vừa nãy thành trạng thái ban đầu và save lại
11. Sau khi đã tạo các dữ liệu mẫu xong, bạn mở trình duyệt Chrome hoặc Firefox và gõ trên thanh url http://localhost:3000/, web sẽ chuyển sang trang đăng nhập, bạn đăng nhập với tên tài khoản và mật khẩu là admin, tài khoản này thật chất bạn đã tạo ở bước 5
12. Test thử phần mềm








