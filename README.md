# exam2_connect_wallet
tạo 1 ứng dụng FE dùng reactjs, BE dùng nodejs. Cả 2 đều viết bằng typescript.

Tại FE có nút connect ví. Sau khi ấn connect ví sẽ connect tới ví metamask. Yêu cầu show ra được địa chỉ ví đang connect.

Tại FE cũng có một ô input và một nút "Claim". Khi nhập số coin mong muốn vào ô input và ấn nút "Claim" mà chưa connect ví thì hiện ra thông báo phải connect ví trước. Còn nếu đã connect ví thì sẽ call xuống API dưới backend.

Backend thực hiện chuyển coin vào ví vừa connect với số lượng như đã nhập ở ô input


Trước tiên hãy tạo 2 ví trên metamask. Mạng BSC TESTNET và claim faucet để lấy ít BNB ban đầu.

Mọi thao tác đều là trên testnet của Binance Smart Chain vì vậy sẽ không tốn tiền.