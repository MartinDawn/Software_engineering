# Dịch vụ in thông minh 

## Đặc tả:
### Các bên liên quan và nhu cầu:
Dịch vụ In Thông Minh của HCMUT cần đáp ứng ba nhóm nhu cầu chính: sinh viên, nhân viên dịch vụ in ấn, và quản lý nhà trường.

- **Sinh viên**: có thể là sinh viên (là nhóm sử dụng chính) trong trường, giảng viên, cán bộ có nhu cầu in ấn. Họ yêu cầu một hệ thống in ấn đáng tin cậy, thân thiện và dễ sử dụng, hỗ trợ nhiều loại tài liệu cũng như các tùy chọn in linh hoạt và cũng cần xem lại lịch sử in chi tiết và có thể dễ dàng mua thêm trang in thông qua hệ thống thanh toán trực tuyến khi cần.

- **Nhân viên dịch vụ in ấn**: yêu cầu các công cụ để quản lý máy in, cấu hình hệ thống, và kiểm soát, giám sát toàn bộ hoạt động in ấn giúp nhân viên có thể dễ dàng quản lý việc in ấn của sinh viên cũng như có thể giám sát tần suất in ấn của sinh viên và xem báo cáo của theo quý, năm.

- **Quản lý nhà trường**: cần tính năng tạo tài khoản tạm thời cho sinh viên, giảng viên mới nhập học hoặc mới làm việc cho trường trong thời gian chưa cấp tài khoản mybk. Đồng thời có thể mở các đợt mua giấy hoặc đóng lại tùy điều kiện, hoàn cảnh.

### Lợi ích của HCMUT-SSPS với mỗi bên liên quan:
Hệ thống HCMUT-SSPS mang lại lợi ích thiết thực cho nhiều bên liên quan, bao gồm sinh viên, nhân viên quản lý dịch vụ in ấn (SPSO) và ban quản lý nhà trường.

- **Đối với sinh viên**: HCMUT-SSPS cung cấp trải nghiệm in ấn tiện lợi và linh hoạt hơn. Sinh viên có thể in tài liệu ngay tại trường mà không cần tìm đến các dịch vụ in ấn bên ngoài, tiết kiệm thời gian và công sức. Việc kiểm tra lịch sử in ấn, quản lý chi phí in ấn thông qua hạn mức trang in có sẵn và thanh toán trực tuyến cũng trở nên dễ dàng hơn. Tính năng mua thêm hạn mức trang in khi cần thiết cũng giúp sinh viên chủ động hơn trong việc quản lý chi phí.

- **Đối với nhân viên SPSO**: Hệ thống giúp đơn giản hóa đáng kể quy trình quản lý và vận hành dịch vụ in ấn. Các công việc như quản lý, cấu hình máy in và giám sát hoạt động in ấn được thực hiện hiệu quả hơn, giảm thiểu khối lượng công việc thủ công và tăng cường khả năng kiểm soát.

- **Đối với ban quản lý nhà trường**: Có thể dễ dàng cho phép sinh viên chưa có tài khoản xác thực SSO, tiếp cận với việc in ấn của nhà trường. Đồng thời có thể quản lí thời gian thu phí của sinh viên, mang lại tiện lợi tránh tắc nghẽn hệ thống.


## Công nghệ sử dụng

### Backend
- **Framework**: Django
- **Database**: Microsoft SQL Server (MSSQL)

### Frontend
- **Framework**: React
- **Server**: Node.js

## Use case diagram for whole system:
![Use case diagram](https://github.com/user-attachments/assets/52b0db28-7c93-4f26-b54b-e64c508e84ab)


## Use case diagram for printing module:
![Use case diagram printing](https://github.com/user-attachments/assets/540feb01-c9bc-408a-9369-f7f99eef0686)


## Activity diagram

### Login
![log in usecase](https://github.com/user-attachments/assets/aa27ec16-b4ad-4ae4-991f-2229c32d6bfd)


### Print
![printing docs usecase - Page 1](https://github.com/user-attachments/assets/05239cdc-71de-4226-8e76-66c661db9eb8)


### Buy paper
![Buy papers usecase](https://github.com/user-attachments/assets/281a77b4-c8e4-4aff-99bf-1c503154c9ca)



## Sequence diagram

### Login
![LoginSequenceDiagram](https://github.com/user-attachments/assets/7fd2c5fd-7246-4d7e-bceb-2bd3586de676)


### Print
![Printing-sequence-diagram](https://github.com/user-attachments/assets/2322bc64-0dbb-491d-bd43-4f2d39e4db53)


### Add printer 
![AddPrinter](https://github.com/user-attachments/assets/f926ead4-2d31-4633-84ac-b2445f853276)



### Buy paper
![BuyPaper](https://github.com/user-attachments/assets/ca2975ed-8390-42f9-b768-469ac76eb005)




## Component diagram
![component diagram](https://github.com/user-attachments/assets/0a185699-1aab-4777-be2f-17ffbba82060)


## Class diagram
![class diagram](https://github.com/user-attachments/assets/5a2fa55c-5361-4dc5-a508-b33d736bfda1)


## Layered architecture 
![Layered Architecture](https://github.com/user-attachments/assets/6148036a-f567-43db-ac2f-f3c10774ef55)




